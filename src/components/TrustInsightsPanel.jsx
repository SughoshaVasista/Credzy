import { ShieldCheckIcon, AlertTriangleIcon, ActivityIcon, CheckCircleIcon, XIcon, SearchIcon } from 'lucide-react';

export default function TrustInsightsPanel({ isOpen, onClose, entityData }) {
    if (!isOpen || !entityData) return null;

    return (
        <div className="fixed inset-0 z-[70] flex p-4 sm:p-6 justify-end bg-slate-900/40 dark:bg-[#070b19]/60 backdrop-blur-sm transition-all duration-300">
            <div className="bg-white dark:bg-[#121b33] rounded-2xl w-full max-w-sm shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden animate-in slide-in-from-right-10 duration-300 border border-slate-200 dark:border-slate-700/80 flex flex-col h-full">
                <div className="p-5 border-b border-slate-100 dark:border-slate-700/60 flex justify-between items-center bg-slate-50 dark:bg-[#070b19]/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-cyan-500/10 blur-2xl rounded-full pointer-events-none"></div>
                    <div className="flex items-center space-x-2.5 relative z-10">
                        <ActivityIcon className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                        <h3 className="font-extrabold text-slate-900 dark:text-white tracking-tight">Trust Insights</h3>
                    </div>
                    <button onClick={onClose} className="p-1.5 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors focus:outline-none relative z-10">
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center p-4 rounded-full bg-slate-50 dark:bg-[#070b19]/80 border border-slate-100 dark:border-slate-700/60 shadow-inner mb-3">
                            {entityData.trustLevel === 'verified' || entityData.trustScore >= 80 ? (
                                <ShieldCheckIcon className="w-10 h-10 text-emerald-500 dark:text-cyan-400" />
                            ) : (
                                <AlertTriangleIcon className="w-10 h-10 text-amber-500 dark:text-amber-400" />
                            )}
                        </div>
                        <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">{entityData.name}</h4>
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Platform Confidence</p>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-slate-50 dark:bg-[#070b19]/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/40">
                            <h5 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                                <SearchIcon className="w-3.5 h-3.5 mr-1.5" />
                                Intelligence Signals
                            </h5>
                            <ul className="space-y-3">
                                <li className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-slate-600 dark:text-slate-300">Account Age Signal</span>
                                    <span className="text-emerald-600 dark:text-cyan-400 flex items-center"><CheckCircleIcon className="w-3.5 h-3.5 mr-1" /> Stable</span>
                                </li>
                                <li className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-slate-600 dark:text-slate-300">Domain Verification</span>
                                    <span className="text-emerald-600 dark:text-cyan-400 flex items-center"><CheckCircleIcon className="w-3.5 h-3.5 mr-1" /> Verified</span>
                                </li>
                                <li className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-slate-600 dark:text-slate-300">Report Volume</span>
                                    {entityData.riskSignals?.length > 0 || entityData.flags?.length > 0 ? (
                                        <span className="text-amber-600 dark:text-amber-400 flex items-center"><AlertTriangleIcon className="w-3.5 h-3.5 mr-1" /> Elevated</span>
                                    ) : (
                                        <span className="text-emerald-600 dark:text-cyan-400 flex items-center"><CheckCircleIcon className="w-3.5 h-3.5 mr-1" /> Normal</span>
                                    )}
                                </li>
                                <li className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-slate-600 dark:text-slate-300">Behavioral Consistency</span>
                                    <span className="text-emerald-600 dark:text-cyan-400 flex items-center"><CheckCircleIcon className="w-3.5 h-3.5 mr-1" /> Match</span>
                                </li>
                            </ul>
                        </div>

                        {(entityData.riskSignals?.length > 0 || entityData.flags?.length > 0) && (
                            <div className="bg-amber-50 dark:bg-amber-500/5 p-4 rounded-xl border border-amber-100 dark:border-amber-500/20">
                                <h5 className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-widest mb-2 flex items-center">
                                    <AlertTriangleIcon className="w-3.5 h-3.5 mr-1.5" />
                                    Active Risk Indicators
                                </h5>
                                <ul className="list-disc list-inside space-y-1 text-sm font-bold text-amber-900/80 dark:text-amber-200/80">
                                    {(entityData.riskSignals || entityData.flags).map((s, i) => <li key={i}>{s}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 border-t border-slate-100 dark:border-slate-700/60 bg-slate-50 dark:bg-[#070b19]/50">
                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 text-center">
                        Analysis powered by Credzy Trust Engine
                    </p>
                </div>
            </div>
        </div>
    );
}
