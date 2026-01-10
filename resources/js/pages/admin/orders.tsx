import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { debounce } from 'lodash';
import {
    ChevronDown,
    Download,
    Eye,
    MoreVertical,
    RefreshCw,
    Search,
    ShoppingCart,
    XCircle,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Service {
    id: number;
    name: string;
}

interface Provider {
    id: number;
    name: string;
}

interface Order {
    id: number;
    user_id: number;
    service_id: number;
    provider_id: number;
    provider_order_id: string | null;
    target: string;
    quantity: number;
    total_cost: number;
    status: string;
    status_label: string;
    status_color: string;
    start_count: number;
    remains: number;
    created_at: string;
    user: User;
    service: Service | null;
    provider: Provider | null;
}

interface PaginatedOrders {
    data: Order[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Stats {
    total: number;
    pending: number;
    processing: number;
    completed: number;
    partial: number;
    cancelled: number;
}

interface PageProps {
    orders: PaginatedOrders;
    stats: Stats;
    providers: Provider[];
    filters: {
        status?: string;
        provider?: string;
        date_from?: string;
        date_to?: string;
        search?: string;
    };
    [key: string]: unknown;
}

const statusColors: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-600',
    processing: 'bg-blue-50 text-blue-600',
    completed: 'bg-emerald-50 text-emerald-600',
    partial: 'bg-orange-50 text-orange-600',
    cancelled: 'bg-slate-100 text-slate-600',
    refunded: 'bg-purple-50 text-purple-600',
    error: 'bg-rose-50 text-rose-600',
};

const statusLabels: Record<string, string> = {
    pending: 'Menunggu',
    processing: 'Diproses',
    completed: 'Selesai',
    partial: 'Sebagian',
    cancelled: 'Dibatalkan',
    refunded: 'Dikembalikan',
    error: 'Error',
};

export default function AdminOrders() {
    const { orders, stats, providers, filters } = usePage<PageProps>().props;

    const [status, setStatus] = useState(filters.status || 'all');
    const [provider, setProvider] = useState(filters.provider || 'all');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');
    const [search, setSearch] = useState(filters.search || '');

    const debouncedFilter = useMemo(
        () =>
            debounce((qStatus, qProvider, qDateFrom, qDateTo, qSearch) => {
                router.get(
                    '/admin/orders',
                    {
                        status: qStatus === 'all' ? '' : qStatus,
                        provider: qProvider === 'all' ? '' : qProvider,
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
        debouncedFilter(status, provider, dateFrom, dateTo, search);
        return () => debouncedFilter.cancel();
    }, [status, provider, dateFrom, dateTo, search, debouncedFilter]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
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
        <AdminLayout title="Pesanan">
            <Head title="Pesanan - Admin" />

            <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <p className="text-2xl font-bold text-slate-800">
                            {stats.total.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500">Total</p>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <p className="text-2xl font-bold text-amber-600">
                            {stats.pending.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500">Menunggu</p>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <p className="text-2xl font-bold text-blue-600">
                            {stats.processing.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500">Diproses</p>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <p className="text-2xl font-bold text-emerald-600">
                            {stats.completed.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500">Selesai</p>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <p className="text-2xl font-bold text-orange-600">
                            {stats.partial.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500">Sebagian</p>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <p className="text-2xl font-bold text-rose-600">
                            {stats.cancelled.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500">Batal/Error</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        >
                            <option value="all">Semua Status</option>
                            <option value="pending">Menunggu</option>
                            <option value="processing">Diproses</option>
                            <option value="completed">Selesai</option>
                            <option value="partial">Sebagian</option>
                            <option value="cancelled">Dibatalkan</option>
                            <option value="error">Error</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>

                    <div className="relative">
                        <select
                            value={provider}
                            onChange={(e) => setProvider(e.target.value)}
                            className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        >
                            <option value="all">Semua Provider</option>
                            {providers.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
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
                            placeholder="Cari ID pesanan, pengguna, layanan..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        />
                    </div>
                </div>

                {/* Bulk Actions */}
                <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300"
                        />
                        <span className="text-sm font-medium text-slate-600">
                            Pilih Semua
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">
                            <XCircle className="h-4 w-4" />
                            Batalkan Pesanan
                        </button>
                        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">
                            <RefreshCw className="h-4 w-4" />
                            Kirim Ulang
                        </button>
                        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">
                            <Download className="h-4 w-4" />
                            Export
                        </button>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                    <th className="w-8 px-4 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-slate-300"
                                        />
                                    </th>
                                    <th className="px-4 py-3 text-left">ID</th>
                                    <th className="px-4 py-3 text-left">
                                        Layanan
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Pengguna
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Jumlah
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Harga
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Provider
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        ID Provider
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Tanggal
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {orders.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={11}
                                            className="px-4 py-12 text-center"
                                        >
                                            <ShoppingCart className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                                            <p className="text-sm text-slate-500">
                                                Tidak ada pesanan ditemukan
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    orders.data.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-slate-50/50"
                                        >
                                            <td className="px-4 py-3">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-slate-300"
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="font-mono text-xs font-bold text-slate-700">
                                                    #{order.id}
                                                </span>
                                            </td>
                                            <td className="max-w-[180px] px-4 py-3">
                                                <span className="line-clamp-2 text-xs text-slate-600">
                                                    {order.service?.name ||
                                                        'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div>
                                                    <p className="text-xs font-medium text-slate-800">
                                                        {order.user?.name ||
                                                            'N/A'}
                                                    </p>
                                                    <p className="text-[10px] text-indigo-600">
                                                        {order.user?.email ||
                                                            ''}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs font-bold text-slate-700">
                                                    {order.quantity.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs font-bold text-[#02c39a]">
                                                    {formatCurrency(
                                                        Number(
                                                            order.total_cost,
                                                        ),
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold capitalize ${statusColors[order.status] || 'bg-slate-100 text-slate-600'}`}
                                                >
                                                    {statusLabels[
                                                        order.status
                                                    ] || order.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-slate-600">
                                                    {order.provider?.name ||
                                                        'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="font-mono text-[10px] text-slate-500">
                                                    {order.provider_order_id ||
                                                        '-'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-slate-500">
                                                    {formatDate(
                                                        order.created_at,
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1">
                                                    <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-[#02c39a] hover:text-white">
                                                        <Eye className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200">
                                                        <MoreVertical className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {orders.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                            <p className="text-xs text-slate-500">
                                Menampilkan {orders.data.length} dari{' '}
                                {orders.total.toLocaleString()} pesanan
                            </p>
                            <div className="flex items-center gap-1">
                                {orders.links.map((link, index) => (
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
