import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { AlertCircle, CreditCard, Info, QrCode } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Deposit',
        href: '/deposit',
    },
];

const depositMethods = [
    {
        id: 1,
        title: 'QRIS BONUS 1% ( FEE Rp 750 + 0.70% ) [ ON 24 JAM ] [ Emergency 2 ]',
        minDeposit: 'Rp 1.000',
        maxDeposit: 'Rp 5.000.000',
        schedule: '24 Jam',
        status: 'online',
        fee: '0.70%',
    },
    {
        id: 2,
        title: 'QRIS BONUS 1% ( fee 1% ) [ ON 24 JAM ] V3',
        minDeposit: 'Rp 1.000',
        maxDeposit: 'Rp 10.000.000',
        schedule: '24 Jam',
        status: 'online',
        fee: '1%',
    },
    {
        id: 3,
        title: 'QRIS BONUS 1% [ FEE 0.7% ]',
        minDeposit: 'Rp 100',
        maxDeposit: 'Rp 10.000.000',
        schedule: '01:00 - 93:00',
        status: 'offline',
        fee: '0.7%',
    },
    {
        id: 4,
        title: 'QRIS BONUS 1% ( 0,70% ) [ ON 24 JAM ]',
        minDeposit: 'Rp 100',
        maxDeposit: 'Rp 10.000.000',
        schedule: '24 Jam',
        status: 'online',
        fee: '0.70%',
    },
];

export default function Deposit() {
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

                        <div className="space-y-4 p-5">
                            {/* QR Code Label */}
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                <QrCode className="h-4 w-4" />
                                QR Code
                            </div>

                            {/* Deposit Method Cards */}
                            {depositMethods.map((method) => (
                                <div
                                    key={method.id}
                                    className="space-y-3 rounded-xl border border-slate-200 p-4"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-black text-slate-500">
                                            QRIS
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="text-xs leading-tight font-bold text-slate-800">
                                                {method.title}
                                            </h4>
                                            <div className="mt-2 space-y-0.5 text-[11px] text-slate-500">
                                                <p>
                                                    Minimal Deposit:{' '}
                                                    <span className="font-bold text-slate-700">
                                                        {method.minDeposit}
                                                    </span>
                                                </p>
                                                <p>
                                                    Maksimal Deposit:{' '}
                                                    <span className="font-bold text-slate-700">
                                                        {method.maxDeposit}
                                                    </span>
                                                </p>
                                                <p>
                                                    Jadwal Online:{' '}
                                                    <span className="font-bold text-slate-700">
                                                        {method.schedule}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className={`w-full rounded-lg py-2 text-xs font-bold transition-all ${
                                            method.status === 'online'
                                                ? 'bg-[#02c39a] text-white hover:bg-[#00a884]'
                                                : 'cursor-not-allowed bg-rose-500 text-white'
                                        }`}
                                        disabled={method.status === 'offline'}
                                    >
                                        {method.status === 'online'
                                            ? 'Online [24 Jam]'
                                            : 'Offline'}
                                    </button>
                                </div>
                            ))}
                        </div>
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
