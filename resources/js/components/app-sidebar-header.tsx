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
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage<SharedData>().props;
    const pageTitle =
        breadcrumbs.length > 0
            ? breadcrumbs[breadcrumbs.length - 1].title
            : 'Medanpedia';

    return (
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 bg-white px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 md:px-8">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="-ml-1 text-slate-500 hover:bg-slate-50" />
                <div className="hidden h-6 w-px bg-slate-200 md:block" />
                <h1 className="text-xl font-bold tracking-tight text-slate-800">
                    {pageTitle}
                </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <DropdownMenu>
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
                                    Rp 164
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
                                asChild
                                className="cursor-pointer rounded-lg px-3 py-2.5 focus:bg-slate-50"
                            >
                                <form
                                    action={logout().url}
                                    method="post"
                                    className="w-full"
                                >
                                    <button
                                        type="submit"
                                        className="flex w-full items-center gap-3 text-left"
                                    >
                                        <LogOut className="h-4 w-4 text-slate-500" />
                                        <span className="text-sm font-medium text-slate-700">
                                            Keluar
                                        </span>
                                    </button>
                                </form>
                            </DropdownMenuItem>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
