import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
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
                        className="w-56 rounded-xl border-slate-100 bg-white p-2 shadow-xl"
                    >
                        <div className="px-3 py-2">
                            <p className="mb-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                                Menu Akun
                            </p>
                        </div>
                        <DropdownMenuItem
                            asChild
                            className="cursor-pointer rounded-lg focus:bg-[#02c39a]/10 focus:text-[#02c39a]"
                        >
                            <Link
                                href={edit()}
                                className="flex w-full items-center gap-2"
                            >
                                <Settings className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                    Settings
                                </span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1 bg-slate-50" />
                        <DropdownMenuItem
                            asChild
                            className="cursor-pointer rounded-lg text-red-500 focus:bg-red-50 focus:text-red-600"
                        >
                            <form
                                action={logout().url}
                                method="post"
                                className="w-full"
                            >
                                <button
                                    type="submit"
                                    className="flex w-full items-center gap-2 text-left"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span className="text-sm font-medium">
                                        Log out
                                    </span>
                                </button>
                            </form>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
