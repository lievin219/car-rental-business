import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Search, Star, Clock, Users, ChevronRight, Mountain, Sun, TreePine,
  Waves, Building2, Footprints, Coffee, Languages, Award, MapPin,
  Info, Check, Ticket, CalendarDays, ShieldCheck,
} from 'lucide-react';
import { tours, TOUR_CATEGORIES, DIFFICULTIES } from './tours.js';
import { guides } from './guides.js';
import { formatPrice } from './currency.js';
import './TourPage.css';

const ICONS = {
  mountain: Mountain,
  sun: Sun,
  tree: TreePine,
  waves: Waves,
  city: Building2,
  footprints: Footprints,
  coffee: Coffee,
};

// The elevation scale every band is drawn against. Kigali sits at 1,567 m and
// Karisimbi tops out at 4,507 m, so this range covers the whole country.
const FLOOR = 1000;
const CEILING = 4600;

function pct(metres) {
  return ((metres - FLOOR) / (CEILING - FLOOR)) * 100;
}

/** Signature element: where this tour sits on Rwanda's altitude scale. */
function ElevationBand({ min, max, compact = false }) {
  const left = pct(min);
  const width = Math.max(pct(max) - left, 2);

  return (
    <div className={`elev ${compact ? 'elev--compact' : ''}`}>
      <div className="elev-head">
        <span className="elev-label">Altitude</span>
        <span className="elev-value">
          {min.toLocaleString()}–{max.toLocaleString()} m
        </span>
      </div>
      <div className="elev-track" role="img" aria-label={`Between ${min} and ${max} metres above sea level`}>
        <span className="elev-ref" style={{ left: `${pct(1567)}%` }} />
        <span className="elev-fill" style={{ left: `${left}%`, width: `${width}%` }} />
      </div>
      {!compact && (
        <div className="elev-scale">
          <span>1,000 m</span>
          <span className="elev-ref-label">Kigali 1,567 m</span>
          <span>4,600 m</span>
        </div>
      )}
    </div>
  );
}

function TourCover({ tour, tall = false }) {
  const Icon = ICONS[tour.icon] || Mountain;

  if (tour.image) {
    return (
      <div className={`tour-cover ${tall ? 'tour-cover--tall' : ''}`}>
        <img src={tour.image} alt={tour.name} />
        <span className={`diff-chip diff-${tour.difficulty.toLowerCase()}`}>{tour.difficulty}</span>
      </div>
    );
  }

  return (
    <div className={`tour-cover tour-cover--drawn ${tall ? 'tour-cover--tall' : ''}`} data-cat={tour.category}>
      <svg className="ridge" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 96 L58 54 L96 78 L150 34 L206 82 L262 46 L318 74 L360 52 L400 84 L400 120 L0 120 Z" />
        <path className="ridge-back" d="M0 106 L44 78 L110 94 L168 62 L226 96 L286 70 L344 92 L400 66 L400 120 L0 120 Z" />
      </svg>
      <Icon size={tall ? 52 : 40} className="cover-icon" />
      <span className={`diff-chip diff-${tour.difficulty.toLowerCase()}`}>{tour.difficulty}</span>
    </div>
  );
}

function GuideCard({ guide, currency, onPick, selected }) {
  return (
    <div className={`guide-card ${selected ? 'is-selected' : ''}`}>
      <div className="guide-top">
        {guide.image ? (
          <img className="guide-avatar" src={guide.image} alt={guide.name} />
        ) : (
          <div className="guide-avatar guide-avatar--mono">{guide.initials}</div>
        )}
        <div>
          <h4>{guide.name}</h4>
          <p className="guide-meta">
            <MapPin size={13} /> Based in {guide.base} · {guide.years} yrs
          </p>
          <p className="guide-rating">
            <Star size={13} fill="currentColor" /> {guide.rating} · {guide.trips} trips led
          </p>
        </div>
      </div>

      <p className="guide-bio">{guide.bio}</p>

      <div className="guide-langs">
        <Languages size={14} />
        {guide.languages.join(' · ')}
      </div>

      <div className="guide-certs">
        {guide.certifications.map((c) => (
          <span key={c} className="cert-pill">
            <Award size={11} /> {c}
          </span>
        ))}
      </div>

      <div className="guide-foot">
        <span className="guide-rate">{formatPrice(guide.dayRate, currency)} <em>/ day</em></span>
        {onPick && (
          <button type="button" className="guide-pick" onClick={() => onPick(guide)}>
            {selected ? 'Selected' : 'Request this guide'}
          </button>
        )}
      </div>
    </div>
  );
}

