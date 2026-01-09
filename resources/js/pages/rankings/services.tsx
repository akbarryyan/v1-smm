import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ShoppingCart, Star, TrendingUp, Zap } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Peringkat',
        href: '/rankings/services',
    },
    {
        title: 'Top 10 Layanan',
        href: '/rankings/services',
    },
];

const rankings = [
    {
        id: 1,
        name: 'TikTok Followers [ Real / High Quality ]',
        category: 'TikTok',
        orders: '15.420',
        rating: 4.9,
    },
    {
        id: 2,
        name: 'Instagram Likes [ Super Fast / Refill ]',
        category: 'Instagram',
        orders: '12.840',
        rating: 4.8,
    },
    {
        id: 3,
        name: 'TikTok Likes Server MDN 15 [ Recommended ]',
        category: 'TikTok',
        orders: '10.515',
        rating: 5.0,
    },
    {
        id: 4,
        name: 'YouTube Views [ Non Drop / No Refill ]',
        category: 'YouTube',
        orders: '8.761',
        rating: 4.7,
    },
    {
        id: 5,
        name: 'Facebook Follower Profile MDN 3 [ HQ ]',
        category: 'Facebook',
        orders: '6.407',
        rating: 4.8,
    },
    {
        id: 6,
        name: 'Twitter Retweet [ Fast / Global ]',
        category: 'Twitter',
        orders: '5.881',
        rating: 4.6,
    },
    {
        id: 7,
        name: 'Telegram Group Members [ Max 100K ]',
        category: 'Telegram',
        orders: '4.822',
        rating: 4.9,
    },
    {
        id: 8,
        name: 'Shopee Follower Toko [ Indonesia ]',
        category: 'Marketplace',
        orders: '4.660',
        rating: 4.5,
    },
    {
        id: 9,
        name: 'Spotify Playlist Followers [ Real ]',
        category: 'Music',
        orders: '3.170',
        rating: 4.7,
    },
    {
        id: 10,
        name: 'Google Maps Review [ Local Guide ]',
        category: 'Google',
        orders: '2.514',
        rating: 4.9,
    },
];

export default function ServicesRanking() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Top 10 Layanan" />

            <div className="flex h-full flex-1 flex-col gap-6 bg-slate-50/50 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="border-l-4 border-[#02c39a] pl-4 text-2xl font-extrabold tracking-tight text-slate-900">
                            Layanan Terpopuler
                        </h2>
                        <p className="mt-1 pl-4 text-sm font-medium text-slate-500">
                            Layanan yang paling banyak dipesan oleh pengguna
                            Medanpedia.
                        </p>
                    </div>
                    <button className="group relative flex w-fit items-center gap-2 rounded-2xl bg-[#02c39a] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_0_rgb(0,168,132)] transition-all hover:translate-y-[2px] hover:bg-[#00a884] hover:shadow-[0_2px_0_rgb(0,168,132)] active:translate-y-1 active:shadow-none">
                        <Zap className="h-4 w-4 fill-white" />
                        Update Realtime
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                    <div className="xl:col-span-8">
                        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200">
                            <div className="flex items-center justify-between border-b border-slate-100 bg-white px-8 py-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#02c39a]/10 text-[#02c39a]">
                                        <TrendingUp className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">
                                            Top 10 Layanan
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
                                        className="group flex items-center justify-between px-8 py-5 transition-all hover:bg-slate-50/50"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="w-8 text-lg font-black text-slate-200 transition-colors group-hover:text-[#02c39a]/20">
                                                {rank.id
                                                    .toString()
                                                    .padStart(2, '0')}
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[15px] font-bold text-slate-700 group-hover:text-[#02c39a]">
                                                        {rank.name}
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-400">
                                                        {rank.category}
                                                    </span>
                                                </div>
                                                <div className="mt-1 flex items-center gap-3">
                                                    <div className="flex items-center gap-1 text-[11px] font-bold text-yellow-500">
                                                        <Star className="h-3 w-3 fill-yellow-500" />
                                                        {rank.rating}
                                                    </div>
                                                    <span className="text-xs font-medium text-slate-400">
                                                        {rank.orders} Pesanan
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 ring-1 ring-slate-100 transition-all hover:bg-[#02c39a] hover:text-white active:scale-95">
                                            <ShoppingCart className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 xl:col-span-4">
                        <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl shadow-slate-200">
                            <h4 className="mb-4 text-sm font-bold tracking-widest text-[#02c39a] uppercase opacity-70">
                                Info Layanan
                            </h4>
                            <p className="mb-6 text-sm leading-relaxed font-medium">
                                Gunakan layanan bertanda{' '}
                                <span className="font-bold text-[#02c39a]">
                                    Recommended
                                </span>{' '}
                                untuk kecepatan dan kualitas terbaik.
                            </p>
                            <button className="w-full rounded-2xl bg-[#02c39a] py-3 text-sm font-bold text-white shadow-[0_4px_0_rgb(0,168,132)] transition-all active:translate-y-1 active:shadow-none">
                                Buat Pesanan Baru
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
