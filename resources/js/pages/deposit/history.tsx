import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    CreditCard,
    Search,
    Wallet,
} from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Riwayat Deposit',
        href: '/deposit/history',
    },
];

const depositHistory: {
    id: string;
    date: string;
    method: string;
    depositAmount: string;
    totalPay: string;
    status: 'pending' | 'success' | 'cancelled';
}[] = [];

export default function DepositHistory() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Riwayat Deposit" />

            <div className="flex h-full flex-1 flex-col gap-4 bg-slate-50/50 p-4 sm:p-5">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="border-l-4 border-[#02c39a] pl-3 text-xl font-extrabold tracking-tight text-slate-900">
                        Riwayat Deposit
                    </h2>
                    <p className="pl-3 text-xs font-medium text-slate-500">
                        Lihat riwayat deposit dan status pembayaran Anda.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Total Deposit Count */}
                    <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500">
                            <CreditCard className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                Total Deposit
                            </p>
                            <p className="text-xl font-black text-slate-800">
                                0
                            </p>
                        </div>
                    </div>

                    {/* Total Deposit Amount */}
                    <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#02c39a]/10 text-[#02c39a]">
                            <Wallet className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                Total Deposit
                            </p>
                            <p className="text-xl font-black text-slate-800">
                                Rp 0
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                        {/* Header */}
                        <div className="flex items-center gap-2 border-b border-slate-100 bg-white px-5 py-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a]/10 text-[#02c39a]">
                                <CreditCard className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-800">
                                Riwayat Deposit
                            </h3>
                        </div>

                        {/* Filters Section */}
                        <div className="space-y-3 border-b border-slate-100 bg-slate-50/50 p-4">
                            {/* Row 1 */}
                            <div className="grid grid-cols-2 gap-3">
                                {/* Year Filter */}
                                <div className="relative">
                                    <select className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                                        <option>2026</option>
                                        <option>2025</option>
                                        <option>2024</option>
                                    </select>
                                    <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400">
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                </div>

                                {/* Status Filter */}
                                <div className="relative">
                                    <select className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                                        <option>Status</option>
                                        <option>Pending</option>
                                        <option>Success</option>
                                        <option>Cancelled</option>
                                    </select>
                                    <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400">
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="grid grid-cols-12 gap-3">
                                {/* Payment Method Filter */}
                                <div className="relative col-span-5">
                                    <select className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                                        <option>
                                            Filter Metode Pembayaran
                                        </option>
                                        <option>QRIS</option>
                                        <option>Transfer Bank</option>
                                        <option>Transfer Pulsa</option>
                                    </select>
                                    <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400">
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                </div>

                                {/* ID Deposit Filter */}
                                <div className="relative col-span-3">
                                    <select className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                                        <option>ID Deposit</option>
                                    </select>
                                    <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400">
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                </div>

                                {/* Search */}
                                <div className="col-span-4 flex gap-2">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            placeholder="Cari..."
                                            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                        />
                                    </div>
                                    <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#02c39a] text-white transition-all hover:bg-[#00a884] active:scale-95">
                                        <Search className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Table Section */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                        <th className="px-5 py-3">ID</th>
                                        <th className="px-5 py-3">Dibuat</th>
                                        <th className="px-5 py-3">
                                            Metode Pembayaran
                                        </th>
                                        <th className="px-5 py-3">
                                            Jumlah Deposit
                                        </th>
                                        <th className="px-5 py-3">
                                            Total Bayar
                                        </th>
                                        <th className="px-5 py-3">Status</th>
                                        <th className="px-5 py-3">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {depositHistory.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-5 py-8 text-center"
                                            >
                                                <p className="text-sm font-medium text-slate-400">
                                                    Belum ada deposit.
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        depositHistory.map((deposit) => (
                                            <tr
                                                key={deposit.id}
                                                className="group transition-colors hover:bg-slate-50/50"
                                            >
                                                <td className="px-5 py-3">
                                                    <span className="text-xs font-black text-slate-600">
                                                        {deposit.id}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span className="text-xs font-bold text-slate-700">
                                                        {deposit.date}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span className="text-xs font-medium text-slate-600">
                                                        {deposit.method}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span className="text-xs font-bold text-[#02c39a]">
                                                        {deposit.depositAmount}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span className="text-xs font-bold text-slate-700">
                                                        {deposit.totalPay}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span
                                                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-[9px] font-black uppercase ${
                                                            deposit.status ===
                                                            'success'
                                                                ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100'
                                                                : deposit.status ===
                                                                    'pending'
                                                                  ? 'bg-amber-50 text-amber-600 ring-1 ring-amber-100'
                                                                  : 'bg-rose-50 text-rose-500 ring-1 ring-rose-100'
                                                        }`}
                                                    >
                                                        {deposit.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <button className="text-xs font-bold text-indigo-600 hover:underline">
                                                        Detail
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer / Pagination */}
                        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/30 px-5 py-4 sm:flex-row">
                            <p className="order-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase sm:order-1">
                                Menampilkan {depositHistory.length} Riwayat
                                Deposit
                            </p>

                            <div className="order-1 flex items-center gap-1.5 sm:order-2">
                                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition-all hover:bg-slate-50 active:scale-95">
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a] text-xs font-bold text-white shadow-sm transition-all">
                                    1
                                </button>
                                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition-all hover:bg-slate-50 active:scale-95">
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
