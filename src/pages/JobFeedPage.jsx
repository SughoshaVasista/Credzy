import { useState } from 'react';
import { Search, SlidersHorizontalIcon, ShieldCheckIcon, EyeOffIcon } from 'lucide-react';
import JobCard from '../components/JobCard';
import { mockJobs } from '../mock/jobs';

export default function JobFeedPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [hideRisks, setHideRisks] = useState(false);

    let filteredJobs = mockJobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (verifiedOnly) {
        filteredJobs = filteredJobs.filter(job => job.recruiter?.trustLevel === 'verified');
    }

    if (hideRisks) {
        filteredJobs = filteredJobs.filter(job => !(job.recruiter?.riskSignals && job.recruiter.riskSignals.length > 0));
    }

    filteredJobs.sort((a, b) => {
        if (sortBy === 'trust') {
            const levels = { verified: 3, suspicious: 2, high_risk: 1 };
            const aLevel = levels[a.recruiter?.trustLevel] || 0;
            const bLevel = levels[b.recruiter?.trustLevel] || 0;
            return bLevel - aLevel;
        } else if (sortBy === 'stipend') {
            const aStipend = parseInt(a.stipend.replace(/[^0-9]/g, '')) || 0;
            const bStipend = parseInt(b.stipend.replace(/[^0-9]/g, '')) || 0;
            return bStipend - aStipend;
        }
        return 0;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in slide-in-from-bottom-8 fade-in duration-500 w-full mb-12">
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-[#121b33] p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm relative overflow-hidden transition-colors">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none"></div>

                <div className="mb-6 sm:mb-0 relative z-10 text-center sm:text-left w-full sm:w-auto">
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Discover Secure Opportunities</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-bold">Browse verified jobs with transparent trust indicators.</p>
                </div>
                <div className="w-full sm:w-auto relative z-10">
                    <div className="relative w-full sm:min-w-xs">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                        </div>
                        <input
                            type="search"
                            className="block w-full p-3.5 pl-10 text-sm font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700/60 rounded-xl bg-white dark:bg-[#070b19]/50 focus:ring-2 focus:ring-emerald-500/50 dark:focus:ring-cyan-500/50 focus:border-emerald-500 dark:focus:border-cyan-500 outline-none shadow-sm transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                            placeholder="Search jobs, or companies..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50 dark:bg-[#070b19]/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 gap-4">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <SlidersHorizontalIcon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className="bg-white dark:bg-[#121b33] border border-slate-200 dark:border-slate-700/60 text-slate-900 dark:text-white text-sm font-bold rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2 outline-none"
                        >
                            <option value="newest">Newest First</option>
                            <option value="trust">Highest Trust</option>
                            <option value="stipend">Highest Stipend</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <label className="flex items-center space-x-2 cursor-pointer group">
                        <input type="checkbox" checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)} className="w-4 h-4 text-emerald-600 bg-slate-100 border-slate-300 rounded focus:ring-emerald-500 dark:focus:ring-cyan-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600" />
                        <ShieldCheckIcon className="w-4 h-4 text-emerald-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Verified Recruiters Only</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer group">
                        <input type="checkbox" checked={hideRisks} onChange={e => setHideRisks(e.target.checked)} className="w-4 h-4 text-emerald-600 bg-slate-100 border-slate-300 rounded focus:ring-emerald-500 dark:focus:ring-cyan-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600" />
                        <EyeOffIcon className="w-4 h-4 text-amber-500 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Hide Risk Signals</span>
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job, idx) => (
                        <div key={job.id} className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both" style={{ animationDelay: `${idx * 100}ms` }}>
                            <JobCard job={job} />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-white dark:bg-[#121b33] rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm transition-colors">
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">No verified jobs found matching your criteria.</p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="mt-4 text-emerald-600 dark:text-cyan-400 font-bold hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
