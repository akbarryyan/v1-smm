import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    Newspaper,
    ShoppingCart,
    Star,
    TrendingUp,
    Wallet,
    X,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dasbor',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { auth, monthlyUsage } = usePage<
        SharedData & { monthlyUsage: number }
    >().props;
    const [showAlert, setShowAlert] = useState(true);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const recommendedServices = [
        {
            id: 1,
            name: 'TikTok Likes Server MDN 15 [ Refill 30 days ] [ HQ - REAL ] [ 100k/days ] [ Worldwide ] [ Max 10M ] [ Recommended ] 🚀',
        },
        {
            id: 2,
            name: 'TIKTOK Followers Versi 29 [ 5k-20k/day ] [ Recommended ] [ Refill 30 days ] [ HQ ] [ Max 200K ]',
        },
        {
            id: 3,
            name: 'TikTok Followers MP 12 [ Provider ] [ NO DROP ] [ Organic & Real ] [ 2k-3k/days ]',
        },
        {
            id: 4,
            name: 'TikTok Followers MP 17 [ Provider ] [ Organic & Real - Mix asean ] [ 5k-10k/days ]',
        },
        {
            id: 5,
            name: 'TikTok Likes Server MDN 16 [ No Refill ] [ HQ - REAL ] [ 100k/days ] [ Worldwide ] [ Max 10M ] 🚀',
        },
        {
            id: 6,
            name: 'Telegram Group/Channel Members [ Server 1 ] [ Refill 30days ] [ Speed: 100K/Day ] [ NO Drop For ever ] 🔥',
        },
        {
            id: 7,
            name: 'Telegram - Channel Members/Group Server 11 [100K] [ 30 day NonDrop ]',
        },
        {
            id: 8,
            name: 'Facebook Follower Profile MDN 1 [ Page/Profile ] [ max 500K ] [ 10k/Days ] [ No Refill ] [ NEW ]',
        },
        {
            id: 9,
            name: 'Facebook Follower Profile MDN 3 [ Page/Profile ] [ max 500K ] [ 100K/Days ] [ No Refill ] [ HQ - Non Drop ]',
        },
        {
            id: 10,
            name: 'Facebook Photo / Post Likes MDN 9 [ Max 200K ] [ High Quality ] [ 365 days Refill ] [ Rekomendasi ]',
        },
    ];

    const newsItems = [
        {
            id: 1,
            tag: 'Pengumuman',
            date: '28 November 2025 21:12:47',
            title: 'Informasi berita',
            content:
                'Informasi ini sudah tidak berlaku, kami sepenuhnya sudah bisa membalas dan jaringan sudah normal. Mohon maaf ketidaknyamanan nya, pesanan tetap terproses otomatis.',
        },
        {
            id: 2,
            tag: 'Pengumuman',
            date: '24 November 2025 17:36:33',
            title: 'Bonus deposit untuk Top 10 Pengguna Bulan lalu ( Bulan Oktober 2025 )',
            content:
                'Maaf Lambat Infokan BONUS dan kami mengurangi bonus saldo karna efek update dan lagi banyak pengeluaran pada saat update besar Instagram. Kami menyadari banyak yang memakai manipulasi pada top penggunanya.',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dasbor" />

            <div className="flex h-full flex-1 flex-col gap-6 bg-slate-50/50 p-4 text-slate-900 sm:p-6">
                {/* Greeting Alert */}
                {showAlert && (
                    <div className="relative flex items-center justify-between rounded-xl bg-[#02c39a]/10 px-6 py-4 text-[#02c39a] ring-1 ring-[#02c39a]/20 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-[#02c39a]/10">
                                <span className="text-lg">👋</span>
                            </div>
                            <p className="text-sm font-medium">
                                <span className="font-bold">Gotcha!</span> Halo{' '}
                                <span className="font-bold text-[#02c39a]">
                                    {auth.user.name}
                                </span>
                                , semoga harimu menyenangkan.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowAlert(false)}
                            className="rounded-lg p-1 shadow-sm ring-1 ring-[#02c39a]/10 transition-colors hover:bg-white"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Left Column: Recommended Services */}
                    <div className="lg:col-span-12 xl:col-span-7">
                        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                            <div className="flex items-center justify-between border-b border-slate-100 bg-[#02c39a]/5 px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 fill-[#02c39a] text-[#02c39a]" />
                                    <h2 className="text-sm font-bold text-slate-800">
                                        Layanan Rekomendasi
                                    </h2>
                                </div>
                                <div className="h-2 w-2 animate-pulse rounded-full bg-[#02c39a]" />
                            </div>
                            <div className="divide-y divide-slate-50">
                                {recommendedServices.map((service, idx) => (
                                    <div
                                        key={service.id}
                                        className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-slate-50"
                                    >
                                        <span className="min-w-8 text-xs font-bold text-slate-400">
                                            #{idx + 1}
                                        </span>
                                        <p className="line-clamp-2 flex-1 text-xs leading-relaxed font-medium text-slate-600 group-hover:text-slate-900">
                                            {service.name}
                                        </p>
                                        <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a]/10 text-[#02c39a] transition-all hover:bg-[#02c39a] hover:text-white">
                                            <ShoppingCart className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-slate-50/50 px-6 py-4">
                                <button className="w-full rounded-xl border-2 border-dashed border-[#02c39a]/20 py-2.5 text-xs font-bold text-[#02c39a] transition-colors hover:bg-[#02c39a]/5">
                                    Lihat Semua Layanan
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Status & News */}
                    <div className="space-y-6 lg:col-span-12 xl:col-span-5">
                        {/* Summary Cards Grid */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* Balance Card */}
                            <div className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md">
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="rounded-xl bg-[#02c39a]/10 p-2 text-[#02c39a]">
                                        <Wallet className="h-5 w-5" />
                                    </div>
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                        <TrendingUp className="h-3 w-3" />
                                    </div>
                                </div>
                                <div>
                                    <p className="mb-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                                        Sisa Saldo Anda
                                    </p>
                                    <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-[#02c39a]">
                                        {formatCurrency(
                                            Number(auth.user.balance),
                                        )}
                                    </h3>
                                </div>
                            </div>

                            {/* Orders Card */}
                            <div className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md">
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                                        <ShoppingCart className="h-5 w-5" />
                                    </div>
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                        <TrendingUp className="h-3 w-3" />
                                    </div>
                                </div>
                                <div>
                                    <p className="mb-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                                        Pesanan Bulan Ini
                                    </p>
                                    <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                                        {formatCurrency(monthlyUsage)}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* News Card */}
                        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                                <Newspaper className="h-4 w-4 text-slate-600" />
                                <h2 className="text-sm font-bold text-slate-800">
                                    Berita
                                </h2>
                            </div>
                            <div className="custom-scrollbar max-h-[500px] space-y-4 overflow-y-auto p-4">
                                {newsItems.map((news) => (
                                    <div
                                        key={news.id}
                                        className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/60"
                                    >
                                        <div className="mb-3 flex items-center gap-2">
                                            <span className="rounded-md bg-[#02c39a]/10 px-2 py-0.5 text-[10px] font-bold text-[#02c39a] uppercase">
                                                {news.tag}
                                            </span>
                                            <span className="text-[10px] font-medium text-slate-400">
                                                {news.date}
                                            </span>
                                        </div>
                                        <h3 className="mb-2 text-sm leading-snug font-bold text-slate-800">
                                            {news.title}
                                        </h3>
                                        <p className="line-clamp-3 text-xs leading-relaxed text-slate-500">
                                            {news.content}
                                        </p>
                                        <button className="mt-3 text-[11px] font-bold text-[#02c39a] hover:text-[#00a884]">
                                            Baca Selengkapnya
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
            `}</style>
        </AppLayout>
    );
}
