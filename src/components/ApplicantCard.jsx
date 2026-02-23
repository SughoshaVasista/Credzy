import { useState } from 'react';
import FlagPill from './RiskPill';
import { ShieldCheckIcon, AlertTriangleIcon, ActivityIcon, CheckCircleIcon } from 'lucide-react';

export default function ApplicantCard({ applicant }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-emerald-600 dark:text-cyan-400 bg-emerald-50 dark:bg-cyan-500/10 border-emerald-200 dark:border-cyan-500/20';
        if (score >= 50) return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20';
        return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20';
    };

    const isHighRisk = applicant.trustScore < 50;

    return (
        <div className={`bg-white dark:bg-[#121b33] rounded-2xl p-6 border transition-all ${isHighRisk ? 'border-rose-200 dark:border-rose-500/30 shadow-sm bg-rose-50/10 dark:bg-rose-500/5' : 'border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]'}`}>
            <div className="flex justify-between items-start mb-5">
                <div className="flex items-center space-x-4">
                    <img src={applicant.avatar} alt={applicant.name} className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-600" />
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-gray-100 text-lg">{applicant.name}</h3>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{applicant.status}</p>
                    </div>
                </div>
                <div className={`px-3 py-1.5 rounded-lg border flex items-center space-x-1.5 font-bold shadow-sm ${getScoreColor(applicant.trustScore)}`}>
                    {applicant.trustScore >= 80 ? <ShieldCheckIcon className="w-4 h-4" /> : <AlertTriangleIcon className="w-4 h-4" />}
                    <span>{applicant.trustScore} Trust Score</span>
                </div>
            </div>

            <div className="mb-5">
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2.5">Claimed Skills</h4>
                <div className="flex flex-wrap gap-2">
                    {applicant.skills.map((skill, idx) => (
                        <span key={idx} className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-lg border border-slate-100 dark:border-slate-700/60 text-xs font-semibold">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {applicant.flags && applicant.flags.length > 0 && (
                <div className="mb-6 space-y-2.5">
                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Analysis Flags</h4>
                    <div className="flex flex-wrap gap-2">
                        {applicant.flags.map((flag, idx) => (
                            <FlagPill key={idx} label={flag} type="warning" />
                        ))}
                    </div>
                </div>
            )}

            {isExpanded && (
                <div className="mt-6 mb-6 pt-6 border-t border-slate-100 dark:border-slate-700/60 animate-in fade-in slide-in-from-top-4 duration-300">
                    <h4 className="flex items-center text-sm font-extrabold text-slate-900 dark:text-white mb-4">
                        <ActivityIcon className="w-4 h-4 mr-2 text-blue-500 dark:text-cyan-400" />
                        Trust Analysis Breakdown
                    </h4>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs font-bold mb-1.5">
                                <span className="text-slate-600 dark:text-slate-400">Identity Confidence</span>
                                <span className={applicant.trustScore >= 60 ? "text-emerald-600 dark:text-cyan-400" : "text-amber-500"}>
                                    {applicant.trustScore >= 60 ? "High" : "Needs Review"}
                                </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700/60 rounded-full h-1.5">
                                <div className={`${applicant.trustScore >= 60 ? 'bg-emerald-500 dark:bg-cyan-400' : 'bg-amber-500'} h-1.5 rounded-full`} style={{ width: `${Math.max(applicant.trustScore, 10)}%` }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-bold mb-1.5">
                                <span className="text-slate-600 dark:text-slate-400">Behavioral Consistency</span>
                                <span className={applicant.flags.length === 0 ? "text-emerald-600 dark:text-cyan-400" : "text-rose-500"}>
                                    {applicant.flags.length === 0 ? "Normal" : "Anomalous"}
                                </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700/60 rounded-full h-1.5">
                                <div className={`${applicant.flags.length === 0 ? 'bg-emerald-500 dark:bg-cyan-400' : 'bg-rose-500'} h-1.5 rounded-full`} style={{ width: `${Math.max(applicant.trustScore + 15, 20)}%` }}></div>
                            </div>
                        </div>
                    </div>

                    {isHighRisk && (
                        <div className="mt-4 p-3 bg-rose-50/50 dark:bg-rose-500/10 rounded-lg border border-rose-100 dark:border-rose-500/20 text-xs font-bold text-rose-800 dark:text-rose-300 flex items-start">
                            <AlertTriangleIcon className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
                            <p>Warning: Deep intelligence signals indicate proxy behavior or potential misrepresentation. Recommend manual verification before interviewing.</p>
                        </div>
                    )}
                </div>
            )}

            <div className="flex gap-3 pt-5 border-t border-slate-100 dark:border-slate-700/60">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm focus:outline-none"
                >
                    {isExpanded ? "Hide Details" : "View Intelligence"}
                </button>
                {isHighRisk ? (
                    <button className="flex-1 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm">
                        Flag for Review
                    </button>
                ) : (
                    <button className="flex-1 bg-emerald-50 dark:bg-cyan-500/10 border border-emerald-200 dark:border-cyan-500/30 hover:bg-emerald-100 dark:hover:bg-cyan-500/20 text-emerald-700 dark:text-cyan-400 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm">
                        Mark Safe
                    </button>
                )}
            </div>
        </div>
    );
}
