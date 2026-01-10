import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { debounce } from 'lodash';
import {
    ArrowDownCircle,
    ArrowUpCircle,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Search,
    Wallet,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const breadcrumbs = [
    {
        title: 'Mutasi Saldo',
        href: '/balance/mutations',
    },
];

interface Mutation {
    id: number;
    date: string;
    category: string;
    description: string;
    amount: number; // raw value
    type: 'credit' | 'debit';
    initialBalance: string; // formatted
    finalBalance: string; // formatted
}

interface PaginatedMutations {
    data: Mutation[];
    current_page: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    total: number;
    from: number;
    to: number;
}

export default function BalanceMutations() {
    const { mutations, creditTotal, debitTotal, filters, currentYear } =
        usePage<{
            mutations: PaginatedMutations;
            creditTotal: string;
            debitTotal: string;
            filters: {
                year?: string;
                category?: string;
                type?: string;
                search?: string;
            };
            currentYear: string;
        }>().props;

    const [year, setYear] = useState(filters.year || currentYear);
    const [category, setCategory] = useState(filters.category || '');
    const [type, setType] = useState(filters.type || '');
    const [search, setSearch] = useState(filters.search || '');

    const debouncedFilter = useMemo(
        () =>
            debounce((qYear, qCategory, qType, qSearch) => {
                router.get(
                    '/balance/mutations',
                    {
                        year: qYear,
                        category: qCategory,
                        type: qType,
                        search: qSearch,
                    },
                    { preserveState: true, replace: true },
                );
            }, 300),
        [],
    );

    useEffect(() => {
        // Only trigger if changes are made to avoid initial double load loop if not handled carefully,
        // but debounce handles it.
        debouncedFilter(year, category, type, search);
        return () => debouncedFilter.cancel();
    }, [year, category, type, search, debouncedFilter]);

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
                                Kredit (CR) Tahun {currentYear}
                            </p>
                            <p className="text-xl font-black text-slate-800">
                                Rp {creditTotal}
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
                                Debet (DB) Tahun {currentYear}
                            </p>
                            <p className="text-xl font-black text-slate-800">
                                Rp {debitTotal}
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
                                        <select
                                            value={year}
                                            onChange={(e) =>
                                                setYear(e.target.value)
                                            }
                                            className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                        >
                                            <option value="2026">2026</option>
                                            <option value="2025">2025</option>
                                            <option value="2024">2024</option>
                                        </select>
                                        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400">
                                            <ChevronDown className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Category Filter */}
                                <div className="md:col-span-2">
                                    <div className="relative">
                                        <select
                                            value={category}
                                            onChange={(e) =>
                                                setCategory(e.target.value)
                                            }
                                            className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                        >
                                            <option value="">Kategori</option>
                                            <option value="pesanan">
                                                Pesanan
                                            </option>
                                            <option value="deposit">
                                                Deposit
                                            </option>
                                            <option value="refund">
                                                Refund
                                            </option>
                                        </select>
                                        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400">
                                            <ChevronDown className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Mutation Type Filter */}
                                <div className="md:col-span-2">
                                    <div className="relative">
                                        <select
                                            value={type}
                                            onChange={(e) =>
                                                setType(e.target.value)
                                            }
                                            className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                        >
                                            <option value="">Mutasi</option>
                                            <option value="Kredit (CR)">
                                                Kredit (CR)
                                            </option>
                                            <option value="Debet (DB)">
                                                Debet (DB)
                                            </option>
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
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
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
                                    {mutations.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-5 py-8 text-center text-xs font-bold text-slate-400"
                                            >
                                                Tidak ada data mutasi ditemukan.
                                            </td>
                                        </tr>
                                    ) : (
                                        mutations.data.map((mutation) => (
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
                                                            ).toLocaleString(
                                                                'id-ID',
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
                                                        Rp{' '}
                                                        {
                                                            mutation.initialBalance
                                                        }
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span className="text-xs font-bold text-slate-600">
                                                        Rp{' '}
                                                        {mutation.finalBalance}
                                                    </span>
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
                                Menampilkan {mutations.from || 0}-
                                {mutations.to || 0} dari {mutations.total}{' '}
                                Mutasi
                            </p>

                            <div className="order-1 flex flex-wrap justify-center gap-1 sm:order-2">
                                {mutations.links.map((link, i) => {
                                    // Clean up label
                                    const label = link.label
                                        .replace('&laquo;', '')
                                        .replace('&raquo;', '')
                                        .trim();
                                    const isPrevious = label === 'Previous';
                                    const isNext = label === 'Next';

                                    let content;
                                    if (isPrevious) {
                                        content = (
                                            <ChevronLeft className="h-4 w-4" />
                                        );
                                    } else if (isNext) {
                                        content = (
                                            <ChevronRight className="h-4 w-4" />
                                        );
                                    } else {
                                        content = (
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        );
                                    }

                                    return link.url ? (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            className={`flex h-8 min-w-[32px] items-center justify-center rounded-lg px-2 text-xs font-bold transition-all ${
                                                link.active
                                                    ? 'bg-[#02c39a] text-white shadow-sm'
                                                    : 'border border-slate-200 bg-white text-slate-600 hover:border-[#02c39a] hover:text-[#02c39a]'
                                            }`}
                                            preserveScroll
                                            preserveState
                                        >
                                            {content}
                                        </Link>
                                    ) : (
                                        <span
                                            key={i}
                                            className={`flex h-8 min-w-[32px] items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-xs font-bold text-slate-300 ${isPrevious || isNext ? 'hidden' : ''}`}
                                        >
                                            {content}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
