import { useState, useEffect } from 'react';
import { ShieldAlertIcon, GlobeIcon, ActivityIcon, ClockIcon, MapPinIcon, TrendingUpIcon, ShieldCheckIcon } from 'lucide-react';

const mockLedgerEvents = [
    {
        id: 'EV-892',
        timeAgo: '2 mins ago',
        type: 'Impersonation',
        severity: 'high',
        description: 'Mock offer letter posing as Microsoft HR detected. Contained embedded payment link for "background check fee".',
        location: 'Bengaluru, IN (IP Match)',
        confidence: '99%'
    },
    {
        id: 'EV-891',
        timeAgo: '14 mins ago',
        type: 'Fake Startup',
        severity: 'medium',
        description: 'Unverified company domain "tech-innovate-solutions-hr.com" blocked. Domain registered < 48 hours ago.',
        location: 'Remote',
        confidence: '85%'
    },
    {
        id: 'EV-890',
        timeAgo: '1 hour ago',
        type: 'Proxy Interview',
        severity: 'high',
        description: 'CandidateShield intercepted Deepfake audio attempt during Tech Round 1.',
        location: 'Hyderabad, IN',
        confidence: '94%'
    },
    {
        id: 'EV-889',
        timeAgo: '2 hours ago',
        type: 'Phishing',
        severity: 'high',
        description: 'Mass WhatsApp blast blocked containing fraudulent "TCS Mega Drive" registration forms.',
        location: 'Multiple',
        confidence: '98%'
    },
    {
        id: 'EV-888',
        timeAgo: '5 hours ago',
        type: 'Skill Fraud',
        severity: 'low',
        description: 'Resume parser anomaly: Impossible timeline detected (10 years experience claimed, graduation year 2022).',
        location: 'Pune, IN',
        confidence: '72%'
    }
];

// Reusable Counter Hook for wow-factor
function useCounter(end, duration = 1500) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // easeOutQuart
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeProgress * end));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration]);

    return count;
}

export default function ScamLedgerPage() {
    const blockedCount = useCounter(12492, 2000);
    const savedCount = useCounter(24, 2000);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full mb-12 relative">

            {/* Background Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 dark:bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 animate-in slide-in-from-top-4 fade-in duration-700">
                <div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-widest mb-4 hover:scale-105 transition-transform cursor-default">
                        <ActivityIcon className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
                        Live Network Defense
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center mb-2">
                        <GlobeIcon className="w-8 h-8 mr-3 text-emerald-600 dark:text-cyan-400" />
                        Community Scam Ledger
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-bold max-w-2xl">
                        A real-time, anonymized feed of global threats intercepted by Credzy across all university networks. Stay informed.
                    </p>
                </div>

                {/* Global Stats Mock */}
                <div className="flex space-x-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <div className="bg-white dark:bg-[#121b33] px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700/60 min-w-[140px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">Threats Blocked</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">
                            {blockedCount.toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-[#121b33] px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700/60 min-w-[140px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">Students Saved</p>
                        <p className="text-2xl font-black text-emerald-600 dark:text-cyan-400">
                            + ${savedCount / 10}M
                        </p>
                    </div>
                </div>
            </div>

            {/* The Feed */}
            <div className="bg-white dark:bg-[#121b33]/50 rounded-3xl border border-slate-200 dark:border-slate-700/60 shadow-xl overflow-hidden relative backdrop-blur-sm animate-in fade-in zoom-in-95 duration-500 delay-200 fill-mode-both">

                {/* Visual "Scanning" Bar */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-emerald-500 dark:via-cyan-400 to-transparent animate-[scan_3s_ease-in-out_infinite]"></div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {mockLedgerEvents.map((event, idx) => (
                        <div
                            key={event.id}
                            className="p-6 hover:bg-slate-50 dark:hover:bg-[#1a233b] transition-all duration-300 group cursor-pointer animate-in fade-in slide-in-from-bottom-4"
                            style={{ animationDelay: `${(idx + 3) * 100}ms`, animationFillMode: 'both' }}
                        >
                            <div className="flex flex-col md:flex-row md:items-start gap-4 transform group-hover:translate-x-1 transition-transform duration-300">

                                {/* Severity Indicator & Time */}
                                <div className="flex items-center md:flex-col md:items-end md:w-32 shrink-0 md:pt-1">
                                    <div className="flex items-center space-x-2 w-full md:justify-end">
                                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 flex items-center group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                                            <ClockIcon className="w-3 h-3 mr-1" />
                                            {event.timeAgo}
                                        </span>
                                        <div className={`w-2 h-2 rounded-full relative ${event.severity === 'high' ? 'bg-rose-500' : event.severity === 'medium' ? 'bg-amber-500' : 'bg-slate-400'}`}>
                                            {event.severity === 'high' && (
                                                <div className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-75"></div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="hidden md:block mt-6 text-[10px] font-mono text-slate-300 dark:text-slate-600 font-bold group-hover:text-slate-400 transition-colors">
                                        ID: {event.id}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center flex-wrap gap-2 mb-2">
                                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center group-hover:text-emerald-600 dark:group-hover:text-cyan-400 transition-colors">
                                            {event.severity === 'high' && <ShieldAlertIcon className="w-4 h-4 mr-1.5 text-rose-500" />}
                                            {event.type}
                                        </h3>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm">
                                            {event.confidence} AI Confidence
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mb-3">
                                        {event.description}
                                    </p>

                                    {/* Meta Tags */}
                                    <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                        <span className="flex items-center bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-100 dark:border-slate-700">
                                            <MapPinIcon className="w-3 h-3 mr-1.5 text-slate-400" />
                                            {event.location}
                                        </span>
                                        <span className="flex items-center text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-cyan-500/10 px-2 py-1 rounded-md border border-emerald-100 dark:border-cyan-500/20">
                                            <ShieldCheckIcon className="w-3 h-3 mr-1.5" />
                                            Mitigated Successfully
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="w-full p-4 bg-slate-50 dark:bg-[#070b19]/80 border-t border-slate-100 dark:border-slate-800/60 text-center flex justify-center text-xs font-bold text-slate-500 dark:text-slate-400 items-center hover:text-emerald-600 dark:hover:text-cyan-400 hover:bg-white dark:hover:bg-[#121b33] cursor-pointer transition-all active:scale-[0.99] group">
                    <TrendingUpIcon className="w-4 h-4 mr-2 group-hover:-translate-y-0.5 group-hover:scale-110 transition-transform" />
                    Load Historical Data
                </button>
            </div>

            <style>{`
                @keyframes scan {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}
