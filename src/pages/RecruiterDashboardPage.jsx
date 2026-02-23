import { useState } from 'react';
import { mockApplicants } from '../mock/applicants';
import ApplicantCard from '../components/ApplicantCard';
import { ShieldAlertIcon, CheckCircleIcon, UsersIcon } from 'lucide-react';

export default function RecruiterDashboardPage() {
    const [filter, setFilter] = useState('all');

    const filteredApplicants = mockApplicants.filter(app => {
        if (filter === 'flagged') return app.trustScore < 50;
        if (filter === 'safe') return app.trustScore >= 80;
        return true;
    });

    const highRiskCount = mockApplicants.filter(a => a.trustScore < 50).length;
    const safeCount = mockApplicants.filter(a => a.trustScore >= 80).length;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in zoom-in-95 duration-500 w-full mb-12">
            <div className="mb-8 p-8 bg-slate-900 dark:bg-[#121b33] rounded-2xl relative overflow-hidden shadow-sm text-white border border-transparent dark:border-slate-700/60 transition-colors">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/20 dark:bg-cyan-500/20 blur-3xl pointer-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="text-center sm:text-left">
                        <h1 className="text-3xl font-extrabold tracking-tight mb-3">Recruiter Dashboard</h1>
                        <p className="text-slate-300 dark:text-slate-400 font-bold max-w-xl">
                            Manage candidates with built-in trust signals. The Credzy platform automatically flags suspicious behavior to protect your hiring pipeline.
                        </p>
                    </div>

                    <div className="bg-slate-800/80 dark:bg-[#070b19]/80 backdrop-blur-sm border border-slate-700 dark:border-slate-700/60 p-4 rounded-xl w-full md:w-auto shrink-0 shadow-inner">
                        <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Platform Monitoring Active
                        </div>
                        <ul className="space-y-2 text-sm font-semibold text-slate-300">
                            <li className="flex items-center"><CheckCircleIcon className="w-4 h-4 text-emerald-400 mr-2" /> Camera Signal Stable</li>
                            <li className="flex items-center"><CheckCircleIcon className="w-4 h-4 text-emerald-400 mr-2" /> Anomaly Detection Active</li>
                            <li className="flex items-center"><CheckCircleIcon className="w-4 h-4 text-emerald-400 mr-2" /> Identity Consistency Tracking</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className="bg-white dark:bg-[#121b33] p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex items-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => setFilter('all')}>
                    <div className="p-4 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl mr-5">
                        <UsersIcon className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Total Applicants</p>
                        <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{mockApplicants.length}</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#121b33] p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex items-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => setFilter('safe')}>
                    <div className="p-4 bg-emerald-50 dark:bg-cyan-500/10 text-emerald-600 dark:text-cyan-400 rounded-xl mr-5">
                        <CheckCircleIcon className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">High Trust</p>
                        <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{safeCount}</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#121b33] p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex items-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => setFilter('flagged')}>
                    <div className="p-4 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl mr-5">
                        <ShieldAlertIcon className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Needs Review</p>
                        <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{highRiskCount}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-[#121b33] rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-hidden transition-colors">
                <div className="border-b border-slate-200 dark:border-slate-700/60 px-6 py-5 flex flex-col justify-between items-center sm:flex-row bg-slate-50 dark:bg-[#070b19]/50">
                    <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-4 sm:mb-0">Candidate Pipeline</h2>

                    <div className="flex bg-white dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-sm w-full sm:w-auto overflow-x-auto">
                        <button
                            className={`flex-1 sm:flex-none px-5 py-2 text-sm font-extrabold rounded-lg transition-colors whitespace-nowrap ${filter === 'all' ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </button>
                        <button
                            className={`flex-1 sm:flex-none px-5 py-2 text-sm font-extrabold rounded-lg transition-colors whitespace-nowrap ${filter === 'safe' ? 'bg-emerald-50 dark:bg-cyan-500/10 text-emerald-700 dark:text-cyan-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                            onClick={() => setFilter('safe')}
                        >
                            Safe
                        </button>
                        <button
                            className={`flex-1 sm:flex-none px-5 py-2 text-sm font-extrabold rounded-lg transition-colors whitespace-nowrap ${filter === 'flagged' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                            onClick={() => setFilter('flagged')}
                        >
                            Flagged
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredApplicants.length > 0 ? (
                            filteredApplicants.map((app, idx) => (
                                <div key={app.id} className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both" style={{ animationDelay: `${idx * 100}ms` }}>
                                    <ApplicantCard applicant={app} />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center rounded-2xl bg-slate-50 dark:bg-[#070b19]/50 border border-slate-200 dark:border-slate-700/60 border-dashed">
                                <ShieldAlertIcon className="mx-auto w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
                                <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">No candidates found in this category.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
