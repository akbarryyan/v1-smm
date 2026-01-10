import AdminLayout from '@/layouts/admin-layout';
import { Head, router } from '@inertiajs/react';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Edit,
    Package,
    Power,
    RefreshCw,
    Search,
    Trash2,
    X,
} from 'lucide-react';
import { useState } from 'react';

interface Service {
    id: number;
    provider_service_id: string;
    name: string;
    category: string;
    type: string;
    original_price: number;
    price: number;
    min: number;
    max: number;
    refill: boolean;
    description: string | null;
    is_active: boolean;
    provider_name: string;
    provider_id: number;
}

interface PaginatedData {
    data: Service[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Provider {
    id: number;
    name: string;
}

interface Props {
    services: PaginatedData;
    categories: string[];
    providers: Provider[];
    filters: {
        category: string;
        provider: string;
        status: string;
        search: string;
    };
    stats: {
        total: number;
        active: number;
    };
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
            <div className="relative z-10 w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
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

export default function AdminServices({
    services,
    categories,
    providers,
    filters,
    stats,
}: Props) {
    const [category, setCategory] = useState(filters.category);
    const [provider, setProvider] = useState(filters.provider);
    const [status, setStatus] = useState(filters.status);
    const [search, setSearch] = useState(filters.search);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(
        null,
    );
    const [newPrice, setNewPrice] = useState('');

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const applyFilters = () => {
        router.get(
            '/admin/services',
            {
                category: category || undefined,
                provider: provider || undefined,
                status: status || undefined,
                search: search || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const resetFilters = () => {
        setCategory('');
        setProvider('');
        setStatus('');
        setSearch('');
        router.get(
            '/admin/services',
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const hasActiveFilters = category || provider || status || search;

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            applyFilters();
        }
    };

    const handleToggle = (service: Service) => {
        router.post(
            `/admin/services/${service.id}/toggle`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const openEditModal = (service: Service) => {
        setSelectedService(service);
        setNewPrice(String(service.price));
        setShowEditModal(true);
    };

    const openDeleteModal = (service: Service) => {
        setSelectedService(service);
        setShowDeleteModal(true);
    };

    const handleUpdatePrice = () => {
        if (!selectedService) return;
        router.put(
            `/admin/services/${selectedService.id}/price`,
            {
                price: newPrice,
            },
            {
                onSuccess: () => setShowEditModal(false),
                preserveScroll: true,
            },
        );
    };

    const handleDelete = () => {
        if (!selectedService) return;
        router.delete(`/admin/services/${selectedService.id}`, {
            onSuccess: () => setShowDeleteModal(false),
            preserveScroll: true,
        });
    };

    const goToPage = (url: string | null) => {
        if (url) {
            router.get(url, {}, { preserveState: true, preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Layanan">
            <Head title="Layanan - Admin" />

            <div className="space-y-4">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                            <Package className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-slate-800">
                                {stats.total.toLocaleString()}
                            </p>
                            <p className="text-[10px] font-medium text-slate-400">
                                Total Layanan
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                            <Power className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-slate-800">
                                {stats.active.toLocaleString()}
                            </p>
                            <p className="text-[10px] font-medium text-slate-400">
                                Layanan Aktif
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                            <Package className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-slate-800">
                                {(stats.total - stats.active).toLocaleString()}
                            </p>
                            <p className="text-[10px] font-medium text-slate-400">
                                Nonaktif
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                            <Package className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-slate-800">
                                {categories.length}
                            </p>
                            <p className="text-[10px] font-medium text-slate-400">
                                Kategori
                            </p>
                        </div>
                    </div>
                </div>

                {/* Header Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                            <select
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                    router.get(
                                        '/admin/services',
                                        {
                                            category:
                                                e.target.value || undefined,
                                            provider: provider || undefined,
                                            status: status || undefined,
                                            search: search || undefined,
                                        },
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                        },
                                    );
                                }}
                                className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                            >
                                <option value="">Semua Kategori</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        </div>

                        <div className="relative">
                            <select
                                value={provider}
                                onChange={(e) => {
                                    setProvider(e.target.value);
                                    router.get(
                                        '/admin/services',
                                        {
                                            category: category || undefined,
                                            provider:
                                                e.target.value || undefined,
                                            status: status || undefined,
                                            search: search || undefined,
                                        },
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                        },
                                    );
                                }}
                                className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                            >
                                <option value="">Semua Provider</option>
                                {providers.map((prov) => (
                                    <option key={prov.id} value={prov.id}>
                                        {prov.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        </div>

                        <div className="relative">
                            <select
                                value={status}
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                    router.get(
                                        '/admin/services',
                                        {
                                            category: category || undefined,
                                            provider: provider || undefined,
                                            status: e.target.value || undefined,
                                            search: search || undefined,
                                        },
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                        },
                                    );
                                }}
                                className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                            >
                                <option value="">Semua Status</option>
                                <option value="aktif">Aktif</option>
                                <option value="nonaktif">Nonaktif</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        </div>

                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleSearch}
                                placeholder="Cari layanan..."
                                className="h-10 w-64 rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                            />
                        </div>

                        {hasActiveFilters && (
                            <button
                                onClick={resetFilters}
                                className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                            >
                                <RefreshCw className="h-3.5 w-3.5" />
                                Reset Filter
                            </button>
                        )}
                    </div>
                </div>

                {/* Services Table */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                    <th className="px-4 py-3 text-left">ID</th>
                                    <th className="px-4 py-3 text-left">
                                        Nama Layanan
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Kategori
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Harga Asli
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Harga Jual
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Min/Max
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
                                {services.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="px-4 py-12 text-center"
                                        >
                                            <Package className="mx-auto h-12 w-12 text-slate-300" />
                                            <p className="mt-2 text-sm text-slate-400">
                                                {hasActiveFilters
                                                    ? 'Tidak ada layanan yang cocok dengan filter.'
                                                    : 'Belum ada layanan. Sync dari provider untuk menambahkan layanan.'}
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    services.data.map((service) => (
                                        <tr
                                            key={service.id}
                                            className={`hover:bg-slate-50/50 ${!service.is_active ? 'opacity-50' : ''}`}
                                        >
                                            <td className="px-4 py-3">
                                                <div>
                                                    <span className="text-xs font-bold text-slate-700">
                                                        #{service.id}
                                                    </span>
                                                    <p className="text-[10px] text-slate-400">
                                                        SVC:{' '}
                                                        {
                                                            service.provider_service_id
                                                        }
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="max-w-[280px] px-4 py-3">
                                                <span className="line-clamp-2 text-xs text-slate-700">
                                                    {service.name}
                                                </span>
                                                {service.refill && (
                                                    <span className="ml-1 inline-flex items-center rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-bold text-blue-600">
                                                        REFILL
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600">
                                                    {service.category}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-slate-500">
                                                    {formatCurrency(
                                                        service.original_price,
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs font-bold text-[#02c39a]">
                                                    {formatCurrency(
                                                        service.price,
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-slate-600">
                                                    {service.min.toLocaleString()}{' '}
                                                    -{' '}
                                                    {service.max.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-slate-600">
                                                    {service.provider_name}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold ${
                                                        service.is_active
                                                            ? 'bg-emerald-50 text-emerald-600'
                                                            : 'bg-slate-100 text-slate-500'
                                                    }`}
                                                >
                                                    {service.is_active
                                                        ? 'Aktif'
                                                        : 'Nonaktif'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() =>
                                                            openEditModal(
                                                                service,
                                                            )
                                                        }
                                                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600"
                                                        title="Edit Harga"
                                                    >
                                                        <Edit className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleToggle(
                                                                service,
                                                            )
                                                        }
                                                        className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                                                            service.is_active
                                                                ? 'bg-slate-100 text-slate-500 hover:bg-amber-100 hover:text-amber-600'
                                                                : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                                                        }`}
                                                        title={
                                                            service.is_active
                                                                ? 'Nonaktifkan'
                                                                : 'Aktifkan'
                                                        }
                                                    >
                                                        <Power className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openDeleteModal(
                                                                service,
                                                            )
                                                        }
                                                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-600"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
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
                    {services.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                            <p className="text-xs text-slate-500">
                                Menampilkan {services.from}-{services.to} dari{' '}
                                {services.total.toLocaleString()} layanan
                            </p>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() =>
                                        goToPage(services.links[0]?.url)
                                    }
                                    disabled={!services.links[0]?.url}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>

                                {services.links
                                    .slice(1, -1)
                                    .map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToPage(link.url)}
                                            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                                                link.active
                                                    ? 'bg-[#02c39a] text-white'
                                                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}

                                <button
                                    onClick={() =>
                                        goToPage(
                                            services.links[
                                                services.links.length - 1
                                            ]?.url,
                                        )
                                    }
                                    disabled={
                                        !services.links[
                                            services.links.length - 1
                                        ]?.url
                                    }
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Price Modal */}
            <Modal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                title="Edit Harga Layanan"
            >
                <div className="space-y-4">
                    <div className="rounded-lg bg-slate-50 p-4">
                        <p className="text-sm font-medium text-slate-700">
                            {selectedService?.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            Harga asli:{' '}
                            {selectedService &&
                                formatCurrency(selectedService.original_price)}
                        </p>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700">
                            Harga Jual Baru
                        </label>
                        <input
                            type="number"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            min="0"
                            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        />
                        <p className="mt-1 text-[10px] text-slate-400">
                            Margin:{' '}
                            {selectedService &&
                                formatCurrency(
                                    Number(newPrice) -
                                        selectedService.original_price,
                                )}
                        </p>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleUpdatePrice}
                            className="flex-1 rounded-lg bg-[#02c39a] py-2.5 text-sm font-bold text-white hover:bg-[#00a884]"
                        >
                            Update Harga
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Delete Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Hapus Layanan"
            >
                <div className="space-y-4">
                    <div className="rounded-lg bg-rose-50 p-4 text-center">
                        <Trash2 className="mx-auto h-12 w-12 text-rose-400" />
                        <p className="mt-2 text-sm text-rose-700">
                            Apakah Anda yakin ingin menghapus layanan ini?
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs text-rose-500">
                            {selectedService?.name}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex-1 rounded-lg bg-rose-500 py-2.5 text-sm font-bold text-white hover:bg-rose-600"
                        >
                            Ya, Hapus
                        </button>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
