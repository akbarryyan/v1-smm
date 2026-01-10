import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import {
    AlertCircle,
    CheckCircle,
    Clock,
    Copy,
    CreditCard,
} from 'lucide-react';
import { useState } from 'react';

// Fungsi helper untuk copy text
const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Bisa tambah toast notification disini
};

interface Deposit {
    id: number;
    ref_id: string;
    trx_id?: string;
    amount: number;
    fee: number;
    total_bayar: number;
    status: string;
    paid_at?: string;
    expired_at?: string;
    nomor_va?: string;
    checkout_url?: string;
    pay_url?: string;
    qr_link?: string;
    qr_string?: string;
    channel: {
        name: string;
        category: string;
        code: string;
    };
    status_label: string;
    status_color: string;
}

export default function DepositShow({ deposit }: { deposit: Deposit }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        copyToClipboard(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const isPending = deposit.status === 'pending';
    const isPaid = deposit.status === 'paid';
    const isFailed = ['expired', 'failed', 'cancelled'].includes(
        deposit.status,
    );

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Deposit', href: '/deposit' },
                {
                    title: deposit.ref_id,
                    href: `/deposit/show/${deposit.ref_id}`,
                },
            ]}
        >
            <Head title={`Deposit #${deposit.ref_id}`} />

            <div className="flex h-full flex-1 flex-col gap-4 bg-slate-50/50 p-4 sm:p-5">
                <div className="mx-auto w-full max-w-2xl">
                    {/* Status Banner */}
                    <div
                        className={`mb-4 flex items-center justify-between rounded-xl px-5 py-4 ${
                            isPaid
                                ? 'bg-emerald-100 text-emerald-800'
                                : isFailed
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-amber-100 text-amber-800'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            {isPaid ? (
                                <CheckCircle className="h-6 w-6" />
                            ) : isFailed ? (
                                <AlertCircle className="h-6 w-6" />
                            ) : (
                                <Clock className="h-6 w-6 animate-pulse" />
                            )}

                            <div>
                                <h3 className="text-lg font-bold">
                                    {deposit.status_label}
                                </h3>
                                <p className="text-sm opacity-80">
                                    {isPending
                                        ? 'Silakan selesaikan pembayaran Anda.'
                                        : isPaid
                                          ? 'Pembayaran berhasil diterima.'
                                          : 'Transaksi telah berakhir.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details Card */}
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                        {/* Header */}
                        <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
                            <h2 className="text-sm font-bold tracking-wider text-slate-500 uppercase">
                                Detail Pembayaran
                            </h2>
                            <div className="mt-1 flex items-center justify-between">
                                <span className="text-2xl font-black text-slate-800">
                                    {formatRupiah(deposit.total_bayar)}
                                </span>
                                <span className="rounded bg-slate-200 px-2 py-1 text-xs font-bold text-slate-600">
                                    #{deposit.ref_id}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6 p-6">
                            {/* Method Info */}
                            <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
                                    <CreditCard className="h-6 w-6 text-slate-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">
                                        Metode Pembayaran
                                    </p>
                                    <p className="text-sm font-bold text-slate-800">
                                        {deposit.channel.name}
                                    </p>
                                </div>
                            </div>

                            {/* Payment Instructions based on Type */}
                            {isPending && (
                                <div className="space-y-6">
                                    {/* Virtual Account */}
                                    {deposit.nomor_va && (
                                        <div className="text-center">
                                            <p className="mb-2 text-sm text-slate-500">
                                                Nomor Virtual Account
                                            </p>
                                            <div className="flex items-center justify-center gap-3">
                                                <span className="font-mono text-3xl font-bold tracking-wider text-slate-800">
                                                    {deposit.nomor_va}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        handleCopy(
                                                            deposit.nomor_va!,
                                                        )
                                                    }
                                                    className="rounded-lg p-2 text-indigo-600 transition-colors hover:bg-slate-100"
                                                    title="Copy VA Number"
                                                >
                                                    {copied ? (
                                                        <CheckCircle className="h-5 w-5" />
                                                    ) : (
                                                        <Copy className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* QRIS */}
                                    {(deposit.qr_link || deposit.qr_string) && (
                                        <div className="flex flex-col items-center">
                                            <p className="mb-4 text-sm font-bold text-slate-700">
                                                Scan QR Code di bawah ini
                                            </p>
                                            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                                {/* Use qr_link image if available, otherwise would generate QR from string (need library) */}
                                                {deposit.qr_link ? (
                                                    <img
                                                        src={deposit.qr_link}
                                                        alt="QRIS Code"
                                                        className="h-64 w-64 object-contain"
                                                    />
                                                ) : (
                                                    <div className="flex h-64 w-64 items-center justify-center bg-slate-100 text-slate-400">
                                                        QR Code Image Error
                                                    </div>
                                                )}
                                            </div>
                                            <p className="mt-4 max-w-xs text-center text-xs text-slate-500">
                                                Buka aplikasi e-wallet atau
                                                mobile banking Anda, lalu scan
                                                QR code di atas.
                                            </p>
                                        </div>
                                    )}

                                    {/* E-Money / Checkout URL */}
                                    {(deposit.checkout_url ||
                                        deposit.pay_url) &&
                                        !deposit.qr_link &&
                                        !deposit.nomor_va && (
                                            <div className="text-center">
                                                <a
                                                    href={
                                                        deposit.checkout_url ||
                                                        deposit.pay_url
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:scale-105 hover:bg-indigo-700"
                                                >
                                                    Lanjut ke Pembayaran
                                                    <CreditCard className="h-4 w-4" />
                                                </a>
                                            </div>
                                        )}
                                </div>
                            )}

                            {/* Check Status Button (Manual) */}
                            {isPending && (
                                <div className="flex justify-center pt-2">
                                    <button
                                        onClick={() =>
                                            router.post(
                                                `/deposit/check/${deposit.ref_id}`,
                                            )
                                        }
                                        className="flex items-center gap-2 text-sm font-bold text-indigo-600 underline hover:text-indigo-800 disabled:opacity-50"
                                    >
                                        <Clock className="h-4 w-4" />
                                        Cek Status Pembayaran
                                    </button>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex justify-center border-t border-slate-100 pt-6">
                                <Link
                                    href="/deposit"
                                    className="text-sm font-bold text-slate-500 transition-colors hover:text-slate-800"
                                >
                                    Kembali ke Halaman Deposit
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
