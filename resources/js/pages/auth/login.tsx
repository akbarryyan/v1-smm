import { register } from '@/routes';
import { request } from '@/routes/password';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 sm:p-6 lg:p-8">
            <Head title="Masuk - Medanpedia" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap');
                * { font-family: 'Bricolage Grotesque', sans-serif; }
            `}</style>

            <div className="w-full max-w-[420px]">
                <div className="overflow-hidden rounded-4xl bg-white px-8 py-10 shadow-2xl shadow-slate-200/50 sm:px-12 sm:py-12">
                    {/* Header/Logo */}
                    <div className="mb-10 flex flex-col items-center">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 p-2 shadow-lg shadow-indigo-100">
                                <AppLogoIcon className="h-full w-full fill-white" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-[#1e293b]">
                                Medanpedia
                            </span>
                        </div>

                        <div className="text-center">
                            <h1 className="text-xl font-bold text-[#1e293b] sm:text-2xl">
                                Selamat Datang!
                            </h1>
                            <p className="mt-1 text-sm text-slate-400">
                                Silakan masuk ke akun Anda.
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
                                Email
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
                                className="h-12 border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 transition-all focus:border-indigo-500 focus:bg-white focus:ring-0 focus:outline-none focus-visible:ring-0"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="password"
                                    className="text-[11px] font-bold tracking-wider text-slate-400 uppercase"
                                >
                                    Kata Sandi
                                </Label>
                                {canResetPassword && (
                                    <Link
                                        href={request().url}
                                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                                    >
                                        Lupa kata sandi?
                                    </Link>
                                )}
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                required
                                autoComplete="current-password"
                                className="h-12 border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 transition-all focus:border-indigo-500 focus:bg-white focus:ring-0 focus:outline-none focus-visible:ring-0"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center">
                            <Checkbox
                                id="remember"
                                checked={data.remember}
                                onCheckedChange={(checked) =>
                                    setData('remember', !!checked)
                                }
                                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                                htmlFor="remember"
                                className="ml-2 cursor-pointer text-sm font-medium text-slate-600 select-none"
                            >
                                Ingat Saya
                            </label>
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                className="h-12 w-full rounded-2xl bg-[#6366f1] text-[15px] font-bold text-white shadow-lg shadow-indigo-100/50 transition-all hover:bg-[#5558e6] hover:shadow-xl active:scale-[0.98]"
                                disabled={processing}
                            >
                                {processing ? (
                                    <Spinner className="mr-2 h-4 w-4" />
                                ) : null}
                                Masuk
                            </Button>

                            {canRegister && (
                                <div className="mt-8 text-center text-sm font-medium text-slate-500">
                                    Belum Mempunyai Akun?{' '}
                                    <Link
                                        href={register().url}
                                        className="font-bold text-[#6366f1] transition-colors hover:text-[#5558e6] hover:underline"
                                    >
                                        Daftar Sekarang
                                    </Link>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                <div className="mt-8 text-center text-[11px] font-medium tracking-wide text-slate-400 uppercase">
                    © 2028 Medanpedia - SMM Panel Indonesia Terbaik dan Termudah
                </div>
            </div>
        </div>
    );
}
