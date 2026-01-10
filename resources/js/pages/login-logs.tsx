import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { debounce } from 'lodash';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    LogIn,
    Monitor,
    Search,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const breadcrumbs = [
    {
        title: 'Log Login',
        href: '/login-logs',
    },
];

interface LoginLog {
    id: number;
    date: string;
    device: string;
    ip: string;
}

interface PaginatedLogs {
    data: LoginLog[];
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

export default function LoginLogs() {
    const { logs, filters, currentYear } = usePage<{
        logs: PaginatedLogs;
        filters: { year?: string; search?: string };
        currentYear: string;
    }>().props;

    const [year, setYear] = useState(filters.year || currentYear);
    const [search, setSearch] = useState(filters.search || '');

    const debouncedFilter = useMemo(
        () =>
            debounce((qYear, qSearch) => {
                router.get(
                    '/login-logs',
                    { year: qYear, search: qSearch },
                    { preserveState: true, replace: true },
                );
            }, 300),
        [],
    );

    useEffect(() => {
        debouncedFilter(year, search);
        return () => debouncedFilter.cancel();
    }, [year, search, debouncedFilter]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Log Login" />

            <div className="flex h-full flex-1 flex-col gap-4 bg-slate-50/50 p-4 sm:p-5">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="border-l-4 border-[#02c39a] pl-3 text-xl font-extrabold tracking-tight text-slate-900">
                        Log Login
                    </h2>
                    <p className="pl-3 text-xs font-medium text-slate-500">
                        Riwayat aktivitas login ke akun Anda.
                    </p>
                </div>

                {/* Main Content */}
                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                        {/* Header */}
                        <div className="flex items-center gap-2 border-b border-slate-100 bg-white px-5 py-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a]/10 text-[#02c39a]">
                                <LogIn className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-800">
                                Log Login
                            </h3>
                        </div>

                        {/* Filters Section */}
                        <div className="border-b border-slate-100 bg-slate-50/50 p-4">
                            <div className="grid grid-cols-12 gap-3">
                                {/* Year Filter */}
                                <div className="col-span-4 md:col-span-3 lg:col-span-2">
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

                                {/* Search */}
                                <div className="col-span-8 flex gap-2 md:col-span-9 lg:col-span-10">
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
                                        <th className="px-5 py-3 whitespace-nowrap">
                                            Tanggal & Waktu
                                        </th>
                                        <th className="px-5 py-3">Perangkat</th>
                                        <th className="px-5 py-3 whitespace-nowrap">
                                            Alamat IP
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {logs.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-5 py-8 text-center text-xs font-bold text-slate-400"
                                            >
                                                Tidak ada riwayat login
                                                ditemukan.
                                            </td>
                                        </tr>
                                    ) : (
                                        logs.data.map((log) => (
                                            <tr
                                                key={log.id}
                                                className="group transition-colors hover:bg-slate-50/50"
                                            >
                                                <td className="px-5 py-3">
                                                    <span className="text-xs font-bold whitespace-nowrap text-slate-700">
                                                        {log.date}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <div className="flex items-start gap-2">
                                                        <Monitor className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                                                        <span className="text-xs leading-relaxed font-medium break-all text-indigo-600">
                                                            {log.device ||
                                                                'Unknown'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span className="text-xs font-bold whitespace-nowrap text-slate-600">
                                                        {log.ip}
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
                                Menampilkan {logs.from || 0}-{logs.to || 0} dari{' '}
                                {logs.total} Log Login Terakhir
                            </p>

                            <div className="order-1 flex flex-wrap justify-center gap-1 sm:order-2">
                                {logs.links.map((link, i) => {
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