function TourPage({ onClose, onBookTour, currency = 'USD', onCurrencyChange }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [length, setLength] = useState('all');
  const [openTour, setOpenTour] = useState(null);
  const [tab, setTab] = useState('itinerary');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return tours.filter((t) => {
      if (category !== 'all' && t.category !== category) return false;
      if (difficulty !== 'all' && t.difficulty !== difficulty) return false;
      if (length === 'day' && t.days !== 1) return false;
      if (length === 'short' && (t.days < 2 || t.days > 3)) return false;
      if (length === 'long' && t.days < 4) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.region.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.highlights.some((h) => h.toLowerCase().includes(q))
      );
    });
  }, [query, category, difficulty, length]);

  const openDetail = (tour) => {
    setOpenTour(tour);
    setTab('itinerary');
  };

  const matchedGuides = openTour
    ? guides.filter((g) => g.specialities.includes(openTour.category))
    : [];

  return (
    <motion.div
      className="tour-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="tour-shell"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 32, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="tour-header">
          <div>
            <span className="eyebrow">Guided by Rwandans, in your language</span>
            <h1>Tours across the thousand hills</h1>
            <p>
              Every trip runs with a licensed driver-guide and one of our vehicles. Pick the
              experience, pick the guide, we handle the permits.
            </p>
          </div>

          <div className="header-actions">
            {onCurrencyChange && (
              <div className="cur-toggle" role="group" aria-label="Currency">
                {['USD', 'RWF'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={currency === c ? 'active' : ''}
                    onClick={() => onCurrencyChange(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
            <motion.button
              className="tour-close"
              onClick={onClose}
              whileHover={{ scale: 1.08, rotate: 90 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Close tours"
            >
              <X size={22} />
            </motion.button>
          </div>
        </header>

        <div className="tour-filters">
          <div className="tour-search">
            <Search size={18} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a park, a city, an animal"
              aria-label="Search tours"
            />
            {query && (
              <button type="button" className="clear-search" onClick={() => setQuery('')} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="chip-row">
            {TOUR_CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`chip ${category === c.id ? 'active' : ''}`}
                onClick={() => setCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="chip-row chip-row--sub">
            <span className="chip-label">Effort</span>
            <button type="button" className={`chip chip--sm ${difficulty === 'all' ? 'active' : ''}`} onClick={() => setDifficulty('all')}>
              Any
            </button>
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                type="button"
                className={`chip chip--sm ${difficulty === d ? 'active' : ''}`}
                onClick={() => setDifficulty(d)}
              >
                {d}
              </button>
            ))}

            <span className="chip-label chip-label--gap">Length</span>
            {[
              { id: 'all', label: 'Any' },
              { id: 'day', label: 'Day trip' },
              { id: 'short', label: '2–3 days' },
              { id: 'long', label: '4 days +' },
            ].map((l) => (
              <button
                key={l.id}
                type="button"
                className={`chip chip--sm ${length === l.id ? 'active' : ''}`}
                onClick={() => setLength(l.id)}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="tour-body">
          <p className="result-count">
            {filtered.length} {filtered.length === 1 ? 'experience' : 'experiences'}
          </p>

          <div className="tour-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((tour, i) => (
                <motion.article
                  key={tour.id}
                  className="tour-card"
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, delay: Math.min(i * 0.04, 0.24) }}
                >
                  <TourCover tour={tour} />

                  <div className="tour-card-body">
                    <span className="tour-region">
                      <MapPin size={12} /> {tour.region}
                    </span>
                    <h3>{tour.name}</h3>
                    <p className="tour-summary">{tour.summary}</p>

                    <ElevationBand min={tour.minAltitude} max={tour.maxAltitude} compact />

                    <div className="tour-meta">
                      <span>
                        <Clock size={14} /> {tour.days} {tour.days === 1 ? 'day' : 'days'}
                      </span>
                      <span>
                        <Users size={14} /> {tour.groupMin}–{tour.groupMax}
                      </span>
                      <span>
                        <Star size={14} fill="currentColor" /> {tour.rating}
                      </span>
                    </div>

                    {tour.permit?.required && (
                      <p className="permit-flag">
                        <Ticket size={13} /> {tour.permit.name} needed — we book it for you
                      </p>
                    )}

                    <div className="tour-card-foot">
                      <div className="tour-price">
                        <span className="from">from</span>
                        <strong>{formatPrice(tour.price, currency, { compact: true })}</strong>
                        <span className="per">per person</span>
                      </div>
                      <div className="tour-card-btns">
                        <button type="button" className="btn-ghost" onClick={() => openDetail(tour)}>
                          Details
                        </button>
                        <button type="button" className="btn-gold" onClick={() => onBookTour(tour)}>
                          Book <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="tour-empty">
              <Mountain size={34} />
              <h3>Nothing matches those filters</h3>
              <p>Clear the effort or length filter, or tell us what you had in mind and we will build it.</p>
              <button
                type="button"
                className="btn-gold"
                onClick={() => {
                  setQuery('');
                  setCategory('all');
                  setDifficulty('all');
                  setLength('all');
                }}
              >
                Reset filters
              </button>
            </div>
          )}

          <section className="guides-section">
            <div className="guides-head">
              <h2>The people who will drive you</h2>
              <p>
                All licensed by the Rwanda Development Board. Request anyone by name at booking and we
                will hold them if they are free.
              </p>
            </div>
            <div className="guides-grid">
              {guides.map((g) => (
                <GuideCard key={g.id} guide={g} currency={currency} />
              ))}
            </div>
          </section>
        </div>
      </motion.div>

      {/* Detail modal */}
      <AnimatePresence>
        {openTour && (
          <motion.div
            className="detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenTour(null)}
          >
            <motion.div
              className="detail-panel"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="detail-close"
                onClick={() => setOpenTour(null)}
                aria-label="Close details"
              >
                <X size={20} />
              </button>

              <TourCover tour={openTour} tall />

              <div className="detail-body">
                <span className="tour-region">
                  <MapPin size={13} /> {openTour.region}
                </span>
                <h2>{openTour.name}</h2>
                <p className="detail-summary">{openTour.summary}</p>

                <div className="detail-facts">
                  <div>
                    <span className="fact-label">Length</span>
                    <span className="fact-value">
                      {openTour.days} {openTour.days === 1 ? 'day' : 'days'}
                      {openTour.nights > 0 && `, ${openTour.nights} night${openTour.nights > 1 ? 's' : ''}`}
                    </span>
                  </div>
                  <div>
                    <span className="fact-label">Effort</span>
                    <span className="fact-value">{openTour.difficulty}</span>
                  </div>
                  <div>
                    <span className="fact-label">Group</span>
                    <span className="fact-value">{openTour.groupMin}–{openTour.groupMax} people</span>
                  </div>
                  <div>
                    <span className="fact-label">Drive from Kigali</span>
                    <span className="fact-value">
                      {openTour.driveHours === 0 ? 'In town' : `${openTour.driveHours} hrs`}
                    </span>
                  </div>
                </div>

                <ElevationBand min={openTour.minAltitude} max={openTour.maxAltitude} />

                <p className="season-note">
                  <CalendarDays size={15} /> Best months: {openTour.bestMonths}
                </p>

                {openTour.permit?.required && (
                  <div className="permit-box">
                    <Ticket size={18} />
                    <div>
                      <strong>{openTour.permit.name}</strong>
                      <p>{openTour.permit.note}</p>
                    </div>
                  </div>
                )}

                <div className="detail-tabs" role="tablist">
                  {[
                    { id: 'itinerary', label: 'Day by day' },
                    { id: 'included', label: "What's included" },
                    { id: 'know', label: 'Know before you go' },
                    { id: 'guides', label: 'Your guides' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={tab === t.id}
                      className={`detail-tab ${tab === t.id ? 'active' : ''}`}
                      onClick={() => setTab(t.id)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="detail-tabpanel">
                  {tab === 'itinerary' && (
                    <ol className="trail">
                      {openTour.itinerary.map((d) => (
                        <li key={d.day} className="trail-step">
                          <div className="trail-marker">
                            <span className="trail-day">Day {d.day}</span>
                            <span className="trail-alt">{d.altitude.toLocaleString()} m</span>
                          </div>
                          <div className="trail-content">
                            <h4>{d.title}</h4>
                            <p>{d.description}</p>
                            <div className="trail-stops">
                              {d.stops.map((s, idx) => (
                                <span key={s + idx} className="stop-pill">{s}</span>
                              ))}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}

                  {tab === 'included' && (
                    <div className="two-col">
                      <div>
                        <h4>Highlights</h4>
                        <ul className="tick-list">
                          {openTour.highlights.map((h) => (
                            <li key={h}><Check size={15} /> {h}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4>Included in the price</h4>
                        <ul className="tick-list">
                          {openTour.includes.map((h) => (
                            <li key={h}><Check size={15} /> {h}</li>
                          ))}
                        </ul>
                        <h4 className="mt">Not included</h4>
                        <ul className="tick-list tick-list--muted">
                          {openTour.excludes.map((h) => (
                            <li key={h}><X size={14} /> {h}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {tab === 'know' && (
                    <ul className="know-list">
                      {openTour.knowBefore.map((k) => (
                        <li key={k}>
                          <Info size={16} />
                          <span>{k}</span>
                        </li>
                      ))}
                      <li>
                        <ShieldCheck size={16} />
                        <span>
                          Free cancellation up to 14 days out. Permits follow the park refund rules,
                          which we will explain in writing before you pay.
                        </span>
                      </li>
                    </ul>
                  )}

                  {tab === 'guides' && (
                    <div className="detail-guides">
                      {(matchedGuides.length ? matchedGuides : guides.slice(0, 3)).map((g) => (
                        <GuideCard key={g.id} guide={g} currency={currency} />
                      ))}
                    </div>
                  )}
                </div>

                <div className="detail-foot">
                  <div className="tour-price tour-price--lg">
                    <span className="from">from</span>
                    <strong>{formatPrice(openTour.price, currency)}</strong>
                    <span className="per">per person, permits extra</span>
                  </div>
                  <button
                    type="button"
                    className="btn-gold btn-gold--lg"
                    onClick={() => {
                      onBookTour(openTour);
                      setOpenTour(null);
                    }}
                  > 
                    Start booking <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default TourPage;
export { ElevationBand, GuideCard, TourCover };
