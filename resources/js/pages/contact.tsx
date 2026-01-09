import LandingFooter from '@/components/landing-footer';
import LandingNavbar from '@/components/landing-navbar';
import { Head, useForm } from '@inertiajs/react';
import { Clock, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { data, setData, processing, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Simulasi submit - nanti bisa diganti dengan actual endpoint
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            reset();
        }, 3000);
    };

    return (
        <>
            <Head title="Kontak - SMM Panel">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap"
                    rel="stylesheet"
                />
                <style>{`
                    * { font-family: 'Bricolage Grotesque', sans-serif; }
                    html { scroll-behavior: smooth; }
                `}</style>
            </Head>

            <div className="min-h-screen bg-slate-50">
                {/* Navbar */}
                <LandingNavbar variant="solid" />

                {/* Hero Section */}
                <section className="relative overflow-hidden bg-linear-to-br from-[#a8dadc] via-[#81c8cc] to-[#457b9d] px-4 py-16 sm:px-6 sm:py-24">
                    <div className="relative z-10 mx-auto max-w-4xl text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                            <MessageSquare className="h-4 w-4" />
                            Hubungi Kami
                        </div>
                        <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                            Ada Pertanyaan?
                        </h1>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                            Tim kami siap membantu Anda 24/7. Jangan ragu untuk
                            menghubungi kami melalui form di bawah atau melalui
                            kontak lainnya.
                        </p>
                    </div>

                    {/* Wave */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
                        <svg
                            className="relative block h-[40px] w-[calc(100%+1.3px)] md:h-[80px]"
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.15,97.02,126,104,180,95.8,234,87.6,281.42,68.96,321.39,56.44Z"
                                className="fill-slate-50"
                            ></path>
                        </svg>
                    </div>
                </section>

                {/* Contact Content */}
                <section className="px-4 py-14 sm:px-6 sm:py-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid gap-10 lg:grid-cols-5">
                            {/* Contact Info */}
                            <div className="lg:col-span-2">
                                <h2 className="mb-6 text-2xl font-bold text-slate-800">
                                    Informasi Kontak
                                </h2>
                                <div className="space-y-4">
                                    <div className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#a8dadc]/20 transition-all duration-300 group-hover:bg-[#a8dadc]">
                                            <Mail className="h-5 w-5 text-[#457b9d] transition-colors duration-300 group-hover:text-white" />
                                        </div>
                                        <div>
                                            <h3 className="mb-1 font-semibold text-slate-800">
                                                Email
                                            </h3>
                                            <p className="text-sm text-slate-500">
                                                support@smmpanel.id
                                            </p>
                                        </div>
                                    </div>

                                    <div className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#a8dadc]/20 transition-all duration-300 group-hover:bg-[#a8dadc]">
                                            <Phone className="h-5 w-5 text-[#457b9d] transition-colors duration-300 group-hover:text-white" />
                                        </div>
                                        <div>
                                            <h3 className="mb-1 font-semibold text-slate-800">
                                                WhatsApp
                                            </h3>
                                            <p className="text-sm text-slate-500">
                                                +62 812 3456 7890
                                            </p>
                                        </div>
                                    </div>

                                    <div className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#a8dadc]/20 transition-all duration-300 group-hover:bg-[#a8dadc]">
                                            <Clock className="h-5 w-5 text-[#457b9d] transition-colors duration-300 group-hover:text-white" />
                                        </div>
                                        <div>
                                            <h3 className="mb-1 font-semibold text-slate-800">
                                                Jam Operasional
                                            </h3>
                                            <p className="text-sm text-slate-500">
                                                24 Jam / 7 Hari
                                            </p>
                                        </div>
                                    </div>

                                    <div className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#a8dadc]/20 transition-all duration-300 group-hover:bg-[#a8dadc]">
                                            <MapPin className="h-5 w-5 text-[#457b9d] transition-colors duration-300 group-hover:text-white" />
                                        </div>
                                        <div>
                                            <h3 className="mb-1 font-semibold text-slate-800">
                                                Lokasi
                                            </h3>
                                            <p className="text-sm text-slate-500">
                                                Jakarta, Indonesia
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="lg:col-span-3">
                                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                                    <h2 className="mb-6 text-2xl font-bold text-slate-800">
                                        Kirim Pesan
                                    </h2>

                                    {isSubmitted ? (
                                        <div className="flex flex-col items-center justify-center py-12 text-center">
                                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                                                <Send className="h-8 w-8 text-emerald-600" />
                                            </div>
                                            <h3 className="mb-2 text-xl font-bold text-slate-800">
                                                Pesan Terkirim!
                                            </h3>
                                            <p className="text-sm text-slate-500">
                                                Terima kasih. Tim kami akan
                                                membalas pesan Anda segera.
                                            </p>
                                        </div>
                                    ) : (
                                        <form
                                            onSubmit={handleSubmit}
                                            className="space-y-5"
                                        >
                                            <div className="grid gap-5 sm:grid-cols-2">
                                                <div>
                                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                                        Nama Lengkap
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.name}
                                                        onChange={(e) =>
                                                            setData(
                                                                'name',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition-all duration-300 focus:border-[#a8dadc] focus:bg-white focus:ring-2 focus:ring-[#a8dadc]/20 focus:outline-none"
                                                        placeholder="John Doe"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        value={data.email}
                                                        onChange={(e) =>
                                                            setData(
                                                                'email',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition-all duration-300 focus:border-[#a8dadc] focus:bg-white focus:ring-2 focus:ring-[#a8dadc]/20 focus:outline-none"
                                                        placeholder="john@example.com"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                                    Subjek
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.subject}
                                                    onChange={(e) =>
                                                        setData(
                                                            'subject',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition-all duration-300 focus:border-[#a8dadc] focus:bg-white focus:ring-2 focus:ring-[#a8dadc]/20 focus:outline-none"
                                                    placeholder="Bagaimana kami bisa membantu?"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-slate-700">
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
                                                    rows={5}
                                                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition-all duration-300 focus:border-[#a8dadc] focus:bg-white focus:ring-2 focus:ring-[#a8dadc]/20 focus:outline-none"
                                                    placeholder="Tulis pesan Anda di sini..."
                                                    required
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#457b9d] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#457b9d]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3d6a87] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                Kirim Pesan
                                                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <LandingFooter />
            </div>
        </>
    );
}
