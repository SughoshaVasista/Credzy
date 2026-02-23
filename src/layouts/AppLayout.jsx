import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 dark:bg-[#070b19] dark:text-gray-100 transition-colors duration-300">
            <Navbar />
            <main className="flex-1 w-full flex flex-col relative z-0">
                <Outlet />
            </main>
        </div>
    );
}
