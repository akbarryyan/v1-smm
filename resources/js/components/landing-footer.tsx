import { Link } from '@inertiajs/react';
import { Sparkles } from 'lucide-react';

export default function LandingFooter() {
    const serviceLinks = [
        { name: 'SEWA SMM', href: '/rent-smm' },
        { name: 'Keuntungan Join', href: '/benefits' },
        { name: 'Contoh Pengisian Target', href: '/example-targets' },
        { name: 'Penjelasan Status Pesanan', href: '/order-status' },
    ];

    const helpLinks = [
        { name: 'Pertanyaan Umum', href: '/#faq' },
        { name: 'Kontak', href: '/contact' },
        { name: 'Ketentuan Layanan', href: '/terms' },
    ];

    return (
        <footer className="relative z-10 bg-slate-800 px-4 py-10 sm:px-6 sm:py-14">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex flex-col justify-between gap-8 sm:mb-10 sm:gap-10 md:flex-row">
                    <div className="max-w-sm">
                        <Link href="/" className="mb-4 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#a8dadc]">
                                <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-lg font-bold text-white">
                                SMM Panel
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Panel SMM terpercaya untuk mengembangkan media
                            sosial Anda dengan layanan terbaik dan proses
                            otomatis.
                        </p>
                    </div>

                    <div className="flex flex-col gap-10 md:flex-row md:gap-24">
                        <div>
                            <h4 className="mb-4 text-sm font-semibold text-white">
                                Layanan & Informasi
                            </h4>
                            <ul className="space-y-2.5">
                                {serviceLinks.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            className="text-sm text-slate-400 transition-colors duration-300 hover:text-[#a8dadc]"
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-4 text-sm font-semibold text-white">
                                Bantuan
                            </h4>
                            <ul className="space-y-2.5">
                                {helpLinks.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            className="text-sm text-slate-400 transition-colors duration-300 hover:text-[#a8dadc]"
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
                    © 2026 SMM Panel. Hak cipta dilindungi.
                </div>
            </div>
        </footer>
    );
}
