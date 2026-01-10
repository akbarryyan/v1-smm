import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { debounce } from 'lodash';
import {
    ArrowDownLeft,
    ArrowUpRight,
    ChevronDown,
    Download,
    RefreshCw,
    Search,
    Wallet,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Transaction {
    id: number;
    user_id: number;
    type: string;
    category: string;
    amount: number;
    beginning_balance: number;
    ending_balance: number;
    description: string;
    created_at: string;
    user: User;
}

interface PaginatedTransactions {
    data: Transaction[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Stats {
    totalTopup: number;
    totalOrder: number;
    totalRefund: number;
}

interface PageProps {
    transactions: PaginatedTransactions;
    stats: Stats;
    filters: {
        type?: string;
        date_from?: string;
        date_to?: string;
        search?: string;
    };
    [key: string]: unknown;
}

const typeConfig: Record<string, { label: string; bg: string; text: string }> =
    {
        deposit: {
            label: 'Top Up',
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
        },
        order: { label: 'Pesanan', bg: 'bg-blue-50', text: 'text-blue-600' },
        refund: { label: 'Refund', bg: 'bg-amber-50', text: 'text-amber-600' },
    };

export default function AdminTransactions() {
    const { transactions, stats, filters } = usePage<PageProps>().props;

    const [type, setType] = useState(filters.type || 'all');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');
    const [search, setSearch] = useState(filters.search || '');

    const debouncedFilter = useMemo(
        () =>
            debounce((qType, qDateFrom, qDateTo, qSearch) => {
                router.get(
                    '/admin/transactions',
                    {
                        type: qType === 'all' ? '' : qType,
                        date_from: qDateFrom,
                        date_to: qDateTo,
                        search: qSearch,
                    },
                    { preserveState: true, replace: true },
                );
            }, 300),
        [],
    );

    useEffect(() => {
        debouncedFilter(type, dateFrom, dateTo, search);
        return () => debouncedFilter.cancel();
    }, [type, dateFrom, dateTo, search, debouncedFilter]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatCurrencyShort = (amount: number) => {
        if (amount >= 1000000000) {
            return `Rp ${(amount / 1000000000).toFixed(1)} M`;
        }
        if (amount >= 1000000) {
            return `Rp ${(amount / 1000000).toFixed(1)} Jt`;
        }
        if (amount >= 1000) {
            return `Rp ${(amount / 1000).toFixed(1)} Rb`;
        }
        return formatCurrency(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

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
                                    {formatCurrencyShort(stats.totalTopup)}
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
                                    {formatCurrencyShort(stats.totalOrder)}
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
                                    {formatCurrencyShort(stats.totalRefund)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        >
                            <option value="all">Semua Jenis</option>
                            <option value="deposit">Top Up</option>
                            <option value="order">Pesanan</option>
                            <option value="refund">Refund</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>

                    <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                    />

                    <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                    />

                    <div className="relative min-w-[200px] flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari ID transaksi atau pengguna..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
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
                                    <th className="px-4 py-3 text-left">ID</th>
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
                                        Catatan
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Tanggal
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {transactions.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="px-4 py-12 text-center"
                                        >
                                            <Wallet className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                                            <p className="text-sm text-slate-500">
                                                Tidak ada transaksi ditemukan
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    transactions.data.map((trx) => {
                                        const typeInfo = typeConfig[
                                            trx.category
                                        ] || {
                                            label: trx.category,
                                            bg: 'bg-slate-50',
                                            text: 'text-slate-600',
                                        };
                                        const isCredit = trx.type === 'credit';
                                        return (
                                            <tr
                                                key={trx.id}
                                                className="hover:bg-slate-50/50"
                                            >
                                                <td className="px-4 py-3">
                                                    <span className="font-mono text-xs font-bold text-slate-700">
                                                        #{trx.id}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div>
                                                        <p className="text-xs font-medium text-slate-800">
                                                            {trx.user?.name ||
                                                                'N/A'}
                                                        </p>
                                                        <p className="text-[10px] text-indigo-600">
                                                            {trx.user?.email ||
                                                                ''}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold ${typeInfo.bg} ${typeInfo.text}`}
                                                    >
                                                        {typeInfo.label}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`text-xs font-bold ${isCredit ? 'text-emerald-600' : 'text-rose-600'}`}
                                                    >
                                                        {isCredit ? '+' : '-'}
                                                        {formatCurrency(
                                                            Number(trx.amount),
                                                        )}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="text-xs text-slate-500">
                                                        {formatCurrency(
                                                            Number(
                                                                trx.beginning_balance,
                                                            ),
                                                        )}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="text-xs font-bold text-slate-700">
                                                        {formatCurrency(
                                                            Number(
                                                                trx.ending_balance,
                                                            ),
                                                        )}
                                                    </span>
                                                </td>
                                                <td className="max-w-[200px] px-4 py-3">
                                                    <span className="block truncate text-xs text-slate-500">
                                                        {trx.description || '-'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="text-xs text-slate-500">
                                                        {formatDate(
                                                            trx.created_at,
                                                        )}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {transactions.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                            <p className="text-xs text-slate-500">
                                Menampilkan {transactions.data.length} dari{' '}
                                {transactions.total} transaksi
                            </p>
                            <div className="flex items-center gap-1">
                                {transactions.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-medium transition-colors ${
                                            link.active
                                                ? 'bg-[#02c39a] text-white'
                                                : link.url
                                                  ? 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                                                  : 'cursor-not-allowed text-slate-300'
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
