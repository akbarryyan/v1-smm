import { login } from '@/routes';
import { email as emailRoute } from '@/routes/password';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(emailRoute().url);
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 sm:p-6 lg:p-8">
            <Head title="Lupa Kata Sandi - Medanpedia" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap');
                * { font-family: 'Bricolage Grotesque', sans-serif; }
            `}</style>

            <div className="w-full max-w-[420px]">
                <div className="overflow-hidden rounded-[2.5rem] bg-white px-8 py-10 shadow-2xl shadow-slate-200/50 sm:px-12 sm:py-12">
                    {/* Header/Logo */}
                    <div className="mb-10 flex flex-col items-center">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#02c39a] p-2 shadow-lg shadow-[#02c39a]/10">
                                <AppLogoIcon className="h-full w-full fill-white" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-[#1e293b]">
                                Medanpedia
                            </span>
                        </div>

                        <div className="text-center">
                            <h1 className="text-xl font-bold text-[#1e293b] sm:text-2xl">
                                Lupa Kata Sandi?
                            </h1>
                            <p className="mt-1 text-sm text-slate-400">
                                Beritahu kami alamat email Anda dan kami akan
                                mengirimkan tautan reset kata sandi.
                            </p>
                        </div>
                    </div>

                    {status && (
                        <div className="mb-6 rounded-xl bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-600 ring-1 ring-emerald-100">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-1.5">
                            <Label
                                htmlFor="email"
                                className="text-[11px] font-bold tracking-wider text-slate-400 uppercase"
                            >
                                Alamat Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                required
                                autoFocus
                                autoComplete="email"
                                className="h-12 border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 transition-all focus:border-[#02c39a] focus:bg-white focus:ring-0 focus:outline-none focus-visible:ring-0"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                className="h-12 w-full rounded-2xl bg-[#02c39a] text-[15px] font-bold text-white shadow-lg shadow-[#02c39a]/20 transition-all hover:bg-[#00a884] hover:shadow-xl active:scale-[0.98]"
                                disabled={processing}
                            >
                                {processing ? (
                                    <Spinner className="mr-2 h-4 w-4" />
                                ) : null}
                                Kirim Tautan Reset
                            </Button>

                            <div className="mt-8 text-center text-sm font-medium text-slate-500">
                                Ingat Kata Sandi?{' '}
                                <Link
                                    href={login()}
                                    className="font-bold text-[#02c39a] transition-colors hover:text-[#00a884] hover:underline"
                                >
                                    Kembali Masuk
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="mt-8 text-center text-[11px] font-medium tracking-wide text-slate-400 uppercase">
                    © {new Date().getFullYear()} Medanpedia - SMM Panel
                    Indonesia Terbaik dan Termudah
                </div>
            </div>
        </div>
    );
}
