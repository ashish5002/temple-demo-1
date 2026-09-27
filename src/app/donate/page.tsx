'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { DB } from '@/lib/db';
import { Donation } from '@/lib/types';
import { Heart, ShieldCheck, CheckCircle2, Download, Printer, Scroll, Award } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

const SUGGESTED_AMOUNTS = [501, 1001, 2501, 5001];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(2501);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const [donorName, setDonorName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('Heritage Conservation & Annadanam');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [completedDonation, setCompletedDonation] = useState<Donation | null>(null);

  const finalAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;

  const handleDonateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalAmount || finalAmount <= 0) {
      alert('Please select or enter a valid donation amount.');
      return;
    }
    if (!donorName || !email) {
      alert('Please enter your full name and email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create donation transaction in DB
      const result = await DB.addDonation({
        donorName,
        email,
        phone,
        amount: finalAmount,
        paymentId: 'pay_' + Math.random().toString(36).substring(2, 12).toUpperCase(),
        paymentStatus: 'completed',
        purpose,
      });

      setCompletedDonation(result);
      setIsSubmitting(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B08A45', '#4A2424', '#F4F0E7'],
        });
      } catch (err) {
        // ignore confetti errors
      }

    } catch (err) {
      console.error('Donation submission failed:', err);
      setIsSubmitting(false);
      alert('Transaction failed. Please try again.');
    }
  };

  return (
    <div className="pt-28 pb-24 bg-ivory-100 min-h-screen text-charcoal-900">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 border-b border-stone-300">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs tracking-widest uppercase font-semibold text-gold-600 block">
            SACRED SEVA & DONATIONS
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal-900 font-normal leading-tight">
            Support the Temple Heritage & Pilgrim Seva
          </h1>
          <p className="text-warmgray-500 font-light text-lg leading-relaxed pt-2">
            Your contributions directly fund ongoing granite restoration, free daily pilgrim meals (Annadanam), Vedic oral scholarship, and annual chariot maintenance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Why Support */}
          <div className="lg:col-span-5 space-y-8">
            <SectionHeading
              number="01"
              label="SACRED PURPOSES"
              title="Where your Seva contributes"
            />

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-ivory-50 border border-stone-300">
                <div className="p-2.5 bg-charcoal-900 text-gold-400 shrink-0">
                  <Scroll className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-charcoal-900 font-medium">Stone & Gopuram Conservation</h4>
                  <p className="text-xs text-warmgray-500 font-light leading-relaxed">
                    Protecting 12th-century granite relief carvings using traditional lime mortar techniques.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-ivory-50 border border-stone-300">
                <div className="p-2.5 bg-charcoal-900 text-gold-400 shrink-0">
                  <Heart className="w-5 h-5 fill-current text-gold-400" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-charcoal-900 font-medium">Daily Annadanam Feeding</h4>
                  <p className="text-xs text-warmgray-500 font-light leading-relaxed">
                    Providing thousands of visiting pilgrims with fresh, hygienic satvik banana-leaf meals daily.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-ivory-50 border border-stone-300">
                <div className="p-2.5 bg-charcoal-900 text-gold-400 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-charcoal-900 font-medium">Vedic Oral Heritage School</h4>
                  <p className="text-xs text-warmgray-500 font-light leading-relaxed">
                    Sponsoring young Vedic scholars learning ancient Rig, Yajur, and Sama Veda oral recitations.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-charcoal-900 text-ivory-100 border border-gold-500/30 text-xs space-y-2">
              <div className="flex items-center gap-2 text-gold-400 font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> SECURE DONATION PROCESSING
              </div>
              <p className="text-warmgray-300 font-light">
                All donations are processed securely. Digital tax receipts are issued instantly for your records.
              </p>
            </div>
          </div>

          {/* Right Column: Form or Receipt */}
          <div className="lg:col-span-7">
            {completedDonation ? (
              /* DIGITAL RECEIPT MODAL VIEW */
              <div className="p-8 sm:p-12 bg-ivory-50 border-2 border-gold-500 shadow-2xl space-y-8 relative">
                <div className="text-center space-y-3 border-b border-stone-300 pb-6">
                  <div className="inline-flex p-3 rounded-full bg-gold-500/20 text-gold-600 mb-2">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <span className="text-xs font-mono text-gold-600 font-bold uppercase tracking-widest block">
                    SRI ANANTHA VENKATESHWARA TEMPLE TRUST
                  </span>
                  <h2 className="font-serif text-3xl text-charcoal-900 font-normal">
                    OFFICIAL DONATION RECEIPT
                  </h2>
                  <p className="text-xs text-warmgray-500 font-mono">
                    Receipt Ref: {completedDonation.paymentId} | Date: {new Date(completedDonation.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="space-y-4 text-sm font-sans">
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-warmgray-500">Donor Name:</span>
                    <strong className="text-charcoal-900 font-medium">{completedDonation.donorName}</strong>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-warmgray-500">Email Address:</span>
                    <span className="text-charcoal-900">{completedDonation.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-warmgray-500">Phone Number:</span>
                    <span className="text-charcoal-900">{completedDonation.phone || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-warmgray-500">Purpose of Seva:</span>
                    <span className="text-charcoal-900">{completedDonation.purpose || 'General Temple Trust'}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-2 text-base">
                    <span className="text-warmgray-700 font-semibold">Total Amount Donated:</span>
                    <strong className="text-gold-600 font-serif text-2xl font-bold">₹{completedDonation.amount.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal-900 text-ivory-100 text-xs font-semibold uppercase tracking-widest hover:bg-gold-600 transition-colors"
                  >
                    <Printer className="w-4 h-4" /> PRINT RECEIPT
                  </button>
                  <button
                    onClick={() => setCompletedDonation(null)}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 text-charcoal-900 text-xs font-semibold uppercase tracking-widest hover:bg-ivory-100 transition-colors"
                  >
                    MAKE ANOTHER DONATION
                  </button>
                </div>
              </div>
            ) : (
              /* DONATION FORM */
              <form onSubmit={handleDonateSubmit} className="p-8 sm:p-10 bg-ivory-50 border border-stone-300 shadow-editorial space-y-8">
                <div>
                  <h3 className="font-serif text-2xl text-charcoal-900 font-normal mb-1">
                    Select Contribution Amount
                  </h3>
                  <p className="text-xs text-warmgray-500 font-light">
                    Choose a suggested offering amount or enter a custom sum.
                  </p>
                </div>

                {/* Amount buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {SUGGESTED_AMOUNTS.map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => {
                        setSelectedAmount(amt);
                        setIsCustom(false);
                      }}
                      className={`py-4 px-3 text-center border transition-all ${
                        !isCustom && selectedAmount === amt
                          ? 'bg-charcoal-900 text-gold-400 border-charcoal-900 font-bold shadow-subtle'
                          : 'bg-ivory-100 text-charcoal-900 border-stone-300 hover:border-gold-500'
                      }`}
                    >
                      <span className="block text-xs font-mono text-warmgray-400">SEVA</span>
                      <span className="font-serif text-xl sm:text-2xl font-medium">₹{amt.toLocaleString('en-IN')}</span>
                    </button>
                  ))}
                </div>

                {/* Custom Amount Field */}
                <div>
                  <button
                    type="button"
                    onClick={() => setIsCustom(true)}
                    className={`text-xs font-mono uppercase tracking-wider font-semibold underline underline-offset-4 mb-2 block ${
                      isCustom ? 'text-gold-600' : 'text-warmgray-500 hover:text-charcoal-900'
                    }`}
                  >
                    Or enter custom amount (₹)
                  </button>
                  {isCustom && (
                    <input
                      type="number"
                      placeholder="Enter amount in INR (e.g. 10001)"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full p-3.5 bg-ivory-100 border border-gold-500 text-charcoal-900 font-mono text-lg focus:outline-none focus:ring-1 focus:ring-gold-500"
                      min={100}
                    />
                  )}
                </div>

                {/* Purpose Selector */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-mono font-semibold tracking-wider text-charcoal-900 block">
                    Purpose of Contribution
                  </label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full p-3.5 bg-ivory-100 border border-stone-300 text-charcoal-900 text-sm font-sans focus:outline-none focus:border-gold-500"
                  >
                    <option value="Heritage Conservation & Annadanam">Heritage Conservation & Free Annadanam Meals</option>
                    <option value="Vedic School Preservation">Vedic School & Scholar Support</option>
                    <option value="Festival & Chariot Upkeep">Festivals & Chariot (Rathotsavam) Upkeep</option>
                    <option value="General Temple Trust Fund">General Temple Trust Fund</option>
                  </select>
                </div>

                {/* Donor Details */}
                <div className="space-y-4 pt-2">
                  <h4 className="font-serif text-xl text-charcoal-900 font-normal border-b border-stone-200 pb-2">
                    Donor Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs uppercase font-mono text-warmgray-600 block">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Meenakshi Sundaram"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full p-3 bg-ivory-100 border border-stone-300 text-charcoal-900 text-sm focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs uppercase font-mono text-warmgray-600 block">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. donor@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-ivory-100 border border-stone-300 text-charcoal-900 text-sm focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase font-mono text-warmgray-600 block">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+91 98401 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 bg-ivory-100 border border-stone-300 text-charcoal-900 text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-charcoal-900 text-ivory-100 text-xs font-semibold tracking-widest uppercase hover:bg-gold-600 hover:text-charcoal-900 transition-all shadow-editorial disabled:opacity-50"
                >
                  {isSubmitting ? 'PROCESSING DONATION...' : `CONFIRM SACRED DONATION OF ₹${finalAmount.toLocaleString('en-IN')}`}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
