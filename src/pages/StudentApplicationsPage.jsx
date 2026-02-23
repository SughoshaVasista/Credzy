import { useState, useEffect } from 'react';
import { mockAppliedJobs } from '../mock/jobs';
import RiskPill from '../components/RiskPill';
import { BriefcaseIcon, CalendarIcon, ArrowRightIcon, TrashIcon, CheckCircleIcon, XIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StudentApplicationsPage() {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [withdrawModal, setWithdrawModal] = useState(null);

    useEffect(() => {
        const localApps = localStorage.getItem('credzy_student_apps');
        if (localApps) {
            setApplications(JSON.parse(localApps));
        } else {
            const initial = mockAppliedJobs.map(app => ({
                ...app,
                trackingId: 'TRK-' + Math.random().toString(36).substr(2, 6).toUpperCase() + '-' + Date.now().toString().slice(-4)
            }));
            setApplications(initial);
            localStorage.setItem('credzy_student_apps', JSON.stringify(initial));
        }
    }, []);

    const handleWithdraw = (id) => {
        const updated = applications.filter(a => a.id !== id);
        setApplications(updated);
        localStorage.setItem('credzy_student_apps', JSON.stringify(updated));
        setWithdrawModal(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Under Review': return 'text-blue-700 dark:text-cyan-400 bg-blue-50 dark:bg-cyan-500/10 border-blue-200 dark:border-cyan-500/20';
            case 'Shortlisted': return 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20';
            case 'Trust Review Pending': return 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20';
            default: return 'text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in duration-500 w-full mb-12">
            <div className="mb-10 text-center sm:text-left bg-white dark:bg-[#121b33] p-8 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm relative overflow-hidden transition-colors">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">My Applications</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-bold">Track your job applications and trust review status.</p>
                </div>
            </div>

            <div className="space-y-6">
                {applications.length === 0 ? (
                    <div className="py-20 text-center rounded-2xl bg-white dark:bg-[#121b33] border border-slate-200 dark:border-slate-700/60 shadow-sm">
                        <BriefcaseIcon className="mx-auto w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
                        <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">No active applications.</p>
                    </div>
                ) : applications.map(app => (
                    <div key={app.id} className="bg-white dark:bg-[#121b33] rounded-2xl p-6 border border-slate-200 dark:border-slate-700/60 shadow-sm transition-all relative group">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-cyan-400 transition-colors mb-1.5 focus:outline-none cursor-pointer" onClick={() => navigate(`/jobs/${app.job.id}`)}>
                                    {app.job.title}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 font-bold">{app.job.company}</p>
                            </div>
                            <div className="mt-4 sm:mt-0 flex flex-col items-end gap-2 text-right">
                                <div className={`px-3.5 py-1.5 rounded-lg border flex items-center space-x-2.5 text-sm font-bold w-fit shadow-sm ${getStatusColor(app.status)}`}>
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${app.status === 'Trust Review Pending' ? 'bg-amber-400 dark:bg-amber-300' : 'bg-emerald-400 dark:bg-cyan-300'}`}></span>
                                        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${app.status === 'Trust Review Pending' ? 'bg-amber-500 dark:bg-amber-400' : 'bg-emerald-500 dark:bg-cyan-400'}`}></span>
                                    </span>
                                    <span>{app.status}</span>
                                </div>
                                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">ID: {app.trackingId}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#070b19]/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-700/60 mb-5">
                            <div className="flex items-center">
                                <BriefcaseIcon className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
                                {app.job.tags.join(', ')}
                            </div>
                            <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                            <div className="flex items-center">
                                <CalendarIcon className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
                                Applied on {new Date(app.appliedDate).toLocaleDateString()}
                            </div>
                        </div>

                        {app.flags.length > 0 && (
                            <div className="bg-amber-50/50 dark:bg-amber-500/10 p-4 rounded-xl border border-amber-100 dark:border-amber-500/20 flex items-start mt-5 mb-4">
                                <div className="mt-0.5 mr-3">
                                    <RiskPill label="Trust Note" type="warning" />
                                </div>
                                <p className="text-xs text-amber-800 dark:text-amber-200/80 font-bold leading-relaxed">
                                    Your application is currently undergoing a standard platform trust review to ensure fair hiring practices.
                                    Additional information may be requested.
                                </p>
                            </div>
                        )}

                        <div className="flex justify-between items-center mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                            <button
                                onClick={() => setWithdrawModal(app.id)}
                                className="text-sm font-bold text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 transition-colors flex items-center"
                            >
                                <TrashIcon className="w-4 h-4 mr-1.5" />
                                Withdraw Application
                            </button>
                            <button
                                onClick={() => navigate(`/jobs/${app.job.id}`)}
                                className="text-sm font-bold text-emerald-600 hover:text-emerald-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors flex items-center group-hover:underline"
                            >
                                View Details <ArrowRightIcon className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {withdrawModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 dark:bg-[#070b19]/80 backdrop-blur-sm transition-opacity">
                    <div className="bg-white dark:bg-[#121b33] rounded-2xl w-full max-w-sm shadow-2xl dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700/60 p-6">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-500/20 mb-4 mx-auto text-rose-600 dark:text-rose-400">
                            <TrashIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-extrabold text-center text-slate-900 dark:text-white mb-2 tracking-tight">Withdraw Application?</h3>
                        <p className="text-sm font-bold text-center text-slate-500 dark:text-slate-400 mb-6">
                            Are you sure you want to withdraw? This action cannot be undone.
                        </p>
                        <div className="flex space-x-3">
                            <button onClick={() => setWithdrawModal(null)} className="flex-1 py-2.5 text-sm font-bold border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 bg-white dark:bg-[#121b33] rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
                            <button onClick={() => handleWithdraw(withdrawModal)} className="flex-1 py-2.5 text-sm font-bold text-white dark:text-slate-900 bg-rose-600 dark:bg-rose-500 rounded-xl hover:bg-rose-700 dark:hover:bg-rose-400 shadow-sm dark:shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all">Withdraw</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
