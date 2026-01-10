import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Calendar, Megaphone, Newspaper } from 'lucide-react';

interface NewsItem {
    id: number;
    title: string;
    content: string;
    type: string;
    is_active: boolean;
    created_at: string;
}

interface PaginatedNews {
    data: NewsItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface PageProps {
    news: PaginatedNews;
    [key: string]: unknown;
}

const breadcrumbs = [
    {
        title: 'Berita',
        href: '/news',
    },
];

const typeLabels: Record<string, string> = {
    announcement: 'Pengumuman',
    update: 'Update',
    promo: 'Promo',
    maintenance: 'Maintenance',
};

const typeColors: Record<string, string> = {
    announcement: 'bg-indigo-50 text-indigo-600 ring-indigo-100',
    update: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
    promo: 'bg-amber-50 text-amber-600 ring-amber-100',
    maintenance: 'bg-rose-50 text-rose-600 ring-rose-100',
};

const accentColors: Record<string, string> = {
    announcement: 'bg-indigo-400',
    update: 'bg-emerald-400',
    promo: 'bg-amber-400',
    maintenance: 'bg-rose-400',
};

export default function News() {
    const { news } = usePage<PageProps>().props;

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
                            {news.data.length === 0 ? (
                                <div className="py-12 text-center">
                                    <Newspaper className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                                    <p className="text-sm text-slate-500">
                                        Belum ada berita
                                    </p>
                                </div>
                            ) : (
                                news.data.map((item) => (
                                    <div
                                        key={item.id}
                                        className="relative overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all hover:border-[#02c39a]/20 hover:shadow-md"
                                    >
                                        <div className="p-4 sm:p-5">
                                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[9px] font-black tracking-wider uppercase ring-1 ${typeColors[item.type] || 'bg-slate-50 text-slate-600 ring-slate-100'}`}
                                                >
                                                    <Megaphone className="h-2.5 w-2.5" />
                                                    {typeLabels[item.type] ||
                                                        item.type}
                                                </span>
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDate(
                                                        item.created_at,
                                                    )}
                                                </div>
                                            </div>

                                            <h4 className="mb-2 text-sm leading-tight font-black text-slate-800">
                                                {item.title}
                                            </h4>

                                            <div className="text-xs leading-relaxed font-medium whitespace-pre-line text-slate-500">
                                                {item.content}
                                            </div>
                                        </div>

                                        {/* Accent strip on the left */}
                                        <div
                                            className={`absolute top-0 bottom-0 left-0 w-1 ${accentColors[item.type] || 'bg-slate-400'}`}
                                        />
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/30 px-5 py-4 sm:flex-row">
                            <p className="order-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase sm:order-1">
                                Menampilkan {news.data.length} dari {news.total}{' '}
                                Berita
                                {news.last_page > 1 &&
                                    ` (Halaman ${news.current_page} dari ${news.last_page})`}
                            </p>

                            {news.last_page > 1 && (
                                <div className="order-1 flex items-center gap-1.5 sm:order-2">
                                    {news.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-bold transition-all ${
                                                link.active
                                                    ? 'bg-[#02c39a] text-white shadow-sm'
                                                    : link.url
                                                      ? 'border border-slate-200 bg-white text-slate-600 hover:border-[#02c39a] hover:text-[#02c39a]'
                                                      : 'cursor-not-allowed text-slate-300'
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
