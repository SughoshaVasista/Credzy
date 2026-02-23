import { ShieldCheckIcon, SearchIcon, BriefcaseIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
    const navigate = useNavigate();
    const { session } = useAuth();

    return (
        <div className="bg-white dark:bg-[#070b19] overflow-hidden min-h-[calc(100vh-64px)] relative flex flex-col transition-colors duration-300">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/10 dark:bg-cyan-500/10 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-500/10 dark:bg-indigo-500/10 blur-3xl pointer-events-none"></div>

            <div className="relative py-24 px-6 sm:px-12 lg:px-24 text-center max-w-4xl mx-auto flex-1 flex flex-col justify-center">
                <div className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-cyan-500/10 text-emerald-700 dark:text-cyan-400 px-4 py-1.5 rounded-full text-sm font-semibold border border-emerald-100 dark:border-cyan-500/20 mb-8 mx-auto shadow-sm dark:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all">
                    <ShieldCheckIcon className="w-4 h-4" />
                    <span>The Trust Layer for Campus Hiring</span>
                </div>

                <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
                    Secure Campus Hiring with Built-in Fraud Protection
                </h1>

                <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto font-medium">
                    Connect verified students with top recruiters in a secure, transparent environment. Say goodbye to hiring fraud and fake profiles.
                </p>

                {!session ? (
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="flex items-center justify-center space-x-2 bg-slate-900 dark:bg-cyan-500 hover:bg-slate-800 dark:hover:bg-cyan-400 text-white dark:text-slate-900 px-8 py-4 rounded-xl text-lg font-bold w-full sm:w-auto transition-all shadow-md dark:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                        >
                            Login
                        </button>

                        <button
                            onClick={() => navigate('/signup/student')}
                            className="flex items-center justify-center space-x-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-xl text-lg font-semibold w-full sm:w-auto transition-all shadow-sm"
                        >
                            Student Signup
                        </button>

                        <button
                            onClick={() => navigate('/signup/recruiter')}
                            className="flex items-center justify-center space-x-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-xl text-lg font-semibold w-full sm:w-auto transition-all shadow-sm"
                        >
                            Recruiter Signup
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <button
                            onClick={() => navigate(session.role === 'recruiter' ? '/dashboard' : '/jobs')}
                            className="flex items-center justify-center space-x-2 bg-slate-900 dark:bg-cyan-500 hover:bg-slate-800 dark:hover:bg-cyan-400 text-white dark:text-slate-900 px-8 py-4 rounded-xl text-lg font-bold w-full sm:w-auto transition-all shadow-md dark:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                )}
            </div>

            <div className="py-20 bg-slate-50 dark:bg-[#0b1224] border-t border-slate-100 dark:border-slate-800/60 px-6 sm:px-12 lg:px-24 relative z-10 transition-colors duration-300">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-center text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-10">
                        Platform Capabilities
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white dark:bg-slate-800/80 p-8 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-md transition-all">
                            <div className="w-14 h-14 bg-emerald-100 dark:bg-cyan-500/10 text-emerald-600 dark:text-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <ShieldCheckIcon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Identity Verification</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Cross-referencing university domains to ensure authentic student profiles.</p>
                        </div>

                        <div className="bg-white dark:bg-slate-800/80 p-8 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-md transition-all">
                            <div className="w-14 h-14 bg-blue-100 dark:bg-indigo-500/10 text-blue-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <SearchIcon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Anomaly Detection</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Analyzing applicant behaviors with AI to detect suspicious activity during assessments.</p>
                        </div>

                        <div className="bg-white dark:bg-slate-800/80 p-8 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-md transition-all">
                            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <BriefcaseIcon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Verified Recruiters</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Transparent trust indicators visible on every job posting and recruiter profile.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
