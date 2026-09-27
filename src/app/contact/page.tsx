'use client';

import React, { useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 bg-ivory-100 min-h-screen text-charcoal-900">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 border-b border-stone-300">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs tracking-widest uppercase font-semibold text-gold-600 block">
            GET IN TOUCH
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal-900 font-normal leading-tight">
            Contact the Temple Office
          </h1>
          <p className="text-warmgray-500 font-light text-lg leading-relaxed pt-2">
            Reach out for pilgrim inquiries, special Pooja bookings, or historical research access.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="font-serif text-3xl text-charcoal-900 font-normal">
              Administrative Office
            </h2>

            <div className="space-y-6 text-sm font-sans font-light text-warmgray-600">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-ivory-50 border border-gold-500/40 text-gold-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-charcoal-900 font-medium block mb-1">Sanctuary Address</strong>
                  <span>Sacred River Bank Road, Heritage Complex, Thanjavur District, Tamil Nadu 613001</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-ivory-50 border border-gold-500/40 text-gold-600 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-charcoal-900 font-medium block mb-1">Telephone Inquiry</strong>
                  <span>+91 4362 274 890</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-ivory-50 border border-gold-500/40 text-gold-600 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-charcoal-900 font-medium block mb-1">Email Trust Desk</strong>
                  <span>heritage.trust@templesanctuary.org</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-ivory-50 border border-gold-500/40 text-gold-600 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-charcoal-900 font-medium block mb-1">Office Hours</strong>
                  <span>Monday — Sunday: 08:00 AM — 06:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-10 bg-ivory-50 border border-gold-500 text-center space-y-4 shadow-subtle">
                <div className="inline-flex p-3 rounded-full bg-gold-500/20 text-gold-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-charcoal-900 font-normal">Message Received</h3>
                <p className="text-sm text-warmgray-500 font-light">
                  Thank you for reaching out. The temple administrative desk will respond to your query shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-charcoal-900 text-ivory-100 text-xs font-mono uppercase tracking-widest"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 sm:p-10 bg-ivory-50 border border-stone-300 shadow-editorial space-y-6">
                <h3 className="font-serif text-2xl text-charcoal-900 font-normal border-b border-stone-200 pb-3">
                  Send a Message to the Trust
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-warmgray-600">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ananya Krishnan"
                      className="w-full p-3 bg-ivory-100 border border-stone-300 text-charcoal-900 text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-warmgray-600">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. ananya@example.com"
                      className="w-full p-3 bg-ivory-100 border border-stone-300 text-charcoal-900 text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-warmgray-600">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 94440 00000"
                    className="w-full p-3 bg-ivory-100 border border-stone-300 text-charcoal-900 text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-warmgray-600">Message / Inquiry *</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist your visit or inquiry?"
                    className="w-full p-3 bg-ivory-100 border border-stone-300 text-charcoal-900 text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-charcoal-900 text-ivory-100 text-xs font-semibold tracking-widest uppercase hover:bg-gold-600 hover:text-charcoal-900 transition-all shadow-editorial flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> SEND INQUIRY MESSAGE
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
