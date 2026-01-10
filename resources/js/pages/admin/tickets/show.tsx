import AdminLayout from '@/layouts/admin-layout';
import { Head, router, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    CheckCircle,
    Clock,
    Lock,
    MessageSquare,
    Send,
    Unlock,
    User,
} from 'lucide-react';
import { FormEvent } from 'react';

interface UserData {
    id: number;
    name: string;
    email: string;
}

interface Message {
    id: number;
    ticket_id: number;
    user_id: number;
    message: string;
    is_admin: boolean;
    created_at: string;
    user: UserData;
}

interface Ticket {
    id: number;
    user_id: number;
    subject: string;
    status: string;
    status_label: string;
    status_color: string;
    created_at: string;
    updated_at: string;
    user: UserData;
    messages: Message[];
}

interface PageProps {
    ticket: Ticket;
    [key: string]: unknown;
}

export default function AdminTicketShow({ ticket }: PageProps) {
    const { data, setData, post, processing, reset } = useForm({
        message: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(`/admin/tickets/${ticket.id}/reply`, {
            onSuccess: () => reset(),
        });
    };

    const handleClose = () => {
        router.post(`/admin/tickets/${ticket.id}/close`);
    };

    const handleReopen = () => {
        router.post(`/admin/tickets/${ticket.id}/reopen`);
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

    const getStatusBadge = () => {
        const colors: Record<string, string> = {
            pending: 'bg-amber-100 text-amber-700',
            answered: 'bg-emerald-100 text-emerald-700',
            closed: 'bg-slate-100 text-slate-600',
        };
        const icons: Record<string, typeof Clock> = {
            pending: Clock,
            answered: CheckCircle,
            closed: Lock,
        };
        const Icon = icons[ticket.status] || Clock;
        return (
            <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${colors[ticket.status] || colors.pending}`}
            >
                <Icon className="h-3.5 w-3.5" />
                {ticket.status_label}
            </span>
        );
    };

    return (
        <AdminLayout title={`Tiket #${ticket.id}`}>
            <Head title={`Admin - Tiket #${ticket.id}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.visit('/admin/tickets')}
                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800">
                                Tiket #{ticket.id}
                            </h1>
                            <p className="text-sm text-slate-500">
                                {ticket.subject}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {getStatusBadge()}
                        {ticket.status !== 'closed' ? (
                            <button
                                onClick={handleClose}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-200"
                            >
                                <Lock className="h-3.5 w-3.5" />
                                Tutup Tiket
                            </button>
                        ) : (
                            <button
                                onClick={handleReopen}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-[#02c39a]/10 px-4 py-2 text-xs font-bold text-[#02c39a] transition-colors hover:bg-[#02c39a] hover:text-white"
                            >
                                <Unlock className="h-3.5 w-3.5" />
                                Buka Kembali
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Messages */}
                    <div className="lg:col-span-2">
                        <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                            <div className="border-b border-slate-100 px-6 py-4">
                                <h2 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                                    <MessageSquare className="h-4 w-4 text-[#02c39a]" />
                                    Percakapan
                                </h2>
                            </div>

                            <div className="max-h-[500px] space-y-4 overflow-y-auto p-6">
                                {ticket.messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.is_admin ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-2xl p-4 ${
                                                msg.is_admin
                                                    ? 'bg-[#02c39a] text-white'
                                                    : 'bg-slate-100 text-slate-800'
                                            }`}
                                        >
                                            <div className="mb-2 flex items-center gap-2">
                                                <div
                                                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                                                        msg.is_admin
                                                            ? 'bg-white/20'
                                                            : 'bg-slate-200'
                                                    }`}
                                                >
                                                    <User
                                                        className={`h-3 w-3 ${msg.is_admin ? 'text-white' : 'text-slate-500'}`}
                                                    />
                                                </div>
                                                <span
                                                    className={`text-xs font-bold ${msg.is_admin ? 'text-white/80' : 'text-slate-600'}`}
                                                >
                                                    {msg.is_admin
                                                        ? 'Admin'
                                                        : msg.user?.name ||
                                                          'Pengguna'}
                                                </span>
                                            </div>
                                            <p
                                                className={`text-sm leading-relaxed ${msg.is_admin ? 'text-white' : 'text-slate-700'}`}
                                            >
                                                {msg.message}
                                            </p>
                                            <p
                                                className={`mt-2 text-[10px] ${msg.is_admin ? 'text-white/60' : 'text-slate-400'}`}
                                            >
                                                {formatDate(msg.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Reply Form */}
                            {ticket.status !== 'closed' && (
                                <div className="border-t border-slate-100 p-4">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="flex gap-3"
                                    >
                                        <textarea
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    'message',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Tulis balasan..."
                                            rows={2}
                                            className="flex-1 resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/20 focus:outline-none"
                                            required
                                        />
                                        <button
                                            type="submit"
                                            disabled={
                                                processing ||
                                                !data.message.trim()
                                            }
                                            className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#02c39a] text-white shadow-lg shadow-[#02c39a]/25 transition-all hover:bg-[#00a884] disabled:opacity-50"
                                        >
                                            <Send className="h-5 w-5" />
                                        </button>
                                    </form>
                                </div>
                            )}

                            {ticket.status === 'closed' && (
                                <div className="border-t border-slate-100 p-4">
                                    <div className="rounded-lg bg-slate-50 p-4 text-center">
                                        <Lock className="mx-auto mb-2 h-6 w-6 text-slate-400" />
                                        <p className="text-sm text-slate-500">
                                            Tiket ini sudah ditutup. Buka
                                            kembali untuk membalas.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Ticket Info */}
                    <div className="space-y-4">
                        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                            <h3 className="mb-4 text-sm font-bold text-slate-800">
                                Informasi Tiket
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">
                                        ID Tiket
                                    </p>
                                    <p className="mt-1 font-mono text-sm font-bold text-slate-700">
                                        #{ticket.id}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">
                                        Subjek
                                    </p>
                                    <p className="mt-1 text-sm text-slate-700">
                                        {ticket.subject}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">
                                        Dibuat
                                    </p>
                                    <p className="mt-1 text-sm text-slate-700">
                                        {formatDate(ticket.created_at)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">
                                        Terakhir Diperbarui
                                    </p>
                                    <p className="mt-1 text-sm text-slate-700">
                                        {formatDate(ticket.updated_at)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                            <h3 className="mb-4 text-sm font-bold text-slate-800">
                                Informasi Pengguna
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#02c39a]/10 text-[#02c39a]">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">
                                            {ticket.user?.name || 'N/A'}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {ticket.user?.email || ''}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
