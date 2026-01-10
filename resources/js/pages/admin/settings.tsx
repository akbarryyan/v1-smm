import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { AlertTriangle, Globe, Save, Shield, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function AdminSettings() {
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    return (
        <AdminLayout title="Pengaturan">
            <Head title="Pengaturan - Admin" />

            <div className="max-w-4xl space-y-6">
                {/* Pengaturan Umum */}
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                            <Globe className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-slate-800">
                                Pengaturan Umum
                            </h2>
                            <p className="text-xs text-slate-400">
                                Konfigurasi dasar website
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                    Nama Website
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Medanpedia"
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                    Tagline
                                </label>
                                <input
                                    type="text"
                                    defaultValue="SMM Panel Terpercaya #1 di Indonesia"
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                Email Support
                            </label>
                            <input
                                type="email"
                                defaultValue="support@medanpedia.com"
                                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                Nomor WhatsApp
                            </label>
                            <input
                                type="text"
                                defaultValue="+6281234567890"
                                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                            />
                        </div>
                    </div>
                </div>

                {/* Pengaturan Pesanan */}
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                            <ShoppingCart className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-slate-800">
                                Pengaturan Pesanan
                            </h2>
                            <p className="text-xs text-slate-400">
                                Konfigurasi pemrosesan pesanan
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                    Minimal Deposit
                                </label>
                                <input
                                    type="number"
                                    defaultValue="10000"
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                    Maksimal Deposit
                                </label>
                                <input
                                    type="number"
                                    defaultValue="10000000"
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                    Markup Harga (%)
                                </label>
                                <input
                                    type="number"
                                    defaultValue="20"
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                    Retry Pesanan Gagal
                                </label>
                                <input
                                    type="number"
                                    defaultValue="3"
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Batasan Sistem */}
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                            <Shield className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-slate-800">
                                Batasan Sistem
                            </h2>
                            <p className="text-xs text-slate-400">
                                Rate limiting dan keamanan
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                    Maks. Pesanan Pending
                                </label>
                                <input
                                    type="number"
                                    defaultValue="100"
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                    Rate Limit API (req/menit)
                                </label>
                                <input
                                    type="number"
                                    defaultValue="60"
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                    Timeout Provider (detik)
                                </label>
                                <input
                                    type="number"
                                    defaultValue="30"
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                    Maks. Login Gagal
                                </label>
                                <input
                                    type="number"
                                    defaultValue="5"
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mode Maintenance */}
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100">
                                <AlertTriangle className="h-5 w-5 text-rose-600" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-slate-800">
                                    Mode Maintenance
                                </h2>
                                <p className="text-xs text-slate-400">
                                    Nonaktifkan akses pengguna sementara
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setMaintenanceMode(!maintenanceMode)}
                            className={`relative h-6 w-11 rounded-full transition-colors ${
                                maintenanceMode ? 'bg-rose-500' : 'bg-slate-200'
                            }`}
                        >
                            <span
                                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                                    maintenanceMode ? 'left-[22px]' : 'left-0.5'
                                }`}
                            />
                        </button>
                    </div>

                    {maintenanceMode && (
                        <div className="mt-4 rounded-lg bg-rose-50 p-3 ring-1 ring-rose-100">
                            <p className="text-xs text-rose-700">
                                <strong>Perhatian:</strong> Mode maintenance
                                aktif. Pengguna tidak dapat mengakses website.
                            </p>
                        </div>
                    )}
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button className="flex items-center gap-2 rounded-lg bg-[#02c39a] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#02c39a]/20 transition-all hover:bg-[#00a884]">
                        <Save className="h-4 w-4" />
                        Simpan Pengaturan
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}
