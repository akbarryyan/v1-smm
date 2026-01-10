import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import {
    Clock,
    ExternalLink,
    MessageCircle,
    Phone,
    Send,
    Ticket,
} from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Kontak Kami',
        href: '/contact',
    },
];

export default function Contact() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kontak Kami" />

            <div className="flex h-full flex-1 flex-col gap-4 bg-slate-50/50 p-4 sm:p-5">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="border-l-4 border-[#02c39a] pl-3 text-xl font-extrabold tracking-tight text-slate-900">
                        Kontak Kami
                    </h2>
                    <p className="pl-3 text-xs font-medium text-slate-500">
                        Hubungi kami jika ada pertanyaan atau kendala.
                    </p>
                </div>

                {/* Main Content */}
                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                        <div className="p-6 sm:p-8">
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                {/* Left Content */}
                                <div className="space-y-6 lg:col-span-2">
                                    {/* Introduction */}
                                    <p className="text-sm leading-relaxed font-medium text-slate-600">
                                        Silahkan hubungi kontak dibawah ini
                                        untuk mendaftar atau mengajukan
                                        pertanyaan.
                                    </p>

                                    {/* Contact Methods */}
                                    <div className="space-y-4">
                                        {/* Ticket */}
                                        <div className="flex items-start gap-3">
                                            <Ticket className="mt-0.5 h-4 w-4 shrink-0 text-[#02c39a]" />
                                            <div>
                                                <span className="text-sm font-bold text-slate-800">
                                                    Ticket:{' '}
                                                </span>
                                                <a
                                                    href="/tickets"
                                                    className="text-sm font-bold text-indigo-600 hover:underline"
                                                >
                                                    Ticket (khusus Komplen)
                                                </a>
                                                <span className="text-sm text-slate-500">
                                                    (maksimal dibalas dalam 24
                                                    jam)
                                                </span>
                                            </div>
                                        </div>

                                        {/* WhatsApp */}
                                        <div className="flex items-start gap-3">
                                            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#02c39a]" />
                                            <div>
                                                <span className="text-sm font-bold text-slate-800">
                                                    Whatsapp:{' '}
                                                </span>
                                                <span className="text-sm font-bold text-rose-500">
                                                    LAGI TIDAK BISA
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Telegram Info */}
                                    <div className="space-y-2 rounded-xl bg-slate-50 p-4">
                                        <p className="text-sm text-slate-600">
                                            Jika ada yang mau tanya sesuatu atau
                                            masalah
                                        </p>
                                        <p className="text-sm text-slate-600">
                                            bisa ke telegram kami untuk
                                            sementara
                                        </p>
                                        <a
                                            href="#"
                                            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:underline"
                                        >
                                            <ExternalLink className="h-3.5 w-3.5" />
                                            Klik Disini
                                        </a>
                                    </div>

                                    {/* Channel Telegram */}
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <Send className="mt-0.5 h-4 w-4 shrink-0 text-[#02c39a]" />
                                            <div>
                                                <span className="text-sm font-bold text-slate-800">
                                                    Channel Telegram ( yang lama
                                                    kenak ban post ):{' '}
                                                </span>
                                                <a
                                                    href="#"
                                                    className="text-sm font-bold text-indigo-600 hover:underline"
                                                >
                                                    Klik Disini
                                                </a>
                                                <span className="text-sm text-slate-500">
                                                    {' '}
                                                    ( hanya memberikan Informasi
                                                    terbaru dari Medanpedia )
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#02c39a]" />
                                            <div>
                                                <span className="text-sm font-bold text-slate-800">
                                                    Channel Telegram Baru:{' '}
                                                </span>
                                                <a
                                                    href="#"
                                                    className="text-sm font-bold text-indigo-600 hover:underline"
                                                >
                                                    Klik Disini
                                                </a>
                                                <span className="text-sm text-slate-500">
                                                    {' '}
                                                    ( hanya memberikan Informasi
                                                    terbaru dari Medanpedia )
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Operating Hours */}
                                    <div className="flex items-center gap-6 pt-2">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-[#02c39a]" />
                                            <span className="text-sm font-bold text-slate-700">
                                                Online 08.00-22.00
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-slate-400">
                                            Hari Libur Slow Respon
                                        </span>
                                    </div>
                                </div>

                                {/* Right Illustration */}
                                <div className="hidden items-center justify-center lg:flex">
                                    <div className="relative">
                                        {/* Placeholder for illustration - you can replace with actual image */}
                                        <div className="flex h-48 w-48 items-center justify-center rounded-full bg-linear-to-br from-indigo-100 to-purple-100">
                                            <div className="text-center">
                                                <MessageCircle className="mx-auto mb-2 h-16 w-16 text-indigo-400" />
                                                <p className="text-xs font-bold text-indigo-500">
                                                    Hubungi Kami
                                                </p>
                                            </div>
                                        </div>
                                        {/* Decorative elements */}
                                        <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-amber-300" />
                                        <div className="absolute -bottom-1 -left-1 h-4 w-4 rounded-full bg-[#02c39a]" />
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
