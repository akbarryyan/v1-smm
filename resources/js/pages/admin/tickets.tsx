import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { debounce } from 'lodash';
import {
    CheckCircle,
    Clock,
    Eye,
    MessageSquare,
    Search,
    XCircle,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Ticket {
    id: number;
    user_id: number;
    subject: string;
    status: string;
    status_label: string;
    status_color: string;
    created_at: string;
    updated_at: string;
    user: User;
}

interface PaginatedTickets {
    data: Ticket[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Stats {
    total: number;
    pending: number;
    answered: number;
    closed: number;
}

interface PageProps {
    tickets: PaginatedTickets;
    stats: Stats;
    filters: { status?: string; search?: string };
    [key: string]: unknown;
}

export default function AdminTickets() {
    const { tickets, stats, filters } = usePage<PageProps>().props;

    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');

    const debouncedFilter = useMemo(
        () =>
            debounce((qSearch, qStatus) => {
                router.get(
                    '/admin/tickets',
                    {
                        search: qSearch,
                        status: qStatus === 'all' ? '' : qStatus,
                    },
                    { preserveState: true, replace: true },
                );
            }, 300),
        [],
    );

    useEffect(() => {
        debouncedFilter(search, status);
        return () => debouncedFilter.cancel();
    }, [search, status, debouncedFilter]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadge = (ticket: Ticket) => {
        const colors: Record<string, string> = {
            pending: 'bg-amber-100 text-amber-700',
            answered: 'bg-emerald-100 text-emerald-700',
            closed: 'bg-slate-100 text-slate-600',
        };
        return (
            <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold ${colors[ticket.status] || colors.pending}`}
            >
                {ticket.status_label}
            </span>
        );
    };

    return (
        <AdminLayout title="Manajemen Tiket">
            <Head title="Admin - Tickets" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Manajemen Tiket
                    </h1>
                    <p className="text-sm text-slate-500">
                        Kelola tiket bantuan dari pengguna
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                                <MessageSquare className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">
                                    {stats.total}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Total Tiket
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-amber-100 p-2 text-amber-600">
                                <Clock className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">
                                    {stats.pending}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Menunggu
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                                <CheckCircle className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">
                                    {stats.answered}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Dijawab
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
                                <XCircle className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">
                                    {stats.closed}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Ditutup
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative flex-1 sm:max-w-xs">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari tiket..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 py-2.5 pr-4 pl-10 text-sm focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/20 focus:outline-none"
                        />
                    </div>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/20 focus:outline-none"
                    >
                        <option value="all">Semua Status</option>
                        <option value="pending">Pending</option>
                        <option value="answered">Answered</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>

                {/* Tickets Table */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50">
                                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">
                                        ID
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">
                                        Pengguna
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">
                                        Subjek
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">
                                        Dibuat
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {tickets.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-4 py-12 text-center"
                                        >
                                            <MessageSquare className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                                            <p className="text-sm text-slate-500">
                                                Tidak ada tiket ditemukan
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    tickets.data.map((ticket) => (
                                        <tr
                                            key={ticket.id}
                                            className="transition-colors hover:bg-slate-50"
                                        >
                                            <td className="px-4 py-3">
                                                <span className="font-mono text-sm font-bold text-slate-600">
                                                    #{ticket.id}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div>
                                                    <p className="text-sm font-medium text-slate-800">
                                                        {ticket.user?.name ||
                                                            'N/A'}
                                                    </p>
                                                    <p className="text-xs text-slate-400">
                                                        {ticket.user?.email ||
                                                            ''}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="max-w-xs px-4 py-3">
                                                <p className="truncate text-sm text-slate-700">
                                                    {ticket.subject}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3">
                                                {getStatusBadge(ticket)}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-slate-500">
                                                    {formatDate(
                                                        ticket.created_at,
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Link
                                                    href={`/admin/tickets/${ticket.id}`}
                                                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#02c39a]/10 px-3 py-1.5 text-xs font-bold text-[#02c39a] transition-colors hover:bg-[#02c39a] hover:text-white"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                    Lihat
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {tickets.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                            <p className="text-xs text-slate-500">
                                Menampilkan {tickets.data.length} dari{' '}
                                {tickets.total} tiket
                            </p>
                            <div className="flex items-center gap-1">
                                {tickets.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-medium transition-colors ${
                                            link.active
                                                ? 'bg-[#02c39a] text-white'
                                                : link.url
                                                  ? 'text-slate-600 hover:bg-slate-100'
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
