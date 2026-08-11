import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronLeft, ChevronRight, CalendarDays, Users, Ticket, User, Mail, Phone,
  Globe, Smartphone, CreditCard, Building2, CheckCircle, Info, Copy, MessageCircle,
  Car, BedDouble, Sparkles, Minus, Plus,
} from 'lucide-react';
import { TOUR_EXTRAS, ACCOMMODATION_TIERS, RESIDENCY } from './tours.js';
import { guides, LANGUAGE_FILTERS } from './guides.js';
import { formatPrice } from './currency.js';
import { GuideCard } from './TourPage';
import './TourBookingPage.css';

const STEPS = [
  { n: 1, label: 'Dates', icon: CalendarDays },
  { n: 2, label: 'Guide & vehicle', icon: Users },
  { n: 3, label: 'Travellers', icon: User },
  { n: 4, label: 'Stay & extras', icon: Sparkles },
  { n: 5, label: 'Payment', icon: CreditCard },
  { n: 6, label: 'Confirmed', icon: CheckCircle },
];

const WHATSAPP_NUMBER = '250788470902';

function makeReference(tourId) {
  const prefix = tourId.slice(0, 3).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `EA-${prefix}-${rand}`;
}

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

function TourBookingPage({ tour, cars = [], onClose, currency = 'USD' }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [reference, setReference] = useState('');
  const [copied, setCopied] = useState(false);
  const [langFilter, setLangFilter] = useState('all');

  const [form, setForm] = useState({
    startDate: '',
    travellers: 2,
    residency: 'foreign',
    guideId: '',
    vehicleId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    notes: '',
    accommodation: 'standard',
    extras: { porter: false, photographer: false, culturalVillage: false, airportPickup: false, simCard: false },
    payMethod: 'momo',
    momoProvider: 'mtn',
    momoNumber: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const set = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: null }));
  };

  const toggleExtra = (id) =>
    setForm((p) => ({ ...p, extras: { ...p.extras, [id]: !p.extras[id] } }));

  const guide = guides.find((g) => g.id === form.guideId) || null;
  const vehicle = cars.find((c) => String(c.id) === String(form.vehicleId)) || null;

  const visibleGuides = useMemo(() => {
    const pool = guides.filter((g) => g.specialities.includes(tour.category));
    const base = pool.length ? pool : guides;
    if (langFilter === 'all') return base;
    return base.filter((g) => g.languages.includes(langFilter));
  }, [tour.category, langFilter]);

  /* ---------- Pricing ---------- */

  const lines = useMemo(() => {
    const t = Math.max(1, Number(form.travellers) || 1);
    const rows = [];

    rows.push({
      key: 'tour',
      label: `${tour.name} × ${t}`,
      amount: tour.price * t,
    });

    if (tour.permit?.required) {
      const each = tour.permit.tiers[form.residency] ?? tour.permit.tiers.foreign;
      rows.push({
        key: 'permit',
        label: `${tour.permit.name} × ${t}`,
        amount: each * t,
        note: RESIDENCY.find((r) => r.id === form.residency)?.label,
      });
    }

    if (guide) {
      rows.push({
        key: 'guide',
        label: `${guide.short}, ${tour.days} ${tour.days === 1 ? 'day' : 'days'}`,
        amount: guide.dayRate * tour.days,
      });
    }

    if (vehicle) {
      rows.push({
        key: 'vehicle',
        label: `${vehicle.name} upgrade, ${tour.days} ${tour.days === 1 ? 'day' : 'days'}`,
        amount: parseFloat(vehicle.price) * tour.days,
      });
    }

    if (tour.nights > 0) {
      const tier = ACCOMMODATION_TIERS.find((a) => a.id === form.accommodation);
      if (tier && tier.perNight > 0) {
        rows.push({
          key: 'stay',
          label: `${tier.label} lodging, ${tour.nights} × ${t}`,
          amount: tier.perNight * tour.nights * t,
        });
      }
    }

    TOUR_EXTRAS.forEach((e) => {
      if (!form.extras[e.id]) return;
      let amount = e.price;
      if (e.id === 'porter') amount = e.price * t * tour.days;
      if (e.id === 'photographer') amount = e.price * tour.days;
      if (e.id === 'culturalVillage' || e.id === 'simCard') amount = e.price * t;
      rows.push({ key: e.id, label: e.label, amount });
    });

    return rows;
  }, [form, tour, guide, vehicle]);

  const total = lines.reduce((s, l) => s + l.amount, 0);
  const deposit = Math.round(total * 0.3);

  /* ---------- Validation ---------- */

  const validate = (s) => {
    const e = {};
    if (s === 1) {
      if (!form.startDate) e.startDate = 'Pick a start date';
      if (form.travellers < tour.groupMin) e.travellers = `This tour runs with at least ${tour.groupMin}`;
      if (form.travellers > tour.groupMax) e.travellers = `Maximum ${tour.groupMax} on this tour`;
    }
    if (s === 3) {
      if (!form.firstName.trim()) e.firstName = 'First name is required';
      if (!form.lastName.trim()) e.lastName = 'Last name is required';
      if (!form.email.trim()) e.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'That email address is not valid';
      if (!form.phone.trim()) e.phone = 'Phone number is required';
      if (tour.permit?.required && !form.nationality.trim()) {
        e.nationality = 'Nationality is required to issue the permit';
      }
    }
    if (s === 5) {
      if (form.payMethod === 'momo') {
        const digits = form.momoNumber.replace(/\D/g, '');
        if (!digits) e.momoNumber = 'Enter the number that will approve the payment';
        else if (digits.length < 9) e.momoNumber = 'That number is too short';
      }
      if (form.payMethod === 'card') {
        if (form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Card number must be 16 digits';
        if (!form.cardName.trim()) e.cardName = 'Cardholder name is required';
        if (!form.expiry) e.expiry = 'Expiry is required';
        if (form.cvv.length < 3) e.cvv = 'CVV must be 3 digits';
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate(step)) setStep((s) => Math.min(s + 1, 6));
  };
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const submit = () => {
    if (!validate(5)) return;
    const ref = makeReference(tour.id);
    setReference(ref);
    setStep(6);
    // Wire this to your API when the backend is ready.
    console.log('Tour booking', { reference: ref, tour: tour.id, form, total });
  };

  const formatCard = (v) => {
    const digits = v.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const copyRef = async () => {
    try {
      await navigator.clipboard.writeText(reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello EurAsia Rwanda. My tour booking reference is ${reference} for ${tour.name} starting ${form.startDate}.`
  )}`;

  return (
    <div className="tb-overlay">
      <motion.div
        className="tb-shell"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
      >
        <button type="button" className="tb-close" onClick={onClose} aria-label="Close booking">
          <X size={20} />
        </button>

        <div className="tb-steps">
          {STEPS.map((s) => (
            <div key={s.n} className={`tb-step ${step >= s.n ? 'done' : ''} ${step === s.n ? 'now' : ''}`}>
              <span className="tb-step-icon"><s.icon size={17} /></span>
              <span className="tb-step-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="tb-main">
          <AnimatePresence mode="wait">
            {/* 1 — Dates */}
            {step === 1 && (
              <motion.section key="s1" className="tb-panel" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                <h2>When are you going?</h2>
                <p className="tb-sub">{tour.name} runs over {tour.days} {tour.days === 1 ? 'day' : 'days'}. Best months: {tour.bestMonths}.</p>

                <div className="tb-grid">
                  <div className="tb-field">
                    <label htmlFor="startDate"><CalendarDays size={16} /> Start date</label>
                    <input
                      id="startDate"
                      type="date"
                      min={todayISO()}
                      value={form.startDate}
                      onChange={(e) => set('startDate', e.target.value)}
                      className={errors.startDate ? 'invalid' : ''}
                    />
                    {errors.startDate && <span className="tb-error">{errors.startDate}</span>}
                  </div>

                  <div className="tb-field">
                    <label><Users size={16} /> Travellers</label>
                    <div className="stepper">
                      <button type="button" onClick={() => set('travellers', Math.max(tour.groupMin, form.travellers - 1))} aria-label="One fewer traveller">
                        <Minus size={16} />
                      </button>
                      <span>{form.travellers}</span>
                      <button type="button" onClick={() => set('travellers', Math.min(tour.groupMax, form.travellers + 1))} aria-label="One more traveller">
                        <Plus size={16} />
                      </button>
                    </div>
                    <span className="tb-hint">{tour.groupMin}–{tour.groupMax} people on this tour</span>
                    {errors.travellers && <span className="tb-error">{errors.travellers}</span>}
                  </div>
                </div>

                {tour.permit?.required && (
                  <>
                    <h3 className="tb-h3">Permit rate</h3>
                    <p className="tb-sub tb-sub--tight">
                      The park charges different rates by residency. Pick yours so the quote is accurate — we
                      verify it against your documents before issuing.
                    </p>
                    <div className="tb-radios">
                      {RESIDENCY.map((r) => (
                        <label key={r.id} className={`tb-radio ${form.residency === r.id ? 'on' : ''}`}>
                          <input
                            type="radio"
                            name="residency"
                            checked={form.residency === r.id}
                            onChange={() => set('residency', r.id)}
                          />
                          <span className="tb-radio-title">{r.label}</span>
                          <span className="tb-radio-price">
                            {formatPrice(tour.permit.tiers[r.id], currency)} per person
                          </span>
                        </label>
                      ))}
                    </div>
                    <p className="tb-note"><Info size={15} /> {tour.permit.note}</p>
                  </>
                )}
              </motion.section>
            )}

            {/* 2 — Guide & vehicle */}
            {step === 2 && (
              <motion.section key="s2" className="tb-panel" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                <h2>Choose your guide</h2>
                <p className="tb-sub">Optional. Leave it to us and we will assign whoever is strongest on this route that week.</p>

                <div className="lang-row">
                  <span className="tb-inline-label">Speaks</span>
                  <button type="button" className={`chip chip--sm ${langFilter === 'all' ? 'active' : ''}`} onClick={() => setLangFilter('all')}>
                    Any
                  </button>
                  {LANGUAGE_FILTERS.map((l) => (
                    <button key={l} type="button" className={`chip chip--sm ${langFilter === l ? 'active' : ''}`} onClick={() => setLangFilter(l)}>
                      {l}
                    </button>
                  ))}
                </div>

                <div className="tb-guides">
                  {visibleGuides.map((g) => (
                    <GuideCard
                      key={g.id}
                      guide={g}
                      currency={currency}
                      selected={form.guideId === g.id}
                      onPick={() => set('guideId', form.guideId === g.id ? '' : g.id)}
                    />
                  ))}
                  {visibleGuides.length === 0 && (
                    <p className="tb-note"><Info size={15} /> Nobody on this route speaks {langFilter} right now. Choose another language or leave the guide to us and we will find an interpreter.</p>
                  )}
                </div>

                <h3 className="tb-h3">Vehicle</h3>
                <p className="tb-sub tb-sub--tight">A 4x4 with driver is already in the price. Upgrade to something from the fleet if you would rather travel in it.</p>

                <div className="veh-grid">
                  <button
                    type="button"
                    className={`veh-card ${!form.vehicleId ? 'on' : ''}`}
                    onClick={() => set('vehicleId', '')}
                  >
                    <Car size={22} />
                    <span className="veh-name">Standard 4x4</span>
                    <span className="veh-price">Included</span>
                  </button>

                  {cars.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`veh-card ${String(form.vehicleId) === String(c.id) ? 'on' : ''}`}
                      onClick={() => set('vehicleId', c.id)}
                    >
                      {c.image ? <img src={c.image} alt="" /> : <Car size={22} />}
                      <span className="veh-name">{c.name}</span>
                      <span className="veh-price">
                        + {formatPrice(parseFloat(c.price) * tour.days, currency, { compact: true })}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.section>
            )}

            {/* 3 — Travellers */}
            {step === 3 && (
              <motion.section key="s3" className="tb-panel" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                <h2>Who is leading the group?</h2>
                <p className="tb-sub">We only need the lead traveller now. Names for the rest of the party can follow by email before the permits are issued.</p>

                <div className="tb-grid">
                  <div className="tb-field">
                    <label htmlFor="fn"><User size={16} /> First name</label>
                    <input id="fn" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} placeholder="Ismail" className={errors.firstName ? 'invalid' : ''} />
                    {errors.firstName && <span className="tb-error">{errors.firstName}</span>}
                  </div>

                  <div className="tb-field">
                    <label htmlFor="ln"><User size={16} /> Last name</label>
                    <input id="ln" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} placeholder="Niyonsaba" className={errors.lastName ? 'invalid' : ''} />
                    {errors.lastName && <span className="tb-error">{errors.lastName}</span>}
                  </div>

                  <div className="tb-field">
                    <label htmlFor="em"><Mail size={16} /> Email</label>
                    <input id="em" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" className={errors.email ? 'invalid' : ''} />
                    {errors.email && <span className="tb-error">{errors.email}</span>}
                  </div>

                  <div className="tb-field">
                    <label htmlFor="ph"><Phone size={16} /> Phone or WhatsApp</label>
                    <input id="ph" type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+250 7.. ... ..." className={errors.phone ? 'invalid' : ''} />
                    {errors.phone && <span className="tb-error">{errors.phone}</span>}
                  </div>

                  {tour.permit?.required && (
                    <div className="tb-field">
                      <label htmlFor="nat"><Globe size={16} /> Nationality</label>
                      <input id="nat" value={form.nationality} onChange={(e) => set('nationality', e.target.value)} placeholder="As shown on your passport" className={errors.nationality ? 'invalid' : ''} />
                      {errors.nationality && <span className="tb-error">{errors.nationality}</span>}
                      <span className="tb-hint">The park requires this on every permit.</span>
                    </div>
                  )}

                  <div className="tb-field tb-field--full">
                    <label htmlFor="notes">Anything we should plan around</label>
                    <textarea
                      id="notes"
                      rows="3"
                      value={form.notes}
                      onChange={(e) => set('notes', e.target.value)}
                      placeholder="Dietary needs, mobility, altitude concerns, a birthday — tell us and we will work with it."
                    />
                  </div>
                </div>
              </motion.section>
            )}

            {/* 4 — Stay & extras */}
            {step === 4 && (
              <motion.section key="s4" className="tb-panel" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                {tour.nights > 0 ? (
                  <>
                    <h2>Where you sleep</h2>
                    <p className="tb-sub">{tour.nights} {tour.nights === 1 ? 'night' : 'nights'} on this tour. Prices are per person, per night, on top of the base price.</p>
                    <div className="tb-radios tb-radios--cards">
                      {ACCOMMODATION_TIERS.map((a) => (
                        <label key={a.id} className={`tb-radio ${form.accommodation === a.id ? 'on' : ''}`}>
                          <input type="radio" name="stay" checked={form.accommodation === a.id} onChange={() => set('accommodation', a.id)} />
                          <span className="tb-radio-title"><BedDouble size={16} /> {a.label}</span>
                          <span className="tb-radio-note">{a.note}</span>
                          <span className="tb-radio-price">
                            {a.perNight === 0 ? 'Included' : `+ ${formatPrice(a.perNight, currency)} / night`}
                          </span>
                        </label>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h2>Add to your day</h2>
                    <p className="tb-sub">This is a day trip, so there is no lodging to choose. Everything below is optional.</p>
                  </>
                )}

                <h3 className="tb-h3">Extras</h3>
                <div className="extras-list">
                  {TOUR_EXTRAS.map((e) => (
                    <label key={e.id} className={`extra-row ${form.extras[e.id] ? 'on' : ''}`}>
                      <input type="checkbox" checked={form.extras[e.id]} onChange={() => toggleExtra(e.id)} />
                      <span className="extra-copy">
                        <strong>{e.label}</strong>
                        <em>{e.note}</em>
                      </span>
                      <span className="extra-price">
                        {formatPrice(e.price, currency)}
                        <small>{e.unit}</small>
                      </span>
                    </label>
                  ))}
                </div>
              </motion.section>
            )}

            {/* 5 — Payment */}
            {step === 5 && (
              <motion.section key="s5" className="tb-panel" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                <h2>How you would like to pay</h2>
                <p className="tb-sub">
                  A {formatPrice(deposit, currency)} deposit confirms the booking and releases the permits. The
                  balance is due seven days before you travel.
                </p>

                <div className="pay-tabs">
                  {[
                    { id: 'momo', label: 'Mobile Money', icon: Smartphone },
                    { id: 'card', label: 'Card', icon: CreditCard },
                    { id: 'office', label: 'Pay at the office', icon: Building2 },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`pay-tab ${form.payMethod === p.id ? 'on' : ''}`}
                      onClick={() => set('payMethod', p.id)}
                    >
                      <p.icon size={18} /> {p.label}
                    </button>
                  ))}
                </div>

                {form.payMethod === 'momo' && (
                  <div className="tb-grid">
                    <div className="tb-field">
                      <label>Provider</label>
                      <div className="seg">
                        {[
                          { id: 'mtn', label: 'MTN MoMo' },
                          { id: 'airtel', label: 'Airtel Money' },
                        ].map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            className={form.momoProvider === p.id ? 'on' : ''}
                            onClick={() => set('momoProvider', p.id)}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="tb-field">
                      <label htmlFor="momo"><Smartphone size={16} /> Mobile Money number</label>
                      <input
                        id="momo"
                        type="tel"
                        value={form.momoNumber}
                        onChange={(e) => set('momoNumber', e.target.value)}
                        placeholder="078 123 4567"
                        className={errors.momoNumber ? 'invalid' : ''}
                      />
                      {errors.momoNumber && <span className="tb-error">{errors.momoNumber}</span>}
                      <span className="tb-hint">You will get a prompt on this phone. Approve it with your PIN.</span>
                    </div>
                  </div>
                )}

                {form.payMethod === 'card' && (
                  <div className="tb-grid">
                    <div className="tb-field tb-field--full">
                      <label htmlFor="cn"><CreditCard size={16} /> Card number</label>
                      <input id="cn" value={form.cardNumber} onChange={(e) => set('cardNumber', formatCard(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19} className={errors.cardNumber ? 'invalid' : ''} />
                      {errors.cardNumber && <span className="tb-error">{errors.cardNumber}</span>}
                    </div>
                    <div className="tb-field tb-field--full">
                      <label htmlFor="cname">Name on the card</label>
                      <input id="cname" value={form.cardName} onChange={(e) => set('cardName', e.target.value)} placeholder="ISMAIL NIYONSABA" className={errors.cardName ? 'invalid' : ''} />
                      {errors.cardName && <span className="tb-error">{errors.cardName}</span>}
                    </div>
                    <div className="tb-field">
                      <label htmlFor="exp">Expiry</label>
                      <input
                        id="exp"
                        value={form.expiry}
                        onChange={(e) => {
                          let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                          if (v.length >= 3) v = `${v.slice(0, 2)}/${v.slice(2)}`;
                          set('expiry', v);
                        }}
                        placeholder="MM/YY"
                        maxLength={5}
                        className={errors.expiry ? 'invalid' : ''}
                      />
                      {errors.expiry && <span className="tb-error">{errors.expiry}</span>}
                    </div>
                    <div className="tb-field">
                      <label htmlFor="cvv">CVV</label>
                      <input id="cvv" value={form.cvv} onChange={(e) => set('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="123" className={errors.cvv ? 'invalid' : ''} />
                      {errors.cvv && <span className="tb-error">{errors.cvv}</span>}
                    </div>
                  </div>
                )}

                {form.payMethod === 'office' && (
                  <p className="tb-note">
                    <Info size={15} />
                    We will hold the dates for 48 hours. Bring the deposit to the KG 7 Ave office in Kigali, or
                    send it by bank transfer using the reference on your confirmation.
                  </p>
                )}
              </motion.section>
            )}

            {/* 6 — Confirmation */}
            {step === 6 && (
              <motion.section key="s6" className="tb-panel tb-panel--confirm" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="confirm-mark"><CheckCircle size={64} /></div>
                <h2>You are booked on {tour.name}</h2>
                <p className="tb-sub">
                  Confirmation is on its way to <strong>{form.email}</strong>. Your guide will message you two
                  days before you travel with the pickup time.
                </p>

                <div className="ref-box">
                  <span className="ref-label">Booking reference</span>
                  <span className="ref-code">{reference}</span>
                  <button type="button" onClick={copyRef} className="ref-copy">
                    <Copy size={15} /> {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div className="confirm-summary">
                  <div><span>Start date</span><strong>{form.startDate}</strong></div>
                  <div><span>Travellers</span><strong>{form.travellers}</strong></div>
                  <div><span>Guide</span><strong>{guide ? guide.name : 'Assigned by us'}</strong></div>
                  <div><span>Vehicle</span><strong>{vehicle ? vehicle.name : 'Standard 4x4'}</strong></div>
                  <div><span>Deposit due now</span><strong>{formatPrice(deposit, currency)}</strong></div>
                  <div className="grand"><span>Total</span><strong>{formatPrice(total, currency)}</strong></div>
                </div>

                <div className="confirm-actions">
                  <a className="wa-btn" href={whatsappHref} target="_blank" rel="noreferrer">
                    <MessageCircle size={18} /> Continue on WhatsApp
                  </a>
                  <button type="button" className="btn-ghost" onClick={onClose}>Back to the site</button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Running total */}
        {step < 6 && (
          <aside className="tb-side">
            <h3>Your quote</h3>

            <div className="side-tour">
              <span className="side-region">{tour.region}</span>
              <strong>{tour.name}</strong>
              <span className="side-days">
                {tour.days} {tour.days === 1 ? 'day' : 'days'} · {tour.difficulty} · {tour.minAltitude.toLocaleString()}–{tour.maxAltitude.toLocaleString()} m
              </span>
            </div>

            <div className="side-lines">
              {lines.map((l) => (
                <div key={l.key} className="side-line">
                  <span>
                    {l.label}
                    {l.note && <em>{l.note}</em>}
                  </span>
                  <span>{formatPrice(l.amount, currency)}</span>
                </div>
              ))}
            </div>

            <div className="side-total">
              <span>Total</span>
              <span>{formatPrice(total, currency)}</span>
            </div>
            <div className="side-deposit">
              <span>Deposit to confirm (30%)</span>
              <span>{formatPrice(deposit, currency)}</span>
            </div>

            <p className="side-fine">
              Free cancellation up to 14 days before departure. Park permits follow the park's own refund rules.
            </p>
          </aside>
        )}

        {/* Actions */}
        {step < 6 && (
          <div className="tb-actions">
            {step > 1 && (
              <button type="button" className="btn-ghost" onClick={back}>
                <ChevronLeft size={18} /> Back
              </button>
            )}
            {step < 5 && (
              <button type="button" className="btn-gold" onClick={next}>
                Continue <ChevronRight size={18} />
              </button>
            )}
            {step === 5 && (
              <button type="button" className="btn-gold" onClick={submit}>
                {form.payMethod === 'office' ? 'Hold my dates' : `Pay ${formatPrice(deposit, currency)} deposit`}
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default TourBookingPage;
