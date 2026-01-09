import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Calendar, Medal } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Peringkat',
        href: '/rankings/orders',
    },
    {
        title: 'Top 10 Pemesanan',
        href: '/rankings/orders',
    },
];

const rankings = [
    { id: 1, name: 'BIMS', amount: '17.453.122', orders: 154 },
    { id: 2, name: 'rawr', amount: '11.629.882', orders: 128 },
    { id: 3, name: 'IBYSP', amount: '10.425.515', orders: 112 },
    { id: 4, name: 'koenurf', amount: '7.945.761', orders: 89 },
    { id: 5, name: 'kesayangan bunda', amount: '6.695.407', orders: 74 },
    { id: 6, name: 'qiw', amount: '5.617.881', orders: 56 },
    { id: 7, name: 'Dalle', amount: '5.175.822', orders: 48 },
    { id: 8, name: 'BOSAN DIATAS', amount: '5.318.660', orders: 45 },
    { id: 9, name: 'Muhammad Baharudin', amount: '3.153.170', orders: 32 },
    { id: 10, name: 'Andika', amount: '2.451.514', orders: 28 },
];

export default function OrdersRanking() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Top 10 Pemesanan" />

            <div className="flex h-full flex-1 flex-col gap-6 bg-slate-50/50 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="border-l-4 border-[#02c39a] pl-4 text-2xl font-extrabold tracking-tight text-slate-900">
                            Peringkat Bulan Ini
                        </h2>
                        <p className="mt-1 pl-4 text-sm font-medium text-slate-500">
                            Daftar pengguna dengan total pemesanan tertinggi.
                        </p>
                    </div>
                    <button className="group relative flex w-fit items-center gap-2 rounded-2xl bg-[#02c39a] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_0_rgb(0,168,132)] transition-all hover:translate-y-[2px] hover:bg-[#00a884] hover:shadow-[0_2px_0_rgb(0,168,132)] active:translate-y-1 active:shadow-none">
                        <Calendar className="h-4 w-4" />
                        Lihat Riwayat Bulan Lalu
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                    <div className="xl:col-span-8">
                        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200">
                            <div className="flex items-center justify-between border-b border-slate-100 bg-white px-8 py-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#02c39a]/10 text-[#02c39a]">
                                        <Medal className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">
                                            Top 10 Pemesanan
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
                                                className={`relative flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold ${rank.id === 1 ? 'bg-yellow-400 text-white' : rank.id === 2 ? 'bg-slate-300 text-white' : rank.id === 3 ? 'bg-amber-600 text-white' : 'bg-slate-50 text-slate-400 ring-1 ring-slate-200'}`}
                                            >
                                                {rank.id}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[15px] font-bold text-slate-700 group-hover:text-[#02c39a]">
                                                    {rank.name}
                                                </span>
                                                <span className="text-xs font-medium text-slate-400 italic">
                                                    {rank.orders} Pesanan Sukses
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-slate-300 uppercase">
                                                Total Belanja
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
                        <div className="rounded-3xl bg-linear-to-br from-[#02c39a] to-[#00a884] p-6 text-white shadow-lg">
                            <h4 className="mb-2 text-lg font-bold">
                                Reward Bulan Ini 🎁
                            </h4>
                            <p className="mb-4 text-xs opacity-90">
                                Juara 1 akan mendapatkan saldo Rp 500.000!
                            </p>
                            <button className="w-full rounded-xl bg-white py-2.5 text-xs font-bold text-[#02c39a] shadow-[0_4px_0_rgb(226,232,240)] transition-all active:translate-y-1 active:shadow-none">
                                Cek S&K
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
