import AdminLayout from '@/layouts/admin-layout';
import { Head, router, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    CheckCircle,
    ChevronDown,
    Edit,
    Loader2,
    Plus,
    Power,
    RefreshCw,
    Trash2,
    Wifi,
    WifiOff,
    X,
    Zap,
} from 'lucide-react';
import { useState } from 'react';

interface Provider {
    id: number;
    name: string;
    slug: string;
    api_url: string;
    api_id: string;
    api_key_masked: string;
    status: 'online' | 'warning' | 'offline';
    is_active: boolean;
    balance: number;
    default_margin: number;
    margin_type: 'fixed' | 'percentage';
    services_count: number;
    response_time: string;
    last_check: string;
    last_sync: string;
    created_at: string;
}

interface Props {
    providers: Provider[];
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

export default function AdminProviders({ providers }: Props) {
    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showTestModal, setShowTestModal] = useState(false);
    const [showSyncModal, setShowSyncModal] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(false);
    const [testResult, setTestResult] = useState<{
        success: boolean;
        message: string;
    } | null>(null);
    const [syncResult, setSyncResult] = useState<{
        success: boolean;
        message: string;
    } | null>(null);

    // Sync form with margin
    const [syncMargin, setSyncMargin] = useState('0');
    const [syncMarginType, setSyncMarginType] = useState<
        'fixed' | 'percentage'
    >('fixed');

