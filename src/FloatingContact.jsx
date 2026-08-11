import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Mail, X, Plus } from 'lucide-react';
import './FloatingContact.css';

const PHONE = '+250788470902';
const WHATSAPP = '250788470902';
const EMAIL = 'info@eurasia-rwanda.com';

/**
 * Sticky contact launcher. WhatsApp sits first on purpose — in Rwanda it is
 * where enquiries actually arrive, and a booking form is not a substitute.
 */
function FloatingContact({ message = 'Hello EurAsia Rwanda, I would like to ask about a car and a tour.' }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fc-root"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <AnimatePresence>
            {open && (
              <motion.div
                className="fc-menu"
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
              >
                <a className="fc-item fc-item--wa" href={waHref} target="_blank" rel="noreferrer">
                  <MessageCircle size={18} />
                  <span>
                    <strong>WhatsApp</strong>
                    <em>Usually replies in minutes</em>
                  </span>
                </a>
                <a className="fc-item" href={`tel:${PHONE}`}>
                  <Phone size={18} />
                  <span>
                    <strong>Call the office</strong>
                    <em>{PHONE}</em>
                  </span>
                </a>
                <a className="fc-item" href={`mailto:${EMAIL}`}>
                  <Mail size={18} />
                  <span>
                    <strong>Email</strong>
                    <em>{EMAIL}</em>
                  </span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            className={`fc-launch ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close contact options' : 'Contact us'}
          >
            {open ? <X size={22} /> : <Plus size={22} />}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FloatingContact;
