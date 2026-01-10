import { AdminSidebar } from '@/components/admin-sidebar';
import { logout } from '@/routes';
import { type SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import {
    AlertTriangle,
    Bell,
    ChevronDown,
    LogOut,
    Search,
    Settings,
    User,
    X,
} from 'lucide-react';
import { type PropsWithChildren, useEffect, useRef, useState } from 'react';

interface AdminLayoutProps extends PropsWithChildren {
    title?: string;
}

export default function AdminLayout({
    children,
    title = 'Dashboard Admin',
}: AdminLayoutProps) {
    const { auth } = usePage<SharedData>().props;
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowUserMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogoutClick = () => {
        setShowUserMenu(false);
        setShowLogoutModal(true);
    };

    const handleLogout = () => {
        setIsLoggingOut(true);
        router.post(
            logout().url,
            {},
            {
                onFinish: () => {
                    setIsLoggingOut(false);
                    setShowLogoutModal(false);
                },
            },
        );
    };

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Sidebar */}
            <AdminSidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Main Content - Dynamic margin based on sidebar state */}
            <div
                className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}
            >
                {/* Top Navbar */}
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
                    {/* Left - Title */}
                    <h1 className="text-lg font-bold text-slate-800">
                        {title}
                    </h1>

                    {/* Right - Actions */}
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="relative hidden md:block">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari pesanan / pengguna..."
                                className="h-10 w-64 rounded-lg border border-slate-200 bg-slate-50 pr-4 pl-10 text-sm text-slate-700 transition-all outline-none focus:border-[#02c39a] focus:bg-white focus:ring-2 focus:ring-[#02c39a]/10"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:bg-slate-50">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                                3
                            </span>
                        </button>

                        {/* User Menu */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 rounded-lg border border-slate-200 p-2 pr-3 transition-all hover:bg-slate-50"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                                    <User className="h-4 w-4" />
                                </div>
                                <div className="hidden flex-col items-start text-left sm:flex">
                                    <span className="text-xs font-bold text-slate-700">
                                        {auth.user.name}
                                    </span>
                                    <span className="text-[10px] font-medium text-slate-400">
                                        Administrator
                                    </span>
                                </div>
                                <ChevronDown
                                    className={`h-4 w-4 text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {/* Dropdown */}
                            {showUserMenu && (
                                <div className="absolute top-full right-0 mt-2 w-48 rounded-lg border border-slate-100 bg-white py-2 shadow-xl">
                                    <Link
                                        href="/admin/settings"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                        onClick={() => setShowUserMenu(false)}
                                    >
                                        <Settings className="h-4 w-4 text-slate-400" />
                                        Pengaturan Akun
                                    </Link>
                                    <hr className="my-1 border-slate-100" />
                                    <button
                                        onClick={handleLogoutClick}
                                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Keluar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">{children}</main>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-60 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                        onClick={() => setShowLogoutModal(false)}
                    />

                    {/* Modal */}
                    <div className="relative z-10 mx-4 w-full max-w-md animate-in duration-200 zoom-in-95 fade-in">
                        <div className="rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                                        <AlertTriangle className="h-5 w-5 text-rose-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">
                                        Konfirmasi Keluar
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setShowLogoutModal(false)}
                                    className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="px-6 py-5">
                                <p className="text-sm leading-relaxed text-slate-600">
                                    Apakah Anda yakin ingin keluar dari akun
                                    admin? Anda harus login kembali untuk
                                    mengakses dashboard admin.
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
                                <button
                                    onClick={() => setShowLogoutModal(false)}
                                    disabled={isLoggingOut}
                                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                    className="flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-600/25 transition-all hover:bg-rose-700 disabled:opacity-50"
                                >
                                    {isLoggingOut ? (
                                        <>
                                            <svg
                                                className="h-4 w-4 animate-spin"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            Memproses...
                                        </>
                                    ) : (
                                        <>
                                            <LogOut className="h-4 w-4" />
                                            Ya, Keluar
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
