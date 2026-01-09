import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Eye, EyeOff, Key, Plus, Save, Settings } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Pengaturan',
        href: '/settings/profile',
    },
];

export default function SettingsProfile() {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Akun" />

            <div className="flex h-full flex-1 flex-col gap-4 bg-slate-50/50 p-4 sm:p-6">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="border-l-4 border-[#02c39a] pl-3 text-xl font-extrabold tracking-tight text-slate-900">
                        Pengaturan Akun
                    </h2>
                    <p className="pl-3 text-xs font-medium text-slate-500">
                        Kelola informasi profil dan keamanan akun Anda.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                    {/* Left Section - Account Settings */}
                    <div className="xl:col-span-8">
                        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                            <div className="flex items-center gap-2 border-b border-slate-100 bg-white px-5 py-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a]/10 text-[#02c39a]">
                                    <Settings className="h-4 w-4" />
                                </div>
                                <h3 className="text-sm font-bold text-slate-800">
                                    Pengaturan Akun
                                </h3>
                            </div>

                            <div className="space-y-4 p-5">
                                {/* Row 1: Username & Email */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                            Nama Pengguna{' '}
                                            <span className="text-rose-400 normal-case">
                                                *Tidak dapat diubah
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value="akbarryyan"
                                            disabled
                                            className="h-10 w-full cursor-not-allowed rounded-xl border border-slate-100 bg-slate-50 px-4 text-xs font-bold text-slate-400 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                            Email{' '}
                                            <span className="text-indigo-400 normal-case">
                                                *Hubungi Admin untuk mengubah
                                            </span>
                                        </label>
                                        <input
                                            type="email"
                                            value="akbarrayyan182@gmail.com"
                                            disabled
                                            className="h-10 w-full cursor-not-allowed rounded-xl border border-slate-100 bg-slate-50 px-4 text-xs font-bold text-slate-400 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Full Name & WhatsApp */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                            Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Akbar Rayyan Al Ghifari"
                                            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                            Nomor WhatsApp
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="081214980632"
                                            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                        />
                                    </div>
                                </div>

                                {/* Row 3: New Password & Confirm */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                            Kata Sandi Baru
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={
                                                    showNewPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                placeholder="Masukkan kata sandi baru..."
                                                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 pr-10 text-xs font-bold text-slate-700 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowNewPassword(
                                                        !showNewPassword,
                                                    )
                                                }
                                                className="absolute top-1/2 right-2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md bg-slate-100 text-slate-400 transition-all hover:bg-[#02c39a] hover:text-white"
                                            >
                                                {showNewPassword ? (
                                                    <EyeOff className="h-3 w-3" />
                                                ) : (
                                                    <Eye className="h-3 w-3" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                            Konfirmasi Kata Sandi Baru
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={
                                                    showConfirmPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                placeholder="Konfirmasi kata sandi..."
                                                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 pr-10 text-xs font-bold text-slate-700 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword,
                                                    )
                                                }
                                                className="absolute top-1/2 right-2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md bg-slate-100 text-slate-400 transition-all hover:bg-[#02c39a] hover:text-white"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-3 w-3" />
                                                ) : (
                                                    <Eye className="h-3 w-3" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 4: Current Password */}
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                        Kata Sandi Saat Ini{' '}
                                        <span className="text-rose-400 normal-case">
                                            *Diperlukan untuk menyimpan
                                            perubahan
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={
                                                showCurrentPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="Masukkan kata sandi saat ini..."
                                            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 pr-10 text-xs font-bold text-slate-700 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowCurrentPassword(
                                                    !showCurrentPassword,
                                                )
                                            }
                                            className="absolute top-1/2 right-2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md bg-slate-100 text-slate-400 transition-all hover:bg-[#02c39a] hover:text-white"
                                        >
                                            {showCurrentPassword ? (
                                                <EyeOff className="h-3 w-3" />
                                            ) : (
                                                <Eye className="h-3 w-3" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#02c39a] text-xs font-bold text-white shadow-[0_3px_0_rgb(0,168,132)] transition-all hover:translate-y-[1px] hover:bg-[#00a884] hover:shadow-[0_1px_0_rgb(0,168,132)] active:translate-y-[2px] active:shadow-none">
                                    <Save className="h-4 w-4" />
                                    Simpan Perubahan
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - API Key */}
                    <div className="xl:col-span-4">
                        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                            <div className="flex items-center gap-2 border-b border-slate-100 bg-white px-5 py-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
                                    <Key className="h-4 w-4" />
                                </div>
                                <h3 className="text-sm font-bold text-slate-800">
                                    API Key
                                </h3>
                            </div>

                            <div className="space-y-4 p-5">
                                {/* Whitelist IP */}
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                        Whitelist IP API{' '}
                                        <span className="text-slate-300 normal-case">
                                            *Pisahkan dengan koma
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="127.0.0.1,127.0.0.2"
                                        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                                    />
                                </div>

                                {/* Save IP Button */}
                                <button className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 text-xs font-bold text-white shadow-[0_3px_0_rgb(79,70,229)] transition-all hover:translate-y-[1px] hover:bg-indigo-600 hover:shadow-[0_1px_0_rgb(79,70,229)] active:translate-y-[2px] active:shadow-none">
                                    Simpan Perubahan
                                </button>

                                {/* Divider */}
                                <div className="border-t border-slate-100 pt-4">
                                    <p className="mb-3 text-xs leading-relaxed font-medium text-slate-500">
                                        Klik tombol di bawah untuk melihat dan
                                        membuat{' '}
                                        <span className="font-bold text-indigo-500">
                                            API Key baru
                                        </span>
                                        .
                                    </p>

                                    {/* Create API Key Button */}
                                    <button className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-white text-xs font-bold text-indigo-500 ring-1 ring-indigo-500 transition-all hover:bg-indigo-50 active:scale-[0.98]">
                                        <Plus className="h-4 w-4" />
                                        Buat API Key
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
