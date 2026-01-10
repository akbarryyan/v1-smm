import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
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

interface Ticket {
    id: number;
    subject: string;
    status: string;
    status_label: string;
    status_color: string;
    created_at: string;
    updated_at: string;
}

interface PaginatedTickets {
    data: Ticket[];
    current_page: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    total: number;
}

export default function Tickets() {
    const { tickets, flash } = usePage<{
        tickets: PaginatedTickets;
        flash: { success?: string };
    }>().props;
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tickets', {
            onSuccess: () => {
                setShowForm(false);
                reset();
            },
        });
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

                {flash.success && (
                    <div className="relative mb-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            {flash.success}
                        </div>
                    </div>
                )}

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

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5 p-6"
                                >
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                                            Subjek
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={data.subject}
                                                onChange={(e) =>
                                                    setData(
                                                        'subject',
                                                        e.target.value,
                                                    )
                                                }
                                                className="h-11 w-full appearance-none rounded-xl border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 ring-offset-2 transition-all outline-none focus:border-[#02c39a] focus:bg-white focus:ring-2 focus:ring-[#02c39a]/20"
                                            >
                                                <option value="">
                                                    Pilih...
                                                </option>
                                                <option value="Masalah Pesanan">
                                                    Masalah Pesanan
                                                </option>
                                                <option value="Masalah Deposit">
                                                    Masalah Deposit
                                                </option>
                                                <option value="Lainnya">
                                                    Lainnya
                                                </option>
                                            </select>
                                            <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400">
                                                <Plus className="h-4 w-4 rotate-45" />
                                            </div>
                                        </div>
                                        {errors.subject && (
                                            <p className="text-xs text-red-500">
                                                {errors.subject}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                                            Pesan
                                        </label>
                                        <textarea
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    'message',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Detail kendala Anda..."
                                            rows={4}
                                            className="w-full resize-none rounded-xl border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 ring-offset-2 transition-all outline-none focus:border-[#02c39a] focus:bg-white focus:ring-2 focus:ring-[#02c39a]/20"
                                        />
                                        {errors.message && (
                                            <p className="text-xs text-red-500">
                                                {errors.message}
                                            </p>
                                        )}
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

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-[#02c39a] py-3.5 text-sm font-bold text-white shadow-[0_4px_0_rgb(0,168,132)] transition-all hover:translate-y-[2px] hover:bg-[#00a884] hover:shadow-[0_2px_0_rgb(0,168,132)] active:translate-y-1 active:shadow-none disabled:translate-y-1 disabled:opacity-50 disabled:shadow-none"
                                    >
                                        {processing ? (
                                            'Mengirim...'
                                        ) : (
                                            <>
                                                <Send className="h-4 w-4" />
                                                Kirim Tiket Sekarang
                                            </>
                                        )}
                                    </button>
                                </form>
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
                                        {tickets.data.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="px-8 py-10 text-center"
                                                >
                                                    <div className="flex flex-col items-center justify-center">
                                                        <div className="mb-4 rounded-full bg-slate-50 p-6">
                                                            <AlertCircle className="h-12 w-12 text-slate-200" />
                                                        </div>
                                                        <p className="text-sm font-bold text-slate-400">
                                                            Belum ada tiket
                                                            bantuan
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            tickets.data.map((ticket) => (
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
                                                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black tracking-wider uppercase bg-${ticket.status_color}-50 text-${ticket.status_color}-600 ring-1 ring-${ticket.status_color}-100`}
                                                        >
                                                            <CheckCircle2 className="h-3 w-3" />
                                                            {
                                                                ticket.status_label
                                                            }
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                                                            <Clock className="h-3.5 w-3.5" />
                                                            {formatDate(
                                                                ticket.updated_at,
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <Link
                                                            href={`/tickets/${ticket.id}`}
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-400 transition-all hover:bg-[#02c39a] hover:text-white active:scale-95"
                                                        >
                                                            <MessageSquare className="h-4 w-4" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {tickets.data.length > 0 && (
                                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/30 px-8 py-4">
                                    <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                                        Showing {tickets.data.length} Tickets
                                    </p>
                                    <div className="flex gap-2">
                                        {tickets.links.map((link, i) =>
                                            link.url ? (
                                                <Link
                                                    key={i}
                                                    href={link.url}
                                                    className={`h-8 rounded-lg px-3 text-xs font-bold ${link.active ? 'bg-[#02c39a] text-white shadow-sm' : 'border border-slate-200 bg-white text-slate-400 disabled:opacity-50'}`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            ) : (
                                                <span
                                                    key={i}
                                                    className="flex h-8 items-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-300 opacity-50"
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
            </div>
        </AppLayout>
    );
}
