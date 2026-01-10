import AdminLayout from '@/layouts/admin-layout';
import { Head, router, useForm } from '@inertiajs/react';
import {
    Ban,
    CheckCircle,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Eye,
    Minus,
    Plus,
    Search,
    X,
} from 'lucide-react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    balance: number;
    orders_count?: number;
    suspended_at: string | null;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedUsers {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: PaginationLink[];
}

interface Filters {
    status: string;
    search: string;
}

interface Stats {
    total: number;
    active: number;
    suspended: number;
}

interface Props {
    users: PaginatedUsers;
    filters: Filters;
    stats: Stats;
}

// Modal Component
function Modal({
    isOpen,
    onClose,
    title,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default function AdminUsers({ users, filters, stats }: Props) {
    const [search, setSearch] = useState(filters.search);
    const [status, setStatus] = useState(filters.status);

    // Modal states
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
    const [showSubtractBalanceModal, setShowSubtractBalanceModal] =
        useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showSuspendModal, setShowSuspendModal] = useState(false);

    // Form for balance operations
    const balanceForm = useForm({
        amount: '',
        note: '',
    });

    const hasFilters = filters.status || filters.search;

    const handleFilter = () => {
        router.get(
            '/admin/users',
            {
                status: status || undefined,
                search: search || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleResetFilters = () => {
        setSearch('');
        setStatus('');
        router.get(
            '/admin/users',
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleFilter();
        }
    };

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        router.get(
            '/admin/users',
            {
                status: newStatus || undefined,
                search: search || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Action handlers
    const openAddBalance = (user: User) => {
        setSelectedUser(user);
        balanceForm.reset();
        setShowAddBalanceModal(true);
    };

    const openSubtractBalance = (user: User) => {
        setSelectedUser(user);
        balanceForm.reset();
        setShowSubtractBalanceModal(true);
    };

    const openDetail = (user: User) => {
        setSelectedUser(user);
        setShowDetailModal(true);
    };

    const openSuspend = (user: User) => {
        setSelectedUser(user);
        setShowSuspendModal(true);
    };

    const handleAddBalance = () => {
        if (!selectedUser) return;
        balanceForm.post(`/admin/users/${selectedUser.id}/add-balance`, {
            onSuccess: () => {
                setShowAddBalanceModal(false);
                balanceForm.reset();
            },
        });
    };

    const handleSubtractBalance = () => {
        if (!selectedUser) return;
        balanceForm.post(`/admin/users/${selectedUser.id}/subtract-balance`, {
            onSuccess: () => {
                setShowSubtractBalanceModal(false);
                balanceForm.reset();
            },
        });
    };

    const handleSuspend = () => {
        if (!selectedUser) return;
        router.post(
            `/admin/users/${selectedUser.id}/suspend`,
            {},
            {
                onSuccess: () => setShowSuspendModal(false),
            },
        );
    };

    const handleUnsuspend = () => {
        if (!selectedUser) return;
        router.post(
            `/admin/users/${selectedUser.id}/unsuspend`,
            {},
            {
                onSuccess: () => setShowSuspendModal(false),
            },
        );
    };

    return (
        <AdminLayout title="Pengguna">
            <Head title="Pengguna - Admin" />

            <div className="space-y-4">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                            Total Pengguna
                        </p>
                        <p className="text-2xl font-black text-slate-800">
                            {stats.total.toLocaleString()}
                        </p>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                            Pengguna Aktif
                        </p>
                        <p className="text-2xl font-black text-emerald-600">
                            {stats.active.toLocaleString()}
                        </p>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                            Suspended
                        </p>
                        <p className="text-2xl font-black text-rose-600">
                            {stats.suspended.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <select
                            value={status}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        >
                            <option value="">Semua Status</option>
                            <option value="aktif">Aktif</option>
                            <option value="suspended">Suspended</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>

                    <div className="relative min-w-[200px] flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Cari nama, email, atau ID pengguna..."
                            className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        />
                    </div>

                    <button
                        onClick={handleFilter}
                        className="flex h-10 items-center gap-2 rounded-lg bg-[#02c39a] px-4 text-sm font-bold text-white transition-all hover:bg-[#00a884]"
                    >
                        <Search className="h-4 w-4" />
                        Cari
                    </button>

                    {hasFilters && (
                        <button
                            onClick={handleResetFilters}
                            className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50"
                        >
                            <X className="h-4 w-4" />
                            Reset Filter
                        </button>
                    )}
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
                                {users.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-4 py-8 text-center"
                                        >
                                            <p className="text-sm text-slate-400">
                                                Tidak ada pengguna ditemukan.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    users.data.map((user) => (
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
                                                    {formatCurrency(
                                                        user.balance || 0,
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold capitalize ${
                                                        user.suspended_at ===
                                                        null
                                                            ? 'bg-emerald-50 text-emerald-600'
                                                            : 'bg-rose-50 text-rose-600'
                                                    }`}
                                                >
                                                    {user.suspended_at === null
                                                        ? 'Aktif'
                                                        : 'Suspended'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-slate-500">
                                                    {formatDate(
                                                        user.created_at,
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() =>
                                                            openAddBalance(user)
                                                        }
                                                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                                                        title="Tambah Saldo"
                                                    >
                                                        <Plus className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openSubtractBalance(
                                                                user,
                                                            )
                                                        }
                                                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-600 hover:bg-amber-200"
                                                        title="Kurangi Saldo"
                                                    >
                                                        <Minus className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openDetail(user)
                                                        }
                                                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600"
                                                        title="Lihat Detail"
                                                    >
                                                        <Eye className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openSuspend(user)
                                                        }
                                                        className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                                                            user.suspended_at ===
                                                            null
                                                                ? 'bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-600'
                                                                : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                                                        }`}
                                                        title={
                                                            user.suspended_at ===
                                                            null
                                                                ? 'Suspend Akun'
                                                                : 'Aktifkan Akun'
                                                        }
                                                    >
                                                        {user.suspended_at ===
                                                        null ? (
                                                            <Ban className="h-3.5 w-3.5" />
                                                        ) : (
                                                            <CheckCircle className="h-3.5 w-3.5" />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                        <p className="text-xs text-slate-500">
                            Menampilkan {users.from || 0}-{users.to || 0} dari{' '}
                            {users.total.toLocaleString()} pengguna
                        </p>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() =>
                                    users.current_page > 1 &&
                                    router.get(
                                        `/admin/users?page=${users.current_page - 1}`,
                                        {
                                            status: status || undefined,
                                            search: search || undefined,
                                        },
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                        },
                                    )
                                }
                                disabled={users.current_page === 1}
                                className={`flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 ${
                                    users.current_page === 1
                                        ? 'cursor-not-allowed text-slate-300'
                                        : 'text-slate-400 hover:bg-slate-50'
                                }`}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>

                            {users.links.slice(1, -1).map((link, index) => {
                                const pageNum = index + 1;
                                if (
                                    pageNum === 1 ||
                                    pageNum === users.last_page ||
                                    (pageNum >= users.current_page - 1 &&
                                        pageNum <= users.current_page + 1)
                                ) {
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() =>
                                                router.get(
                                                    `/admin/users?page=${pageNum}`,
                                                    {
                                                        status:
                                                            status || undefined,
                                                        search:
                                                            search || undefined,
                                                    },
                                                    {
                                                        preserveState: true,
                                                        preserveScroll: true,
                                                    },
                                                )
                                            }
                                            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                                                link.active
                                                    ? 'bg-[#02c39a] text-white'
                                                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                } else if (
                                    pageNum === users.current_page - 2 ||
                                    pageNum === users.current_page + 2
                                ) {
                                    return (
                                        <span
                                            key={pageNum}
                                            className="px-1 text-slate-400"
                                        >
                                            ...
                                        </span>
                                    );
                                }
                                return null;
                            })}

                            <button
                                onClick={() =>
                                    users.current_page < users.last_page &&
                                    router.get(
                                        `/admin/users?page=${users.current_page + 1}`,
                                        {
                                            status: status || undefined,
                                            search: search || undefined,
                                        },
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                        },
                                    )
                                }
                                disabled={
                                    users.current_page === users.last_page
                                }
                                className={`flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 ${
                                    users.current_page === users.last_page
                                        ? 'cursor-not-allowed text-slate-300'
                                        : 'text-slate-400 hover:bg-slate-50'
                                }`}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Balance Modal */}
            <Modal
                isOpen={showAddBalanceModal}
                onClose={() => setShowAddBalanceModal(false)}
                title="Tambah Saldo"
            >
                <div className="space-y-4">
                    <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">Pengguna</p>
                        <p className="text-sm font-bold text-slate-800">
                            {selectedUser?.name}
                        </p>
                        <p className="text-xs text-slate-400">
                            {selectedUser?.email}
                        </p>
                        <p className="mt-1 text-sm font-bold text-[#02c39a]">
                            Saldo saat ini:{' '}
                            {formatCurrency(selectedUser?.balance || 0)}
                        </p>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700">
                            Jumlah (Rp)
                        </label>
                        <input
                            type="number"
                            value={balanceForm.data.amount}
                            onChange={(e) =>
                                balanceForm.setData('amount', e.target.value)
                            }
                            placeholder="Masukkan jumlah"
                            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        />
                        {balanceForm.errors.amount && (
                            <p className="mt-1 text-xs text-rose-500">
                                {balanceForm.errors.amount}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700">
                            Catatan (Opsional)
                        </label>
                        <input
                            type="text"
                            value={balanceForm.data.note}
                            onChange={(e) =>
                                balanceForm.setData('note', e.target.value)
                            }
                            placeholder="Alasan penambahan saldo"
                            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowAddBalanceModal(false)}
                            className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleAddBalance}
                            disabled={balanceForm.processing}
                            className="flex-1 rounded-lg bg-emerald-500 py-2.5 text-sm font-bold text-white hover:bg-emerald-600 disabled:opacity-50"
                        >
                            {balanceForm.processing
                                ? 'Memproses...'
                                : 'Tambah Saldo'}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Subtract Balance Modal */}
            <Modal
                isOpen={showSubtractBalanceModal}
                onClose={() => setShowSubtractBalanceModal(false)}
                title="Kurangi Saldo"
            >
                <div className="space-y-4">
                    <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">Pengguna</p>
                        <p className="text-sm font-bold text-slate-800">
                            {selectedUser?.name}
                        </p>
                        <p className="text-xs text-slate-400">
                            {selectedUser?.email}
                        </p>
                        <p className="mt-1 text-sm font-bold text-[#02c39a]">
                            Saldo saat ini:{' '}
                            {formatCurrency(selectedUser?.balance || 0)}
                        </p>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700">
                            Jumlah (Rp)
                        </label>
                        <input
                            type="number"
                            value={balanceForm.data.amount}
                            onChange={(e) =>
                                balanceForm.setData('amount', e.target.value)
                            }
                            placeholder="Masukkan jumlah"
                            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        />
                        {balanceForm.errors.amount && (
                            <p className="mt-1 text-xs text-rose-500">
                                {balanceForm.errors.amount}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700">
                            Catatan (Opsional)
                        </label>
                        <input
                            type="text"
                            value={balanceForm.data.note}
                            onChange={(e) =>
                                balanceForm.setData('note', e.target.value)
                            }
                            placeholder="Alasan pengurangan saldo"
                            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowSubtractBalanceModal(false)}
                            className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleSubtractBalance}
                            disabled={balanceForm.processing}
                            className="flex-1 rounded-lg bg-amber-500 py-2.5 text-sm font-bold text-white hover:bg-amber-600 disabled:opacity-50"
                        >
                            {balanceForm.processing
                                ? 'Memproses...'
                                : 'Kurangi Saldo'}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* User Detail Modal */}
            <Modal
                isOpen={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                title="Detail Pengguna"
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">
                                ID
                            </p>
                            <p className="text-sm font-bold text-slate-800">
                                #{selectedUser?.id}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">
                                Status
                            </p>
                            <span
                                className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold ${
                                    selectedUser?.suspended_at === null
                                        ? 'bg-emerald-50 text-emerald-600'
                                        : 'bg-rose-50 text-rose-600'
                                }`}
                            >
                                {selectedUser?.suspended_at === null
                                    ? 'Aktif'
                                    : 'Suspended'}
                            </span>
                        </div>
                        <div className="col-span-2">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">
                                Nama
                            </p>
                            <p className="text-sm font-bold text-slate-800">
                                {selectedUser?.name}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">
                                Email
                            </p>
                            <p className="text-sm text-indigo-600">
                                {selectedUser?.email}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">
                                Saldo
                            </p>
                            <p className="text-sm font-bold text-[#02c39a]">
                                {formatCurrency(selectedUser?.balance || 0)}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">
                                Bergabung
                            </p>
                            <p className="text-sm text-slate-600">
                                {selectedUser?.created_at &&
                                    formatDate(selectedUser.created_at)}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowDetailModal(false)}
                        className="w-full rounded-lg border border-slate-200 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                    >
                        Tutup
                    </button>
                </div>
            </Modal>

            {/* Suspend/Unsuspend Modal */}
            <Modal
                isOpen={showSuspendModal}
                onClose={() => setShowSuspendModal(false)}
                title={
                    selectedUser?.suspended_at === null
                        ? 'Suspend Akun'
                        : 'Aktifkan Akun'
                }
            >
                <div className="space-y-4">
                    <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">Pengguna</p>
                        <p className="text-sm font-bold text-slate-800">
                            {selectedUser?.name}
                        </p>
                        <p className="text-xs text-slate-400">
                            {selectedUser?.email}
                        </p>
                    </div>

                    {selectedUser?.suspended_at === null ? (
                        <div className="rounded-lg bg-rose-50 p-3">
                            <p className="text-sm text-rose-700">
                                <strong>Perhatian:</strong> Akun yang di-suspend
                                tidak dapat melakukan login dan menggunakan
                                layanan.
                            </p>
                        </div>
                    ) : (
                        <div className="rounded-lg bg-emerald-50 p-3">
                            <p className="text-sm text-emerald-700">
                                Akun akan diaktifkan kembali dan dapat
                                menggunakan layanan.
                            </p>
                        </div>
                    )}

                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowSuspendModal(false)}
                            className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                        >
                            Batal
                        </button>
                        {selectedUser?.suspended_at === null ? (
                            <button
                                onClick={handleSuspend}
                                className="flex-1 rounded-lg bg-rose-500 py-2.5 text-sm font-bold text-white hover:bg-rose-600"
                            >
                                Ya, Suspend Akun
                            </button>
                        ) : (
                            <button
                                onClick={handleUnsuspend}
                                className="flex-1 rounded-lg bg-emerald-500 py-2.5 text-sm font-bold text-white hover:bg-emerald-600"
                            >
                                Ya, Aktifkan Akun
                            </button>
                        )}
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
