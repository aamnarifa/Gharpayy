import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { EmptyState } from "../components/common/EmptyState";
import { useToast } from "../context/ToastContext";
import { getBookings } from "../services/bookingService";
import { Wallet, Plus } from "lucide-react";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await getBookings();
      setBookings(res.bookings || res.data || []);
    } catch (err) {
      showToast("Failed to load bookings from backend", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Layout>
      <div className="space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Wallet className="text-purple-400" size={30} />
              PG Room Bookings
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Confirmed PG room reservations, advance deposits, and tenant check-in statuses
            </p>
          </div>
          <button
            onClick={() => showToast("Booking form ready", "info")}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold flex items-center gap-2 shadow-md transition-all"
          >
            <Plus size={18} />
            <span>New Booking</span>
          </button>
        </div>

        <div className="glass-card p-8">
          <h3 className="font-bold text-lg text-white mb-6">All PG Bookings ({bookings.length})</h3>

          {loading ? (
            <LoadingSpinner label="Fetching bookings..." />
          ) : bookings.length === 0 ? (
            <EmptyState
              title="No PG Bookings Found"
              description="Move a lead stage to 'Booked' in Pipeline or add a new booking."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs uppercase bg-slate-950/70 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-4 px-6">Tenant Name</th>
                    <th className="py-4 px-6">PG Property / Room</th>
                    <th className="py-4 px-6">Monthly Rent</th>
                    <th className="py-4 px-6">Deposit</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Move-In Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-slate-900/80 transition-colors">
                      <td className="py-4 px-6 font-semibold text-white">{booking.tenantName || booking.leadName || "Tenant"}</td>
                      <td className="py-4 px-6 text-slate-300">{booking.propertyName || "Green Valley PG - Room 204"}</td>
                      <td className="py-4 px-6 font-semibold text-emerald-400">₹{booking.monthlyRent?.toLocaleString() || "12,000"}</td>
                      <td className="py-4 px-6 text-slate-300">₹{booking.advanceDeposit?.toLocaleString() || "5,000"}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-200 border border-emerald-500/20">
                          {booking.status || "Confirmed"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-400 font-mono text-xs">
                        {booking.moveInDate ? new Date(booking.moveInDate).toLocaleDateString() : "Immediate"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}