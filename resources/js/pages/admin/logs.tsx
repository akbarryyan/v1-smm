import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { debounce } from 'lodash';
import {
    AlertCircle,
    AlertTriangle,
    ChevronDown,
    FileText,
    Info,
    Search,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Log {
    id: number;
    user_id: number | null;
    type: string;
    level: string;
    message: string;
    context: string | null;
    meta: Record<string, unknown> | null;
    created_at: string;
    user: User | null;
}

interface PaginatedLogs {
    data: Log[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Stats {
    total: number;
    info: number;
    warning: number;
    error: number;
}

interface PageProps {
    logs: PaginatedLogs;
    stats: Stats;
    filters: {
        type?: string;
        level?: string;
        date?: string;
        search?: string;
    };
    [key: string]: unknown;
}

const levelConfig: Record<
    string,
    { icon: typeof Info; bg: string; text: string; iconColor: string }
> = {
    info: {
        icon: Info,
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        iconColor: 'text-blue-500',
    },
    warning: {
        icon: AlertTriangle,
        bg: 'bg-amber-50',
        text: 'text-amber-600',
        iconColor: 'text-amber-500',
    },
    error: {
        icon: AlertCircle,
        bg: 'bg-rose-50',
        text: 'text-rose-600',
        iconColor: 'text-rose-500',
    },
};

const typeConfig: Record<string, { label: string; bg: string; text: string }> =
    {
        api: { label: 'API', bg: 'bg-indigo-50', text: 'text-indigo-600' },
        error: { label: 'Error', bg: 'bg-rose-50', text: 'text-rose-600' },
        admin: { label: 'Admin', bg: 'bg-slate-100', text: 'text-slate-600' },
        system: {
            label: 'System',
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
        },
    };

export default function AdminLogs() {
    const { logs, stats, filters } = usePage<PageProps>().props;

    const [type, setType] = useState(filters.type || 'all');
    const [level, setLevel] = useState(filters.level || 'all');
    const [date, setDate] = useState(filters.date || '');
    const [search, setSearch] = useState(filters.search || '');

    const debouncedFilter = useMemo(
        () =>
            debounce((qType, qLevel, qDate, qSearch) => {
                router.get(
                    '/admin/logs',
                    {
                        type: qType === 'all' ? '' : qType,
                        level: qLevel === 'all' ? '' : qLevel,
                        date: qDate,
                        search: qSearch,
                    },
                    { preserveState: true, replace: true },
                );
            }, 300),
        [],
    );

    useEffect(() => {
        debouncedFilter(type, level, date, search);
        return () => debouncedFilter.cancel();
    }, [type, level, date, search, debouncedFilter]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return (
        <AdminLayout title="Log Sistem">
            <Head title="Log Sistem - Admin" />

            <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                                <FileText className="h-5 w-5 text-slate-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">
                                    {stats.total.toLocaleString()}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Total Log
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                <Info className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">
                                    {stats.info.toLocaleString()}
                                </p>
                                <p className="text-xs text-slate-500">Info</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                                <AlertTriangle className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">
                                    {stats.warning.toLocaleString()}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Warning
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100">
                                <AlertCircle className="h-5 w-5 text-rose-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">
                                    {stats.error.toLocaleString()}
                                </p>
                                <p className="text-xs text-slate-500">Error</p>
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
                            <option value="api">API Provider</option>
                            <option value="error">Error</option>
                            <option value="admin">Admin Activity</option>
                            <option value="system">System</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>

                    <div className="relative">
                        <select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        >
                            <option value="all">Semua Level</option>
                            <option value="info">Info</option>
                            <option value="warning">Warning</option>
                            <option value="error">Error</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                    />

                    <div className="relative min-w-[200px] flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari log..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        />
                    </div>
                </div>

                {/* Logs List */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    <div className="divide-y divide-slate-100">
                        {logs.data.length === 0 ? (
                            <div className="px-4 py-12 text-center">
                                <FileText className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                                <p className="text-sm text-slate-500">
                                    Tidak ada log ditemukan
                                </p>
                            </div>
                        ) : (
                            logs.data.map((log) => {
                                const levelInfo =
                                    levelConfig[log.level] || levelConfig.info;
                                const typeInfo = typeConfig[log.type] || {
                                    label: log.type,
                                    bg: 'bg-slate-50',
                                    text: 'text-slate-600',
                                };
                                const LevelIcon = levelInfo.icon;

                                return (
                                    <div
                                        key={log.id}
                                        className="flex items-start gap-4 p-4 hover:bg-slate-50/50"
                                    >
                                        <div
                                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${levelInfo.bg}`}
                                        >
                                            <LevelIcon
                                                className={`h-4 w-4 ${levelInfo.iconColor}`}
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="mb-1 flex items-center gap-2">
                                                <span
                                                    className={`inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${typeInfo.bg} ${typeInfo.text}`}
                                                >
                                                    {typeInfo.label}
                                                </span>
                                                <span
                                                    className={`inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${levelInfo.bg} ${levelInfo.text}`}
                                                >
                                                    {log.level}
                                                </span>
                                                {log.context && (
                                                    <span className="text-[10px] text-slate-400">
                                                        {log.context}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="font-mono text-sm text-slate-700">
                                                {log.message}
                                            </p>
                                            {log.user && (
                                                <p className="mt-1 text-[10px] text-slate-400">
                                                    User: {log.user.name} (
                                                    {log.user.email})
                                                </p>
                                            )}
                                        </div>
                                        <span className="shrink-0 text-xs text-slate-400">
                                            {formatDate(log.created_at)}
                                        </span>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Pagination */}
                    {logs.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                            <p className="text-xs text-slate-500">
                                Menampilkan {logs.data.length} dari{' '}
                                {logs.total.toLocaleString()} log
                            </p>
                            <div className="flex items-center gap-1">
                                {logs.links.map((link, index) => (
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
