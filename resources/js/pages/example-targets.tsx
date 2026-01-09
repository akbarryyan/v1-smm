import LandingFooter from '@/components/landing-footer';
import LandingNavbar from '@/components/landing-navbar';
import { Head, Link } from '@inertiajs/react';
import {
    CheckCircle2,
    ExternalLink,
    Facebook,
    HelpCircle,
    Instagram,
    Music2,
    Pointer,
    Send,
    ShoppingCart,
    Twitter,
    Youtube,
} from 'lucide-react';

export default function ExampleTargets() {
    const platforms = [
        {
            name: 'Instagram',
            icon: <Instagram className="h-6 w-6 text-pink-500" />,
            items: [
                {
                    service: 'Followers, Story, Live Video, Profile Visits',
                    format: 'Username (Tanpa tanda @)',
                    example: 'mustakinnur',
                },
                {
                    service: 'Likes, Views, Comments, Impressions, Saves',
                    format: 'Link Postingan Lengkap',
                    example: 'https://www.instagram.com/p/BxilTdssedewBn_p/',
                },
                {
                    service: 'Instagram Reels / TV',
                    format: 'Link Reels atau Link TV',
                    example: 'https://www.instagram.com/reel/CUrqMtmfdfdloDI/',
                },
            ],
        },
        {
            name: 'YouTube',
            icon: <Youtube className="h-6 w-6 text-red-600" />,
            items: [
                {
                    service: 'Likes, Views, Shares, Komentar, Live Stream',
                    format: 'Link Video YouTube Lengkap',
                    example: 'https://www.youtube.com/watch?v=NdgFndfdnFQ',
                },
                {
                    service: 'Subscribers',
                    format: 'Link Channel YouTube',
                    example: 'https://www.youtube.com/channel/UCjPr9Tb...',
                },
            ],
        },
        {
            name: 'TikTok',
            icon: <Music2 className="h-6 w-6 text-slate-800" />,
            items: [
                {
                    service: 'Followers',
                    format: 'Link Profil atau Username (Tanpa @)',
                    example: 'https://tiktok.com/@username/',
                },
                {
                    service: 'Likes / Views',
                    format: 'Link Video TikTok Lengkap',
                    example: 'https://vt.tiktok.com/xxxxx/',
                },
            ],
        },
        {
            name: 'Facebook',
            icon: <Facebook className="h-6 w-6 text-blue-600" />,
            items: [
                {
                    service: 'Page Likes / Page Followers',
                    format: 'Link Halaman / Fanspage',
                    example: 'https://www.facebook.com/telkomsel/',
                },
                {
                    service: 'Post Likes / Post Video',
                    format: 'Link Postingan Facebook',
                    example: 'https://www.facebook.com/posts/21614574...',
                },
                {
                    service: 'Followers / Friends / Groups',
                    format: 'Link Profil atau Link Group',
                    example: 'https://www.facebook.com/groups/167529...',
                },
            ],
        },
        {
            name: 'Twitter (X)',
            icon: <Twitter className="h-6 w-6 text-sky-500" />,
            items: [
                {
                    service: 'Followers',
                    format: 'Username (Tanpa tanda @)',
                    example: 'TelkomCare',
                },
                {
                    service: 'Retweet / Favorite',
                    format: 'Link Tweet/Postingan Twitter',
                    example: 'https://twitter.com/TelkomCare/status/...',
                },
            ],
        },
        {
            name: 'Marketplace (Shopee & Tokopedia)',
            icon: <ShoppingCart className="h-6 w-6 text-orange-500" />,
            items: [
                {
                    service: 'Shopee / Tokopedia Followers',
                    format: 'Username Toko atau Link Profil Toko',
                    example: 'https://shopee.co.id/namatoko',
                },
                {
                    service: 'Product Likes / Wishlist / Favorite',
                    format: 'Link Produk Lengkap',
                    example: 'https://tokopedia.com/toko/link-produk',
                },
            ],
        },
        {
            name: 'Messenger & Others',
            icon: <Send className="h-6 w-6 text-blue-500" />,
            items: [
                {
                    service: 'Telegram Channel / Group / Views',
                    format: 'Link Channel atau Link Postingan',
                    example: 'https://t.me/SMMProvider',
                },
                {
                    service: 'WhatsApp Channel Members',
                    format: 'Link Channel WhatsApp',
                    example: 'https://whatsapp.com/channel/XXXXX',
                },
                {
                    service: 'Website Traffic',
                    format: 'Link URL Website',
                    example: 'https://brand-anda.com',
                },
            ],
        },
    ];

    return (
        <>
            <Head title="Contoh Pengisian Target - SMM Panel">
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
                <LandingNavbar variant="solid" />

                {/* Hero Section */}
                <section className="relative overflow-hidden bg-linear-to-br from-[#a8dadc] via-[#81c8cc] to-[#457b9d] px-4 py-16 sm:px-6 sm:py-24">
                    <div className="relative z-10 mx-auto max-w-4xl text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                            <Pointer className="h-4 w-4" />
                            Panduan Akurasi
                        </div>
                        <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                            Contoh Pengisian Target
                        </h1>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                            Pastikan format target pesanan Anda sesuai dengan
                            panduan di bawah ini agar sistem dapat memprosesnya
                            secara instan.
                        </p>
                    </div>

                    {/* Wave divider */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
                        <svg
                            className="relative block h-[40px] w-[calc(100%+1.3px)] md:h-[80px]"
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

                {/* Info Alert */}
                <section className="px-4 pt-12 sm:px-6">
                    <div className="mx-auto max-w-4xl">
                        <div className="flex items-center gap-4 rounded-3xl bg-blue-50 p-6 ring-1 ring-blue-100">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-blue-200">
                                <HelpCircle className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">
                                    Butuh Bantuan?
                                </h3>
                                <p className="text-sm text-slate-600">
                                    Jika Anda masih bingung mengenai format
                                    target, silakan hubungi tim kami melalui
                                    halaman{' '}
                                    <Link
                                        href="/contact"
                                        className="font-bold text-[#457b9d] hover:underline"
                                    >
                                        Kontak Kami
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories Grid */}
                <section className="px-4 py-16 sm:px-6 sm:py-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="columns-1 gap-8 md:columns-2 lg:columns-2">
                            {platforms.map((platform, idx) => (
                                <div
                                    key={idx}
                                    className="mb-8 break-inside-avoid overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
                                >
                                    <div className="mb-6 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-100">
                                            {platform.icon}
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-800">
                                            {platform.name}
                                        </h2>
                                    </div>
                                    <div className="space-y-6">
                                        {platform.items.map((item, i) => (
                                            <div key={i} className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                                    {item.service}
                                                </div>
                                                <div className="ml-6 flex flex-col gap-1.5">
                                                    <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                                        Format:
                                                    </span>
                                                    <p className="text-sm text-slate-600">
                                                        {item.format}
                                                    </p>
                                                    <div className="mt-1 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 ring-1 ring-slate-100">
                                                        <code className="mr-2 overflow-hidden font-mono text-xs text-ellipsis whitespace-nowrap text-[#457b9d]">
                                                            {item.example}
                                                        </code>
                                                        <ExternalLink className="h-3 w-3 text-slate-300" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <LandingFooter />
            </div>
        </>
    );
}
