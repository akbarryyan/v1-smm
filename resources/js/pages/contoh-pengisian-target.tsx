import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Contoh Pengisian Target',
        href: '/contoh-pengisian-target',
    },
];

export default function ContohPengisianTarget() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contoh Pengisian Target" />

            <div className="flex h-full flex-1 flex-col gap-4 bg-slate-50/50 p-4 sm:p-5">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="border-l-4 border-[#02c39a] pl-3 text-xl font-extrabold tracking-tight text-slate-900">
                        Contoh Pengisian Target
                    </h2>
                    <p className="pl-3 text-xs font-medium text-slate-500">
                        Panduan pengisian target pesanan dengan benar.
                    </p>
                </div>

                {/* Main Content */}
                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
                        <div className="space-y-8">
                            {/* Introduction */}
                            <div className="space-y-1 text-sm leading-relaxed text-slate-600">
                                <p>
                                    Berikut adalah beberapa contoh pengisian
                                    pada target pesanan.
                                </p>
                                <p>
                                    Pastikan untuk periksa kembali{' '}
                                    <span className="text-indigo-600">
                                        target pesanan
                                    </span>{' '}
                                    Anda sebelum pesanan dibuat sehingga pesanan
                                    dapat diproses.
                                </p>
                                <p>
                                    Jika ada hal yang ingin anda{' '}
                                    <span className="text-indigo-600">
                                        tanyakan
                                    </span>
                                    , bisa{' '}
                                    <span className="text-indigo-600">
                                        langsung
                                    </span>{' '}
                                    tanyakan dengan cara masuk ke halaman kontak
                                    pada website kami ya.
                                </p>
                            </div>

                            {/* Instagram Section */}
                            <section>
                                <h3 className="mb-4 text-xl font-black text-slate-800">
                                    Instagram
                                </h3>
                                <ul className="space-y-4 text-sm text-slate-600">
                                    <li>
                                        <p className="font-medium">
                                            • Instagram Followers,{' '}
                                            <span className="text-indigo-600">
                                                Story
                                            </span>
                                            ,{' '}
                                            <span className="text-indigo-600">
                                                Live Video
                                            </span>
                                            , Profile Visits
                                        </p>
                                        <ul className="mt-1 ml-6 space-y-1">
                                            <li>
                                                ◦{' '}
                                                <span className="text-indigo-600">
                                                    Username
                                                </span>{' '}
                                                akun Instagram tanpa tanda @
                                            </li>
                                            <li>
                                                ◦ Contoh Link/Target :{' '}
                                                <span className="font-bold">
                                                    mustakinnur
                                                </span>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <p className="font-medium">
                                            • Instagram{' '}
                                            <span className="text-indigo-600">
                                                Likes
                                            </span>
                                            ,{' '}
                                            <span className="text-indigo-600">
                                                Views
                                            </span>
                                            ,{' '}
                                            <span className="text-indigo-600">
                                                Comments
                                            </span>
                                            , Impressions, Saves
                                        </p>
                                        <ul className="mt-1 ml-6 space-y-1">
                                            <li>
                                                ◦{' '}
                                                <span className="text-indigo-600">
                                                    Link
                                                </span>{' '}
                                                postingan akun Instagram
                                            </li>
                                            <li>
                                                ◦ Contoh Link/Target :{' '}
                                                <span className="text-indigo-600">
                                                    https://www.instagram.com/p/BxII7dssodwBn_p/
                                                </span>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <p className="font-medium">
                                            • Instagram TV
                                        </p>
                                        <ul className="mt-1 ml-6 space-y-1">
                                            <li>
                                                ◦{' '}
                                                <span className="text-indigo-600">
                                                    Link
                                                </span>{' '}
                                                postingan Instagram TV
                                            </li>
                                            <li>
                                                ◦ Contoh Link/Target :{' '}
                                                <span className="text-indigo-600">
                                                    https://www.instagram.com/tv/CUOfgerkDLo8sqP/
                                                </span>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <p className="font-medium">
                                            • Instagram Reels
                                        </p>
                                        <ul className="mt-1 ml-6 space-y-1">
                                            <li>
                                                ◦{' '}
                                                <span className="text-indigo-600">
                                                    Link
                                                </span>{' '}
                                                postingan Instagram Reels /
                                            </li>
                                            <li>
                                                ◦ Contoh Link/Target :{' '}
                                                <span className="text-indigo-600">
                                                    https://www.instagram.com/reel/CUrqMtmfldloDl/
                                                </span>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </section>

                            {/* Youtube Section */}
                            <section>
                                <h3 className="mb-4 text-xl font-black text-slate-800">
                                    Youtube
                                </h3>
                                <ul className="space-y-4 text-sm text-slate-600">
                                    <li>
                                        <p className="font-medium">
                                            • Youtube Likes, Views, Shares,
                                            Komentar
                                        </p>
                                        <ul className="mt-1 ml-6 space-y-1">
                                            <li>
                                                ◦{' '}
                                                <span className="text-indigo-600">
                                                    Link
                                                </span>{' '}
                                                video youtube
                                            </li>
                                            <li>
                                                ◦ Contoh Link/Target :{' '}
                                                <span className="text-indigo-600">
                                                    https://www.youtube.com/watch?v=NdgFndfdhFQqI
                                                </span>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <p className="font-medium">
                                            • Youtube Live Steam
                                        </p>
                                        <ul className="mt-1 ml-6 space-y-1">
                                            <li>
                                                ◦{' '}
                                                <span className="text-indigo-600">
                                                    Link
                                                </span>{' '}
                                                video live youtube
                                            </li>
                                            <li>
                                                ◦ Contoh Link/Target :{' '}
                                                <span className="text-indigo-600">
                                                    https://www.youtube.com/watch?v=0AFofdM8thZU_g
                                                </span>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <p className="font-medium">
                                            • Youtube Subscribers
                                        </p>
                                        <ul className="mt-1 ml-6 space-y-1">
                                            <li>
                                                ◦{' '}
                                                <span className="text-indigo-600">
                                                    Link
                                                </span>{' '}
                                                channel youtube
                                            </li>
                                            <li>
                                                ◦ Contoh Link/Target :{' '}
                                                <span className="text-indigo-600">
                                                    https://www.youtube.com/channel/UCjPr9Tbddfdf2ss9TCEDn-eALw
                                                </span>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </section>

                            {/* TikTok Section */}
                            <section>
                                <h3 className="mb-4 text-xl font-black text-slate-800">
                                    TikTok
                                </h3>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li>
                                        <p>
                                            - TikTok Likes / Views :{' '}
                                            <span className="text-indigo-600">
                                                Link video tiktok
                                            </span>{' '}
                                            // Contoh :{' '}
                                            <span className="text-indigo-600">
                                                https://vt.tiktok.com/xxxxx/
                                            </span>
                                        </p>
                                    </li>
                                </ul>
                            </section>

                            {/* Shopee Section */}
                            <section>
                                <h3 className="mb-4 text-xl font-black text-slate-800">
                                    Shopee
                                </h3>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li>
                                        <p>
                                            - Shopee Followers :{' '}
                                            <span className="text-indigo-600">
                                                Username
                                            </span>{' '}
                                            akun{' '}
                                            <span className="text-indigo-600">
                                                shopee
                                            </span>{' '}
                                            // Contoh :{' '}
                                            <span className="font-bold">
                                                mustakin00
                                            </span>
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            - Shopee Product{' '}
                                            <span className="text-indigo-600">
                                                Likes
                                            </span>{' '}
                                            :{' '}
                                            <span className="text-indigo-600">
                                                Link produk shopee
                                            </span>{' '}
                                            // Contoh :{' '}
                                            <span className="text-indigo-600">
                                                https://shopee.co.id/Stiker-Keyboard-Arab-Stiker-Keyboard-Arabic-i.8232793.668063715
                                            </span>
                                        </p>
                                    </li>
                                </ul>
                            </section>

                            {/* Tokopedia Section */}
                            <section>
                                <h3 className="mb-4 text-xl font-black text-slate-800">
                                    Tokopedia
                                </h3>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li>
                                        <p>
                                            - Tokopedia Followers :{' '}
                                            <span className="text-indigo-600">
                                                Username akun tokopedia atau
                                                link profile
                                            </span>{' '}
                                            // Contoh :{' '}
                                            <span className="text-indigo-600">
                                                https://www.tokopedia.com/cleanandcleanshop
                                            </span>
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            - Tokopedia Wishlist atau{' '}
                                            <span className="text-indigo-600">
                                                Favorite
                                            </span>{' '}
                                            :{' '}
                                            <span className="text-indigo-600">
                                                Link produk tokopedia
                                            </span>{' '}
                                            // Contoh :{' '}
                                            <span className="break-all text-indigo-600">
                                                https://www.tokopedia.com/dbeofficial/dbe-dj80-foldable-dj-headphone-with-detachable-microphone-hitam
                                            </span>
                                        </p>
                                    </li>
                                </ul>
                            </section>

                            {/* Website Traffic Section */}
                            <section>
                                <h3 className="mb-4 text-xl font-black text-slate-800">
                                    Website Traffic
                                </h3>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li>
                                        <p>
                                            - Website Traffic :{' '}
                                            <span className="text-indigo-600">
                                                Link website
                                            </span>{' '}
                                            // Contoh :{' '}
                                            <span className="text-indigo-600">
                                                https://medanpedia.co.id
                                            </span>
                                        </p>
                                    </li>
                                </ul>
                            </section>

                            {/* Telegram Section */}
                            <section>
                                <h3 className="mb-4 text-xl font-black text-slate-800">
                                    Telegram
                                </h3>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li>
                                        <p className="font-medium">
                                            • Telegram Channel Members/Group :{' '}
                                            <span className="text-indigo-600">
                                                Link Channel/Group
                                            </span>{' '}
                                            // Contoh :{' '}
                                            <span className="text-indigo-600">
                                                https://t.me/medanpediaSMM
                                            </span>
                                        </p>
                                    </li>
                                    <li className="ml-6">
                                        - Telegram Post Last Views // Contoh :{' '}
                                        <span className="text-indigo-600">
                                            https://t.me/medanpediaSMM
                                        </span>
                                    </li>
                                    <li className="ml-6">
                                        - Telegram Post Views // Contoh :{' '}
                                        <span className="text-indigo-600">
                                            https://t.me/medanpediaSMM/1195
                                        </span>
                                    </li>
                                    <li className="ml-6">
                                        - Telegram Reactions // Contoh :{' '}
                                        <span className="text-indigo-600">
                                            https://t.me/medanpediaSMM/1195
                                        </span>
                                    </li>
                                    <li className="ml-6">
                                        - Telegram Story // Contoh :{' '}
                                        <span className="text-indigo-600">
                                            https://t.me/medanpediaSMM/s/2
                                        </span>
                                    </li>
                                </ul>
                            </section>

                            {/* Whatsapp Section */}
                            <section>
                                <h3 className="mb-4 text-xl font-black text-slate-800">
                                    Whatsapp
                                </h3>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li>
                                        <p className="font-medium">
                                            • Whatsapp Channel Members/Group :{' '}
                                            <span className="text-indigo-600">
                                                Link Channel/Group
                                            </span>{' '}
                                            // Contoh :
                                        </p>
                                        <div className="mt-2 ml-6 rounded-lg border border-slate-200 bg-slate-50 p-3">
                                            <code className="text-xs break-all text-slate-600">
                                                https://whatsapp.com/channel/XXXXXXXXXXXXXXXXX
                                            </code>
                                        </div>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
