import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import {
    ArrowDownLeft,
    ArrowUpRight,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Download,
    RefreshCw,
    Search,
} from 'lucide-react';

const transactions = [
    {
        id: 'TRX-2026010001',
        user: 'akbarrayyan@gmail.com',
        type: 'topup',
        amount: 500000,
        balance_before: 4740000,
        balance_after: 5240000,
        method: 'QRIS',
        note: 'Top Up via QRIS',
        date: '10 Jan 2026 14:30',
    },
    {
        id: 'TRX-2026010002',
        user: 'johndoe@gmail.com',
        type: 'pesanan',
        amount: -36400,
        balance_before: 1286400,
        balance_after: 1250000,
        method: '-',
        note: 'Order #ORD-2026010001',
        date: '10 Jan 2026 13:45',
    },
    {
        id: 'TRX-2026010003',
        user: 'janesmith@gmail.com',
        type: 'refund',
        amount: 75000,
        balance_before: 815000,
        balance_after: 890000,
        method: '-',
        note: 'Refund Order #ORD-2026010003',
        date: '10 Jan 2026 12:20',
    },
    {
        id: 'TRX-2026010004',
        user: 'testuser@gmail.com',
        type: 'pesanan',
        amount: -8000,
        balance_before: 8000,
        balance_after: 0,
        method: '-',
        note: 'Order #ORD-2026010004',
        date: '09 Jan 2026 18:15',
    },
    {
        id: 'TRX-2026010005',
        user: 'demo@medanpedia.com',
        type: 'topup',
        amount: 50000,
        balance_before: 0,
        balance_after: 50000,
        method: 'Transfer Bank',
        note: 'Top Up via BCA',
        date: '09 Jan 2026 16:00',
    },
];

const typeConfig: Record<string, { label: string; bg: string; text: string }> =
    {
        topup: {
            label: 'Top Up',
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
        },
        pesanan: { label: 'Pesanan', bg: 'bg-blue-50', text: 'text-blue-600' },
        refund: { label: 'Refund', bg: 'bg-amber-50', text: 'text-amber-600' },
    };

export default function AdminTransactions() {
    return (
        <AdminLayout title="Saldo & Transaksi">
            <Head title="Saldo & Transaksi - Admin" />

            <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                                <ArrowUpRight className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                    Total Top Up
                                </p>
                                <p className="text-lg font-black text-slate-800">
                                    Rp 847.5 Jt
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                <ArrowDownLeft className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                    Total Pesanan
                                </p>
                                <p className="text-lg font-black text-slate-800">
                                    Rp 623.2 Jt
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                                <RefreshCw className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                    Total Refund
                                </p>
                                <p className="text-lg font-black text-slate-800">
                                    Rp 12.8 Jt
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <select className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                            <option>Semua Jenis</option>
                            <option>Top Up</option>
                            <option>Pesanan</option>
                            <option>Refund</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>

                    <input
                        type="date"
                        className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                    />

                    <input
                        type="date"
                        className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                    />

                    <div className="relative min-w-[200px] flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari ID transaksi atau pengguna..."
                            className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        />
                    </div>

                    <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 hover:bg-slate-50">
                        <Download className="h-4 w-4" />
                        Export
                    </button>
                </div>

                {/* Transactions Table */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                    <th className="px-4 py-3 text-left">
                                        ID Transaksi
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Pengguna
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Jenis
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Jumlah
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Saldo Sebelum
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Saldo Sesudah
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Metode
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Catatan
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Tanggal
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {transactions.map((trx) => {
                                    const type = typeConfig[trx.type];
                                    return (
                                        <tr
                                            key={trx.id}
                                            className="hover:bg-slate-50/50"
                                        >
                                            <td className="px-4 py-3">
                                                <span className="text-xs font-bold text-slate-700">
                                                    {trx.id}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-indigo-600">
                                                    {trx.user}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold ${type.bg} ${type.text}`}
                                                >
                                                    {type.label}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`text-xs font-bold ${trx.amount >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}
                                                >
                                                    {trx.amount >= 0 ? '+' : ''}
                                                    Rp{' '}
                                                    {Math.abs(
                                                        trx.amount,
                                                    ).toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-slate-500">
                                                    Rp{' '}
                                                    {trx.balance_before.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs font-bold text-slate-700">
                                                    Rp{' '}
                                                    {trx.balance_after.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-slate-600">
                                                    {trx.method}
                                                </span>
                                            </td>
                                            <td className="max-w-[200px] px-4 py-3">
                                                <span className="block truncate text-xs text-slate-500">
                                                    {trx.note}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-slate-500">
                                                    {trx.date}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                        <p className="text-xs text-slate-500">
                            Menampilkan 1-5 dari 156,847 transaksi
                        </p>
                        <div className="flex items-center gap-1">
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a] text-xs font-bold text-white">
                                1
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
                                2
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
