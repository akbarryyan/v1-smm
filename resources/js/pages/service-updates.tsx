import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Clock,
    Filter,
    Info,
    RefreshCw,
    Search,
} from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Pembaruan Layanan',
        href: '/service-updates',
    },
];

const updates = [
    {
        id: 1,
        date: '09 Januari 2026',
        time: '17:53:59',
        serviceId: '5899',
        name: 'Instagram Likes Indonesia Server 2 [ max 1K ] [ No Refill ]',
        type: 'Nonaktif',
        description: 'Dinonaktifkan.',
    },
    {
        id: 2,
        date: '09 Januari 2026',
        time: '17:53:59',
        serviceId: '5977',
        name: 'Instagram Likes Indonesia Server 3 [ max 10K ] [ No Refill ]',
        type: 'Nonaktif',
        description: 'Dinonaktifkan.',
    },
    {
        id: 3,
        date: '09 Januari 2026',
        time: '17:50:14',
        serviceId: '5915',
        name: 'Instagram Followers Indonesia MDN 3 [ Refill 30 Days ] [ Max 200 ] [ LOW DROP ] [ FAST ] [ CEK DESKRIPSI ]',
        type: 'Perubahan Data',
        description:
            'Pembaruan nama layanan Instagram Followers Indonesia MDN 3 [ Refill 30 Days Button ] [ Max 200 ] [ REAL AKTIF ] [ LOW DROP ] [ SLOW ] menjadi Instagram Followers Indonesia MDN 3 [ Refill 30 Days ] [ Max 200 ] [ LOW DROP ] [ FAST ] [ CEK DESKRIPSI ].',
    },
    {
        id: 4,
        date: '09 Januari 2026',
        time: '17:50:14',
        serviceId: '5915',
        name: 'Instagram Followers Indonesia MDN 3 [ Refill 30 Days ] [ Max 200 ] [ LOW DROP ] [ FAST ] [ CEK DESKRIPSI ]',
        type: 'Perubahan Data',
        description: 'Pembaruan deskripsi layanan.',
    },
    {
        id: 5,
        date: '08 Januari 2026',
        time: '22:00:34',
        serviceId: '3677',
        name: 'Youtube Views [ HR ] [ Server 2 ] [ Retention 2-7 Minutes ] [ Speed 500/day + 5-10% Likes ] [ 30 Days refill ]',
        type: 'Nonaktif',
        description: 'Dinonaktifkan.',
    },
    {
        id: 6,
        date: '08 Januari 2026',
        time: '22:00:34',
        serviceId: '6157',
        name: 'Youtube Views MDN 10 [ HR ] [ Retention 8-12 Minutes ] [ Speed 3k-5k/day + 1-3% Likes ] [ 30 Days refill ]',
        type: 'Nonaktif',
        description: 'Dinonaktifkan.',
    },
];

export default function ServiceUpdates() {
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
                                                type="text"
                                                placeholder="Pilih Tanggal..."
                                                className="h-10 w-full rounded-xl border border-slate-200 bg-white pr-4 pl-12 text-xs font-bold text-slate-700 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                            />
                                        </div>
                                        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#02c39a] text-white transition-all hover:bg-[#00a884] active:scale-95">
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
                                        <select className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                                            <option>SEMUA JENIS</option>
                                            <option>NONAKTIF</option>
                                            <option>PERUBAHAN DATA</option>
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
                                    {updates.map((update) => (
                                        <tr
                                            key={update.id}
                                            className="group transition-colors hover:bg-slate-50/50"
                                        >
                                            <td className="px-5 py-3">
                                                <div className="flex min-w-[100px] flex-col">
                                                    <span className="text-xs font-bold text-slate-700">
                                                        {update.date}
                                                    </span>
                                                    <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
                                                        <Clock className="h-2.5 w-2.5" />
                                                        {update.time}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className="text-xs font-black text-[#02c39a]">
                                                    #{update.serviceId}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3">
                                                <div className="max-w-[250px]">
                                                    <span className="block cursor-pointer text-xs leading-tight font-bold text-indigo-600 hover:underline">
                                                        {update.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-black tracking-wider uppercase ${
                                                        update.type ===
                                                        'Nonaktif'
                                                            ? 'bg-rose-50 text-rose-500 ring-1 ring-rose-100'
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
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer / Pagination */}
                        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/30 px-5 py-4 sm:flex-row">
                            <p className="order-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase sm:order-1">
                                Menampilkan {updates.length} Pembaruan Terakhir
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
