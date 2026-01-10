import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { debounce } from 'lodash';
import {
    AlertCircle,
    Calendar,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Clock,
    Filter,
    Info,
    RefreshCw,
    Search,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const breadcrumbs = [
    {
        title: 'Pembaruan Layanan',
        href: '/service-updates',
    },
];

interface ServiceUpdate {
    id: number;
    service_id: number | null;
    service_name: string;
    provider_service_id: string;
    type: string;
    description: string;
    created_at: string;
}

interface PaginatedUpdates {
    data: ServiceUpdate[];
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

export default function ServiceUpdates() {
    const { updates, filters } = usePage<{
        updates: PaginatedUpdates;
        filters: { search?: string; type?: string; date?: string };
    }>().props;

    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || '');
    const [date, setDate] = useState(filters.date || '');

    // Debounce search/filter
    const debouncedFilter = useMemo(
        () =>
            debounce((qSearch: string, qType: string, qDate: string) => {
                router.get(
                    '/service-updates',
                    { search: qSearch, type: qType, date: qDate },
                    { preserveState: true, replace: true },
                );
            }, 300),
        [],
    );

    useEffect(() => {
        if (
            search !== (filters.search || '') ||
            type !== (filters.type || '') ||
            date !== (filters.date || '')
        ) {
            debouncedFilter(search, type, date);
        }
        return () => debouncedFilter.cancel();
    }, [search, type, date, debouncedFilter, filters]);

    const formatDate = (dateString: string) => {
        const dateObj = new Date(dateString);
        return {
            date: dateObj.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }),
            time: dateObj.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }),
        };
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pembaruan Layanan" />

            <div className="flex h-full flex-1 flex-col gap-4 bg-slate-50/50 p-4 sm:p-5">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="border-l-4 border-[#02c39a] pl-3 text-xl font-extrabold tracking-tight text-slate-900">
                        Pembaruan Layanan
                    </h2>
                    <p className="pl-3 text-xs font-medium text-slate-500">
                        Pantau perubahan status, harga, dan fitur layanan secara
                        real-time.
                    </p>
                </div>

                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                        {/* Summary Header */}
                        <div className="flex items-center gap-2 border-b border-slate-100 bg-white px-5 py-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a]/10 text-[#02c39a]">
                                <RefreshCw className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-800">
                                Pembaruan Layanan
                            </h3>
                        </div>

                        {/* Filters Section */}
                        <div className="space-y-3 border-b border-slate-100 bg-slate-50/50 p-4">
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                {/* Date Filter */}
                                <div className="space-y-1">
                                    <label className="pl-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                        Filter Tanggal
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="group relative flex-1">
                                            <div className="absolute top-1/2 left-3 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg bg-[#02c39a] text-white">
                                                <Calendar className="h-3.5 w-3.5" />
                                            </div>
                                            <input
                                                type="date"
                                                value={date}
                                                onChange={(e) =>
                                                    setDate(e.target.value)
                                                }
                                                className="h-10 w-full rounded-xl border border-slate-200 bg-white pr-4 pl-12 text-xs font-bold text-slate-700 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                            />
                                        </div>
                                        <button
                                            onClick={() => setDate('')}
                                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#02c39a] text-white transition-all hover:bg-[#00a884] active:scale-95"
                                            title="Reset Date"
                                        >
                                            <Filter className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Type Filter */}
                                <div className="space-y-1">
                                    <label className="pl-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                        Jenis Pembaruan
                                    </label>
                                    <div className="group relative">
                                        <select
                                            value={type}
                                            onChange={(e) =>
                                                setType(e.target.value)
                                            }
                                            className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                        >
                                            <option value="">
                                                SEMUA JENIS
                                            </option>
                                            <option value="Nonaktif">
                                                NONAKTIF
                                            </option>
                                            <option value="Perubahan Data">
                                                PERUBAHAN DATA
                                            </option>
                                            <option value="Harga Naik">
                                                HARGA NAIK
                                            </option>
                                            <option value="Harga Turun">
                                                HARGA TURUN
                                            </option>
                                            <option value="Layanan Baru">
                                                LAYANAN BARU
                                            </option>
                                        </select>
                                        <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400">
                                            <ChevronDown className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Service Filter */}
                            <div className="space-y-1">
                                <label className="pl-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                    Cari Layanan Spesifik
                                </label>
                                <div className="flex gap-2">
                                    <div className="group relative flex-1">
                                        <div className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 group-focus-within:text-[#02c39a]">
                                            <Search className="h-4 w-4" />
                                        </div>
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            placeholder="Ketik nama layanan atau ID..."
                                            className="h-10 w-full rounded-xl border border-slate-200 bg-white pr-4 pl-10 text-xs font-bold text-slate-700 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
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
                                        <th className="px-5 py-3">Tanggal</th>
                                        <th className="px-5 py-3">ID</th>
                                        <th className="px-5 py-3">Layanan</th>
                                        <th className="px-5 py-3">Pembaruan</th>
                                        <th className="px-5 py-3">
                                            Keterangan
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {updates.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-5 py-8 text-center text-xs font-bold text-slate-400"
                                            >
                                                Tidak ada pembaruan layanan
                                                ditemukan.
                                            </td>
                                        </tr>
                                    ) : (
                                        updates.data.map((update) => {
                                            const { date, time } = formatDate(
                                                update.created_at,
                                            );
                                            return (
                                                <tr
                                                    key={update.id}
                                                    className="group transition-colors hover:bg-slate-50/50"
                                                >
                                                    <td className="px-5 py-3">
                                                        <div className="flex min-w-[100px] flex-col">
                                                            <span className="text-xs font-bold text-slate-700">
                                                                {date}
                                                            </span>
                                                            <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
                                                                <Clock className="h-2.5 w-2.5" />
                                                                {time}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-3">
                                                        <span className="text-xs font-black text-[#02c39a]">
                                                            #
                                                            {update.service_id ||
                                                                update.provider_service_id ||
                                                                '-'}
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-3">
                                                        <div className="max-w-[250px]">
                                                            <span className="block cursor-pointer text-xs leading-tight font-bold text-indigo-600 hover:underline">
                                                                {
                                                                    update.service_name
                                                                }
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-3">
                                                        <span
                                                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-black tracking-wider uppercase ${
                                                                update.type ===
                                                                'Nonaktif'
                                                                    ? 'bg-rose-50 text-rose-500 ring-1 ring-rose-100'
                                                                    : update.type ===
                                                                        'Layanan Baru'
                                                                      ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100'
                                                                      : 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100'
                                                            }`}
                                                        >
                                                            {update.type ===
                                                            'Nonaktif' ? (
                                                                <AlertCircle className="h-2.5 w-2.5" />
                                                            ) : (
                                                                <Info className="h-2.5 w-2.5" />
                                                            )}
                                                            {update.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-3">
                                                        <p className="min-w-[200px] text-[10px] leading-relaxed font-medium text-slate-500">
                                                            {update.description}
                                                        </p>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer / Pagination */}
                        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/30 px-5 py-4 sm:flex-row">
                            <p className="order-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase sm:order-1">
                                Menampilkan {updates.from || 0}-
                                {updates.to || 0} dari {updates.total} Pembaruan
                            </p>

                            <div className="order-1 flex flex-wrap justify-center gap-1 sm:order-2">
                                {updates.links.map((link, i) => {
                                    // Clean up label for checking
                                    const label = link.label
                                        .replace('&laquo;', '')
                                        .replace('&raquo;', '')
                                        .trim();
                                    const isPrevious = label === 'Previous';
                                    const isNext = label === 'Next';

                                    // Determine content
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
                                            className={`flex h-8 min-w-[32px] items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-xs font-bold text-slate-300 ${isPrevious || isNext ? 'hidden' : ''}`} // Hide disabled prev/next if usually hidden in UI libraries, or keep them. Laravel includes them as null url.
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
