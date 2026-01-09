import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
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

const breadcrumbs = [
    {
        title: 'Monitoring Layanan',
        href: '/service-monitoring',
    },
];

const monitoringData = [
    {
        id: 1,
        serviceId: '6119',
        name: 'TikTok View [ Server 7 ] [ No Refill ] [ Max Unlimited ] [ Low Drop ] [ 10M/Day ]',
        orderCount: '2,000',
        startDate: '09 Januari 2026',
        startTime: '23:12:32',
        endDate: '09 Januari 2026',
        endTime: '23:14:16',
        processTime: '1 menit 44 detik',
    },
    {
        id: 2,
        serviceId: '6119',
        name: 'TikTok View [ Server 7 ] [ No Refill ] [ Max Unlimited ] [ Low Drop ] [ 10M/Day ]',
        orderCount: '2,000',
        startDate: '09 Januari 2026',
        startTime: '23:12:08',
        endDate: '09 Januari 2026',
        endTime: '23:14:19',
        processTime: '2 menit 11 detik',
    },
    {
        id: 3,
        serviceId: '6119',
        name: 'TikTok View [ Server 7 ] [ No Refill ] [ Max Unlimited ] [ Low Drop ] [ 10M/Day ]',
        orderCount: '2,000',
        startDate: '09 Januari 2026',
        startTime: '23:11:39',
        endDate: '09 Januari 2026',
        endTime: '23:14:23',
        processTime: '2 menit 44 detik',
    },
    {
        id: 4,
        serviceId: '6116',
        name: 'TikTok View [ Server 6 ] [ 30 Days Refill ] [ Max Unlimited ] [ Instant Start ] [ 10M/Day ]',
        orderCount: '1,000',
        startDate: '09 Januari 2026',
        startTime: '23:10:12',
        endDate: '09 Januari 2026',
        endTime: '23:14:30',
        processTime: '4 menit 18 detik',
    },
    {
        id: 5,
        serviceId: '6137',
        name: 'TikTok Save Server 7 [ Max Unlimited ] [ HQ - Drop 0% ] [ No Refill ] [ Instant Start ] [ 500K/days ]',
        orderCount: '100',
        startDate: '09 Januari 2026',
        startTime: '23:08:07',
        endDate: '09 Januari 2026',
        endTime: '23:10:57',
        processTime: '2 menit 50 detik',
    },
    {
        id: 6,
        serviceId: '5743',
        name: 'Twitter Tweet Views Server 7 [ Max 10M ] [ Start: 0-1 Minutes ] [ 10M/days ]',
        orderCount: '9,564',
        startDate: '09 Januari 2026',
        startTime: '23:07:55',
        endDate: '09 Januari 2026',
        endTime: '23:11:10',
        processTime: '3 menit 15 detik',
    },
    {
        id: 7,
        serviceId: '6116',
        name: 'TikTok View [ Server 6 ] [ 30 Days Refill ] [ Max Unlimited ] [ Instant Start ] [ 10M/Day ]',
        orderCount: '400',
        startDate: '09 Januari 2026',
        startTime: '23:05:26',
        endDate: '09 Januari 2026',
        endTime: '23:08:03',
        processTime: '2 menit 37 detik',
    },
    {
        id: 8,
        serviceId: '6116',
        name: 'TikTok View [ Server 6 ] [ 30 Days Refill ] [ Max Unlimited ] [ Instant Start ] [ 10M/Day ]',
        orderCount: '400',
        startDate: '09 Januari 2026',
        startTime: '23:04:38',
        endDate: '09 Januari 2026',
        endTime: '23:11:43',
        processTime: '7 menit 5 detik',
    },
];

export default function ServiceMonitoring() {
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
                                        <select className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                                            <option>SEMUA KATEGORI</option>
                                            <option>TIKTOK</option>
                                            <option>INSTAGRAM</option>
                                            <option>TWITTER</option>
                                            <option>YOUTUBE</option>
                                            <option>FACEBOOK</option>
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
                                        <select className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                                            <option>SEMUA LAYANAN</option>
                                            <option>
                                                TikTok View Server 6
                                            </option>
                                            <option>
                                                TikTok View Server 7
                                            </option>
                                            <option>Twitter Tweet Views</option>
                                        </select>
                                        <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400">
                                            <ChevronDown className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Filter Button */}
                                <div className="md:col-span-3">
                                    <button className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#02c39a] text-xs font-bold text-white shadow-[0_3px_0_rgb(0,168,132)] transition-all hover:translate-y-[1px] hover:bg-[#00a884] hover:shadow-[0_1px_0_rgb(0,168,132)] active:translate-y-[2px] active:shadow-none">
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
                                    {monitoringData.map((item) => (
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
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer / Pagination */}
                        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/30 px-5 py-4 sm:flex-row">
                            <p className="order-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase sm:order-1">
                                Menampilkan {monitoringData.length} Data
                                Monitoring
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
