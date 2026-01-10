import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    Calendar,
    Loader2,
    Megaphone,
    Newspaper,
    ShoppingCart,
    Star,
    TrendingUp,
    Wallet,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface NewsItem {
    id: number;
    title: string;
    content: string;
    type: string;
    is_active: boolean;
    created_at: string;
}

interface PageProps extends SharedData {
    monthlyUsage: number;
    news: NewsItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dasbor',
        href: dashboard().url,
    },
];

const typeLabels: Record<string, string> = {
    announcement: 'Pengumuman',
    update: 'Update',
    promo: 'Promo',
    maintenance: 'Maintenance',
};

export default function Dashboard() {
    const { auth, monthlyUsage, news } = usePage<PageProps>().props;
    const [showAlert, setShowAlert] = useState(true);
    const [showNewsModal, setShowNewsModal] = useState(false);
    // Initialize loading state based on whether there's news
    const [isLoading, setIsLoading] = useState(news && news.length > 0);

    // Show loading then news modal on first visit
    useEffect(() => {
        if (news && news.length > 0) {
            // Show loading for 1.5 seconds then show modal
            const timer = setTimeout(() => {
                setIsLoading(false);
                setShowNewsModal(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [news]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
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
                                    Lihat Semua Layanan →
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Stats & News Preview */}
                    <div className="space-y-4 lg:col-span-12 xl:col-span-5">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#02c39a]/10">
                                    <Wallet className="h-6 w-6 text-[#02c39a]" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400">
                                        Saldo Anda
                                    </p>
                                    <p className="text-xl font-black text-[#02c39a]">
                                        {formatCurrency(
                                            Number(auth.user.balance) || 0,
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50">
                                    <TrendingUp className="h-6 w-6 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400">
                                        Pesanan Anda Bulan Ini
                                    </p>
                                    <p className="text-xl font-black text-indigo-600">
                                        {formatCurrency(monthlyUsage)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* News Preview */}
                        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                                <div className="flex items-center gap-2">
                                    <Newspaper className="h-4 w-4 text-[#02c39a]" />
                                    <h3 className="text-sm font-bold text-slate-800">
                                        Berita Terbaru
                                    </h3>
                                </div>
                                <a
                                    href="/news"
                                    className="text-[10px] font-bold text-[#02c39a] hover:text-[#00a884]"
                                >
                                    Lihat Semua
                                </a>
                            </div>
                            <div className="custom-scrollbar max-h-80 divide-y divide-slate-50 overflow-y-auto">
                                {news && news.length > 0 ? (
                                    news.slice(0, 3).map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-4 transition-colors hover:bg-slate-50"
                                        >
                                            <div className="mb-2 flex items-center gap-2">
                                                <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[9px] font-bold text-indigo-600 uppercase">
                                                    {typeLabels[item.type] ||
                                                        item.type}
                                                </span>
                                                <span className="text-[10px] font-medium text-slate-400">
                                                    {formatDate(
                                                        item.created_at,
                                                    )}
                                                </span>
                                            </div>
                                            <h3 className="mb-2 text-sm leading-snug font-bold text-slate-800">
                                                {item.title}
                                            </h3>
                                            <p className="line-clamp-3 text-xs leading-relaxed text-slate-500">
                                                {item.content}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center">
                                        <Newspaper className="mx-auto mb-2 h-8 w-8 text-slate-300" />
                                        <p className="text-xs text-slate-400">
                                            Belum ada berita
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading Overlay */}
            {isLoading && news && news.length > 0 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all">
                    <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-xl">
                        <Loader2 className="h-10 w-10 animate-spin text-[#02c39a]" />
                        <p className="text-sm font-medium text-slate-600">
                            Memuat berita...
                        </p>
                    </div>
                </div>
            )}

            {/* News Modal */}
            {showNewsModal && news && news.length > 0 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                            <h3 className="text-lg font-bold text-slate-800">
                                Baca dulu!
                            </h3>
                            <button
                                onClick={() => setShowNewsModal(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="custom-scrollbar max-h-[60vh] divide-y divide-slate-100 overflow-y-auto">
                            {news.map((item) => (
                                <div key={item.id} className="p-5">
                                    <div className="mb-3 flex flex-wrap items-center gap-2">
                                        <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600 uppercase ring-1 ring-indigo-100">
                                            <Megaphone className="h-3 w-3" />
                                            {typeLabels[item.type] || item.type}
                                        </span>
                                        <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                                            <Calendar className="h-3 w-3" />
                                            {formatDate(item.created_at)}
                                        </div>
                                    </div>
                                    <h4 className="mb-2 text-sm font-bold text-slate-800">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs leading-relaxed whitespace-pre-line text-slate-500">
                                        {item.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-slate-100 px-6 py-4">
                            <button
                                onClick={() => setShowNewsModal(false)}
                                className="w-full rounded-xl bg-[#02c39a] py-3 text-sm font-bold text-white transition-colors hover:bg-[#00a884]"
                            >
                                Oke, Mengerti
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
