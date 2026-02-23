import { useParams, useNavigate } from 'react-router-dom';
import { mockApplicants } from '../mock/applicants';
import {
    ArrowLeftIcon,
    ShieldAlertIcon,
    PlayIcon,
    PauseIcon,
    MaximizeIcon,
    AlertTriangleIcon,
    ScanFaceIcon,
    BrainCircuitIcon,
    CheckCircleIcon,
    FileSearchIcon,
    MousePointer2Icon,
    MicIcon
} from 'lucide-react';
import FlagPill from '../components/RiskPill';

export default function CandidateReviewPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find candidate, default to first high-risk one if ID invalid
    const candidate = mockApplicants.find(a => a.id === id) || mockApplicants.find(a => a.trustScore < 50);

    if (!candidate) return <div className="p-20 text-center">Candidate not found</div>;
    const isHighRisk = candidate.trustScore < 50;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in slide-in-from-bottom-8 fade-in duration-500 w-full mb-12">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4 transition-colors group"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
                        Back to Pipeline
                    </button>
                    <div className="flex items-center space-x-4">
                        <img src={candidate.avatar} alt={candidate.name} className="w-14 h-14 rounded-full border-2 border-slate-200 dark:border-slate-600" />
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{candidate.name}</h1>
                            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{candidate.status}</p>
                        </div>
                    </div>
                </div>

                <div className={`px-4 py-2.5 rounded-xl border flex items-center space-x-2 font-extrabold shadow-sm ${isHighRisk
                    ? 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-500/10 dark:border-rose-500/20 dark:text-rose-400'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-cyan-500/10 dark:border-cyan-500/20 dark:text-cyan-400'
                    }`}>
                    {isHighRisk ? <AlertTriangleIcon className="w-5 h-5" /> : <CheckCircleIcon className="w-5 h-5" />}
                    <span>{candidate.trustScore} Trust Score</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Video View */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Video Player Mock */}
                    <div className="bg-[#0f1422] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden group relative">
                        {/* Status Overlay */}
                        <div className="absolute top-4 left-4 z-20 flex space-x-2">
                            <div className="bg-rose-500/80 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold text-white shadow-sm flex items-center">
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-1.5"></span>
                                REC_094
                            </div>
                            <div className="bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-md text-xs font-extrabold text-slate-300 border border-slate-700">
                                1080p
                            </div>
                        </div>

                        {/* Fake Video Content */}
                        <div className="aspect-video relative bg-slate-900 flex items-center justify-center">
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black"></div>

                            {/* Proxy overlay mockup if high risk */}
                            {isHighRisk && (
                                <div className="absolute right-1/4 top-1/4 w-32 h-32 border-2 border-rose-500 rounded-sm">
                                    <div className="absolute -top-6 left-0 bg-rose-500 text-white text-[10px] font-extrabold px-1.5 py-0.5">UNRECOGNIZED FACE (42%)</div>
                                </div>
                            )}

                            {/* Main Face Box */}
                            <div className={`w-48 h-64 border-2 rounded-sm relative ${isHighRisk ? 'border-amber-500' : 'border-emerald-500/50'}`}>
                                <div className={`absolute -top-6 left-0 text-white text-[10px] font-extrabold px-1.5 py-0.5 ${isHighRisk ? 'bg-amber-500' : 'bg-emerald-500/80'}`}>
                                    {isHighRisk ? 'MATCH = 64% (LOW)' : 'MATCH = 98% (HIGH)'}
                                </div>
                            </div>
                        </div>

                        {/* Controls & Timeline */}
                        <div className="p-4 bg-slate-900 border-t border-slate-800">
                            {/* The Scrubber */}
                            <div className="relative h-2 bg-slate-800 rounded-full mb-4 cursor-pointer">
                                {/* Base Progress */}
                                <div className="absolute top-0 left-0 h-full bg-emerald-500 w-1/3 rounded-full"></div>

                                {/* Flag Markers */}
                                {isHighRisk && (
                                    <>
                                        {/* Marker 1 */}
                                        <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-4 bg-rose-500 rounded-sm group/marker" style={{ left: '15%' }}>
                                            <div className="hidden group-hover/marker:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-slate-800 text-xs font-bold text-white p-2 rounded-md shadow-lg z-50 pointer-events-none whitespace-nowrap">
                                                <span className="text-amber-400">04:12</span> - Suspected voice IP switch.
                                            </div>
                                        </div>
                                        {/* Marker 2 */}
                                        <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-4 bg-rose-500 rounded-sm group/marker" style={{ left: '28%' }}>
                                            <div className="hidden group-hover/marker:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-slate-800 text-xs font-bold text-white p-2 rounded-md shadow-lg z-50 pointer-events-none whitespace-nowrap">
                                                <span className="text-amber-400">12:05</span> - Background person detected.
                                            </div>
                                        </div>
                                        {/* Marker 3 (Current) */}
                                        <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-4 bg-rose-500 rounded-sm ring-2 ring-white group/marker" style={{ left: '33.33%' }}>
                                            <div className="block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-slate-800 text-xs font-bold text-white p-2 rounded-md shadow-lg z-50 pointer-events-none whitespace-nowrap border border-slate-700">
                                                <span className="text-amber-400">18:30</span> - Heavy Tab switching activity.
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex justify-between items-center text-slate-400">
                                <div className="flex space-x-4 items-center">
                                    <button className="hover:text-white transition-colors"><PlayIcon className="w-5 h-5" /></button>
                                    <span className="text-xs font-bold font-mono">18:30 / 45:00</span>
                                </div>
                                <button className="hover:text-white transition-colors"><MaximizeIcon className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>

                    {/* Flags List */}
                    {candidate.flags && candidate.flags.length > 0 && (
                        <div className="bg-white dark:bg-[#121b33] rounded-2xl p-6 border border-slate-200 dark:border-slate-700/60 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100">
                            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-widest mb-4 flex items-center">
                                <ShieldAlertIcon className="w-4 h-4 mr-2 text-rose-500 dark:text-rose-400" />
                                Triggered Risk Signals
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {candidate.flags.map((flag, idx) => (
                                    <FlagPill key={idx} label={flag} type="warning" />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Side Analysis Panels */}
                <div className="space-y-6">

                    {/* Panel 1: Face Match */}
                    <div className="bg-slate-50 dark:bg-[#070b19]/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/60 shadow-inner">
                        <h4 className="flex items-center text-sm font-extrabold text-slate-900 dark:text-white mb-4">
                            <ScanFaceIcon className="w-4 h-4 mr-2 text-blue-600 dark:text-cyan-400" />
                            Face Match Consistency
                        </h4>

                        <div className="flex items-center space-x-3 mb-4">
                            {/* Baseline */}
                            <div className="flex-1">
                                <div className="border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 p-1 mb-1">
                                    <img src={candidate.avatar} className="w-full h-auto aspect-square object-cover" alt="Baseline" />
                                </div>
                                <p className="text-[10px] font-bold text-center text-slate-500 dark:text-slate-400 uppercase">Baseline</p>
                            </div>
                            <div className="text-slate-300 dark:text-slate-600 font-bold">vs</div>
                            {/* Interview Snapshot */}
                            <div className="flex-1">
                                <div className={`border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 p-1 mb-1 relative overflow-hidden ${isHighRisk ? 'ring-2 ring-rose-500 border-rose-500 dark:border-rose-500' : ''}`}>
                                    <img src={candidate.avatar} className={`w-full h-auto aspect-square object-cover ${isHighRisk ? 'blur-[2px] contrast-125' : ''}`} alt="Interview Frame" />
                                </div>
                                <p className="text-[10px] font-bold text-center text-slate-500 dark:text-slate-400 uppercase">Live Frame</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-slate-600 dark:text-slate-400">Confidence Score:</span>
                            <span className={isHighRisk ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-cyan-400'}>
                                {isHighRisk ? '64% (Suspicious)' : '98% (Match)'}
                            </span>
                        </div>
                    </div>

                    {/* Panel 2: AI Assistance */}
                    <div className="bg-slate-50 dark:bg-[#070b19]/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/60 shadow-inner">
                        <h4 className="flex items-center text-sm font-extrabold text-slate-900 dark:text-white mb-4">
                            <BrainCircuitIcon className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                            AI Answer Suspicion
                        </h4>

                        {isHighRisk ? (
                            <div className="space-y-3">
                                <div className="bg-rose-50 dark:bg-rose-500/10 p-3 rounded-lg border border-rose-100 dark:border-rose-500/20 text-xs text-rose-800 dark:text-rose-200/90 font-medium leading-relaxed">
                                    <span className="font-extrabold block mb-1">⚠️ Pattern Detected:</span>
                                    Candidate took an abnormal 14-second pause facing the screen edge, immediately followed by a perfect textbook definition of React Context API.
                                </div>
                                <div className="flex items-center justify-between text-xs font-bold px-1">
                                    <span className="text-slate-600 dark:text-slate-400">LLM Usage Probability:</span>
                                    <span className="text-rose-600 dark:text-rose-400">92%</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center text-xs font-bold text-emerald-700 dark:text-cyan-300/90 bg-emerald-50 dark:bg-cyan-500/10 p-3 rounded-lg border border-emerald-100 dark:border-cyan-500/20">
                                <CheckCircleIcon className="w-4 h-4 mr-2" />
                                Conversational patterns normal. No AI templates matched.
                            </div>
                        )}
                    </div>

                    {/* Panel 3: Skill Consistency */}
                    <div className="bg-slate-50 dark:bg-[#070b19]/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/60 shadow-inner">
                        <h4 className="flex items-center text-sm font-extrabold text-slate-900 dark:text-white mb-4">
                            <FileSearchIcon className="w-4 h-4 mr-2 text-amber-600 dark:text-amber-400" />
                            Skill Consistency
                        </h4>

                        {isHighRisk ? (
                            <div className="space-y-2">
                                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-2">
                                    Resume claims <span className="font-bold text-slate-900 dark:text-white">Expert System Design</span>. Live probing questions detected shallow depth on distributed transactions.
                                </p>
                                <div className="bg-white dark:bg-[#121b33] h-1.5 w-full rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                                    <div className="bg-amber-500 h-full w-1/3 rounded-full"></div>
                                </div>
                                <div className="text-[10px] font-bold text-right text-amber-600 dark:text-amber-400 pt-1">Risk: Mismatch</div>
                            </div>
                        ) : (
                            <div className="flex items-center text-xs font-bold text-emerald-700 dark:text-cyan-300/90 bg-emerald-50 dark:bg-cyan-500/10 p-3 rounded-lg border border-emerald-100 dark:border-cyan-500/20">
                                <CheckCircleIcon className="w-4 h-4 mr-2 shrink-0" />
                                Demonstrated depth matches claimed resume proficiency.
                            </div>
                        )}
                        {/* Panel 3: Browser Context (New) */}
                        <div className="bg-slate-50 dark:bg-[#070b19]/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/60 shadow-inner">
                            <h4 className="flex items-center text-sm font-extrabold text-slate-900 dark:text-white mb-4">
                                <MousePointer2Icon className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                                Browser Context Events
                            </h4>

                            {isHighRisk ? (
                                <div className="space-y-3 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-700 before:to-transparent">

                                    {/* Event 1 */}
                                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-4 h-4 rounded-full border border-white dark:border-slate-900 bg-slate-300 dark:bg-slate-700 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                                        <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
                                            <div className="flex items-center justify-between space-x-2 mb-1">
                                                <div className="font-bold text-slate-900 dark:text-white text-[10px]">Tab Switched</div>
                                                <time className="font-mono text-slate-500 text-[10px]">18:29</time>
                                            </div>
                                            <div className="text-slate-500 dark:text-slate-400 text-[10px]">Focus moved to 'ChatGPT'</div>
                                        </div>
                                    </div>

                                    {/* Event 2 */}
                                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-4 h-4 rounded-full border border-white dark:border-slate-900 bg-rose-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                            <div className="w-1 h-1 bg-white rounded-full"></div>
                                        </div>
                                        <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-2 rounded-lg bg-rose-50 dark:bg-rose-500/10 shadow-sm border border-rose-200 dark:border-rose-500/20">
                                            <div className="flex items-center justify-between space-x-2 mb-1">
                                                <div className="font-bold text-rose-700 dark:text-rose-400 text-[10px]">Clipboard Paste</div>
                                                <time className="font-mono text-rose-500 text-[10px]">18:30</time>
                                            </div>
                                            <div className="text-rose-600 dark:text-rose-400/80 text-[10px]">Large text block pasted into code editor.</div>
                                        </div>
                                    </div>

                                </div>
                            ) : (
                                <div className="flex items-center text-xs font-bold text-emerald-700 dark:text-cyan-300/90 bg-emerald-50 dark:bg-cyan-500/10 p-3 rounded-lg border border-emerald-100 dark:border-cyan-500/20">
                                    <CheckCircleIcon className="w-4 h-4 mr-2 shrink-0" />
                                    Continuous focus maintained.
                                </div>
                            )}
                        </div>

                        {/* Panel 4: Audio Activity Log (New) */}
                        <div className="bg-slate-50 dark:bg-[#070b19]/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/60 shadow-inner">
                            <h4 className="flex items-center text-sm font-extrabold text-slate-900 dark:text-white mb-4">
                                <MicIcon className="w-4 h-4 mr-2 text-fuchsia-600 dark:text-fuchsia-400" />
                                Audio Activity Log
                            </h4>

                            {isHighRisk ? (
                                <div className="space-y-3">
                                    {/* Simulated Waveform */}
                                    <div className="flex items-end h-8 space-x-0.5 w-full opacity-80 mb-2">
                                        {[...Array(24)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`w-full rounded-t-sm ${i > 10 && i < 15 ? 'bg-rose-400 dark:bg-rose-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                                                style={{ height: `${Math.max(10, Math.random() * (i > 10 && i < 15 ? 100 : 40))}%` }}
                                            ></div>
                                        ))}
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5">
                                        <div className="flex items-start">
                                            <AlertTriangleIcon className="w-3.5 h-3.5 text-amber-500 mt-0.5 mr-1.5 shrink-0" />
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-800 dark:text-slate-200">Secondary Voice Detected</p>
                                                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Distinct muffled speech isolated matching off-camera whisper pattern.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center text-xs font-bold text-emerald-700 dark:text-cyan-300/90 bg-emerald-50 dark:bg-cyan-500/10 p-3 rounded-lg border border-emerald-100 dark:border-cyan-500/20">
                                    <CheckCircleIcon className="w-4 h-4 mr-2 shrink-0" />
                                    Single vocal print verified.
                                </div>
                            )}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
