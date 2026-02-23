import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    VideoIcon,
    MicIcon,
    ShieldAlertIcon,
    ShieldCheckIcon,
    UserCheckIcon,
    AlertTriangleIcon,
    XCircleIcon,
    PhoneMissedIcon,
    ActivityIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LiveValidationPage() {
    const navigate = useNavigate();
    const { session } = useAuth();
    const [isLive, setIsLive] = useState(false);
    const [scanActive, setScanActive] = useState(false);
    const [analysisLog, setAnalysisLog] = useState([]);

    // Ensure only recruiters can access
    if (!session || session.role !== 'recruiter') {
        navigate('/');
        return null;
    }

    const startInterview = () => {
        setIsLive(true);
        setTimeout(() => setScanActive(true), 1500);
    };

    const endInterview = () => {
        setIsLive(false);
        setScanActive(false);
        setAnalysisLog([]);
    };

    // Simulate active scanning logs during the live interview
    useEffect(() => {
        if (!scanActive) return;

        const signals = [
            { text: "Verifying audio stream authenticity...", type: "info" },
            { text: "Face Match: 98% confidence against identity baseline.", type: "success" },
            { text: "Background noise analysis: Normal.", type: "info" },
            { text: "Eye-tracking: Focused on screen.", type: "success" },
            { text: "No proxy or virtual camera detected.", type: "success" },
            { text: "Network latency stable (42ms).", type: "info" },
        ];

        let index = 0;
        const interval = setInterval(() => {
            if (index < signals.length) {
                setAnalysisLog(prev => [...prev, signals[index]]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [scanActive]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in zoom-in-95 duration-500 w-full mb-12">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center">
                        <VideoIcon className="w-8 h-8 mr-3 text-indigo-500" />
                        Live Interview Validation
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-bold mt-1">
                        Conduct secure interviews while CandidateShield actively monitors for fraud.
                    </p>
                </div>

                <div className="bg-slate-900 dark:bg-slate-800 rounded-xl p-3 flex items-center border border-slate-700">
                    <div className="flex items-center space-x-2 mr-6 text-sm font-bold text-slate-300">
                        <ActivityIcon className="w-4 h-4 text-emerald-500" />
                        <span>Shield Status:</span>
                        {scanActive ? (
                            <span className="text-emerald-400 flex items-center">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1.5"></span> Active
                            </span>
                        ) : (
                            <span className="text-slate-500">Standby</span>
                        )}
                    </div>
                </div>
            </div>

            {!isLive ? (
                <div className="bg-white dark:bg-[#121b33] rounded-3xl border border-slate-200 dark:border-slate-700/60 shadow-sm p-12 text-center">
                    <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <VideoIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">Waiting for Candidate</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-md mx-auto mb-8">
                        The candidate's identity baseline has been established. Waiting for them to join the secure interview room.
                    </p>
                    <button
                        onClick={startInterview}
                        className="bg-slate-900 dark:bg-indigo-500 hover:bg-slate-800 dark:hover:bg-indigo-400 text-white font-extrabold px-8 py-4 rounded-xl shadow-md transition-all"
                    >
                        Simulate Candidate Joining
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Video Feeds (Left Column, takes 2 spaces) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Candidate Feed (Main) */}
                        <div className="relative bg-slate-900 rounded-2xl aspect-video overflow-hidden border border-slate-800 shadow-xl">
                            {/* Simulated Camera Content */}
                            <div className="absolute inset-0 bg-slate-800/50 flex items-center justify-center">
                                <UserCheckIcon className="w-24 h-24 text-slate-600" />
                            </div>

                            {/* Scanning Overlay Grid */}
                            {scanActive && (
                                <div className="absolute inset-0 pointer-events-none border border-emerald-500/20">
                                    <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBMMCA0MEw0MCA0MEw0MCAwWk0zOSAzOUwxIDM5TDEgMUwzOSAxWiIgZmlsbD0iIzEwYjk4MSIgZmlsbC1vcGFjaXR5PSIwLjAyIi8+Cjwvc3ZnPg==')] opacity-50"></div>
                                    <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 border border-emerald-500/30 rounded-full border-dashed animate-[spin_10s_linear_infinite_reverse]"></div>
                                </div>
                            )}

                            {/* Trust Badge Overlay */}
                            <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-2 rounded-lg flex items-center shadow-lg">
                                <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
                                <span className="text-white text-xs font-bold uppercase tracking-wider">Candidate Feed Segregated</span>
                            </div>

                            <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-md text-white text-sm font-bold border border-slate-700">
                                Alex Johnson (Verified)
                            </div>
                        </div>

                        {/* Controls Bottom Bar */}
                        <div className="bg-slate-900 rounded-2xl p-4 flex justify-between items-center border border-slate-800">
                            <div className="flex space-x-3">
                                <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-white transition-colors">
                                    <MicIcon className="w-5 h-5" />
                                </button>
                                <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-white transition-colors">
                                    <VideoIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <button
                                onClick={endInterview}
                                className="flex items-center px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-colors shadow-lg"
                            >
                                <PhoneMissedIcon className="w-4 h-4 mr-2" />
                                End Call
                            </button>
                        </div>
                    </div>

                    {/* Threat Intelligence Sidebar (Right Column) */}
                    <div className="bg-white dark:bg-[#121b33] rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex flex-col h-full overflow-hidden">
                        <div className="p-5 border-b border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-[#070b19]/50 flex items-center justify-between">
                            <h3 className="font-extrabold text-slate-900 dark:text-white flex items-center">
                                <ShieldCheckIcon className="w-5 h-5 text-emerald-500 mr-2" />
                                Active Shield Agent
                            </h3>
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded-md">Live</span>
                        </div>

                        <div className="flex-1 p-5 overflow-y-auto space-y-4 min-h-[400px]">
                            {analysisLog.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 text-center animate-pulse">
                                    <ActivityIcon className="w-8 h-8 mb-2 opacity-50" />
                                    <p className="text-sm font-bold">Initializing analysis models...</p>
                                </div>
                            ) : (
                                analysisLog.map((log, i) => (
                                    <div key={i} className="animate-in slide-in-from-right-4 fade-in duration-300">
                                        <div className={`p-3 rounded-xl border flex items-start ${log.type === 'success'
                                                ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20'
                                                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50'
                                            }`}>
                                            {log.type === 'success' ? (
                                                <ShieldCheckIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 mr-2 shrink-0" />
                                            ) : (
                                                <ActivityIcon className="w-4 h-4 text-blue-500 dark:text-blue-400 mt-0.5 mr-2 shrink-0" />
                                            )}
                                            <p className={`text-sm font-bold ${log.type === 'success' ? 'text-emerald-800 dark:text-emerald-300' : 'text-slate-700 dark:text-slate-300'}`}>
                                                {log.text}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-5 border-t border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-[#070b19]/50 space-y-3">
                            <button className="w-full py-3 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 font-extrabold rounded-xl border border-rose-200 dark:border-rose-500/30 transition-colors flex items-center justify-center">
                                <AlertTriangleIcon className="w-4 h-4 mr-2" />
                                Flag Candidate Suspicious
                            </button>
                            <button className="w-full py-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold rounded-xl border border-slate-300 dark:border-slate-600 transition-colors">
                                View Identity Profile
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
