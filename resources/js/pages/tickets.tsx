import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    FileText,
    Image as ImageIcon,
    MessageSquare,
    Plus,
    Search,
    Send,
    X,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Tiket',
        href: '/tickets',
    },
];

const mockTickets = [
    {
        id: '38700',
        subject: 'Pesanan',
        status: 'Answered',
        updated_at: '03 Februari 2025 06:57:11',
    },
    {
        id: '38508',
        subject: 'Pesanan',
        status: 'Answered',
        updated_at: '02 Februari 2025 18:21:27',
    },
];

export default function Tickets() {
    const [showForm, setShowForm] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tiket Bantuan" />

            <div className="flex h-full flex-1 flex-col gap-6 bg-slate-50/50 p-4 sm:p-6 lg:p-8">
                {/* Header Section */}
                <div className="flex flex-col gap-2">
                    <h2 className="border-l-4 border-[#02c39a] pl-4 text-2xl font-extrabold tracking-tight text-slate-900">
                        Tiket Bantuan
                    </h2>
                    <p className="mt-1 pl-4 text-sm font-medium text-slate-500">
                        Hubungi tim support kami jika Anda memiliki kendala atau
                        pertanyaan.
                    </p>
                </div>

                <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-12">
                    {/* Kirim Tiket Form (Hidden by default) */}
                    {showForm && (
                        <div className="animate-in duration-300 fade-in slide-in-from-left-4 xl:col-span-4">
                            <div className="overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200">
                                <div className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#02c39a]/10 text-[#02c39a]">
                                            <Plus className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-bold text-slate-800">
                                            Kirim Tiket
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => setShowForm(false)}
                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-all hover:bg-red-100 active:scale-95"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="space-y-5 p-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                                            Subjek
                                        </label>
                                        <div className="relative">
                                            <select className="h-11 w-full appearance-none rounded-xl border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 ring-offset-2 transition-all outline-none focus:border-[#02c39a] focus:bg-white focus:ring-2 focus:ring-[#02c39a]/20">
                                                <option value="">
                                                    Pilih...
                                                </option>
                                                <option value="order">
                                                    Masalah Pesanan
                                                </option>
                                                <option value="deposit">
                                                    Masalah Deposit
                                                </option>
                                                <option value="other">
                                                    Lainnya
                                                </option>
                                            </select>
                                            <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400">
                                                <Plus className="h-4 w-4 rotate-45" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                                            Pesan
                                        </label>
                                        <textarea
                                            placeholder="Detail kendala Anda..."
                                            rows={4}
                                            className="w-full resize-none rounded-xl border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 ring-offset-2 transition-all outline-none focus:border-[#02c39a] focus:bg-white focus:ring-2 focus:ring-[#02c39a]/20"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                                            Gambar{' '}
                                            <span className="font-medium text-slate-300">
                                                *tidak wajib
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                className="hidden"
                                                id="file-upload"
                                            />
                                            <label
                                                htmlFor="file-upload"
                                                className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-2.5 transition-all hover:border-[#02c39a] hover:bg-[#02c39a]/5"
                                            >
                                                <span className="text-xs font-semibold text-slate-400">
                                                    No file chosen
                                                </span>
                                                <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-[10px] font-bold text-[#02c39a] shadow-sm ring-1 ring-slate-100">
                                                    <ImageIcon className="h-3 w-3" />
                                                    Pilih File
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    <button className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-[#02c39a] py-3.5 text-sm font-bold text-white shadow-[0_4px_0_rgb(0,168,132)] transition-all hover:translate-y-[2px] hover:bg-[#00a884] hover:shadow-[0_2px_0_rgb(0,168,132)] active:translate-y-1 active:shadow-none">
                                        <Send className="h-4 w-4" />
                                        Kirim Tiket Sekarang
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tiket Saya Section */}
                    <div
                        className={`${showForm ? 'xl:col-span-8' : 'xl:col-span-12'} transition-all duration-300`}
                    >
                        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200">
                            <div className="flex items-center justify-between border-b border-slate-100 bg-white px-8 py-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#02c39a]/10 text-[#02c39a]">
                                        <MessageSquare className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">
                                        Tiket Saya
                                    </h3>
                                </div>
                                {!showForm && (
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="group relative flex items-center gap-2 rounded-xl bg-[#02c39a] px-5 py-2.5 text-xs font-bold text-white shadow-[0_3px_0_rgb(0,168,132)] transition-all hover:translate-y-px hover:bg-[#00a884] hover:shadow-[0_1px_0_rgb(0,168,132)] active:translate-y-0.5 active:shadow-none"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Kirim Tiket
                                    </button>
                                )}
                            </div>

                            {/* Filter Section */}
                            <div className="flex flex-col items-center gap-3 border-b border-slate-100 bg-slate-50/30 p-6 sm:flex-row">
                                <div className="flex w-full overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 sm:w-48">
                                    <select className="h-11 w-full appearance-none px-4 text-xs font-bold text-slate-500 outline-none">
                                        <option>CARI BERDASARKAN ID</option>
                                        <option>SUBJEK</option>
                                        <option>STATUS</option>
                                    </select>
                                </div>
                                <div className="relative w-full flex-1">
                                    <input
                                        type="text"
                                        placeholder="Ketik kata kunci pencarian..."
                                        className="h-11 w-full rounded-xl border-slate-200 bg-white px-4 pr-12 text-sm font-medium text-slate-700 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                    />
                                    <button className="absolute top-1.5 right-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a] text-white shadow-lg shadow-[#02c39a]/20 transition-all hover:bg-[#00a884] active:scale-95">
                                        <Search className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50/50 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                                            <th className="px-8 py-4">ID</th>
                                            <th className="px-8 py-4">
                                                Subjek
                                            </th>
                                            <th className="px-8 py-4">
                                                Status
                                            </th>
                                            <th className="px-8 py-4">
                                                Pembaruan
                                            </th>
                                            <th className="px-8 py-4">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {mockTickets.map((ticket) => (
                                            <tr
                                                key={ticket.id}
                                                className="group transition-colors hover:bg-slate-50/50"
                                            >
                                                <td className="px-8 py-5">
                                                    <span className="text-sm font-bold text-slate-600">
                                                        #{ticket.id}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="h-4 w-4 text-slate-300" />
                                                        <span className="cursor-pointer text-sm font-bold text-[#02c39a] hover:underline">
                                                            {ticket.subject}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black tracking-wider uppercase ${
                                                            ticket.status ===
                                                            'Answered'
                                                                ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100'
                                                                : 'bg-slate-100 text-slate-500 ring-1 ring-slate-200'
                                                        }`}
                                                    >
                                                        <CheckCircle2 className="h-3 w-3" />
                                                        {ticket.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        {ticket.updated_at}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-400 transition-all hover:bg-[#02c39a] hover:text-white active:scale-95">
                                                        <MessageSquare className="h-4 w-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Empty State Illustration (if no tickets) */}
                            {mockTickets.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <div className="mb-4 rounded-full bg-slate-50 p-6">
                                        <AlertCircle className="h-12 w-12 text-slate-200" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-400">
                                        Belum ada tiket bantuan
                                    </p>
                                </div>
                            )}

                            {/* Pagination */}
                            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/30 px-8 py-4">
                                <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                                    Showing 2 Tickets
                                </p>
                                <div className="flex gap-2">
                                    <button className="h-8 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-400 disabled:opacity-50">
                                        Prev
                                    </button>
                                    <button className="h-8 rounded-lg bg-[#02c39a] px-3 text-xs font-bold text-white shadow-sm">
                                        1
                                    </button>
                                    <button className="h-8 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-400 disabled:opacity-50">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
