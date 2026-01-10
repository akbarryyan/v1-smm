import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import {
    Activity,
    Edit,
    ExternalLink,
    Plus,
    Power,
    RefreshCw,
} from 'lucide-react';

const providers = [
    {
        id: 1,
        name: 'Provider A - SMM Raja',
        endpoint: 'https://api.smmraja.com/v2',
        status: 'online',
        lastCheck: '2 menit lalu',
        responseTime: '120ms',
        services: 456,
        balance: 'Rp 5.240.000',
    },
    {
        id: 2,
        name: 'Provider B - Perfect SMM',
        endpoint: 'https://perfectsmm.co/api/v2',
        status: 'online',
        lastCheck: '5 menit lalu',
        responseTime: '245ms',
        services: 312,
        balance: 'Rp 2.180.000',
    },
    {
        id: 3,
        name: 'Provider C - Cheap Panel',
        endpoint: 'https://cheappanel.com/api',
        status: 'warning',
        lastCheck: '10 menit lalu',
        responseTime: '1.2s',
        services: 189,
        balance: 'Rp 890.000',
    },
    {
        id: 4,
        name: 'Provider D - Indo SMM',
        endpoint: 'https://indosmm.id/api/v3',
        status: 'offline',
        lastCheck: '2 jam lalu',
        responseTime: '-',
        services: 245,
        balance: 'Rp 1.500.000',
    },
];

const statusConfig: Record<
    string,
    { color: string; bg: string; text: string }
> = {
    online: {
        color: 'bg-emerald-500',
        bg: 'bg-emerald-50',
        text: 'text-emerald-600',
    },
    warning: {
        color: 'bg-amber-500',
        bg: 'bg-amber-50',
        text: 'text-amber-600',
    },
    offline: { color: 'bg-rose-500', bg: 'bg-rose-50', text: 'text-rose-600' },
};

export default function AdminProviders() {
    return (
        <AdminLayout title="Provider API">
            <Head title="Provider API - Admin" />

            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">
                        Kelola provider API untuk layanan SMM Panel.
                    </p>
                    <button className="flex items-center gap-2 rounded-lg bg-[#02c39a] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#00a884]">
                        <Plus className="h-4 w-4" />
                        Tambah Provider
                    </button>
                </div>

                {/* Provider Cards */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {providers.map((provider) => {
                        const status = statusConfig[provider.status];
                        return (
                            <div
                                key={provider.id}
                                className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
                            >
                                {/* Header */}
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`h-3 w-3 rounded-full ${status.color}`}
                                        />
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-800">
                                                {provider.name}
                                            </h3>
                                            <div className="flex items-center gap-1 text-xs text-slate-400">
                                                <span className="font-mono">
                                                    {provider.endpoint}
                                                </span>
                                                <ExternalLink className="h-3 w-3" />
                                            </div>
                                        </div>
                                    </div>
                                    <span
                                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold capitalize ${status.bg} ${status.text}`}
                                    >
                                        {provider.status}
                                    </span>
                                </div>

                                {/* Stats */}
                                <div className="mb-4 grid grid-cols-4 gap-3">
                                    <div className="rounded-lg bg-slate-50 p-2 text-center">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                                            Response
                                        </p>
                                        <p className="text-xs font-bold text-slate-700">
                                            {provider.responseTime}
                                        </p>
                                    </div>
                                    <div className="rounded-lg bg-slate-50 p-2 text-center">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                                            Layanan
                                        </p>
                                        <p className="text-xs font-bold text-slate-700">
                                            {provider.services}
                                        </p>
                                    </div>
                                    <div className="rounded-lg bg-slate-50 p-2 text-center">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                                            Saldo
                                        </p>
                                        <p className="text-xs font-bold text-[#02c39a]">
                                            {provider.balance}
                                        </p>
                                    </div>
                                    <div className="rounded-lg bg-slate-50 p-2 text-center">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                                            Cek
                                        </p>
                                        <p className="text-xs font-bold text-slate-700">
                                            {provider.lastCheck}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition-all hover:bg-slate-50">
                                        <Activity className="h-4 w-4" />
                                        Test Koneksi
                                    </button>
                                    <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition-all hover:bg-slate-50">
                                        <RefreshCw className="h-4 w-4" />
                                        Sync Layanan
                                    </button>
                                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600">
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-amber-50 hover:text-amber-600">
                                        <Power className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AdminLayout>
    );
}
