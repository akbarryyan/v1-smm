import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Edit,
    Plus,
    Power,
    Search,
    Trash2,
} from 'lucide-react';

const services = [
    {
        id: 1001,
        name: 'Instagram Followers [Server 1] [Fast]',
        category: 'Instagram',
        price: 36400,
        min: 100,
        max: 50000,
        provider: 'Provider A',
        status: 'aktif',
    },
    {
        id: 1002,
        name: 'Instagram Likes [Real Users]',
        category: 'Instagram',
        price: 12500,
        min: 50,
        max: 10000,
        provider: 'Provider A',
        status: 'aktif',
    },
    {
        id: 1003,
        name: 'TikTok Followers [HQ]',
        category: 'TikTok',
        price: 45000,
        min: 100,
        max: 100000,
        provider: 'Provider B',
        status: 'aktif',
    },
    {
        id: 1004,
        name: 'YouTube Views [Monetizable]',
        category: 'YouTube',
        price: 75000,
        min: 500,
        max: 1000000,
        provider: 'Provider C',
        status: 'nonaktif',
    },
    {
        id: 1005,
        name: 'Twitter Followers',
        category: 'Twitter',
        price: 40000,
        min: 100,
        max: 25000,
        provider: 'Provider A',
        status: 'aktif',
    },
];

export default function AdminServices() {
    return (
        <AdminLayout title="Layanan">
            <Head title="Layanan - Admin" />

            <div className="space-y-4">
                {/* Header Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                                <option>Semua Kategori</option>
                                <option>Instagram</option>
                                <option>TikTok</option>
                                <option>YouTube</option>
                                <option>Twitter</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        </div>

                        <div className="relative">
                            <select className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                                <option>Semua Status</option>
                                <option>Aktif</option>
                                <option>Nonaktif</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        </div>

                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari layanan..."
                                className="h-10 w-64 rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                            />
                        </div>
                    </div>

                    <button className="flex items-center gap-2 rounded-lg bg-[#02c39a] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#00a884]">
                        <Plus className="h-4 w-4" />
                        Tambah Layanan
                    </button>
                </div>

                {/* Services Table */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                    <th className="px-4 py-3 text-left">
                                        ID Layanan
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Nama Layanan
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Kategori
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Harga / 1000
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Minimal
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Maksimal
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Provider
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {services.map((service) => (
                                    <tr
                                        key={service.id}
                                        className="hover:bg-slate-50/50"
                                    >
                                        <td className="px-4 py-3">
                                            <span className="text-xs font-bold text-slate-700">
                                                #{service.id}
                                            </span>
                                        </td>
                                        <td className="max-w-[250px] px-4 py-3">
                                            <span className="text-xs text-slate-700">
                                                {service.name}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600">
                                                {service.category}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs font-bold text-[#02c39a]">
                                                Rp{' '}
                                                {service.price.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs text-slate-600">
                                                {service.min.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs text-slate-600">
                                                {service.max.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs text-slate-600">
                                                {service.provider}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold capitalize ${
                                                    service.status === 'aktif'
                                                        ? 'bg-emerald-50 text-emerald-600'
                                                        : 'bg-slate-100 text-slate-500'
                                                }`}
                                            >
                                                {service.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1">
                                                <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600">
                                                    <Edit className="h-3.5 w-3.5" />
                                                </button>
                                                <button
                                                    className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                                                        service.status ===
                                                        'aktif'
                                                            ? 'bg-slate-100 text-slate-500 hover:bg-amber-100 hover:text-amber-600'
                                                            : 'bg-emerald-100 text-emerald-600'
                                                    }`}
                                                >
                                                    <Power className="h-3.5 w-3.5" />
                                                </button>
                                                <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-600">
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                        <p className="text-xs text-slate-500">
                            Menampilkan 1-5 dari 1,284 layanan
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
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
                                3
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
