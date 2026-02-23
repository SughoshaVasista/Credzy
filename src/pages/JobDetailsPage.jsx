import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPinIcon, BriefcaseIcon, DollarSignIcon, ArrowLeftIcon, ShieldCheckIcon, AlertTriangleIcon, UploadCloudIcon, CheckCircleIcon, XIcon, ShieldAlertIcon } from 'lucide-react';
import { mockJobs } from '../mock/jobs';
import { useAuth } from '../context/AuthContext';
import TrustBadge from '../components/TrustBadge';

export default function JobDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { session } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const job = mockJobs.find(j => j.id === id);
    if (!job) return <div className="text-center py-20 font-medium text-slate-500 dark:text-slate-400">Job not found.</div>;

    const recruiter = job.recruiter;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-in slide-in-from-bottom-8 fade-in duration-500 w-full mb-12">
            <button
                onClick={() => navigate('/jobs')}
                className="flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors group"
            >
                <ArrowLeftIcon className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
                Back to Jobs
            </button>

            <div className="bg-white dark:bg-[#121b33] rounded-2xl p-6 md:p-10 border border-slate-200 dark:border-slate-700/60 shadow-sm relative overflow-hidden transition-colors">
                <div className="absolute top-0 right-0 p-8 hidden md:block">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-[#070b19] rounded-2xl border border-slate-100 dark:border-slate-700/40 flex items-center justify-center text-2xl font-extrabold text-slate-300 dark:text-slate-600 shadow-inner">
                        {job.company.charAt(0)}
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 pr-24 tracking-tight">{job.title}</h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 font-bold mb-8">{job.company}</p>

                <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#070b19]/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/60 mb-10 w-fit">
                    <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
                        {job.location}
                    </div>
                    <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                    <div className="flex items-center">
                        <DollarSignIcon className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
                        {job.stipend}
                    </div>
                    <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                    <div className="flex items-center">
                        <BriefcaseIcon className="w-4 h-4 mr-1 text-slate-400 dark:text-slate-500" />
                        {job.tags.join(', ')}
                    </div>
                </div>

                <div className="mb-10">
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">Role Description</h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{job.description}</p>
                </div>

                <div className="mb-10">
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">Required Skills</h2>
                    <div className="flex flex-wrap gap-2.5">
                        {job.skillsRequired.map((skill, idx) => (
                            <span key={idx} className="bg-slate-50 dark:bg-[#070b19]/50 text-slate-700 dark:text-slate-300 px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700/60 text-sm font-bold shadow-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {recruiter && (
                    <div className="bg-slate-50 dark:bg-[#070b19]/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/60 shadow-inner mt-8 transition-colors">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5">About the Recruiter</h3>
                        <div className="flex items-start space-x-5">
                            <img
                                src={recruiter.avatar}
                                alt={recruiter.name}
                                className="w-16 h-16 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 object-cover"
                            />
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                                    <h4 className="font-extrabold text-slate-900 dark:text-white text-lg">{recruiter.name}</h4>
                                    <TrustBadge level={recruiter.trustLevel} />
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-4">Posted for {recruiter.company}</p>
                                {recruiter.riskSignals && recruiter.riskSignals.length > 0 && (
                                    <div className="mt-3 text-sm">
                                        <div className="flex items-center text-slate-600 dark:text-slate-400 mb-1.5 font-bold text-xs uppercase tracking-widest">
                                            <ShieldAlertIcon className="w-4 h-4 mr-1.5" />
                                            Risk Indicators
                                        </div>
                                        <ul className="space-y-1.5">
                                            {recruiter.riskSignals.map((signal, idx) => (
                                                <li key={idx} className="flex items-start text-xs font-bold text-slate-500 dark:text-slate-300 bg-white dark:bg-[#121b33] p-2 rounded-lg border border-slate-100 dark:border-slate-700/60">
                                                    <AlertTriangleIcon className="w-4 h-4 text-amber-500 dark:text-amber-400 mr-2 shrink-0" />
                                                    <span>{signal}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {(!session || session.role === 'student') && (
                    <div className="mt-10 flex justify-end pt-8 border-t border-slate-100 dark:border-slate-700/60">
                        <button
                            onClick={() => { setIsModalOpen(true); setSubmitted(false); }}
                            className="flex items-center justify-center space-x-2 bg-emerald-600 dark:bg-cyan-500 hover:bg-emerald-700 dark:hover:bg-cyan-400 text-white dark:text-slate-900 px-8 py-4 rounded-xl text-lg font-bold w-full sm:w-auto transition-all shadow-md dark:shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-lg dark:hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                        >
                            <ShieldCheckIcon className="w-6 h-6 mr-1" />
                            <span>Apply Securely</span>
                        </button>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-[#070b19]/80 backdrop-blur-sm transition-opacity">
                    <div className="bg-white dark:bg-[#121b33] rounded-2xl w-full max-w-lg shadow-2xl dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-transparent dark:border-slate-700/60">
                        {!submitted ? (
                            <>
                                <div className="p-6 border-b border-slate-100 dark:border-slate-700/60 flex justify-between items-center bg-slate-50 dark:bg-[#070b19]/50">
                                    <div>
                                        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Apply to {job.company}</h3>
                                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">{job.title}</p>
                                    </div>
                                    <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors focus:outline-none">
                                        <XIcon className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-6 space-y-5">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                                            <input type="text" defaultValue={session ? session.name : ""} className="w-full p-3 border border-slate-200 dark:border-slate-700/60 rounded-xl text-sm bg-white dark:bg-[#070b19]/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 dark:focus:ring-cyan-500/50 focus:border-emerald-500 dark:focus:border-cyan-500 outline-none transition-colors font-medium" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                                            <input type="email" defaultValue={session ? session.email : ""} className="w-full p-3 border border-slate-200 dark:border-slate-700/60 rounded-xl text-sm bg-white dark:bg-[#070b19]/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 dark:focus:ring-cyan-500/50 focus:border-emerald-500 dark:focus:border-cyan-500 outline-none transition-colors font-medium" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Resume</label>
                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 dark:border-slate-700/60 border-dashed rounded-xl bg-slate-50 dark:bg-[#070b19]/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                                                <div className="space-y-1 text-center">
                                                    <UploadCloudIcon className="mx-auto h-10 w-10 text-slate-400 dark:text-slate-500 group-hover:text-emerald-500 dark:group-hover:text-cyan-400 transition-colors" />
                                                    <div className="flex text-sm text-slate-600 dark:text-slate-400 justify-center font-bold">
                                                        <span className="relative rounded-md text-emerald-600 dark:text-cyan-400 hover:text-emerald-500 dark:hover:text-cyan-300 focus-within:outline-none transition-colors">
                                                            Upload files
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 font-medium mt-1">PDF up to 5MB</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-emerald-50 dark:bg-cyan-500/10 rounded-xl p-4 border border-emerald-100 dark:border-cyan-500/20">
                                        <div className="flex items-start">
                                            <ShieldCheckIcon className="w-5 h-5 text-emerald-600 dark:text-cyan-400 mr-3 mt-0.5" />
                                            <div>
                                                <h4 className="text-sm font-extrabold text-emerald-900 dark:text-cyan-100">Secure Application Active</h4>
                                                <p className="text-xs font-bold text-emerald-700 dark:text-cyan-200/80 mt-1">
                                                    Identity consistency checks and AI-assisted answer monitoring are active for this application to ensure a fair hiring process.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 border-t border-slate-100 dark:border-slate-700/60 bg-slate-50 dark:bg-[#070b19]/50 flex justify-end space-x-3">
                                    <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-[#121b33] border border-slate-200 dark:border-slate-700/60 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => setSubmitted(true)}
                                        className="px-5 py-2.5 text-sm font-bold text-white dark:text-slate-900 bg-emerald-600 dark:bg-cyan-500 rounded-xl hover:bg-emerald-700 dark:hover:bg-cyan-400 transition-all shadow-sm dark:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                                    >
                                        Submit Securely
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="p-10 text-center bg-white dark:bg-[#121b33]">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 dark:bg-cyan-500/20 mb-5 shadow-inner">
                                    <CheckCircleIcon className="h-8 w-8 text-emerald-600 dark:text-cyan-400" />
                                </div>
                                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Application Logged Securely</h3>
                                <p className="text-slate-500 dark:text-slate-400 font-bold mb-6 max-w-sm mx-auto">
                                    Your application has been securely sent to {job.company}.
                                </p>
                                <div className="bg-slate-50 dark:bg-[#070b19]/80 rounded-xl p-3 mb-8 border border-slate-200 dark:border-slate-700/60 inline-flex flex-col items-center">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tracking ID</span>
                                    <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">TRK-{Math.random().toString(36).substr(2, 9).toUpperCase()}-{Date.now().toString().slice(-4)}</span>
                                </div><br />
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 text-sm font-bold text-white dark:text-slate-900 bg-emerald-600 dark:bg-cyan-500 rounded-xl hover:bg-emerald-700 dark:hover:bg-cyan-400 transition-all shadow-sm dark:shadow-[0_0_15px_rgba(34,211,238,0.3)] w-full sm:w-auto"
                                >
                                    Back to Dashboard
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
