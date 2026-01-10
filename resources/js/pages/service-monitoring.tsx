import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { debounce } from 'lodash';
import {
    Activity,
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Filter,
    Play,
    Timer,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const breadcrumbs = [
    {
        title: 'Monitoring Layanan',
        href: '/service-monitoring',
    },
];

interface MonitoringItem {
    id: number;
    serviceId: string;
    name: string;
    orderCount: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    processTime: string;
}

interface PaginatedMonitoring {
    data: MonitoringItem[];
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

export default function ServiceMonitoring() {
    const { monitoringData, categories, serviceNames, filters } = usePage<{
        monitoringData: PaginatedMonitoring;
        categories: string[];
        serviceNames: string[];
        filters: { category?: string; service?: string };
    }>().props;

    const [category, setCategory] = useState(filters.category || '');
    const [service, setService] = useState(filters.service || '');

    // Debounce filter
    const debouncedFilter = useMemo(
        () =>
            debounce((qCategory: string, qService: string) => {
                router.get(
                    '/service-monitoring',
                    { category: qCategory, service: qService },
                    { preserveState: true, replace: true },
                );
            }, 300),
        [],
    );

    useEffect(() => {
        if (
            category !== (filters.category || '') ||
            service !== (filters.service || '')
        ) {
            debouncedFilter(category, service);
        }
        return () => debouncedFilter.cancel();
    }, [category, service, debouncedFilter, filters]);

    // Handle filter button click (optional, if user prefers manual trigger, strictly speaking useEffect handles it, so button is just visual/extra or can be force refresh)
    const handleFilter = () => {
        router.get(
            '/service-monitoring',
            { category, service },
            { preserveState: true, replace: true },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Monitoring Layanan" />

            <div className="flex h-full flex-1 flex-col gap-4 bg-slate-50/50 p-4 sm:p-5">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="border-l-4 border-[#02c39a] pl-3 text-xl font-extrabold tracking-tight text-slate-900">
                        Monitoring Layanan
                    </h2>
                    <p className="pl-3 text-xs font-medium text-slate-500">
                        Pantau status dan waktu proses setiap layanan secara
                        real-time.
                    </p>
                </div>

                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                        {/* Summary Header */}
                        <div className="flex items-center gap-2 border-b border-slate-100 bg-white px-5 py-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a]/10 text-[#02c39a]">
                                <Activity className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-800">
                                Monitoring Layanan
                            </h3>
                        </div>

                        {/* Filters Section */}
                        <div className="border-b border-slate-100 bg-slate-50/50 p-4">
                            <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-12">
                                {/* Category Filter */}
                                <div className="space-y-1 md:col-span-4">
                                    <label className="pl-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                        Filter Kategori
                                    </label>
                                    <div className="group relative">
                                        <select
                                            value={category}
                                            onChange={(e) =>
                                                setCategory(e.target.value)
                                            }
                                            className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                        >
                                            <option value="">
                                                SEMUA KATEGORI
                                            </option>
                                            {categories.map((cat, idx) => (
                                                <option key={idx} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400">
                                            <ChevronDown className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Service Filter */}
                                <div className="space-y-1 md:col-span-5">
                                    <label className="pl-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                        Filter Layanan
                                    </label>
                                    <div className="group relative">
                                        <select
                                            value={service}
                                            onChange={(e) =>
                                                setService(e.target.value)
                                            }
                                            className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                        >
                                            <option value="">
                                                SEMUA LAYANAN
                                            </option>
                                            {serviceNames.map((svc, idx) => (
                                                <option key={idx} value={svc}>
                                                    {svc}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400">
                                            <ChevronDown className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Filter Button */}
                                <div className="md:col-span-3">
                                    <button
                                        onClick={handleFilter}
                                        className="hover:translate-y-1px flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#02c39a] text-xs font-bold text-white shadow-[0_3px_0_rgb(0,168,132)] transition-all hover:bg-[#00a884] hover:shadow-[0_1px_0_rgb(0,168,132)] active:translate-y-[2px] active:shadow-none"
                                    >
                                        <Filter className="h-4 w-4" />
                                        Filter
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Table Section */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                        <th className="px-5 py-3">
                                            Layanan (ID - Nama)
                                        </th>
                                        <th className="px-5 py-3 text-center">
                                            Jml Pesan
                                        </th>
                                        <th className="px-5 py-3">Mulai</th>
                                        <th className="px-5 py-3">Selesai</th>
                                        <th className="px-5 py-3">
                                            Waktu Proses
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {monitoringData.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-5 py-8 text-center text-xs font-bold text-slate-400"
                                            >
                                                Tidak ada data monitoring
                                                ditemukan.
                                            </td>
                                        </tr>
                                    ) : (
                                        monitoringData.data.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="group transition-colors hover:bg-slate-50/50"
                                            >
                                                <td className="px-5 py-3">
                                                    <div className="max-w-[350px]">
                                                        <span className="block cursor-pointer text-xs leading-tight font-bold text-indigo-600 hover:underline">
                                                            {item.serviceId} -{' '}
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 text-center">
                                                    <span className="text-xs font-black text-[#02c39a]">
                                                        {item.orderCount}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <div className="flex min-w-[100px] flex-col">
                                                        <span className="text-xs font-bold text-slate-700">
                                                            {item.startDate}
                                                        </span>
                                                        <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
                                                            <Play className="h-2.5 w-2.5 fill-slate-400" />
                                                            {item.startTime}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <div className="flex min-w-[100px] flex-col">
                                                        <span className="text-xs font-bold text-slate-700">
                                                            {item.endDate}
                                                        </span>
                                                        <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
                                                            <CheckCircle2 className="h-2.5 w-2.5" />
                                                            {item.endTime}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-1.5">
                                                        <Timer className="h-3 w-3 text-[#02c39a]" />
                                                        <span className="text-xs font-bold text-[#02c39a]">
                                                            {item.processTime}
                                                        </span>
                                                    </div>
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
                                Menampilkan {monitoringData.from || 0}-
                                {monitoringData.to || 0} dari{' '}
                                {monitoringData.total} Data Monitoring
                            </p>

                            <div className="order-1 flex flex-wrap justify-center gap-1 sm:order-2">
                                {monitoringData.links.map((link, i) => {
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
