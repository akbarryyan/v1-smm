import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { CreditCard } from 'lucide-react';

interface Deposit {
    id: number;
    ref_id: string;
    amount: number;
    total_bayar: number;
    status: string;
    created_at: string;
    channel?: {
        name: string;
    };
    status_label: string;
    status_color: string;
}

interface PaginatedDeposits {
    data: Deposit[];
    current_page: number;
    last_page: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

const breadcrumbs = [
    {
        title: 'Riwayat Deposit',
        href: '/deposit/history',
    },
];

export default function DepositHistory() {
    const { deposits } = usePage<{ deposits: PaginatedDeposits }>().props;

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Riwayat Deposit" />

            <div className="flex h-full flex-1 flex-col gap-4 bg-slate-50/50 p-4 sm:p-5">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="border-l-4 border-[#02c39a] pl-3 text-xl font-extrabold tracking-tight text-slate-900">
                        Riwayat Deposit
                    </h2>
                    <p className="pl-3 text-xs font-medium text-slate-500">
                        Lihat riwayat deposit dan status pembayaran Anda.
                    </p>
                </div>

                {/* Main Content */}
                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                        {/* Header */}
                        <div className="flex items-center gap-2 border-b border-slate-100 bg-white px-5 py-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a]/10 text-[#02c39a]">
                                <CreditCard className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-800">
                                Riwayat Deposit
                            </h3>
                        </div>

                        {/* Filters Section */}
                        {/* ... Filters omitted for brevity as backend filtering not implemented yet ... */}

                        {/* Table Section */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                        <th className="px-5 py-3">ID</th>
                                        <th className="px-5 py-3">Dibuat</th>
                                        <th className="px-5 py-3">Metode</th>
                                        <th className="px-5 py-3">Jumlah</th>
                                        <th className="px-5 py-3">
                                            Total Bayar
                                        </th>
                                        <th className="px-5 py-3">Status</th>
                                        <th className="px-5 py-3">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {deposits.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-5 py-8 text-center"
                                            >
                                                <p className="text-sm font-medium text-slate-400">
                                                    Belum ada deposit.
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        deposits.data.map((deposit) => (
                                            <tr
                                                key={deposit.id}
                                                className="group transition-colors hover:bg-slate-50/50"
                                            >
                                                <td className="px-5 py-3">
                                                    <span className="text-xs font-black text-slate-600">
                                                        #{deposit.ref_id}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span className="text-xs font-bold text-slate-700">
                                                        {formatDate(
                                                            deposit.created_at,
                                                        )}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span className="text-xs font-medium text-slate-600">
                                                        {deposit.channel
                                                            ?.name || 'Unknown'}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span className="text-xs font-bold text-[#02c39a]">
                                                        {formatRupiah(
                                                            deposit.amount,
                                                        )}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span className="text-xs font-bold text-slate-700">
                                                        {formatRupiah(
                                                            deposit.total_bayar,
                                                        )}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span
                                                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-[9px] font-black uppercase bg-${deposit.status_color}-50 text-${deposit.status_color}-600 ring-1 ring-${deposit.status_color}-100`}
                                                    >
                                                        {deposit.status_label}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <Link
                                                        href={`/deposit/show/${deposit.ref_id}`}
                                                        className="text-xs font-bold text-indigo-600 hover:underline"
                                                    >
                                                        Detail
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {deposits.data.length > 0 && (
                            <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/30 px-5 py-4 sm:flex-row">
                                <p className="order-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase sm:order-1">
                                    Menampilkan {deposits.data.length} dari{' '}
                                    {deposits.total} Deposit
                                </p>

                                <div className="order-1 flex items-center gap-1.5 sm:order-2">
                                    {deposits.links.map((link, i) =>
                                        link.url ? (
                                            <Link
                                                key={i}
                                                href={link.url}
                                                className={`flex h-8 min-w-[32px] items-center justify-center rounded-lg px-3 text-xs font-bold transition-all ${
                                                    link.active
                                                        ? 'bg-[#02c39a] text-white shadow-sm'
                                                        : 'border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 active:scale-95'
                                                }`}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ) : (
                                            <span
                                                key={i}
                                                className="flex h-8 min-w-[32px] items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-300 opacity-50"
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ),
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
