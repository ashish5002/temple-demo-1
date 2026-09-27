'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { DB } from '@/lib/db';
import { Donation } from '@/lib/types';
import { Heart, Search, ShieldCheck } from 'lucide-react';

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    DB.getDonations().then(setDonations);
  }, []);

  const totalSum = donations.reduce((acc, d) => acc + d.amount, 0);

  const filtered = donations.filter(
    (d) =>
      d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.paymentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Donations & Seva Record Register">
      <div className="space-y-6">
        
        {/* Total Metric Header */}
        <div className="p-6 bg-charcoal-900 text-ivory-100 border border-gold-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-gold-400 font-bold uppercase block">
              TOTAL SACRED DONATIONS COLLECTED
            </span>
            <div className="font-serif text-3xl sm:text-4xl text-ivory-100 font-normal">
              ₹{totalSum.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-warmgray-300 bg-charcoal-800 px-4 py-2 border border-gold-500/20">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>DONOR DATA SECURED (RLS PROTECTED)</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-warmgray-400" />
          <input
            type="text"
            placeholder="Search by donor name, email or payment ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-ivory-50 border border-stone-300 text-sm focus:border-gold-500"
          />
        </div>

        {/* Table */}
        <div className="bg-ivory-50 border border-stone-300 overflow-x-auto shadow-subtle">
          <table className="w-full text-left border-collapse text-xs font-sans">
            <thead>
              <tr className="bg-charcoal-900 text-ivory-100 font-mono text-[11px] uppercase tracking-wider border-b border-stone-300">
                <th className="p-3">Donor Name</th>
                <th className="p-3">Email & Phone</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Seva Purpose</th>
                <th className="p-3">Payment Ref</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-charcoal-900">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-stone-100/60">
                  <td className="p-3 font-serif text-base font-medium">{d.donorName}</td>
                  <td className="p-3 font-mono text-warmgray-600">
                    <div>{d.email}</div>
                    <div className="text-[10px] text-warmgray-400">{d.phone || 'N/A'}</div>
                  </td>
                  <td className="p-3 font-mono text-gold-600 font-bold text-sm">
                    ₹{d.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3 font-sans text-charcoal-800">{d.purpose || 'General Trust'}</td>
                  <td className="p-3 font-mono text-warmgray-500">{d.paymentId}</td>
                  <td className="p-3 font-mono text-warmgray-500">
                    {new Date(d.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
}
