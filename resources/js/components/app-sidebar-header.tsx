import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import {
    type BreadcrumbItem as BreadcrumbItemType,
    type SharedData,
} from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import {
    AlertTriangle,
    ChevronDown,
    LogOut,
    Settings,
    User,
    X,
} from 'lucide-react';
import { useState } from 'react';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage<SharedData>().props;
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const pageTitle =
        breadcrumbs.length > 0
            ? breadcrumbs[breadcrumbs.length - 1].title
            : 'Medanpedia';

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
        <>
            <header className="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 bg-white px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 md:px-8">
                <div className="flex items-center gap-4">
                    <SidebarTrigger className="-ml-1 text-slate-500 hover:bg-slate-50" />
                    <div className="hidden h-6 w-px bg-slate-200 md:block" />
                    <h1 className="text-xl font-bold tracking-tight text-slate-800">
                        {pageTitle}
                    </h1>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <DropdownMenu
                        open={dropdownOpen}
                        onOpenChange={setDropdownOpen}
                    >
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 rounded-full border border-slate-200 p-1 pr-3 transition-all hover:bg-slate-50 focus:outline-none">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#02c39a] text-white shadow-md shadow-[#02c39a]/20">
                                    <User className="h-4 w-4" />
                                </div>
                                <div className="hidden flex-col items-start text-left sm:flex">
                                    <span className="text-xs leading-tight font-bold text-slate-700">
                                        {auth.user.name}
                                    </span>
                                    <span className="text-[10px] leading-tight font-medium text-slate-400 capitalize">
                                        User Account
                                    </span>
                                </div>
                                <ChevronDown className="h-3 w-3 text-slate-400" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-64 rounded-xl border-slate-100 bg-white p-0 shadow-xl"
                        >
                            {/* User Info Header */}
                            <div className="border-b border-slate-100 px-4 py-3">
                                <p className="text-sm font-bold text-slate-800">
                                    {auth.user.name}
                                </p>
                                <p className="text-xs text-slate-400">
                                    {auth.user.email}
                                </p>
                            </div>

                            {/* Balance */}
                            <div className="border-b border-slate-100 px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-100 text-slate-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3.5 w-3.5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                                            <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-slate-600">
                                        Sisa Saldo :
                                    </span>
                                    <span className="text-sm font-bold text-slate-800">
                                        {new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        }).format(Number(auth.user.balance))}
                                    </span>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="p-2">
                                <DropdownMenuItem
                                    asChild
                                    className="cursor-pointer rounded-lg px-3 py-2.5 focus:bg-slate-50"
                                >
                                    <Link
                                        href={edit()}
                                        className="flex w-full items-center gap-3"
                                    >
                                        <Settings className="h-4 w-4 text-slate-500" />
                                        <span className="text-sm font-medium text-slate-700">
                                            Pengaturan Akun
                                        </span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer rounded-lg px-3 py-2.5 focus:bg-slate-50"
                                    onSelect={(e) => {
                                        e.preventDefault();
                                        setDropdownOpen(false);
                                        setShowLogoutModal(true);
                                    }}
                                >
                                    <div className="flex w-full items-center gap-3">
                                        <LogOut className="h-4 w-4 text-slate-500" />
                                        <span className="text-sm font-medium text-slate-700">
                                            Keluar
                                        </span>
                                    </div>
                                </DropdownMenuItem>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
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
                                    Anda? Anda harus login kembali untuk
                                    mengakses dashboard.
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
        </>
    );
}
