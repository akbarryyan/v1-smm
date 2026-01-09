import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Penjelasan Status Pesanan',
        href: '/penjelasan-status-pesanan',
    },
];

export default function PenjelasanStatusPesanan() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Penjelasan Status Pesanan" />

            <div className="flex h-full flex-1 flex-col gap-4 bg-slate-50/50 p-4 sm:p-5">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="border-l-4 border-[#02c39a] pl-3 text-xl font-extrabold tracking-tight text-slate-900">
                        Penjelasan Status Pesanan
                    </h2>
                    <p className="pl-3 text-xs font-medium text-slate-500">
                        Pahami arti dari setiap status pesanan Anda.
                    </p>
                </div>

                {/* Main Content */}
                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
                        <div className="space-y-8">
                            {/* Status List */}
                            <section className="space-y-2 text-sm leading-relaxed text-slate-600">
                                <p>
                                    -{' '}
                                    <span className="font-bold text-slate-800">
                                        Pending
                                    </span>{' '}
                                    : Pesanan/deposit sedang dalam antian di
                                    server.
                                </p>
                                <p>
                                    -{' '}
                                    <span className="font-bold text-slate-800">
                                        Processing
                                    </span>{' '}
                                    : Pesanan sedang dalam proses.
                                </p>
                                <p>
                                    -{' '}
                                    <span className="font-bold text-slate-800">
                                        Success
                                    </span>{' '}
                                    : Pesanan telah berhasil.
                                </p>
                                <p>
                                    -{' '}
                                    <span className="font-bold text-slate-800">
                                        Partial
                                    </span>{' '}
                                    : Pesanan Sudah terproses tapi tercancel.
                                    Dan anda hanya membayar layanan yang masuk
                                    saja.
                                </p>
                                <p>
                                    -{' '}
                                    <span className="font-bold text-slate-800">
                                        Error
                                    </span>{' '}
                                    : Pesanan di batalkan, dan saldo akan
                                    otomatis kembali ke akun.
                                </p>
                            </section>

                            {/* MENGAPA BISA PARTIAL Section */}
                            <section>
                                <h3 className="mb-3 text-base font-black text-slate-800 underline">
                                    MENGAPA BISA PARTIAL???
                                </h3>
                                <div className="space-y-3 text-sm leading-relaxed text-slate-600">
                                    <p>
                                        <span className="font-bold text-slate-800">
                                            Limit
                                        </span>{' '}
                                        : Contoh{' '}
                                        <span className="text-indigo-600">
                                            jika
                                        </span>{' '}
                                        satu layanan dengan maksimal 1.000
                                        followers, kemudian anda membeli 1000
                                        followers 2x di akun yang sama,
                                        kemungkinan besar akan terjadi partial.
                                    </p>
                                    <p>
                                        Karena akun (followers) yang ada di{' '}
                                        <span className="text-indigo-600">
                                            server
                                        </span>{' '}
                                        tersebut hanya 1.000 followers.
                                    </p>
                                    <p>
                                        Jadi anda tidak bisa mengirim 2000
                                        followers walaupun dengan cara 1000 2x
                                        pemesanan.
                                    </p>
                                    <p>
                                        <span className="text-indigo-600">
                                            Jika hal ini terjadi
                                        </span>
                                        , silahkan gunakan{' '}
                                        <span className="text-indigo-600">
                                            server (Layanan)
                                        </span>{' '}
                                        lainya.
                                    </p>
                                    <p>
                                        Hal ini tidak berpengaruh jika berbeda
                                        akun.
                                    </p>
                                </div>
                            </section>

                            {/* Server Overload Section */}
                            <section className="space-y-3 text-sm leading-relaxed text-slate-600">
                                <p>
                                    <span className="font-bold text-slate-800">
                                        Server overload
                                    </span>{' '}
                                    : Overload biasanya terjadi di layanan yang
                                    murah. Karena murah terlalu banyak pesanan
                                    yang masuk sehingga terjadi overload dan
                                    partial.
                                </p>
                                <p>
                                    Untuk pesanan partial, bisa saldo layanan
                                    yang tidak masuk akan{' '}
                                    <span className="text-indigo-600">
                                        otomatis
                                    </span>{' '}
                                    kembali ke akun.
                                </p>
                            </section>

                            {/* Garansi (Refill) Section */}
                            <section>
                                <p className="text-sm leading-relaxed text-slate-600">
                                    <span className="font-bold text-indigo-600">
                                        Garansi (Refill)
                                    </span>{' '}
                                    : Refill adalah{' '}
                                    <span className="text-indigo-600">
                                        isi ulang
                                    </span>
                                    . Jika anda{' '}
                                    <span className="text-indigo-600">
                                        membeli layanan refill
                                    </span>{' '}
                                    dan ternyata dalam beberapa hari followers{' '}
                                    <span className="text-indigo-600">
                                        berkurang
                                    </span>
                                    , maka{' '}
                                    <span className="text-indigo-600">
                                        jika pesanan anda drop/turun anda bisa
                                        lapor melalui{' '}
                                        <span className="text-rose-500">
                                            tiket
                                        </span>
                                    </span>{' '}
                                    dengan menyertakan id order dan request
                                    refill,{' '}
                                    <span className="text-indigo-600">
                                        jika nama layanan auto refill anda tidak
                                        perlu lapor ke admin karna proses refill{' '}
                                        <span className="text-rose-500">
                                            otomatis
                                        </span>{' '}
                                        tapi
                                    </span>{' '}
                                    <span className="text-indigo-600">
                                        jika dalam 2x24 jam belum refill maka
                                        anda bisa lapor ke admin
                                    </span>
                                    .
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
