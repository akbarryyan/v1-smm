import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Calendar, TrendingUp, Wallet } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Peringkat',
        href: '/rankings/deposits',
    },
    {
        title: 'Top 10 Deposit',
        href: '/rankings/deposits',
    },
];

const rankings = [
    { id: 1, name: 'SultanSMM', amount: '25.000.000', method: 'BCA Transfer' },
    { id: 2, name: 'JuraganPanel', amount: '18.500.000', method: 'Mandiri' },
    { id: 3, name: 'MedanRich', amount: '15.000.000', method: 'QRIS' },
    {
        id: 4,
        name: 'VVIP_Member',
        amount: '12.250.000',
        method: 'BCA Transfer',
    },
    { id: 5, name: 'DewaSMM', amount: '9.000.000', method: 'QRIS' },
    { id: 6, name: 'TopUpMaster', amount: '7.500.000', method: 'OVO' },
    { id: 7, name: 'PanelKita', amount: '6.200.000', method: 'QRIS' },
    { id: 8, name: 'SocialBoost', amount: '5.000.000', method: 'DANA' },
    { id: 9, name: 'IndoMedia', amount: '4.500.000', method: 'BCA Transfer' },
    { id: 10, name: 'MemberSetia', amount: '3.000.000', method: 'QRIS' },
];

export default function DepositsRanking() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Top 10 Deposit" />

            <div className="flex h-full flex-1 flex-col gap-6 bg-slate-50/50 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="border-l-4 border-[#02c39a] pl-4 text-2xl font-extrabold tracking-tight text-slate-900">
                            Peringkat Deposit
                        </h2>
                        <p className="mt-1 pl-4 text-sm font-medium text-slate-500">
                            Daftar pengguna dengan total pengisian saldo
                            tertinggi.
                        </p>
                    </div>
                    <button className="group relative flex w-fit items-center gap-2 rounded-2xl bg-[#02c39a] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_0_rgb(0,168,132)] transition-all hover:translate-y-[2px] hover:bg-[#00a884] hover:shadow-[0_2px_0_rgb(0,168,132)] active:translate-y-1 active:shadow-none">
                        <Calendar className="h-4 w-4" />
                        Riwayat Deposit
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                    <div className="xl:col-span-8">
                        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200">
                            <div className="flex items-center justify-between border-b border-slate-100 bg-white px-8 py-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#02c39a]/10 text-[#02c39a]">
                                        <Wallet className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">
                                            Top 10 Deposit
                                        </h3>
                                        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                            Januari 2026
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="divide-y divide-slate-50">
                                {rankings.map((rank) => (
                                    <div
                                        key={rank.id}
                                        className="group flex items-center justify-between px-8 py-5 transition-all hover:bg-slate-50/80"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div
                                                className={`flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold ${rank.id === 1 ? 'bg-yellow-400 text-white shadow-lg shadow-yellow-200' : rank.id === 2 ? 'bg-slate-300 text-white shadow-lg shadow-slate-200' : rank.id === 3 ? 'bg-amber-600 text-white shadow-lg shadow-amber-200' : 'bg-slate-50 text-slate-400 ring-1 ring-slate-200'}`}
                                            >
                                                #{rank.id}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[15px] font-bold text-slate-700 group-hover:text-[#02c39a]">
                                                    {rank.name}
                                                </span>
                                                <span className="text-xs font-medium text-slate-400">
                                                    Terakhir: {rank.method}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-slate-300 uppercase">
                                                Total Deposit
                                            </p>
                                            <span className="text-[16px] font-black text-[#02c39a]">
                                                Rp {rank.amount}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 xl:col-span-4">
                        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                            <h4 className="mb-4 text-sm font-bold text-slate-800">
                                Statistik Global
                            </h4>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                                        <TrendingUp className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase">
                                            Avg. Deposit
                                        </p>
                                        <p className="font-bold text-slate-700">
                                            Rp 1.500.000
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
