import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import {
    Ban,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Eye,
    Minus,
    Plus,
    Search,
} from 'lucide-react';

const users = [
    {
        id: 1001,
        name: 'Akbar Rayyan Al Ghifari',
        email: 'akbarrayyan@gmail.com',
        balance: 5240000,
        orders: 847,
        status: 'aktif',
        joined: '10 Jan 2024',
    },
    {
        id: 1002,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        balance: 1250000,
        orders: 256,
        status: 'aktif',
        joined: '15 Mar 2024',
    },
    {
        id: 1003,
        name: 'Jane Smith',
        email: 'janesmith@gmail.com',
        balance: 890000,
        orders: 189,
        status: 'aktif',
        joined: '22 May 2024',
    },
    {
        id: 1004,
        name: 'Test User',
        email: 'testuser@gmail.com',
        balance: 0,
        orders: 12,
        status: 'suspended',
        joined: '01 Jul 2024',
    },
    {
        id: 1005,
        name: 'Demo Account',
        email: 'demo@medanpedia.com',
        balance: 50000,
        orders: 5,
        status: 'aktif',
        joined: '10 Dec 2025',
    },
];

export default function AdminUsers() {
    return (
        <AdminLayout title="Pengguna">
            <Head title="Pengguna - Admin" />

            <div className="space-y-4">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <select className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                            <option>Semua Status</option>
                            <option>Aktif</option>
                            <option>Suspended</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>

                    <div className="relative min-w-[200px] flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari nama, email, atau ID pengguna..."
                            className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        />
                    </div>
                </div>

                {/* Users Table */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                    <th className="px-4 py-3 text-left">
                                        ID Pengguna
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Nama
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Email
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Saldo
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Total Pesanan
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Status Akun
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Bergabung
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-slate-50/50"
                                    >
                                        <td className="px-4 py-3">
                                            <span className="text-xs font-bold text-slate-700">
                                                #{user.id}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs font-medium text-slate-700">
                                                {user.name}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs text-indigo-600">
                                                {user.email}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs font-bold text-[#02c39a]">
                                                Rp{' '}
                                                {user.balance.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs font-bold text-slate-700">
                                                {user.orders}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold capitalize ${
                                                    user.status === 'aktif'
                                                        ? 'bg-emerald-50 text-emerald-600'
                                                        : 'bg-rose-50 text-rose-600'
                                                }`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs text-slate-500">
                                                {user.joined}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1">
                                                <button
                                                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                                                    title="Tambah Saldo"
                                                >
                                                    <Plus className="h-3.5 w-3.5" />
                                                </button>
                                                <button
                                                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-600 hover:bg-amber-200"
                                                    title="Kurangi Saldo"
                                                >
                                                    <Minus className="h-3.5 w-3.5" />
                                                </button>
                                                <button
                                                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600"
                                                    title="Lihat Riwayat"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                </button>
                                                <button
                                                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-600"
                                                    title="Suspend Akun"
                                                >
                                                    <Ban className="h-3.5 w-3.5" />
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
                            Menampilkan 1-5 dari 12,847 pengguna
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
