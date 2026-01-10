import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Clock, Send, User, UserCog } from 'lucide-react';
import { FormEvent } from 'react';

interface User {
    id: number;
    name: string;
    avatar?: string;
}

interface TicketMessage {
    id: number;
    user: User;
    message: string;
    is_admin: number; // or boolean depending on DB casting
    created_at: string;
}

interface Ticket {
    id: number;
    subject: string;
    status: string;
    status_label: string;
    status_color: string;
    created_at: string;
    messages: TicketMessage[];
}

export default function TicketShow() {
    const { ticket } = usePage<{ ticket: Ticket }>().props;

    const { data, setData, post, processing, reset } = useForm({
        message: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(`/tickets/${ticket.id}/reply`, {
            onSuccess: () => reset(),
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
        <AppLayout
            breadcrumbs={[
                { title: 'Tiket', href: '/tickets' },
                { title: `Tiket #${ticket.id}`, href: `/tickets/${ticket.id}` },
            ]}
        >
            <Head title={`Tiket #${ticket.id}`} />

            <div className="flex h-full flex-1 flex-col gap-6 bg-slate-50/50 p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                            <Clock className="h-4 w-4" />
                            {formatDate(ticket.created_at)}
                        </div>
                        <h2 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-900">
                            <span className="text-slate-400">#{ticket.id}</span>
                            {ticket.subject}
                            <span
                                className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase bg-${ticket.status_color}-50 text-${ticket.status_color}-600 ring-1 ring-${ticket.status_color}-100`}
                            >
                                {ticket.status_label}
                            </span>
                        </h2>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex flex-1 flex-col overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200">
                    <div className="flex-1 space-y-6 overflow-y-auto p-6 text-sm">
                        {ticket.messages.map((msg) => {
                            const isAdmin = Boolean(msg.is_admin); // Assuming is_admin is 0 or 1
                            return (
                                <div
                                    key={msg.id}
                                    className={`flex gap-4 ${
                                        isAdmin
                                            ? 'flex-row'
                                            : 'flex-row-reverse'
                                    }`}
                                >
                                    <div
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                                            isAdmin
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-[#02c39a]/10 text-[#02c39a]'
                                        }`}
                                    >
                                        {isAdmin ? (
                                            <UserCog className="h-5 w-5" />
                                        ) : (
                                            <User className="h-5 w-5" />
                                        )}
                                    </div>
                                    <div
                                        className={`flex max-w-[80%] flex-col gap-1 ${
                                            isAdmin
                                                ? 'items-start'
                                                : 'items-end'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-slate-700">
                                                {isAdmin ? 'Admin' : 'Anda'}
                                            </span>
                                            <span className="text-xs text-slate-400">
                                                {formatDate(msg.created_at)}
                                            </span>
                                        </div>
                                        <div
                                            className={`rounded-2xl p-4 leading-relaxed ${
                                                isAdmin
                                                    ? 'rounded-tl-none bg-slate-50 text-slate-600'
                                                    : 'rounded-tr-none bg-[#02c39a] text-white'
                                            }`}
                                        >
                                            {msg.message}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Reply Box */}
                    <div className="border-t border-slate-100 bg-slate-50 p-4">
                        <form onSubmit={handleSubmit} className="flex gap-4">
                            <textarea
                                value={data.message}
                                onChange={(e) =>
                                    setData('message', e.target.value)
                                }
                                placeholder="Ketik balasan Anda..."
                                className="flex-1 resize-none rounded-2xl border-0 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-[#02c39a]"
                                rows={2}
                            />
                            <button
                                type="submit"
                                disabled={processing || !data.message.trim()}
                                className="flex h-auto w-14 shrink-0 items-center justify-center rounded-2xl bg-[#02c39a] text-white shadow-lg shadow-[#02c39a]/20 transition-all hover:bg-[#00a884] active:scale-95 disabled:opacity-50 disabled:shadow-none"
                            >
                                <Send className="h-5 w-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
