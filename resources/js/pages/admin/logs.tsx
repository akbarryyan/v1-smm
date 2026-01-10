import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import {
    AlertCircle,
    AlertTriangle,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Info,
    Search,
} from 'lucide-react';

const logs = [
    {
        id: 1,
        type: 'api',
        level: 'info',
        message: 'Provider A: Order #PA-123456 created successfully',
        context: 'Provider API',
        timestamp: '10 Jan 2026 14:30:45',
    },
    {
        id: 2,
        type: 'error',
        level: 'error',
        message: 'Provider C: Connection timeout after 30s',
        context: 'Provider API',
        timestamp: '10 Jan 2026 14:25:12',
    },
    {
        id: 3,
        type: 'admin',
        level: 'info',
        message: 'Admin menambah saldo Rp 500.000 ke user #1001',
        context: 'Admin Activity',
        timestamp: '10 Jan 2026 14:20:00',
    },
    {
        id: 4,
        type: 'api',
        level: 'warning',
        message: 'Provider B: Response time exceeded 2s (2.5s)',
        context: 'Provider API',
        timestamp: '10 Jan 2026 14:15:30',
    },
    {
        id: 5,
        type: 'error',
        level: 'error',
        message: 'Payment callback failed: Invalid signature',
        context: 'Payment Gateway',
        timestamp: '10 Jan 2026 14:10:22',
    },
    {
        id: 6,
        type: 'admin',
        level: 'info',
        message: 'Admin mengubah status layanan #1004 menjadi nonaktif',
        context: 'Admin Activity',
        timestamp: '10 Jan 2026 14:05:00',
    },
    {
        id: 7,
        type: 'api',
        level: 'info',
        message: 'Provider A: Balance check successful - $524.00',
        context: 'Provider API',
        timestamp: '10 Jan 2026 14:00:00',
    },
];

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
    };

export default function AdminLogs() {
    return (
        <AdminLayout title="Log Sistem">
            <Head title="Log Sistem - Admin" />

            <div className="space-y-4">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <select className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                            <option>Semua Jenis</option>
                            <option>API Provider</option>
                            <option>Error</option>
                            <option>Admin Activity</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>

                    <div className="relative">
                        <select className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                            <option>Semua Level</option>
                            <option>Info</option>
                            <option>Warning</option>
                            <option>Error</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>

                    <input
                        type="date"
                        className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                    />

                    <div className="relative min-w-[200px] flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari log..."
                            className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        />
                    </div>
                </div>

                {/* Logs List */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    <div className="divide-y divide-slate-100">
                        {logs.map((log) => {
                            const level = levelConfig[log.level];
                            const type = typeConfig[log.type];
                            const LevelIcon = level.icon;

                            return (
                                <div
                                    key={log.id}
                                    className="flex items-start gap-4 p-4 hover:bg-slate-50/50"
                                >
                                    <div
                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${level.bg}`}
                                    >
                                        <LevelIcon
                                            className={`h-4 w-4 ${level.iconColor}`}
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-1 flex items-center gap-2">
                                            <span
                                                className={`inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${type.bg} ${type.text}`}
                                            >
                                                {type.label}
                                            </span>
                                            <span
                                                className={`inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${level.bg} ${level.text}`}
                                            >
                                                {log.level}
                                            </span>
                                            <span className="text-[10px] text-slate-400">
                                                {log.context}
                                            </span>
                                        </div>
                                        <p className="font-mono text-sm text-slate-700">
                                            {log.message}
                                        </p>
                                    </div>
                                    <span className="shrink-0 text-xs text-slate-400">
                                        {log.timestamp}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                        <p className="text-xs text-slate-500">
                            Menampilkan 1-7 dari 45,892 log
                        </p>
                        <div className="flex items-center gap-1">
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a] text-xs font-bold text-white">
                                1
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
                                2
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
