import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ChevronDown, Layers, Tag } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Pesanan Massal',
        href: '/orders/mass',
    },
];

export default function MassOrder() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pesanan Massal" />

            <div className="flex h-full flex-1 flex-col gap-4 bg-slate-50/50 p-4 sm:p-5">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="border-l-4 border-[#02c39a] pl-3 text-xl font-extrabold tracking-tight text-slate-900">
                        Pesanan Massal
                    </h2>
                    <p className="pl-3 text-xs font-medium text-slate-500">
                        Buat pesanan secara massal dengan multiple target
                        sekaligus.
                    </p>
                </div>

                {/* Main Content */}
                <div className="w-full max-w-3xl">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-3">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a]/10 text-[#02c39a]">
                                    <Layers className="h-4 w-4" />
                                </div>
                                <h3 className="text-sm font-bold text-slate-800">
                                    Pesanan Massal
                                </h3>
                            </div>
                            <button className="flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-1.5 text-[10px] font-bold text-white transition-all hover:bg-indigo-600">
                                <Tag className="h-3 w-3" />
                                Kategori
                            </button>
                        </div>

                        <div className="space-y-4 p-5">
                            {/* Kategori */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">
                                    Kategori
                                </label>
                                <div className="relative">
                                    <select className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                                        <option>Pilih...</option>
                                        <option>Instagram</option>
                                        <option>TikTok</option>
                                        <option>YouTube</option>
                                        <option>Twitter</option>
                                        <option>Facebook</option>
                                    </select>
                                    <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400">
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Layanan */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">
                                    Layanan
                                </label>
                                <div className="relative">
                                    <select className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                                        <option>Pilih...</option>
                                    </select>
                                    <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400">
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Deskripsi Layanan */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <p className="text-xs text-slate-500 italic">
                                    Deskripsi layanan.
                                </p>
                            </div>

                            {/* Bulk Input */}
                            <div className="space-y-1.5">
                                <div className="flex flex-wrap items-center gap-2">
                                    <label className="text-xs font-bold text-slate-700">
                                        Maksimal 50 Baris (Target|Jumlah)
                                    </label>
                                    <span className="inline-flex items-center rounded bg-indigo-100 px-1.5 py-0.5 text-[9px] font-bold text-indigo-600">
                                        Min: 0
                                    </span>
                                    <span className="inline-flex items-center rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-600">
                                        Max: 0
                                    </span>
                                </div>
                                <textarea
                                    rows={10}
                                    placeholder={`Format: target|jumlah\nMaksimal 50 baris`}
                                    className="min-h-[200px] w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-700 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                />
                            </div>

                            {/* Submit Button */}
                            <button className="h-10 w-full rounded-xl bg-indigo-500 text-xs font-bold text-white shadow-[0_3px_0_rgb(79,70,229)] transition-all hover:translate-y-px hover:bg-indigo-600 hover:shadow-[0_1px_0_rgb(79,70,229)] active:translate-y-[2px] active:shadow-none">
                                Pesan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
