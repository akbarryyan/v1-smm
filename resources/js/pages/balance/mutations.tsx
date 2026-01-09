import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import {
    ArrowDownCircle,
    ArrowUpCircle,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Search,
    Wallet,
} from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Mutasi Saldo',
        href: '/balance/mutations',
    },
];

const mutations = [
    {
        id: '8361719',
        date: '07 Januari 2026 05:48:40',
        category: 'Pesanan',
        description: 'Melakukan pemesanan #24248070 melalui website.',
        amount: -364,
        type: 'debit',
        initialBalance: 528,
        finalBalance: 164,
    },
    {
        id: '8361718',
        date: '07 Januari 2026 05:45:12',
        category: 'Deposit',
        description: 'Deposit via QRIS - Pembayaran berhasil',
        amount: 500,
        type: 'credit',
        initialBalance: 28,
        finalBalance: 528,
    },
    {
        id: '8361715',
        date: '06 Januari 2026 14:22:08',
        category: 'Pesanan',
        description: 'Melakukan pemesanan #24248065 melalui API.',
        amount: -150,
        type: 'debit',
        initialBalance: 178,
        finalBalance: 28,
    },
    {
        id: '8361712',
        date: '06 Januari 2026 12:15:33',
        category: 'Refund',
        description: 'Refund pesanan #24248060 - Layanan gagal',
        amount: 78,
        type: 'credit',
        initialBalance: 100,
        finalBalance: 178,
    },
    {
        id: '8361710',
        date: '05 Januari 2026 18:30:45',
        category: 'Pesanan',
        description: 'Melakukan pemesanan #24248055 melalui website.',
        amount: -200,
        type: 'debit',
        initialBalance: 300,
        finalBalance: 100,
    },
];

export default function BalanceMutations() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mutasi Saldo" />

            <div className="flex h-full flex-1 flex-col gap-4 bg-slate-50/50 p-4 sm:p-5">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="border-l-4 border-[#02c39a] pl-3 text-xl font-extrabold tracking-tight text-slate-900">
                        Mutasi Saldo
                    </h2>
                    <p className="pl-3 text-xs font-medium text-slate-500">
                        Riwayat perubahan saldo akun Anda secara lengkap.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Credit Card */}
                    <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                            <ArrowUpCircle className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                Kredit (CR) Tahun 2026
                            </p>
                            <p className="text-xl font-black text-slate-800">
                                Rp 578
                            </p>
                        </div>
                    </div>

                    {/* Debit Card */}
                    <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                            <ArrowDownCircle className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                Debet (DB) Tahun 2026
                            </p>
                            <p className="text-xl font-black text-slate-800">
                                Rp 714
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
                                <Wallet className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-800">
                                Mutasi Saldo
                            </h3>
                        </div>

                        {/* Filters Section */}
                        <div className="border-b border-slate-100 bg-slate-50/50 p-4">
                            <div className="grid grid-cols-2 gap-3 md:grid-cols-12">
                                {/* Year Filter */}
                                <div className="md:col-span-2">
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
                                </div>

                                {/* Category Filter */}
                                <div className="md:col-span-2">
                                    <div className="relative">
                                        <select className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                                            <option>Kategori</option>
                                            <option>Pesanan</option>
                                            <option>Deposit</option>
                                            <option>Refund</option>
                                        </select>
                                        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400">
                                            <ChevronDown className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Mutation Type Filter */}
                                <div className="md:col-span-2">
                                    <div className="relative">
                                        <select className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                                            <option>Mutasi</option>
                                            <option>Kredit (CR)</option>
                                            <option>Debet (DB)</option>
                                        </select>
                                        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400">
                                            <ChevronDown className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Search */}
                                <div className="col-span-2 flex gap-2 md:col-span-6">
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
                                        <th className="px-5 py-3">Tanggal</th>
                                        <th className="px-5 py-3">Kategori</th>
                                        <th className="px-5 py-3">
                                            Keterangan
                                        </th>
                                        <th className="px-5 py-3">Mutasi</th>
                                        <th className="px-5 py-3">
                                            Saldo Awal
                                        </th>
                                        <th className="px-5 py-3">
                                            Saldo Akhir
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {mutations.map((mutation) => (
                                        <tr
                                            key={mutation.id}
                                            className="group transition-colors hover:bg-slate-50/50"
                                        >
                                            <td className="px-5 py-3">
                                                <span className="text-xs font-black text-slate-600">
                                                    {mutation.id}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className="text-xs font-bold whitespace-nowrap text-slate-700">
                                                    {mutation.date}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span
                                                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-[9px] font-black uppercase ${
                                                        mutation.category ===
                                                        'Pesanan'
                                                            ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100'
                                                            : mutation.category ===
                                                                'Deposit'
                                                              ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100'
                                                              : 'bg-amber-50 text-amber-600 ring-1 ring-amber-100'
                                                    }`}
                                                >
                                                    {mutation.category}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className="text-xs font-medium text-slate-500">
                                                    {mutation.description}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-1.5">
                                                    <span
                                                        className={`text-xs font-black ${mutation.type === 'credit' ? 'text-emerald-600' : 'text-rose-500'}`}
                                                    >
                                                        {mutation.type ===
                                                        'credit'
                                                            ? '+'
                                                            : '-'}{' '}
                                                        Rp{' '}
                                                        {Math.abs(
                                                            mutation.amount,
                                                        )}
                                                    </span>
                                                    <span
                                                        className={`inline-flex items-center rounded px-1.5 py-0.5 text-[8px] font-black ${
                                                            mutation.type ===
                                                            'credit'
                                                                ? 'bg-emerald-100 text-emerald-600'
                                                                : 'bg-rose-100 text-rose-500'
                                                        }`}
                                                    >
                                                        {mutation.type ===
                                                        'credit'
                                                            ? 'CR'
                                                            : 'DB'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className="text-xs font-bold text-slate-600">
                                                    Rp {mutation.initialBalance}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className="text-xs font-bold text-slate-600">
                                                    Rp {mutation.finalBalance}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer / Pagination */}
                        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/30 px-5 py-4 sm:flex-row">
                            <p className="order-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase sm:order-1">
                                Menampilkan {mutations.length} Mutasi Terakhir
                            </p>

                            <div className="order-1 flex items-center gap-1.5 sm:order-2">
                                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition-all hover:bg-slate-50 active:scale-95">
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a] text-xs font-bold text-white shadow-sm transition-all">
                                    1
                                </button>
                                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-600 transition-all hover:border-[#02c39a] hover:text-[#02c39a]">
                                    2
                                </button>
                                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-600 transition-all hover:border-[#02c39a] hover:text-[#02c39a]">
                                    3
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