    // Form for add/edit
    const form = useForm({
        name: '',
        api_url: '',
        api_id: '',
        api_key: '',
        default_margin: '0',
        margin_type: 'fixed' as 'fixed' | 'percentage',
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'online':
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Online
                    </span>
                );
            case 'warning':
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        Warning
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                        Offline
                    </span>
                );
        }
    };

    // Handlers
    const openAddModal = () => {
        form.reset();
        form.setData({
            name: '',
            api_url: 'https://api.medanpedia.co.id',
            api_id: '',
            api_key: '',
            default_margin: '0',
            margin_type: 'fixed',
        });
        setShowAddModal(true);
    };

    const openEditModal = (provider: Provider) => {
        setSelectedProvider(provider);
        form.setData({
            name: provider.name,
            api_url: provider.api_url,
            api_id: provider.api_id || '',
            api_key: '',
            default_margin: String(provider.default_margin || 0),
            margin_type: provider.margin_type || 'fixed',
        });
        setShowEditModal(true);
    };

    const openDeleteModal = (provider: Provider) => {
        setSelectedProvider(provider);
        setShowDeleteModal(true);
    };

    const openTestModal = (provider: Provider) => {
        setSelectedProvider(provider);
        setTestResult(null);
        setShowTestModal(true);
    };

    const openSyncModal = (provider: Provider) => {
        setSelectedProvider(provider);
        setSyncResult(null);
        setSyncMargin(String(provider.default_margin || 0));
        setSyncMarginType(provider.margin_type || 'fixed');
        setShowSyncModal(true);
    };

    const handleAdd = () => {
        form.post('/admin/providers', {
            onSuccess: () => {
                setShowAddModal(false);
                form.reset();
            },
        });
    };

    const handleEdit = () => {
        if (!selectedProvider) return;
        form.put(`/admin/providers/${selectedProvider.id}`, {
            onSuccess: () => {
                setShowEditModal(false);
                form.reset();
            },
        });
    };

    const handleDelete = () => {
        if (!selectedProvider) return;
        router.delete(`/admin/providers/${selectedProvider.id}`, {
            onSuccess: () => setShowDeleteModal(false),
        });
    };

    const handleToggle = (provider: Provider) => {
        router.post(`/admin/providers/${provider.id}/toggle`);
    };

    const handleTest = () => {
        if (!selectedProvider) return;
        setIsLoading(true);
        setTestResult(null);

        router.post(
            `/admin/providers/${selectedProvider.id}/test`,
            {},
            {
                onSuccess: (page) => {
                    const flash = (
                        page.props as { flash?: { success?: string } }
                    ).flash;
                    setTestResult({
                        success: true,
                        message: flash?.success || 'Koneksi berhasil!',
                    });
                    setIsLoading(false);
                },
                onError: (errors) => {
                    setTestResult({
                        success: false,
                        message: errors.connection || 'Koneksi gagal',
                    });
                    setIsLoading(false);
                },
                preserveScroll: true,
            },
        );
    };

    const handleSync = () => {
        if (!selectedProvider) return;
        setIsLoading(true);
        setSyncResult(null);

        router.post(
            `/admin/providers/${selectedProvider.id}/sync`,
            {
                margin: syncMargin,
                margin_type: syncMarginType,
            },
            {
                onSuccess: (page) => {
                    const flash = (
                        page.props as { flash?: { success?: string } }
                    ).flash;
                    setSyncResult({
                        success: true,
                        message:
                            flash?.success || 'Sinkronisasi layanan berhasil!',
                    });
                    setIsLoading(false);
                },
                onError: (errors) => {
                    setSyncResult({
                        success: false,
                        message: errors.sync || 'Sinkronisasi gagal',
                    });
                    setIsLoading(false);
                },
                preserveScroll: true,
            },
        );
    };

    return (
        <AdminLayout title="Provider API">
            <Head title="Provider API - Admin" />

            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-slate-500">
                            Kelola provider API untuk layanan SMM Panel
                        </p>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 rounded-lg bg-[#02c39a] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#00a884]"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Provider
                    </button>
                </div>

                {/* Providers Table */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                    <th className="px-4 py-3 text-left">
                                        Provider
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        API URL
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Margin
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Layanan
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Saldo
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Last Sync
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {providers.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="px-4 py-12 text-center"
                                        >
                                            <WifiOff className="mx-auto h-12 w-12 text-slate-300" />
                                            <p className="mt-2 text-sm text-slate-400">
                                                Belum ada provider.
                                            </p>
                                            <button
                                                onClick={openAddModal}
                                                className="mt-3 text-sm font-bold text-[#02c39a] hover:underline"
                                            >
                                                + Tambah Provider Pertama
                                            </button>
                                        </td>
                                    </tr>
                                ) : (
                                    providers.map((provider) => (
                                        <tr
                                            key={provider.id}
                                            className={`hover:bg-slate-50/50 ${!provider.is_active ? 'opacity-50' : ''}`}
                                        >
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                                            provider.status ===
                                                            'online'
                                                                ? 'bg-emerald-100 text-emerald-600'
                                                                : provider.status ===
                                                                    'warning'
                                                                  ? 'bg-amber-100 text-amber-600'
                                                                  : 'bg-slate-100 text-slate-400'
                                                        }`}
                                                    >
                                                        <Wifi className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-700">
                                                            {provider.name}
                                                        </p>
                                                        <p className="text-[10px] text-slate-400">
                                                            ID:{' '}
                                                            {provider.api_id ||
                                                                '-'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-indigo-600">
                                                    {provider.api_url}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                {getStatusBadge(
                                                    provider.status,
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs font-bold text-amber-600">
                                                    {provider.margin_type ===
                                                    'percentage'
                                                        ? `+${provider.default_margin}%`
                                                        : `+${formatCurrency(provider.default_margin)}`}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs font-bold text-slate-700">
                                                    {provider.services_count}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs font-bold text-[#02c39a]">
                                                    {formatCurrency(
                                                        provider.balance,
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-slate-500">
                                                    {provider.last_sync}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() =>
                                                            openTestModal(
                                                                provider,
                                                            )
                                                        }
                                                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                                                        title="Test Koneksi"
                                                    >
                                                        <Zap className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openSyncModal(
                                                                provider,
                                                            )
                                                        }
                                                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                                                        title="Sync Layanan"
                                                    >
                                                        <RefreshCw className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openEditModal(
                                                                provider,
                                                            )
                                                        }
                                                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-amber-100 hover:text-amber-600"
                                                        title="Edit"
                                                    >
                                                        <Edit className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleToggle(
                                                                provider,
                                                            )
                                                        }
                                                        className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                                                            provider.is_active
                                                                ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                                                                : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                                        }`}
                                                        title={
                                                            provider.is_active
                                                                ? 'Nonaktifkan'
                                                                : 'Aktifkan'
                                                        }
                                                    >
                                                        <Power className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openDeleteModal(
                                                                provider,
                                                            )
                                                        }
                                                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-400 hover:bg-rose-100 hover:text-rose-600"
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
                </div>
            </div>

            {/* Add Provider Modal */}
            <Modal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Tambah Provider"
            >
                <div className="space-y-4">
                    <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700">
                            Nama Provider
                        </label>
                        <input
                            type="text"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData('name', e.target.value)
                            }
                            placeholder="Contoh: Medanpedia"
                            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        />
                        {form.errors.name && (
                            <p className="mt-1 text-xs text-rose-500">
                                {form.errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700">
                            API URL
                        </label>
                        <input
                            type="url"
                            value={form.data.api_url}
                            onChange={(e) =>
                                form.setData('api_url', e.target.value)
                            }
                            placeholder="https://api.provider.com"
                            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        />
                        {form.errors.api_url && (
                            <p className="mt-1 text-xs text-rose-500">
                                {form.errors.api_url}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                API ID
                            </label>
                            <input
                                type="text"
                                value={form.data.api_id}
                                onChange={(e) =>
                                    form.setData('api_id', e.target.value)
                                }
                                placeholder="API ID"
                                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                API Key
                            </label>
                            <input
                                type="text"
                                value={form.data.api_key}
                                onChange={(e) =>
                                    form.setData('api_key', e.target.value)
                                }
                                placeholder="API Key"
                                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                            />
                            {form.errors.api_key && (
                                <p className="mt-1 text-xs text-rose-500">
                                    {form.errors.api_key}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                Default Margin
                            </label>
                            <input
                                type="number"
                                value={form.data.default_margin}
                                onChange={(e) =>
                                    form.setData(
                                        'default_margin',
                                        e.target.value,
                                    )
                                }
                                placeholder="0"
                                min="0"
                                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                Tipe Margin
                            </label>
                            <div className="relative">
                                <select
                                    value={form.data.margin_type}
                                    onChange={(e) =>
                                        form.setData(
                                            'margin_type',
                                            e.target.value as
                                                | 'fixed'
                                                | 'percentage',
                                        )
                                    }
                                    className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                >
                                    <option value="fixed">Nominal (Rp)</option>
                                    <option value="percentage">
                                        Persentase (%)
                                    </option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg bg-amber-50 p-3">
                        <p className="text-xs text-amber-700">
                            <strong>Contoh:</strong> Jika harga provider Rp
                            2.000 dan margin{' '}
                            {form.data.margin_type === 'fixed'
                                ? `Rp ${Number(form.data.default_margin).toLocaleString('id-ID')}`
                                : `${form.data.default_margin}%`}
                            , maka harga jual menjadi{' '}
                            <strong>
                                Rp{' '}
                                {form.data.margin_type === 'fixed'
                                    ? (
                                          2000 +
                                          Number(form.data.default_margin)
                                      ).toLocaleString('id-ID')
                                    : (
                                          2000 +
                                          (2000 *
                                              Number(
                                                  form.data.default_margin,
                                              )) /
                                              100
                                      ).toLocaleString('id-ID')}
                            </strong>
                        </p>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button
                            onClick={() => setShowAddModal(false)}
                            className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleAdd}
                            disabled={form.processing}
                            className="flex-1 rounded-lg bg-[#02c39a] py-2.5 text-sm font-bold text-white hover:bg-[#00a884] disabled:opacity-50"
                        >
                            {form.processing
                                ? 'Menyimpan...'
                                : 'Simpan Provider'}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Edit Provider Modal */}
            <Modal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                title="Edit Provider"
            >
                <div className="space-y-4">
                    <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700">
                            Nama Provider
                        </label>
                        <input
                            type="text"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData('name', e.target.value)
                            }
                            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700">
                            API URL
                        </label>
                        <input
                            type="url"
                            value={form.data.api_url}
                            onChange={(e) =>
                                form.setData('api_url', e.target.value)
                            }
                            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                API ID
                            </label>
                            <input
                                type="text"
                                value={form.data.api_id}
                                onChange={(e) =>
                                    form.setData('api_id', e.target.value)
                                }
                                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                API Key Baru
                            </label>
                            <input
                                type="text"
                                value={form.data.api_key}
                                onChange={(e) =>
                                    form.setData('api_key', e.target.value)
                                }
                                placeholder="Kosongkan jika tidak diubah"
                                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                Default Margin
                            </label>
                            <input
                                type="number"
                                value={form.data.default_margin}
                                onChange={(e) =>
                                    form.setData(
                                        'default_margin',
                                        e.target.value,
                                    )
                                }
                                min="0"
                                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                Tipe Margin
                            </label>
                            <div className="relative">
                                <select
                                    value={form.data.margin_type}
                                    onChange={(e) =>
                                        form.setData(
                                            'margin_type',
                                            e.target.value as
                                                | 'fixed'
                                                | 'percentage',
                                        )
                                    }
                                    className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                >
                                    <option value="fixed">Nominal (Rp)</option>
                                    <option value="percentage">
                                        Persentase (%)
                                    </option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            </div>
                        </div>
                    </div>

                    <p className="text-[10px] text-slate-400">
                        API Key saat ini: {selectedProvider?.api_key_masked}
                    </p>

                    <div className="flex gap-2 pt-2">
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleEdit}
                            disabled={form.processing}
                            className="flex-1 rounded-lg bg-[#02c39a] py-2.5 text-sm font-bold text-white hover:bg-[#00a884] disabled:opacity-50"
                        >
                            {form.processing
                                ? 'Menyimpan...'
                                : 'Update Provider'}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Delete Provider Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Hapus Provider"
            >
                <div className="space-y-4">
                    <div className="rounded-lg bg-rose-50 p-4 text-center">
                        <Trash2 className="mx-auto h-12 w-12 text-rose-400" />
                        <p className="mt-2 text-sm text-rose-700">
                            Apakah Anda yakin ingin menghapus provider{' '}
                            <strong>{selectedProvider?.name}</strong>?
                        </p>
                        <p className="mt-1 text-xs text-rose-500">
                            Semua layanan dari provider ini juga akan dihapus.
                            Tindakan ini tidak dapat dibatalkan.
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
                            Ya, Hapus Provider
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Test Connection Modal */}
            <Modal
                isOpen={showTestModal}
                onClose={() => setShowTestModal(false)}
                title="Test Koneksi"
            >
                <div className="space-y-4">
                    <div className="rounded-lg bg-slate-50 p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                                <Wifi className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">
                                    {selectedProvider?.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {selectedProvider?.api_url}
                                </p>
                            </div>
                        </div>
                    </div>

                    {testResult && (
                        <div
                            className={`rounded-lg p-4 ${testResult.success ? 'bg-emerald-50' : 'bg-rose-50'}`}
                        >
                            <div className="flex items-center gap-2">
                                {testResult.success ? (
                                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                                ) : (
                                    <AlertCircle className="h-5 w-5 text-rose-500" />
                                )}
                                <p
                                    className={`text-sm font-medium ${testResult.success ? 'text-emerald-700' : 'text-rose-700'}`}
                                >
                                    {testResult.message}
                                </p>
                            </div>
                        </div>
                    )}

                    {!testResult && !isLoading && (
                        <p className="text-center text-sm text-slate-500">
                            Tekan tombol di bawah untuk menguji koneksi ke
                            provider API.
                        </p>
                    )}

                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowTestModal(false)}
                            className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                        >
                            Tutup
                        </button>
                        <button
                            onClick={handleTest}
                            disabled={isLoading}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-500 py-2.5 text-sm font-bold text-white hover:bg-indigo-600 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Testing...
                                </>
                            ) : (
                                <>
                                    <Zap className="h-4 w-4" />
                                    Test Koneksi
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Sync Services Modal with Margin */}
            <Modal
                isOpen={showSyncModal}
                onClose={() => setShowSyncModal(false)}
                title="Sync Layanan"
            >
                <div className="space-y-4">
                    <div className="rounded-lg bg-slate-50 p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                <RefreshCw className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">
                                    {selectedProvider?.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Layanan saat ini:{' '}
                                    {selectedProvider?.services_count} | Last
                                    sync: {selectedProvider?.last_sync}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Margin Settings */}
                    <div className="space-y-3 rounded-lg border border-slate-200 p-4">
                        <h4 className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                            Pengaturan Margin Harga
                        </h4>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="mb-1 block text-xs font-medium text-slate-600">
                                    Nilai Margin
                                </label>
                                <input
                                    type="number"
                                    value={syncMargin}
                                    onChange={(e) =>
                                        setSyncMargin(e.target.value)
                                    }
                                    min="0"
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-medium text-slate-600">
                                    Tipe Margin
                                </label>
                                <div className="relative">
                                    <select
                                        value={syncMarginType}
                                        onChange={(e) =>
                                            setSyncMarginType(
                                                e.target.value as
                                                    | 'fixed'
                                                    | 'percentage',
                                            )
                                        }
                                        className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                    >
                                        <option value="fixed">
                                            Nominal (Rp)
                                        </option>
                                        <option value="percentage">
                                            Persentase (%)
                                        </option>
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-amber-50 p-3">
                            <p className="text-xs text-amber-700">
                                <strong>Contoh:</strong> Harga provider Rp 2.000
                                + margin{' '}
                                {syncMarginType === 'fixed'
                                    ? `Rp ${Number(syncMargin).toLocaleString('id-ID')}`
                                    : `${syncMargin}%`}{' '}
                                =
                                <strong className="text-amber-800">
                                    {' '}
                                    Harga jual Rp{' '}
                                    {syncMarginType === 'fixed'
                                        ? (
                                              2000 + Number(syncMargin)
                                          ).toLocaleString('id-ID')
                                        : (
                                              2000 +
                                              (2000 * Number(syncMargin)) / 100
                                          ).toLocaleString('id-ID')}
                                </strong>
                            </p>
                        </div>
                    </div>

                    {syncResult && (
                        <div
                            className={`rounded-lg p-4 ${syncResult.success ? 'bg-emerald-50' : 'bg-rose-50'}`}
                        >
                            <div className="flex items-center gap-2">
                                {syncResult.success ? (
                                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                                ) : (
                                    <AlertCircle className="h-5 w-5 text-rose-500" />
                                )}
                                <p
                                    className={`text-sm font-medium ${syncResult.success ? 'text-emerald-700' : 'text-rose-700'}`}
                                >
                                    {syncResult.message}
                                </p>
                            </div>
                        </div>
                    )}

                    {!syncResult && !isLoading && (
                        <div className="rounded-lg bg-blue-50 p-3">
                            <p className="text-xs text-blue-700">
                                <strong>Info:</strong> Proses sinkronisasi akan
                                mengambil semua layanan dari provider dan
                                menerapkan margin harga yang sudah ditentukan.
                            </p>
                        </div>
                    )}

                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowSyncModal(false)}
                            className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                        >
                            Tutup
                        </button>
                        <button
                            onClick={handleSync}
                            disabled={isLoading}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-500 py-2.5 text-sm font-bold text-white hover:bg-blue-600 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Syncing...
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="h-4 w-4" />
                                    Sync Sekarang
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
