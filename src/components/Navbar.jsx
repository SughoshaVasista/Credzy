import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheckIcon, LogOutIcon, UserIcon, LockIcon, MenuIcon, XIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { session, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false);
        navigate('/');
    };

    const getLinks = () => {
        if (!session) {
            return [{ name: 'Login', path: '/login' }];
        }
        if (session.role === 'recruiter') {
            return [
                { name: 'Dashboard', path: '/dashboard' },
                { name: 'My Jobs', path: '/recruiter/jobs' },
                { name: 'Live Validation', path: '/recruiter/live-validation' },
                { name: 'Scam Ledger', path: '/recruiter/ledger' },
                { name: 'Company Directory', path: '/recruiter/directory' }
            ];
        }
        return [
            { name: 'Jobs', path: '/jobs' },
            { name: 'My Applications', path: '/applications' },
            { name: 'Scan Offer', path: '/scan' },
            { name: 'Scam Ledger', path: '/ledger' },
            { name: 'Company Directory', path: '/directory' }
        ];
    };

    const links = getLinks();

    return (
        <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#070b19]/90 backdrop-blur-md sticky top-0 z-50 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter flex items-center">
                            <span className="w-8 h-8 rounded-lg bg-emerald-500 dark:bg-cyan-500 mr-2 flex items-center justify-center shadow-sm dark:shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                                <span className="text-white text-lg font-bold">C</span>
                            </span>
                            Credzy
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-8">
                        {getLinks().map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-cyan-400 px-3 py-2 rounded-md transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        <ThemeToggle />

                        {/* Desktop User Menu */}
                        <div className="hidden sm:block">
                            {session ? (
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-200 dark:border-emerald-500/20 shadow-sm">
                                        <LockIcon className="w-3 h-3 mr-1" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                                        Secure Session
                                    </div>
                                    <Link to="/profile" className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-full transition-colors border border-slate-200 dark:border-slate-700">
                                        <div className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300">
                                            {session.email.charAt(0).toUpperCase()}
                                        </div>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-slate-500 hover:text-rose-500 transition-colors p-2"
                                        title="Logout"
                                    >
                                        <LogOutIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="space-x-3">
                                    <Link to="/login" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-cyan-400 transition-colors">
                                        Log in
                                    </Link>
                                    <Link to="/join" className="bg-emerald-600 dark:bg-cyan-500 hover:bg-emerald-700 dark:hover:bg-cyan-400 text-white dark:text-slate-900 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm">
                                        Sign up
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="sm:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-cyan-400 focus:outline-none p-2"
                            >
                                {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070b19] animate-in slide-in-from-top-2">
                    <div className="pt-2 pb-3 space-y-1 px-4">
                        {getLinks().map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-cyan-400 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="pt-4 pb-4 border-t border-slate-200 dark:border-slate-800 px-4">
                        {session ? (
                            <div className="space-y-3">
                                <div className="flex items-center px-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-bold mr-3">
                                        {session.email.charAt(0).toUpperCase()}
                                    </div>
                                    {session.email}
                                </div>
                                <div className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-2 rounded-md border border-emerald-200 dark:border-emerald-500/20 w-fit">
                                    <LockIcon className="w-3 h-3 mr-2" />
                                    Secure Session Active
                                </div>
                                <Link
                                    to="/profile"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    View Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                                >
                                    <LogOutIcon className="w-5 h-5 mr-3" />
                                    Sign out
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-2">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full text-center px-4 py-2 border border-slate-300 dark:border-slate-600 shadow-sm text-base font-bold rounded-xl text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/join"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full text-center px-4 py-2 border border-transparent text-base font-bold rounded-xl text-white dark:text-slate-900 bg-emerald-600 dark:bg-cyan-500 hover:bg-emerald-700 dark:hover:bg-cyan-400 transition-colors"
                                >
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
