import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    ShieldCheckIcon,
    AlertTriangleIcon,
    ShieldAlertIcon,
    SearchIcon,
    CheckCircleIcon,
    CopyIcon,
    MessageSquareWarningIcon
} from 'lucide-react';

export default function OfferScannerPage() {
    const { session } = useAuth();
    const [offerText, setOfferText] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [results, setResults] = useState(null);

    const handleScan = () => {
        if (!offerText.trim()) return;

        setIsScanning(true);
        setResults(null);

        // Simulate API call to OfferShield Engine
        setTimeout(() => {
            const textToLower = offerText.toLowerCase();
            let score = 95; // Default safe
            let label = 'Safe';
            let labelColor = 'text-emerald-600 dark:text-cyan-400 bg-emerald-50 dark:bg-cyan-500/10 border-emerald-200 dark:border-cyan-500/20';
            const reasons = [];
            const actions = [];

            // Simple mock heuristic checking
            if (textToLower.includes('fee') || textToLower.includes('pay') || textToLower.includes('deposit')) {
                score -= 40;
                reasons.push("Requests upfront payment or deposit, which is highly unusual for legitimate offers.");
                actions.push("Never pay fees for an internship or job offer.");
            }
            if (textToLower.includes('urgent') || textToLower.includes('immediately')) {
                score -= 20;
                reasons.push("Uses high-pressure urgency tactics to force a quick decision.");
                actions.push("Take your time to research the company independently.");
            }
            if (textToLower.includes('whatsapp') || textToLower.includes('telegram')) {
                score -= 15;
                reasons.push("Directs communication to unverified personal messaging platforms.");
                actions.push("Request all official communication via a verified company email domain.");
            }
            if (textToLower.includes('kindly') || textToLower.includes('dear candidate')) {
                score -= 10;
                reasons.push("Uses generic greetings often associated with mass phishing templates.");
            }

            if (score < 40) {
                label = 'High Risk';
                labelColor = 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20';
                if (actions.length === 0) actions.push("Cease communication immediately.");
            } else if (score < 80) {
                label = 'Suspicious';
                labelColor = 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20';
                if (actions.length === 0) actions.push("Verify the recruiter on LinkedIn before proceeding.");
            } else {
                reasons.push("No immediate scam heuristics detected in the text structure.");
                actions.push("Proceed normally, but remain vigilant during onboarding.");
            }

            setResults({
                score,
                label,
                labelColor,
                reasons,
                actions
            });
            setIsScanning(false);
        }, 1800);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-in slide-in-from-bottom-8 fade-in duration-500 w-full mb-12">
            <div className="mb-10 text-center sm:text-left bg-white dark:bg-[#121b33] p-8 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm relative overflow-hidden transition-colors">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none"></div>
                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:justify-between">
                    <div>
                        <div className="flex items-center space-x-3 mb-2 justify-center sm:justify-start">
                            <ShieldCheckIcon className="w-8 h-8 text-emerald-600 dark:text-cyan-400" />
                            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">OfferShield Scanner</h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-bold max-w-xl">
                            Paste suspicious job offers, emails, or messages. The Credzy AI Engine will analyze the text for scam heuristics and proxy risks.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Input Column */}
                <div className={`${results ? 'lg:col-span-5' : 'lg:col-span-12'} transition-all duration-500`}>
                    <div className="bg-white dark:bg-[#121b33] rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-hidden flex flex-col h-full min-h-[400px]">
                        <div className="p-4 bg-slate-50 dark:bg-[#070b19]/50 border-b border-slate-100 dark:border-slate-700/60 flex justify-between items-center">
                            <span className="text-sm font-bold text-slate-600 dark:text-slate-300 flex items-center">
                                <MessageSquareWarningIcon className="w-4 h-4 mr-2 text-slate-400" />
                                Paste Offer Details
                            </span>
                            <button
                                onClick={() => navigator.clipboard.readText().then(t => setOfferText(t))}
                                className="text-xs font-bold text-slate-500 hover:text-emerald-600 dark:hover:text-cyan-400 flex items-center transition-colors"
                            >
                                <CopyIcon className="w-3 h-3 mr-1" /> Paste from Clipboard
                            </button>
                        </div>
                        <textarea
                            value={offerText}
                            onChange={(e) => setOfferText(e.target.value)}
                            placeholder="Dear Candidate, You have been selected for the internship. Kindly deposit a refundable training fee of..."
                            className="flex-1 w-full p-6 text-slate-700 dark:text-slate-200 bg-transparent resize-none focus:outline-none focus:ring-0 text-sm font-medium leading-relaxed custom-scrollbar"
                            spellCheck="false"
                        ></textarea>
                        <div className="p-4 border-t border-slate-100 dark:border-slate-700/60 bg-slate-50 dark:bg-[#070b19]/50">
                            <button
                                onClick={handleScan}
                                disabled={isScanning || !offerText.trim()}
                                className="w-full py-3.5 px-4 bg-emerald-600 dark:bg-cyan-500 hover:bg-emerald-700 dark:hover:bg-cyan-400 text-white dark:text-slate-900 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isScanning ? (
                                    <>
                                        <SearchIcon className="w-5 h-5 mr-2 animate-spin" />
                                        Scanning text heuristics...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheckIcon className="w-5 h-5 mr-2" />
                                        Analyze Offer
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Column */}
                {results && (
                    <div className="lg:col-span-7 space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                        {/* Score Card */}
                        <div className="bg-white dark:bg-[#121b33] rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm p-6 sm:p-8 flex items-center space-x-6 sm:space-x-8">
                            <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                    <path className="text-slate-100 dark:text-slate-700/40" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
                                    <path
                                        className={`${results.score < 40 ? 'text-rose-500' : results.score < 80 ? 'text-amber-500' : 'text-emerald-500 dark:text-cyan-400'} transition-all duration-1000 ease-out`}
                                        strokeDasharray={`${results.score}, 100`}
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center justify-center">
                                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{results.score}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Safety Score</span>
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="mb-2 text-xs font-bold text-slate-400 uppercase tracking-widest">OfferShield Analysis</div>
                                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">AI Confidence</h3>
                                <div className={`inline-flex px-4 py-2 rounded-xl text-sm font-extrabold border shadow-sm items-center ${results.labelColor}`}>
                                    {results.score < 40 ? <ShieldAlertIcon className="w-5 h-5 mr-2" /> : results.score < 80 ? <AlertTriangleIcon className="w-5 h-5 mr-2" /> : <CheckCircleIcon className="w-5 h-5 mr-2" />}
                                    {results.label}
                                </div>
                            </div>
                        </div>

                        {/* Reasons & Steps */}
                        <div className="bg-slate-50 dark:bg-[#070b19]/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-inner overflow-hidden">
                            <div className="p-6 sm:p-8">
                                <h4 className="flex items-center text-sm font-extrabold text-slate-900 dark:text-white mb-5 uppercase tracking-widest">
                                    <AlertTriangleIcon className={`w-4 h-4 mr-2 ${results.score < 80 ? 'text-amber-500' : 'text-emerald-500 dark:text-cyan-400'}`} />
                                    Explainable Reasons
                                </h4>
                                <ul className="space-y-3 mb-8">
                                    {results.reasons.map((reason, idx) => (
                                        <li key={idx} className="flex items-start text-sm font-bold text-slate-600 dark:text-slate-300">
                                            <span className="mt-1 mr-3 w-1.5 h-1.5 rounded-full shrink-0 bg-slate-400 dark:bg-slate-500"></span>
                                            {reason}
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-6 border-t border-slate-200 dark:border-slate-700/60">
                                    <h4 className="flex items-center text-sm font-extrabold text-slate-900 dark:text-white mb-5 uppercase tracking-widest">
                                        <ShieldCheckIcon className="w-4 h-4 mr-2 text-emerald-500 dark:text-cyan-400" />
                                        Safety Next Steps
                                    </h4>
                                    <div className="grid gap-3">
                                        {results.actions.map((action, idx) => (
                                            <div key={idx} className="bg-white dark:bg-[#121b33] p-4 rounded-xl border border-slate-100 dark:border-slate-700/60 shadow-sm flex items-center">
                                                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3 shrink-0">
                                                    <span className="text-xs font-bold text-slate-500">{idx + 1}</span>
                                                </div>
                                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{action}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
