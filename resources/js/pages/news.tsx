import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Megaphone,
    Newspaper,
} from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Berita',
        href: '/news',
    },
];

const newsList = [
    {
        id: 1,
        type: 'Pengumuman',
        date: '28 November 2025 21:12:57',
        title: 'Informasi berita',
        content: `Informasi ini sudah tidak berlaku, kami sepenuhnya sudah bisa membalas dan jaringan sudah normal.
        
Maaf kami belum bisa membalas pesan kalian, karna kami disumut tidak ada jaringan sama sekali 2 hari ini, seluler maupun wifi, kemungkinan akan kami balas semua besok jika jaringan normal kembali.
        
Mohon maaf ketidaknyamanan nya, pesanan tetap terproses otomatis.
Mohon doa nya kawan kawan semoga kami di sumatra tidak terjadi yang tidak diinginkan.`,
        severity: 'info',
    },
    {
        id: 2,
        type: 'Pengumuman',
        date: '24 November 2025 17:36:33',
        title: 'Bonus deposit untuk Top 10 Pengguna Bulan lalu ( Bulan Oktober 2025 )',
        content: `Maaf Lambat Infokan BONUS dan kami mengurangi bonus saldo karna efek update dan lagi banyak pengeluaran pada saat update besar Instagram.
        
Kami menyadari banyak yang memakai manipulasi pada top penggunanya dengan di x2 total pesanan ataupun merekayasa top 1,2,3 tetapi kami murni dari pesanan user tanpa rekayasa terimakasih sudah selalu bersama kami...
        
Berikut ini detail bonus yang kami berikan untuk top pesanan Bulan September 2025:
        
TOP 1 : BONUS TOPUP 50%
TOP 2 : BONUS TOPUP 40%
TOP 3 : BONUS TOPUP 30%
TOP 4 : BONUS TOPUP 25%`,
        severity: 'success',
    },
];

export default function News() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Berita & Pengumuman" />

            <div className="flex h-full flex-1 flex-col gap-4 bg-slate-50/50 p-4 sm:p-5">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="border-l-4 border-[#02c39a] pl-3 text-xl font-extrabold tracking-tight text-slate-900">
                        Berita & Pengumuman
                    </h2>
                    <p className="pl-3 text-xs font-medium text-slate-500">
                        Dapatkan informasi terbaru seputar layanan dan pembaruan
                        sistem Medanpedia.
                    </p>
                </div>

                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                        {/* News Header */}
                        <div className="flex items-center gap-2 border-b border-slate-100 bg-white px-5 py-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a]/10 text-[#02c39a]">
                                <Newspaper className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-800">
                                Berita Terkini
                            </h3>
                        </div>

                        {/* News Stream */}
                        <div className="space-y-4 p-4">
                            {newsList.map((news) => (
                                <div
                                    key={news.id}
                                    className="relative overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all hover:border-[#02c39a]/20 hover:shadow-md"
                                >
                                    <div className="p-4 sm:p-5">
                                        <div className="mb-3 flex flex-wrap items-center gap-2">
                                            <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[9px] font-black tracking-wider text-indigo-600 uppercase ring-1 ring-indigo-100">
                                                <Megaphone className="h-2.5 w-2.5" />
                                                {news.type}
                                            </span>
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                                <Calendar className="h-3 w-3" />
                                                {news.date}
                                            </div>
                                        </div>

                                        <h4 className="mb-2 text-sm leading-tight font-black text-slate-800">
                                            {news.title}
                                        </h4>

                                        <div className="text-xs leading-relaxed font-medium whitespace-pre-line text-slate-500">
                                            {news.content}
                                        </div>
                                    </div>

                                    {/* Accent strip on the left */}
                                    <div
                                        className={`absolute top-0 bottom-0 left-0 w-1 ${news.severity === 'success' ? 'bg-emerald-400' : 'bg-indigo-400'}`}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/30 px-5 py-4 sm:flex-row">
                            <p className="order-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase sm:order-1">
                                Menampilkan 1 - 2 Dari 15 Berita
                            </p>

                            <div className="order-1 flex items-center gap-1.5 sm:order-2">
                                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition-all hover:bg-slate-50 active:scale-95">
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a] text-xs font-bold text-white shadow-sm transition-all">
                                    1
                                </button>
                                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-600 transition-all hover:border-[#02c39a] hover:text-[#02c39a]">
                                    2
                                </button>
                                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-600 transition-all hover:border-[#02c39a] hover:text-[#02c39a]">
                                    3
                                </button>
                                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition-all hover:bg-slate-50 active:scale-95">
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
