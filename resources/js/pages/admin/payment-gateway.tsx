import AdminLayout from '@/layouts/admin-layout';
import { router, usePage } from '@inertiajs/react';
import {
    AlertTriangle,
    CheckCircle,
    CreditCard,
    DollarSign,
    Edit3,
    Power,
    RefreshCw,
    ToggleLeft,
    ToggleRight,
    Wallet,
    Wifi,
    X,
    Zap,
} from 'lucide-react';
import { useState } from 'react';

interface PaymentChannel {
    id: number;
    code: string;
    name: string;
    category: string;
    category_label: string;
    provider: string;
    fee_flat: number;
    fee_percent: number;
    formatted_fee: string;
    min_amount: number;
    max_amount: number;
    is_active: boolean;
}

interface MerchantInfo {
    saldo: number;
    nama: string;
}

interface Stats {
    total: number;
    active: number;
    inactive: number;
}

export default function PaymentGateway() {
    const page = usePage<{
        groupedChannels: Record<string, PaymentChannel[]>;
        merchantInfo: MerchantInfo | null;
        stats: Stats;
        hasCredentials: boolean;
        flash?: { success?: string; error?: string };
        errors?: { connection?: string };
    }>();

    const {
        groupedChannels,
        merchantInfo,
        stats,
        hasCredentials,
        flash,
        errors,
    } = page.props;

    const [activeTab, setActiveTab] = useState<string>('virtual_account');
    const [editingChannel, setEditingChannel] = useState<PaymentChannel | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(false);
    const [showFeeModal, setShowFeeModal] = useState(false);

    // Fee form state
    const [feeFlat, setFeeFlat] = useState(0);
    const [feePercent, setFeePercent] = useState(0);
    const [minAmount, setMinAmount] = useState(10000);
    const [maxAmount, setMaxAmount] = useState(10000000);

    const tabs = [
        { key: 'virtual_account', label: 'Virtual Account', icon: CreditCard },
        { key: 'emoney', label: 'E-Money', icon: Wallet },
        { key: 'qris', label: 'QRIS', icon: Zap },
    ];

    const handleToggle = (channel: PaymentChannel) => {
        router.post(
            `/admin/payment-gateway/${channel.id}/toggle`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const handleTestConnection = () => {
        setIsLoading(true);
        router.post(
            '/admin/payment-gateway/test',
            {},
            {
                preserveScroll: true,
                onFinish: () => setIsLoading(false),
            },
        );
    };

    const handleSync = () => {
        setIsLoading(true);
        router.post(
            '/admin/payment-gateway/sync',
            {},
            {
                preserveScroll: true,
                onFinish: () => setIsLoading(false),
            },
        );
    };

    const openFeeModal = (channel: PaymentChannel) => {
        setEditingChannel(channel);
        setFeeFlat(channel.fee_flat);
        setFeePercent(channel.fee_percent);
        setMinAmount(channel.min_amount);
        setMaxAmount(channel.max_amount);
        setShowFeeModal(true);
    };

    const handleUpdateFee = () => {
        if (!editingChannel) return;

        router.put(
            `/admin/payment-gateway/${editingChannel.id}/fee`,
            {
                fee_flat: feeFlat,
                fee_percent: feePercent,
                min_amount: minAmount,
                max_amount: maxAmount,
            },
            {
                preserveScroll: true,
                onSuccess: () => setShowFeeModal(false),
            },
        );
    };

    const filteredChannels = groupedChannels[activeTab] || [];

    return (
        <AdminLayout title="Payment Gateway">
            <div className="space-y-6">
                {/* Success Message */}
                {flash?.success && (
                    <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-700">
                            {flash.success}
                        </span>
                    </div>
                )}

                {/* Error Message from flash */}
                {flash?.error && (
                    <div className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
                        <AlertTriangle className="h-5 w-5 text-rose-600" />
                        <span className="text-sm font-medium text-rose-700">
                            {flash.error}
                        </span>
                    </div>
                )}

                {/* Error Message from validation errors */}
                {errors?.connection && (
                    <div className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
                        <AlertTriangle className="h-5 w-5 text-rose-600" />
                        <span className="text-sm font-medium text-rose-700">
                            {errors.connection}
                        </span>
                    </div>
                )}

                {/* Header Card */}
                <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white">
                    <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4">
                        <div className="h-64 w-64 rounded-full bg-[#02c39a]/10 blur-3xl" />
                    </div>
                    <div className="relative flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#02c39a]/20 ring-1 ring-[#02c39a]/30">
                                <CreditCard className="h-7 w-7 text-[#02c39a]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">
                                    TokoPay Payment Gateway
                                </h2>
                                <p className="text-sm text-slate-400">
                                    Kelola metode pembayaran untuk deposit saldo
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleSync}
                                disabled={isLoading}
                                className="flex items-center gap-2 rounded-xl bg-slate-700 px-4 py-2.5 text-sm font-medium transition-all hover:bg-slate-600 disabled:opacity-50"
                            >
                                <RefreshCw
                                    className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
                                />
                                Sync Channel
                            </button>
                            <button
                                onClick={handleTestConnection}
                                disabled={isLoading || !hasCredentials}
                                className="flex items-center gap-2 rounded-xl bg-[#02c39a] px-4 py-2.5 text-sm font-bold shadow-lg shadow-[#02c39a]/25 transition-all hover:bg-[#00a884] disabled:opacity-50"
                            >
                                <Wifi className="h-4 w-4" />
                                Test Koneksi
                            </button>
                        </div>
                    </div>

                    {/* Merchant Info */}
                    {merchantInfo && (
                        <div className="mt-4 flex items-center gap-6 rounded-xl bg-white/5 px-4 py-3">
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-[#02c39a]" />
                                <span className="text-sm text-slate-400">
                                    Saldo Merchant:
                                </span>
                                <span className="text-sm font-bold text-white">
                                    Rp{' '}
                                    {Number(merchantInfo.saldo).toLocaleString(
                                        'id-ID',
                                    )}
                                </span>
                            </div>
                        </div>
                    )}

                    {!hasCredentials && (
                        <div className="mt-4 flex items-center gap-3 rounded-xl bg-amber-500/20 px-4 py-3">
                            <AlertTriangle className="h-5 w-5 text-amber-400" />
                            <span className="text-sm text-amber-200">
                                Kredensial TokoPay belum dikonfigurasi.
                                Tambahkan TOKOPAY_MERCHANT_ID dan
                                TOKOPAY_SECRET_KEY di file .env
                            </span>
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                                <CreditCard className="h-5 w-5 text-slate-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">
                                    {stats.total}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Total Channel
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                                <CheckCircle className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">
                                    {stats.active}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Channel Aktif
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100">
                                <Power className="h-5 w-5 text-rose-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">
                                    {stats.inactive}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Channel Nonaktif
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs & Table */}
                <div className="rounded-2xl border border-slate-200 bg-white">
                    {/* Tabs */}
                    <div className="flex border-b border-slate-200">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all ${
                                        activeTab === tab.key
                                            ? 'border-b-2 border-[#02c39a] text-[#02c39a]'
                                            : 'text-slate-500 hover:text-slate-700'
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50">
                                    <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                                        Channel
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                                        Kode
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                                        Biaya
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                                        Min / Max
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-bold tracking-wider text-slate-500 uppercase">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-bold tracking-wider text-slate-500 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredChannels.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-6 py-12 text-center"
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <CreditCard className="h-10 w-10 text-slate-300" />
                                                <p className="text-sm text-slate-500">
                                                    Tidak ada channel. Klik
                                                    "Sync Channel" untuk
                                                    menambahkan.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredChannels.map((channel) => (
                                        <tr
                                            key={channel.id}
                                            className="hover:bg-slate-50"
                                        >
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-slate-800">
                                                    {channel.name}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <code className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                                                    {channel.code}
                                                </code>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-600">
                                                    {channel.formatted_fee}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-600">
                                                    Rp{' '}
                                                    {channel.min_amount.toLocaleString(
                                                        'id-ID',
                                                    )}{' '}
                                                    - Rp{' '}
                                                    {channel.max_amount.toLocaleString(
                                                        'id-ID',
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() =>
                                                        handleToggle(channel)
                                                    }
                                                    className="inline-flex items-center"
                                                    title={
                                                        channel.is_active
                                                            ? 'Nonaktifkan'
                                                            : 'Aktifkan'
                                                    }
                                                >
                                                    {channel.is_active ? (
                                                        <ToggleRight className="h-8 w-8 text-[#02c39a]" />
                                                    ) : (
                                                        <ToggleLeft className="h-8 w-8 text-slate-300" />
                                                    )}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() =>
                                                        openFeeModal(channel)
                                                    }
                                                    className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                                                    title="Edit Fee"
                                                >
                                                    <Edit3 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Fee Edit Modal */}
            {showFeeModal && editingChannel && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                        onClick={() => setShowFeeModal(false)}
                    />
                    <div className="relative z-10 mx-4 w-full max-w-md">
                        <div className="rounded-2xl bg-white shadow-2xl">
                            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                                <h3 className="text-lg font-bold text-slate-800">
                                    Edit Fee: {editingChannel.name}
                                </h3>
                                <button
                                    onClick={() => setShowFeeModal(false)}
                                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="space-y-4 p-6">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700">
                                        Fee Tetap (Rp)
                                    </label>
                                    <input
                                        type="number"
                                        value={feeFlat}
                                        onChange={(e) =>
                                            setFeeFlat(Number(e.target.value))
                                        }
                                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/20"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700">
                                        Fee Persen (%)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={feePercent}
                                        onChange={(e) =>
                                            setFeePercent(
                                                Number(e.target.value),
                                            )
                                        }
                                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/20"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            Min Amount (Rp)
                                        </label>
                                        <input
                                            type="number"
                                            value={minAmount}
                                            onChange={(e) =>
                                                setMinAmount(
                                                    Number(e.target.value),
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            Max Amount (Rp)
                                        </label>
                                        <input
                                            type="number"
                                            value={maxAmount}
                                            onChange={(e) =>
                                                setMaxAmount(
                                                    Number(e.target.value),
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/20"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
                                <button
                                    onClick={() => setShowFeeModal(false)}
                                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleUpdateFee}
                                    className="rounded-xl bg-[#02c39a] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#02c39a]/25 hover:bg-[#00a884]"
                                >
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
