import { login, register as registerRoute } from '@/routes';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(registerRoute().url, {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 sm:p-6 lg:p-8">
            <Head title="Daftar - Medanpedia" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap');
                * { font-family: 'Bricolage Grotesque', sans-serif; }
            `}</style>

            <div className="w-full max-w-[440px]">
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
                                Daftar
                            </h1>
                            <p className="mt-1 text-sm text-slate-400">
                                Segera mendaftar dan dapatkan keuntungan.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label
                                    htmlFor="name"
                                    className="text-[11px] font-bold tracking-wider text-slate-400 uppercase"
                                >
                                    Nama Lengkap
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    required
                                    autoFocus
                                    className="h-11 border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 transition-all focus:border-[#02c39a] focus:bg-white focus:ring-0 focus:outline-none focus-visible:ring-0"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-1.5">
                                <Label
                                    htmlFor="username"
                                    className="text-[11px] font-bold tracking-wider text-slate-400 uppercase"
                                >
                                    Nama Pengguna
                                </Label>
                                <Input
                                    id="username"
                                    type="text"
                                    value={data.username}
                                    onChange={(e) =>
                                        setData('username', e.target.value)
                                    }
                                    required
                                    placeholder="Username"
                                    className="h-11 border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 transition-all focus:border-[#02c39a] focus:bg-white focus:ring-0 focus:outline-none focus-visible:ring-0"
                                />
                                <InputError message={errors.username} />
                            </div>
                        </div>

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
                                className="h-11 border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 transition-all focus:border-[#02c39a] focus:bg-white focus:ring-0 focus:outline-none focus-visible:ring-0"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label
                                    htmlFor="password"
                                    className="text-[11px] font-bold tracking-wider text-slate-400 uppercase"
                                >
                                    Kata Sandi
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    required
                                    className="h-11 border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 transition-all focus:border-[#02c39a] focus:bg-white focus:ring-0 focus:outline-none focus-visible:ring-0"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="space-y-1.5">
                                <Label
                                    htmlFor="password_confirmation"
                                    className="text-[11px] font-bold tracking-wider text-slate-400 uppercase"
                                >
                                    Konfirmasi
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    required
                                    className="h-11 border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 transition-all focus:border-[#02c39a] focus:bg-white focus:ring-0 focus:outline-none focus-visible:ring-0"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <p className="mb-4 text-center text-xs leading-relaxed text-slate-400">
                                Dengan mendaftar berarti Anda setuju dengan{' '}
                                <Link
                                    href="/terms"
                                    className="font-bold text-[#02c39a] hover:underline"
                                >
                                    Ketentuan Layanan
                                </Link>
                                .
                            </p>
                            <Button
                                type="submit"
                                className="h-12 w-full rounded-2xl bg-[#02c39a] text-[15px] font-bold text-white shadow-lg shadow-[#02c39a]/20 transition-all hover:bg-[#00a884] hover:shadow-xl active:scale-[0.98]"
                                disabled={processing}
                            >
                                {processing ? (
                                    <Spinner className="mr-2 h-4 w-4" />
                                ) : null}
                                Daftar
                            </Button>

                            <div className="mt-8 text-center text-sm font-medium text-slate-500">
                                Sudah Mempunyai Akun?{' '}
                                <Link
                                    href={login()}
                                    className="font-bold text-[#02c39a] transition-colors hover:text-[#00a884] hover:underline"
                                >
                                    Masuk
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
