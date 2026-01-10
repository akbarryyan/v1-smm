import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Download,
    Eye,
    Filter,
    MoreVertical,
    RefreshCw,
    Search,
    XCircle,
} from 'lucide-react';

const orders = [
    {
        id: 'ORD-2026010001',
        service: 'Instagram Followers [Server 3] [Less Drop]',
        user: 'akbarrayyan@gmail.com',
        quantity: 1000,
        price: 'Rp 36,400',
        status: 'selesai',
        provider: 'Provider A',
        providerOrderId: 'PA-123456',
        date: '10 Jan 2026 14:30',
        startCount: 1500,
        remains: 0,
    },
    {
        id: 'ORD-2026010002',
        service: 'TikTok Likes [Fast]',
        user: 'johndoe@gmail.com',
        quantity: 500,
        price: 'Rp 12,500',
        status: 'diproses',
        provider: 'Provider B',
        providerOrderId: 'PB-789012',
        date: '10 Jan 2026 13:45',
        startCount: 230,
        remains: 250,
    },
    {
        id: 'ORD-2026010003',
        service: 'YouTube Views [HQ]',
        user: 'janedoe@gmail.com',
        quantity: 5000,
        price: 'Rp 75,000',
        status: 'menunggu',
        provider: 'Provider A',
        providerOrderId: '-',
        date: '10 Jan 2026 12:20',
        startCount: 0,
        remains: 5000,
    },
    {
        id: 'ORD-2026010004',
        service: 'Twitter Followers',
        user: 'testuser@gmail.com',
        quantity: 200,
        price: 'Rp 8,000',
        status: 'sebagian',
        provider: 'Provider C',
        providerOrderId: 'PC-345678',
        date: '09 Jan 2026 18:15',
        startCount: 100,
        remains: 50,
    },
    {
        id: 'ORD-2026010005',
        service: 'Facebook Page Likes',
        user: 'demo@gmail.com',
        quantity: 100,
        price: 'Rp 5,000',
        status: 'dibatalkan',
        provider: 'Provider B',
        providerOrderId: 'PB-901234',
        date: '09 Jan 2026 16:00',
        startCount: 0,
        remains: 100,
    },
];

const statusColors: Record<string, string> = {
    menunggu: 'bg-slate-100 text-slate-600',
    diproses: 'bg-blue-50 text-blue-600',
    selesai: 'bg-emerald-50 text-emerald-600',
    sebagian: 'bg-amber-50 text-amber-600',
    dibatalkan: 'bg-rose-50 text-rose-600',
};

export default function AdminOrders() {
    return (
        <AdminLayout title="Pesanan">
            <Head title="Pesanan - Admin" />

            <div className="space-y-4">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <select className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                            <option>Semua Status</option>
                            <option>Menunggu</option>
                            <option>Diproses</option>
                            <option>Selesai</option>
                            <option>Sebagian</option>
                            <option>Dibatalkan</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>

                    <div className="relative">
                        <select className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                            <option>Semua Provider</option>
                            <option>Provider A</option>
                            <option>Provider B</option>
                            <option>Provider C</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>

                    <input
                        type="date"
                        className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                    />

                    <input
                        type="date"
                        className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                    />

                    <div className="relative min-w-[200px] flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari ID pesanan, pengguna, layanan..."
                            className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        />
                    </div>

                    <button className="flex h-10 items-center gap-2 rounded-lg bg-[#02c39a] px-4 text-sm font-bold text-white transition-all hover:bg-[#00a884]">
                        <Filter className="h-4 w-4" />
                        Filter
                    </button>
                </div>

                {/* Bulk Actions */}
                <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300"
                        />
                        <span className="text-sm font-medium text-slate-600">
                            Pilih Semua
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">
                            <XCircle className="h-4 w-4" />
                            Batalkan Pesanan
                        </button>
                        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">
                            <RefreshCw className="h-4 w-4" />
                            Kirim Ulang ke Provider
                        </button>
                        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">
                            <Download className="h-4 w-4" />
                            Export
                        </button>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                    <th className="w-8 px-4 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-slate-300"
                                        />
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        ID Pesanan
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Layanan
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Pengguna
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Jumlah
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Harga
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Provider
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        ID Provider
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Tanggal
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {orders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-slate-50/50"
                                    >
                                        <td className="px-4 py-3">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-slate-300"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs font-bold text-slate-700">
                                                {order.id}
                                            </span>
                                        </td>
                                        <td className="max-w-[180px] px-4 py-3">
                                            <span className="line-clamp-2 text-xs text-slate-600">
                                                {order.service}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs text-indigo-600">
                                                {order.user}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs font-bold text-slate-700">
                                                {order.quantity.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs font-bold text-[#02c39a]">
                                                {order.price}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold capitalize ${statusColors[order.status]}`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs text-slate-600">
                                                {order.provider}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="font-mono text-[10px] text-slate-500">
                                                {order.providerOrderId}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs text-slate-500">
                                                {order.date}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1">
                                                <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-[#02c39a] hover:text-white">
                                                    <Eye className="h-3.5 w-3.5" />
                                                </button>
                                                <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200">
                                                    <MoreVertical className="h-3.5 w-3.5" />
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
                            Menampilkan 1-5 dari 48,293 pesanan
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
                            <span className="px-2 text-slate-400">...</span>
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
                                9659
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
