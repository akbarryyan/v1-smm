import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Keuntungan Join Medanpedia',
        href: '/keuntungan-join-medanpedia',
    },
];

export default function KeuntunganJoinMedanpedia() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Keuntungan Join Medanpedia" />

            <div className="flex h-full flex-1 flex-col gap-4 bg-slate-50/50 p-4 sm:p-5">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="border-l-4 border-[#02c39a] pl-3 text-xl font-extrabold tracking-tight text-slate-900">
                        Keuntungan Join Medanpedia
                    </h2>
                    <p className="pl-3 text-xs font-medium text-slate-500">
                        Temukan berbagai keuntungan bergabung bersama kami.
                    </p>
                </div>

                {/* Main Content */}
                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
                        <div className="space-y-6 text-sm leading-relaxed text-slate-600">
                            {/* Introduction */}
                            <p>
                                Berikut adalah beberapa cara mendapatkan
                                penghasilan menggunakan{' '}
                                <span className="text-indigo-600">
                                    Medanpedia
                                </span>
                            </p>

                            {/* Point 1 */}
                            <section className="space-y-2">
                                <h3 className="font-bold text-slate-800">
                                    1. Anda Bisa menjual Lagi layanan kami
                                </h3>
                                <p>
                                    Contoh: Misal di layanan kami Instagram Like
                                    dengan harga Rp5.000 untuk 1000 Like
                                </p>
                                <p>
                                    Anda Bisa menjual dengan harga Rp10.000
                                    untuk 1000 like
                                </p>
                                <p>
                                    Dari Modal Rp5.000 anda bisa mendapat untung
                                    100%
                                </p>
                                <p>
                                    <span className="text-indigo-600">
                                        Jika anda dalam 1 hari mendapat Pesanan
                                        5000 Like saja Anda mendapat Penghasilan{' '}
                                        <span className="font-bold">
                                            Rp25.000
                                        </span>
                                    </span>
                                </p>
                            </section>

                            {/* Point 2 */}
                            <section className="space-y-2">
                                <h3 className="font-bold text-slate-800">
                                    2. Mempromosikan Dagangan Anda
                                </h3>
                                <p>
                                    Contoh: Jika anda Mempunyai Barang untuk
                                    jualan di sosialmedia Contohnya instagram
                                    dan followers anda sedikit{' '}
                                    <span className="text-indigo-600">
                                        pasti
                                    </span>
                                </p>
                                <p>
                                    Pelanggan kurang percaya dengan{' '}
                                    <span className="text-indigo-600">
                                        produk
                                    </span>{' '}
                                    anda, jadi anda{' '}
                                    <span className="text-indigo-600">
                                        membeli
                                    </span>{' '}
                                    followers di kami untuk menarik penampilan
                                    instagram anda
                                </p>
                            </section>

                            {/* Point 3 */}
                            <section className="space-y-2">
                                <h3 className="font-bold text-slate-800">
                                    3. Menjadikan anda selebgram dan bisa
                                    membuka endorse
                                </h3>
                                <p>
                                    Banyak dari member kami yang dari 0 misal
                                    membeli subscribers dan hanya membeli 1000
                                    subscribers dan dalam beberapa bulan sudah
                                    mendatang mempunyai banyak subscribers
                                </p>
                                <p>
                                    dan mendapat endorse dari beberapa produk,
                                    sama juga dengan instagram banyak selebgram
                                    selebgram yang membeli layanan kami untuk
                                    menarik penampilan agar dipercaya.
                                </p>
                            </section>

                            {/* Closing */}
                            <p>
                                Itulah beberapa keuntungan yang didapatkan dari{' '}
                                <span className="text-indigo-600">
                                    medanpedia
                                </span>
                                .
                            </p>

                            {/* Signature */}
                            <div className="pt-4">
                                <p className="font-bold text-slate-800">
                                    SALAM SUKSES
                                </p>
                                <p className="font-bold text-slate-800">
                                    CEO MEDANPEDIA
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
