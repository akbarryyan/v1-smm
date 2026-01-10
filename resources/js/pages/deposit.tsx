import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    Banknote,
    CreditCard,
    Gift,
    Info,
    Loader2,
    QrCode,
    Wallet,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Deposit',
        href: '/deposit',
    },
];

interface PaymentChannel {
    id: number;
    code: string;
    name: string;
    category: string;
    category_label: string;
    fee_flat: number;
    fee_percent: number;
    formatted_fee: string;
    min_amount: number;
    max_amount: number;
}

// Bonus percentage based on deposit amount (can be configured)
const BONUS_PERCENT = 0; // Set to 0 for no bonus, or any number for bonus

export default function Deposit() {
    const { groupedChannels } = usePage<{
        groupedChannels: Record<string, PaymentChannel[]>;
    }>().props;

    const [activeCategory, setActiveCategory] =
        useState<string>('virtual_account');
    const [selectedChannel, setSelectedChannel] =
        useState<PaymentChannel | null>(null);
    const [amount, setAmount] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = [
        { key: 'virtual_account', label: 'Virtual Account', icon: Banknote },
        { key: 'emoney', label: 'E-Money', icon: Wallet },
        { key: 'qris', label: 'QRIS', icon: QrCode },
    ];

    const activeChannels = groupedChannels[activeCategory] || [];

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'virtual_account':
                return 'VA';
            case 'emoney':
                return 'E-W';
            case 'qris':
                return 'QRIS';
            default:
                return '💳';
        }
    };

    // Calculate fee and final amount
    const numericAmount = parseInt(amount.replace(/\D/g, '')) || 0;
    const fee = selectedChannel
        ? selectedChannel.fee_flat +
          (numericAmount * selectedChannel.fee_percent) / 100
        : 0;
    const bonus = BONUS_PERCENT > 0 ? (numericAmount * BONUS_PERCENT) / 100 : 0;
    const totalReceived = numericAmount + bonus;

    // Format number with thousand separator
    const formatNumber = (num: number) => {
        return num.toLocaleString('id-ID');
    };

    // Handle amount input
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setAmount(value);
    };

    // Reset form when changing category - moved to click handler to avoid effect lint
    // useEffect(() => {
    //    setSelectedChannel(null);
    //    setAmount('');
    // }, [activeCategory]);

    // Handle category change
    const handleCategoryChange = (key: string) => {
        setActiveCategory(key);
        setSelectedChannel(null);
        setAmount('');
    };

    // Handle channel selection
    const handleSelectChannel = (channel: PaymentChannel) => {
        setSelectedChannel(channel);
        setAmount('');
    };

    // Handle change method
    const handleChangeMethod = () => {
        setSelectedChannel(null);
        setAmount('');
    };

    // Handle submit
    const handleSubmit = () => {
        if (!selectedChannel || numericAmount < selectedChannel.min_amount)
            return;

        setIsSubmitting(true);
        router.post(
            '/deposit',
            {
                channel_id: selectedChannel.id,
                amount: numericAmount,
            },
            {
                onFinish: () => setIsSubmitting(false),
            },
        );
    };

    // Validation
    const isValidAmount = selectedChannel
        ? numericAmount >= selectedChannel.min_amount &&
          numericAmount <= selectedChannel.max_amount
        : false;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Deposit" />

            <div className="flex h-full flex-1 flex-col gap-4 bg-slate-50/50 p-4 sm:p-5">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="border-l-4 border-[#02c39a] pl-3 text-xl font-extrabold tracking-tight text-slate-900">
                        Deposit
                    </h2>
                    <p className="pl-3 text-xs font-medium text-slate-500">
                        Isi saldo akun Anda untuk melakukan pemesanan.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {/* Left Column - Deposit Methods */}
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                        {/* Header */}
                        <div className="flex items-center gap-2 border-b border-slate-100 bg-white px-5 py-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a]/10 text-[#02c39a]">
                                <CreditCard className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-800">
                                Deposit
                            </h3>
                        </div>

                        {selectedChannel ? (
                            // Show deposit form when channel is selected
                            <div className="p-5">
                                {/* Selected Channel Info */}
                                <div className="mb-5 rounded-xl border border-slate-200 p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#02c39a]/10 text-[9px] font-black text-[#02c39a]">
                                            {getCategoryIcon(
                                                selectedChannel.category,
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="text-sm leading-tight font-bold text-slate-800">
                                                {selectedChannel.name}
                                            </h4>
                                            <div className="mt-1 space-y-0.5 text-[11px] text-slate-500">
                                                <p>
                                                    Minimal Deposit:{' '}
                                                    <span className="font-bold text-slate-700">
                                                        Rp{' '}
                                                        {formatNumber(
                                                            selectedChannel.min_amount,
                                                        )}
                                                    </span>
                                                </p>
                                                <p>
                                                    Maksimal Deposit:{' '}
                                                    <span className="font-bold text-slate-700">
                                                        Rp{' '}
                                                        {formatNumber(
                                                            selectedChannel.max_amount,
                                                        )}
                                                    </span>
                                                </p>
                                                <p>
                                                    Jadwal Online:{' '}
                                                    <span className="font-bold text-slate-700">
                                                        24 Jam
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="w-full rounded-lg bg-[#02c39a] py-2 text-center text-xs font-bold text-white">
                                            Online [24 Jam]
                                        </div>
                                    </div>
                                </div>

                                {/* Bonus Section */}
                                <div className="mb-5 rounded-xl border border-slate-200 p-4">
                                    <div className="mb-3 flex items-center justify-center gap-2 text-sm font-bold text-slate-700">
                                        <Gift className="h-4 w-4 text-[#02c39a]" />
                                        Bonus Deposit
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div>
                                            <p className="text-xs text-slate-500">
                                                Jumlah Deposit (Minimal)
                                            </p>
                                            <p className="mt-1 text-sm font-bold text-slate-800">
                                                Rp{' '}
                                                {formatNumber(
                                                    selectedChannel.min_amount,
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">
                                                Bonus
                                            </p>
                                            <p className="mt-1 text-sm font-bold text-[#02c39a]">
                                                {BONUS_PERCENT}%
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Deposit Form */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                                Jumlah Deposit
                                            </label>
                                            <div className="flex overflow-hidden rounded-lg border border-slate-200 focus-within:border-[#02c39a] focus-within:ring-2 focus-within:ring-[#02c39a]/20">
                                                <span className="flex items-center bg-slate-50 px-3 text-sm font-medium text-slate-500">
                                                    Rp
                                                </span>
                                                <input
                                                    type="text"
                                                    value={
                                                        numericAmount > 0
                                                            ? formatNumber(
                                                                  numericAmount,
                                                              )
                                                            : ''
                                                    }
                                                    onChange={
                                                        handleAmountChange
                                                    }
                                                    placeholder="0"
                                                    className="w-full border-0 px-3 py-2.5 text-sm focus:ring-0"
                                                />
                                            </div>
                                            {numericAmount > 0 &&
                                                numericAmount <
                                                    selectedChannel.min_amount && (
                                                    <p className="mt-1 text-[10px] text-rose-500">
                                                        Minimal Rp{' '}
                                                        {formatNumber(
                                                            selectedChannel.min_amount,
                                                        )}
                                                    </p>
                                                )}
                                            {numericAmount >
                                                selectedChannel.max_amount && (
                                                <p className="mt-1 text-[10px] text-rose-500">
                                                    Maksimal Rp{' '}
                                                    {formatNumber(
                                                        selectedChannel.max_amount,
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                                Saldo Didapat
                                            </label>
                                            <div className="flex overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                                                <span className="flex items-center px-3 text-sm font-medium text-slate-500">
                                                    Rp
                                                </span>
                                                <input
                                                    type="text"
                                                    value={
                                                        totalReceived > 0
                                                            ? formatNumber(
                                                                  totalReceived,
                                                              )
                                                            : ''
                                                    }
                                                    readOnly
                                                    placeholder="0"
                                                    className="w-full border-0 bg-slate-50 px-3 py-2.5 text-sm font-bold text-slate-800 focus:ring-0"
                                                />
                                            </div>
                                            {BONUS_PERCENT > 0 &&
                                                numericAmount > 0 && (
                                                    <p className="mt-1 text-[10px] text-[#02c39a]">
                                                        +Rp{' '}
                                                        {formatNumber(bonus)}{' '}
                                                        bonus
                                                    </p>
                                                )}
                                        </div>
                                    </div>

                                    {/* Fee Info */}
                                    {numericAmount > 0 && (
                                        <div className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
                                            <span className="font-bold">
                                                Biaya Admin:
                                            </span>{' '}
                                            {selectedChannel.formatted_fee}
                                            {fee > 0 &&
                                                ` (Rp ${formatNumber(Math.round(fee))})`}
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <button
                                            onClick={handleChangeMethod}
                                            className="rounded-lg bg-slate-600 py-2.5 text-xs font-bold text-white transition-all hover:bg-slate-700"
                                        >
                                            Ganti Metode Pembayaran
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={
                                                !isValidAmount || isSubmitting
                                            }
                                            className="flex items-center justify-center gap-2 rounded-lg bg-[#02c39a] py-2.5 text-xs font-bold text-white transition-all hover:bg-[#00a884] disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {isSubmitting && (
                                                <Loader2 className="h-3 w-3 animate-spin" />
                                            )}
                                            Lanjutkan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Show channel list when no channel selected
                            <>
                                {/* Category Tabs */}
                                <div className="flex border-b border-slate-100">
                                    {categories.map((cat) => {
                                        const Icon = cat.icon;
                                        return (
                                            <button
                                                key={cat.key}
                                                onClick={() =>
                                                    handleCategoryChange(
                                                        cat.key,
                                                    )
                                                }
                                                className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 text-xs font-bold transition-all ${
                                                    activeCategory === cat.key
                                                        ? 'border-b-2 border-[#02c39a] bg-[#02c39a]/5 text-[#02c39a]'
                                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                                }`}
                                            >
                                                <Icon className="h-4 w-4" />
                                                <span className="hidden sm:inline">
                                                    {cat.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="space-y-3 p-4">
                                    {activeChannels.length === 0 ? (
                                        <div className="flex flex-col items-center gap-2 py-8 text-center">
                                            <CreditCard className="h-10 w-10 text-slate-300" />
                                            <p className="text-sm text-slate-500">
                                                Tidak ada metode pembayaran
                                                tersedia.
                                            </p>
                                        </div>
                                    ) : (
                                        activeChannels.map((channel) => (
                                            <div
                                                key={channel.id}
                                                onClick={() =>
                                                    handleSelectChannel(channel)
                                                }
                                                className="group cursor-pointer space-y-3 rounded-xl border border-slate-200 p-4 transition-all hover:border-[#02c39a] hover:shadow-md"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[9px] font-black text-slate-600 group-hover:bg-[#02c39a]/10 group-hover:text-[#02c39a]">
                                                        {getCategoryIcon(
                                                            channel.category,
                                                        )}
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <h4 className="text-sm leading-tight font-bold text-slate-800">
                                                            {channel.name}
                                                        </h4>
                                                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-500">
                                                            <p>
                                                                Minimal:{' '}
                                                                <span className="font-bold text-slate-700">
                                                                    Rp{' '}
                                                                    {formatNumber(
                                                                        channel.min_amount,
                                                                    )}
                                                                </span>
                                                            </p>
                                                            <p>
                                                                Maksimal:{' '}
                                                                <span className="font-bold text-slate-700">
                                                                    Rp{' '}
                                                                    {formatNumber(
                                                                        channel.max_amount,
                                                                    )}
                                                                </span>
                                                            </p>
                                                            <p className="col-span-2">
                                                                Biaya:{' '}
                                                                <span className="font-bold text-amber-600">
                                                                    {
                                                                        channel.formatted_fee
                                                                    }
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="w-full rounded-lg bg-[#02c39a] py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#00a884] hover:shadow-md">
                                                    Pilih {channel.name}
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Right Column - Information */}
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                        {/* Header */}
                        <div className="flex items-center gap-2 border-b border-slate-100 bg-white px-5 py-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
                                <Info className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-800">
                                Informasi
                            </h3>
                        </div>

                        <div className="space-y-5 p-5 text-sm text-slate-600">
                            {/* Quick Links */}
                            <div className="space-y-1">
                                <p>
                                    - Cara deposit melalui Bank :{' '}
                                    <a
                                        href="#"
                                        className="font-bold text-indigo-600 hover:underline"
                                    >
                                        MELALUI BANK
                                    </a>
                                </p>
                                <p>
                                    - Cara deposit melalui QRIS :{' '}
                                    <a
                                        href="#"
                                        className="font-bold text-indigo-600 hover:underline"
                                    >
                                        MELALUI QRIS
                                    </a>
                                </p>
                            </div>

                            {/* Langkah-langkah */}
                            <div>
                                <h4 className="mb-3 text-base font-black text-slate-800">
                                    Langkah-langkah:
                                </h4>
                                <ul className="space-y-2 text-xs leading-relaxed">
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>
                                            Pilih jenis pembayaran yang Anda
                                            inginkan, tersedia 2 opsi:{' '}
                                            <span className="font-bold text-slate-800">
                                                Transfer Bank
                                            </span>{' '}
                                            &{' '}
                                            <span className="font-bold text-slate-800">
                                                Transfer Pulsa
                                            </span>
                                            .
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>
                                            Pilih jenis permintaan yang Anda
                                            inginkan, tersedia 2 opsi:
                                        </span>
                                    </li>
                                    <li className="ml-4 flex items-start gap-2">
                                        <span className="text-slate-400">
                                            -
                                        </span>
                                        <span>
                                            <span className="font-bold text-slate-800">
                                                Otomatis:
                                            </span>{' '}
                                            Pembayaran Anda akan dikonfirmasi
                                            secara otomatis oleh sistem dalam
                                            5-10 menit setelah melakukan
                                            pembayaran.
                                        </span>
                                    </li>
                                    <li className="ml-4 flex items-start gap-2">
                                        <span className="text-slate-400">
                                            -
                                        </span>
                                        <span>
                                            <span className="font-bold text-slate-800">
                                                Manual:
                                            </span>{' '}
                                            Anda harus melakukan konfirmasi
                                            pembayaran pada Admin, agar
                                            permintaan deposit Anda dapat
                                            diterima.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>
                                            Pilih metode pembayaran yang Anda
                                            inginkan.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>Masukkan jumlah deposit.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>
                                            Jika Anda memilih jenis pembayaran{' '}
                                            <span className="font-bold text-slate-800">
                                                Transfer Bank
                                            </span>
                                            , Jumlah Deposit akan ditambahkan 3
                                            digit angka verifikasi pembayaran
                                            (Contoh: Jumlah Deposit 10.000 akan
                                            menjadi 10.323 atau 3 digit acak
                                            lainnya), nominal yang harus dibayar
                                            akan ditampilkan setelah Anda Klik
                                            Submit.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>
                                            Jika Anda memilih jenis pembayaran{' '}
                                            <span className="font-bold text-slate-800">
                                                Transfer Pulsa
                                            </span>
                                            , Anda diharuskan menginput nomor HP
                                            yang digunakan untuk transfer pulsa,
                                            gunakan awalan kode 62 bukan 0
                                            (Contoh: 6282272883762).
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            {/* Penting */}
                            <div>
                                <h4 className="mb-3 flex items-center gap-2 text-base font-black text-slate-800">
                                    <AlertCircle className="h-4 w-4 text-rose-500" />
                                    Penting:
                                </h4>
                                <ul className="space-y-2 text-xs leading-relaxed">
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>
                                            Anda hanya dapat memiliki maksimal 3
                                            permintaan deposit Pending, jadi
                                            jangan melakukan spam dan segera
                                            lunasi pembayaran.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>
                                            Jika permintaan deposit tidak
                                            dibayar dalam waktu lebih dari{' '}
                                            <span className="text-indigo-600">
                                                24 jam
                                            </span>
                                            , maka permintaan deposit akan
                                            otomatis dibatalkan.
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
