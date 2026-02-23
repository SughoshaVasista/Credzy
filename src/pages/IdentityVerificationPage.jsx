import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CameraIcon,
    MicIcon,
    CheckCircleIcon,
    ScanFaceIcon,
    ShieldCheckIcon,
    Loader2Icon
} from 'lucide-react';

export default function IdentityVerificationPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: prompt, 2: positioning, 3: recording, 4: success
    const [progress, setProgress] = useState(0);

    const PHRASE = "I consent to this verification to build trust on the Credzy platform.";

    const handleEnableCamera = () => setStep(2);

    const handleStartRecording = () => {
        setStep(3);
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 5; // Simulating a fast 2-3s record
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(interval);
                setTimeout(() => setStep(4), 500);
            }
        }, 150);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 animate-in fade-in zoom-in-95 duration-500 w-full mb-12">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-slate-50 dark:bg-cyan-500/10 border border-slate-200 dark:border-cyan-500/20 shadow-inner mb-4">
                    <ShieldCheckIcon className="w-10 h-10 text-emerald-600 dark:text-cyan-400" />
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">Pre-Interview Verification</h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold max-w-md mx-auto">
                    Establish your identity baseline before interviewing. This mandatory step protects the platform from proxy attempts.
                </p>
            </div>

            <div className="bg-white dark:bg-[#121b33] rounded-3xl border border-slate-200 dark:border-slate-700/60 shadow-lg overflow-hidden relative">

                {/* Simulated Viewfinder */}
                <div className="bg-slate-900 aspect-video relative flex flex-col items-center justify-center p-6 sm:p-10 overflow-hidden">
                    {/* Corner Reticles */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-slate-500/50"></div>
                    <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-slate-500/50"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-slate-500/50"></div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-slate-500/50"></div>

                    {step === 1 && (
                        <div className="text-center z-10 animate-in fade-in zoom-in-95 duration-300">
                            <CameraIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <button
                                onClick={handleEnableCamera}
                                className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-100 transition-colors"
                            >
                                Enable Camera & Mic
                            </button>
                        </div>
                    )}

                    {(step === 2 || step === 3) && (
                        <>
                            {/* Face outline / scanning box */}
                            <div className="w-48 h-64 border-2 border-dashed border-emerald-500/50 dark:border-cyan-400/50 rounded-[40%] animate-pulse relative z-10 flex items-center justify-center">
                                <ScanFaceIcon className="w-12 h-12 text-emerald-500/30 dark:text-cyan-400/30" />
                            </div>

                            {/* Scanning overlay effect */}
                            <div className="absolute inset-x-0 h-1 bg-emerald-400/50 dark:bg-cyan-400/50 blur-[2px] animate-[scan_2s_ease-in-out_infinite] z-0"></div>

                            {step === 3 && (
                                <div className="absolute top-6 right-6 flex items-center z-20 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-700">
                                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse mr-2"></span>
                                    <span className="text-xs font-bold text-white uppercase tracking-widest">Rec</span>
                                </div>
                            )}

                            {/* Voice Prompt overlay */}
                            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent z-20 text-center">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-center">
                                    <MicIcon className="w-3.5 h-3.5 mr-1.5" /> Speak this clearly:
                                </p>
                                <p className="text-lg sm:text-xl font-extrabold text-white">"{PHRASE}"</p>
                            </div>
                        </>
                    )}

                    {step === 4 && (
                        <div className="text-center z-10 animate-in fade-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-emerald-500/20 dark:bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30 dark:border-cyan-400/30">
                                <CheckCircleIcon className="w-12 h-12 text-emerald-400 dark:text-cyan-300" />
                            </div>
                            <h2 className="text-2xl font-extrabold text-white tracking-tight">Identity Baseline Securely Established</h2>
                            <p className="text-slate-400 font-bold mt-2">Your 10-second proof is locked to your upcoming session.</p>
                        </div>
                    )}
                </div>

                {/* Control Panel Below Viewer */}
                <div className="p-6 sm:p-8 bg-slate-50 dark:bg-[#070b19]/50 border-t border-slate-100 dark:border-slate-700/60">
                    {step === 2 && (
                        <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
                            <p className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-6 text-center">
                                Position your face inside the frame and prepare to read the prompt out loud.
                            </p>
                            <button
                                onClick={handleStartRecording}
                                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 dark:bg-cyan-500 hover:bg-emerald-700 dark:hover:bg-cyan-400 text-white dark:text-slate-900 rounded-xl font-extrabold text-sm transition-all shadow-md dark:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                            >
                                Start 10-Second Recording
                            </button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="w-full text-center">
                            <div className="flex items-center justify-center text-sm font-bold text-emerald-600 dark:text-cyan-400 mb-4 animate-pulse">
                                <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                                Processing Multimodal Baselines...
                            </div>
                            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700/60 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-emerald-500 dark:bg-cyan-400 transition-all duration-150 ease-out"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4">
                            <button
                                onClick={() => navigate('/applications')}
                                className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-[#121b33] border border-slate-200 dark:border-slate-700/60 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-extrabold text-sm transition-all shadow-sm flex items-center justify-center"
                            >
                                Return to Dashboard
                            </button>
                        </div>
                    )}
                </div>

            </div>

            {/* Tailwind hack for arbitrary animation if needed, though simple slide/pulse works */}
            <style jsx>{`
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    );
}
