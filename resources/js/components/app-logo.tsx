import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white p-1.5 shadow-sm">
                <AppLogoIcon className="size-full fill-[#02c39a]" />
            </div>
            <div className="mt-0.5 ml-2 grid flex-1 text-left">
                <span className="truncate px-1 text-lg font-bold tracking-tight text-white">
                    Medanpedia
                </span>
            </div>
        </>
    );
}
