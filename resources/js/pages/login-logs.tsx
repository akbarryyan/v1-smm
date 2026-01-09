import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    LogIn,
    Monitor,
    Search,
} from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Log Login',
        href: '/login-logs',
    },
];

const loginLogs = [
    {
        id: 1,
        date: '09 Januari 2026 21:50:10',
        device: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
        ip: '114.5.217.145',
    },
    {
        id: 2,
        date: '07 Januari 2026 05:45:38',
        device: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/143.0.7499.151 Mobile/15E148 Safari/604.1',
        ip: '2404:8780:103b:3ac:905:f750:1b89:3eff',
    },
    {
        id: 3,
        date: '05 Januari 2026 14:22:15',
        device: 'Mozilla/5.0 (Linux; Android 14; SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36',
        ip: '182.1.78.92',
    },
    {
        id: 4,
        date: '03 Januari 2026 09:15:42',
        device: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15',
        ip: '36.72.145.201',
    },
    {
        id: 5,
        date: '01 Januari 2026 18:30:55',
        device: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0',
        ip: '103.28.12.67',
    },
];

export default function LoginLogs() {
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
                                        <select className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                                            <option>2026</option>
                                            <option>2025</option>
                                            <option>2024</option>
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
                                    {loginLogs.map((log) => (
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
                                                        {log.device}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className="text-xs font-bold whitespace-nowrap text-slate-600">
                                                    {log.ip}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer / Pagination */}
                        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/30 px-5 py-4 sm:flex-row">
                            <p className="order-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase sm:order-1">
                                Menampilkan {loginLogs.length} Log Login
                                Terakhir
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
