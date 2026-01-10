import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar,
    CheckCircle,
    Eye,
    EyeOff,
    Key,
    Loader2,
    Lock,
    Mail,
    Save,
    Shield,
    ShieldCheck,
    Sparkles,
    User,
    UserCircle,
} from 'lucide-react';
import { useState } from 'react';

interface UserData {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

interface Props {
    user: UserData;
}

export default function AdminSettings({ user }: Props) {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [profileSuccess, setProfileSuccess] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState<'profile' | 'security'>(
        'profile',
    );

    // Profile form
    const profileForm = useForm({
        name: user.name,
        email: user.email,
    });

    // Password form
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProfileSuccess(false);

        profileForm.put('/admin/settings/profile', {
            preserveScroll: true,
            onSuccess: () => {
                setProfileSuccess(true);
                setTimeout(() => setProfileSuccess(false), 3000);
            },
        });
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordSuccess(false);

        passwordForm.put('/admin/settings/password', {
            preserveScroll: true,
            onSuccess: () => {
                setPasswordSuccess(true);
                passwordForm.reset();
                setTimeout(() => setPasswordSuccess(false), 3000);
            },
        });
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <AdminLayout title="Pengaturan Akun">
            <Head title="Pengaturan Akun - Admin" />

            <div className="w-full">
                {/* Hero Header */}
                <div className="relative mb-8 overflow-hidden rounded-2xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#02c39a]" />
                        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-blue-500" />
                        <div className="absolute top-1/2 right-1/4 h-32 w-32 rounded-full bg-purple-500" />
                    </div>

                    {/* Animated Grid */}
                    <div
                        className="absolute inset-0 opacity-5"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                            backgroundSize: '50px 50px',
                        }}
                    />

                    <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-5">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-[#02c39a] to-[#00a884] text-2xl font-bold text-white shadow-lg shadow-[#02c39a]/30">
                                    {getInitials(user.name)}
                                </div>
                                <div className="absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-slate-900">
                                    <ShieldCheck className="h-4 w-4 text-white" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-bold text-white">
                                        {user.name}
                                    </h1>
                                    <span className="rounded-full bg-[#02c39a]/20 px-2 py-0.5 text-[10px] font-bold text-[#02c39a]">
                                        ADMIN
                                    </span>
                                </div>
                                <p className="mt-0.5 text-slate-400">
                                    {user.email}
                                </p>
                                <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5" />
                                        Bergabung {user.created_at}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                                        ID #{user.id}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex gap-4">
                            <div className="rounded-xl bg-white/5 px-5 py-3 backdrop-blur-sm">
                                <p className="text-2xl font-bold text-white">
                                    100%
                                </p>
                                <p className="text-[10px] font-medium text-slate-400">
                                    Profil Lengkap
                                </p>
                            </div>
                            <div className="rounded-xl bg-white/5 px-5 py-3 backdrop-blur-sm">
                                <p className="text-2xl font-bold text-emerald-400">
                                    Aman
                                </p>
                                <p className="text-[10px] font-medium text-slate-400">
                                    Status Akun
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="mb-6 flex gap-2 rounded-xl bg-slate-100 p-1.5">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition-all ${
                            activeTab === 'profile'
                                ? 'bg-white text-slate-800 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        <UserCircle className="h-4 w-4" />
                        Informasi Profil
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition-all ${
                            activeTab === 'security'
                                ? 'bg-white text-slate-800 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        <Shield className="h-4 w-4" />
                        Keamanan
                    </button>
                </div>

                {/* Profile Settings Tab */}
                {activeTab === 'profile' && (
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Left - Form */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-800">
                                        Edit Profil
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        Perbarui informasi akun Anda
                                    </p>
                                </div>

                                {profileSuccess && (
                                    <div className="mb-6 flex items-center gap-3 rounded-xl bg-linear-to-r from-emerald-50 to-teal-50 p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                                            <CheckCircle className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-emerald-800">
                                                Berhasil!
                                            </p>
                                            <p className="text-sm text-emerald-600">
                                                Profil Anda telah diperbarui.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <form
                                    onSubmit={handleProfileSubmit}
                                    className="space-y-5"
                                >
                                    <div>
                                        <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                                            <User className="h-4 w-4 text-slate-400" />
                                            Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            value={profileForm.data.name}
                                            onChange={(e) =>
                                                profileForm.setData(
                                                    'name',
                                                    e.target.value,
                                                )
                                            }
                                            className={`h-12 w-full rounded-xl border bg-slate-50 px-4 text-sm font-medium text-slate-700 transition-all outline-none placeholder:text-slate-400 focus:border-[#02c39a] focus:bg-white focus:ring-4 focus:ring-[#02c39a]/10 ${
                                                profileForm.errors.name
                                                    ? 'border-rose-300 bg-rose-50'
                                                    : 'border-slate-200'
                                            }`}
                                            placeholder="Masukkan nama lengkap"
                                        />
                                        {profileForm.errors.name && (
                                            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-500">
                                                <AlertCircle className="h-3.5 w-3.5" />
                                                {profileForm.errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                                            <Mail className="h-4 w-4 text-slate-400" />
                                            Alamat Email
                                        </label>
                                        <input
                                            type="email"
                                            value={profileForm.data.email}
                                            onChange={(e) =>
                                                profileForm.setData(
                                                    'email',
                                                    e.target.value,
                                                )
                                            }
                                            className={`h-12 w-full rounded-xl border bg-slate-50 px-4 text-sm font-medium text-slate-700 transition-all outline-none placeholder:text-slate-400 focus:border-[#02c39a] focus:bg-white focus:ring-4 focus:ring-[#02c39a]/10 ${
                                                profileForm.errors.email
                                                    ? 'border-rose-300 bg-rose-50'
                                                    : 'border-slate-200'
                                            }`}
                                            placeholder="Masukkan alamat email"
                                        />
                                        {profileForm.errors.email && (
                                            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-500">
                                                <AlertCircle className="h-3.5 w-3.5" />
                                                {profileForm.errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={profileForm.processing}
                                            className="group flex h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#02c39a] to-[#00a884] px-6 text-sm font-bold text-white shadow-lg shadow-[#02c39a]/25 transition-all hover:shadow-xl hover:shadow-[#02c39a]/30 disabled:opacity-50"
                                        >
                                            {profileForm.processing ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Menyimpan...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="h-4 w-4 transition-transform group-hover:scale-110" />
                                                    Simpan Perubahan
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Right - Tips */}
                        <div className="space-y-4">
                            <div className="rounded-2xl bg-linear-to-br from-blue-50 to-indigo-50 p-5 ring-1 ring-blue-100">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                                    <User className="h-5 w-5 text-blue-600" />
                                </div>
                                <h4 className="font-bold text-blue-900">
                                    Tips Profil
                                </h4>
                                <p className="mt-1 text-sm leading-relaxed text-blue-700">
                                    Gunakan nama asli Anda untuk memudahkan
                                    identifikasi dalam sistem.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-linear-to-br from-amber-50 to-orange-50 p-5 ring-1 ring-amber-100">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                                    <Mail className="h-5 w-5 text-amber-600" />
                                </div>
                                <h4 className="font-bold text-amber-900">
                                    Verifikasi Email
                                </h4>
                                <p className="mt-1 text-sm leading-relaxed text-amber-700">
                                    Pastikan email aktif untuk menerima
                                    notifikasi penting dari sistem.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Left - Form */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-800">
                                        Ubah Password
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        Pastikan password Anda aman dan unik
                                    </p>
                                </div>

                                {passwordSuccess && (
                                    <div className="mb-6 flex items-center gap-3 rounded-xl bg-linear-to-r from-emerald-50 to-teal-50 p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                                            <CheckCircle className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-emerald-800">
                                                Berhasil!
                                            </p>
                                            <p className="text-sm text-emerald-600">
                                                Password Anda telah diperbarui.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <form
                                    onSubmit={handlePasswordSubmit}
                                    className="space-y-5"
                                >
                                    <div>
                                        <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                                            <Key className="h-4 w-4 text-slate-400" />
                                            Password Saat Ini
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={
                                                    showCurrentPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                value={
                                                    passwordForm.data
                                                        .current_password
                                                }
                                                onChange={(e) =>
                                                    passwordForm.setData(
                                                        'current_password',
                                                        e.target.value,
                                                    )
                                                }
                                                className={`h-12 w-full rounded-xl border bg-slate-50 px-4 pr-12 text-sm font-medium text-slate-700 transition-all outline-none placeholder:text-slate-400 focus:border-[#02c39a] focus:bg-white focus:ring-4 focus:ring-[#02c39a]/10 ${
                                                    passwordForm.errors
                                                        .current_password
                                                        ? 'border-rose-300 bg-rose-50'
                                                        : 'border-slate-200'
                                                }`}
                                                placeholder="••••••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowCurrentPassword(
                                                        !showCurrentPassword,
                                                    )
                                                }
                                                className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                                            >
                                                {showCurrentPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                        {passwordForm.errors
                                            .current_password && (
                                            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-500">
                                                <AlertCircle className="h-3.5 w-3.5" />
                                                {
                                                    passwordForm.errors
                                                        .current_password
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div className="h-px bg-slate-100" />

                                    <div>
                                        <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                                            <Lock className="h-4 w-4 text-slate-400" />
                                            Password Baru
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={
                                                    showNewPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                value={
                                                    passwordForm.data.password
                                                }
                                                onChange={(e) =>
                                                    passwordForm.setData(
                                                        'password',
                                                        e.target.value,
                                                    )
                                                }
                                                className={`h-12 w-full rounded-xl border bg-slate-50 px-4 pr-12 text-sm font-medium text-slate-700 transition-all outline-none placeholder:text-slate-400 focus:border-[#02c39a] focus:bg-white focus:ring-4 focus:ring-[#02c39a]/10 ${
                                                    passwordForm.errors.password
                                                        ? 'border-rose-300 bg-rose-50'
                                                        : 'border-slate-200'
                                                }`}
                                                placeholder="••••••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowNewPassword(
                                                        !showNewPassword,
                                                    )
                                                }
                                                className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                                            >
                                                {showNewPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                        {passwordForm.errors.password && (
                                            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-500">
                                                <AlertCircle className="h-3.5 w-3.5" />
                                                {passwordForm.errors.password}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                                            <Lock className="h-4 w-4 text-slate-400" />
                                            Konfirmasi Password Baru
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={
                                                    showConfirmPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                value={
                                                    passwordForm.data
                                                        .password_confirmation
                                                }
                                                onChange={(e) =>
                                                    passwordForm.setData(
                                                        'password_confirmation',
                                                        e.target.value,
                                                    )
                                                }
                                                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm font-medium text-slate-700 transition-all outline-none placeholder:text-slate-400 focus:border-[#02c39a] focus:bg-white focus:ring-4 focus:ring-[#02c39a]/10"
                                                placeholder="••••••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword,
                                                    )
                                                }
                                                className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={passwordForm.processing}
                                            className="group flex h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 px-6 text-sm font-bold text-white shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/30 disabled:opacity-50"
                                        >
                                            {passwordForm.processing ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Mengubah...
                                                </>
                                            ) : (
                                                <>
                                                    <Shield className="h-4 w-4 transition-transform group-hover:scale-110" />
                                                    Ubah Password
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Right - Tips */}
                        <div className="space-y-4">
                            <div className="rounded-2xl bg-linear-to-br from-emerald-50 to-teal-50 p-5 ring-1 ring-emerald-100">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                                </div>
                                <h4 className="font-bold text-emerald-900">
                                    Password Kuat
                                </h4>
                                <ul className="mt-2 space-y-1.5 text-sm text-emerald-700">
                                    <li className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        Minimal 8 karakter
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        Kombinasi huruf & angka
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        Gunakan simbol khusus
                                    </li>
                                </ul>
                            </div>

                            <div className="rounded-2xl bg-linear-to-br from-rose-50 to-pink-50 p-5 ring-1 ring-rose-100">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100">
                                    <AlertCircle className="h-5 w-5 text-rose-600" />
                                </div>
                                <h4 className="font-bold text-rose-900">
                                    Perhatian
                                </h4>
                                <p className="mt-1 text-sm leading-relaxed text-rose-700">
                                    Jangan bagikan password Anda kepada
                                    siapapun, termasuk tim support.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
