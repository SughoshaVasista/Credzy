import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockJobs } from '../mock/jobs';
import { mockApplicants } from '../mock/applicants';
import CreateJobModal from '../components/CreateJobModal';
import { PlusIcon, EditIcon, TrashIcon, CheckCircleIcon, XCircleIcon, BriefcaseIcon } from 'lucide-react';

export default function RecruiterJobsPage() {
    const [jobs, setJobs] = useState([]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const { session } = useAuth();

    useEffect(() => {
        // Optimistic UI loading
        const localJobs = localStorage.getItem('credzy_recruiter_jobs');
        if (localJobs) {
            setJobs(JSON.parse(localJobs));
        } else {
            // Mock some jobs for this recruiter
            const initial = mockJobs.map(j => ({ ...j, status: 'Active', recruiterId: session.id }));
            setJobs(initial);
            localStorage.setItem('credzy_recruiter_jobs', JSON.stringify(initial));
        }
    }, [session.id]);

    const saveJobs = (newJobs) => {
        setJobs(newJobs);
        localStorage.setItem('credzy_recruiter_jobs', JSON.stringify(newJobs));
    };

    const handleCreateJob = (jobData) => {
        const newJob = {
            ...jobData,
            company: session.name || "Company",
            recruiterId: session.id,
            recruiter: {
                id: session.id,
                name: session.name || "Recruiter",
                company: session.name || "Company",
                trustLevel: "verified",
                riskSignals: [],
                avatar: "https://i.pravatar.cc/150?u=" + session.id
            }
        };
        saveJobs([newJob, ...jobs]);
    };

    const toggleStatus = (id) => {
        const updated = jobs.map(j => {
            if (j.id === id) {
                return { ...j, status: j.status === 'Active' ? 'Closed' : 'Active' };
            }
            return j;
        });
        saveJobs(updated);
    };

    const deleteJob = (id) => {
        const updated = jobs.filter(j => j.id !== id);
        saveJobs(updated);
    };

    const getApplicantCount = (jobId) => {
        return mockApplicants.filter(a => a.jobId === jobId).length;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in zoom-in-95 duration-500 w-full mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Manage Jobs</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-bold mt-1">Create and manage your active listings.</p>
                </div>
                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="flex items-center px-5 py-2.5 text-sm font-bold text-white dark:text-slate-900 bg-blue-600 dark:bg-indigo-400 rounded-xl hover:bg-blue-700 dark:hover:bg-indigo-300 transition-all shadow-sm dark:shadow-[0_0_15px_rgba(99,102,241,0.3)] shrink-0"
                >
                    <PlusIcon className="w-5 h-5 mr-1.5" />
                    Post New Job
                </button>
            </div>

            <div className="space-y-5">
                {jobs.length === 0 ? (
                    <div className="py-20 text-center rounded-2xl bg-white dark:bg-[#121b33] border border-slate-200 dark:border-slate-700/60 shadow-sm">
                        <BriefcaseIcon className="mx-auto w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
                        <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">No jobs posted yet.</p>
                    </div>
                ) : (
                    jobs.map(job => (
                        <div key={job.id} className="bg-white dark:bg-[#121b33] rounded-2xl p-6 border border-slate-200 dark:border-slate-700/60 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:shadow-md dark:shadow-none dark:hover:border-slate-600">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{job.title}</h3>
                                    <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border flex items-center shadow-sm w-fit ${job.status === 'Active' ? 'bg-emerald-50 dark:bg-cyan-500/10 text-emerald-700 dark:text-cyan-400 border-emerald-200 dark:border-cyan-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600'}`}>
                                        {job.status === 'Active' ? <CheckCircleIcon className="w-3.5 h-3.5 mr-1" /> : <XCircleIcon className="w-3.5 h-3.5 mr-1" />}
                                        {job.status}
                                    </span>
                                </div>
                                <div className="text-sm font-medium text-slate-500 dark:text-slate-400 flex flex-wrap gap-4">
                                    <span>{job.location}</span>
                                    <span className="w-px h-4 bg-slate-300 dark:bg-slate-700"></span>
                                    <span>{job.stipend}</span>
                                    <span className="w-px h-4 bg-slate-300 dark:bg-slate-700"></span>
                                    <span className="font-bold text-blue-600 dark:text-indigo-400">{getApplicantCount(job.id)} Applicants</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 pt-4 md:pt-0 border-t border-slate-100 dark:border-slate-700/60 md:border-none">
                                <button
                                    onClick={() => toggleStatus(job.id)}
                                    className="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#070b19]/50 border border-slate-200 dark:border-slate-700/60 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    {job.status === 'Active' ? 'Close Job' : 'Reactivate'}
                                </button>
                                <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-indigo-400 bg-slate-50 dark:bg-[#070b19]/50 border border-slate-200 dark:border-slate-700/60 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors focus:outline-none">
                                    <EditIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => deleteJob(job.id)}
                                    className="p-2 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 bg-slate-50 dark:bg-[#070b19]/50 border border-slate-200 dark:border-slate-700/60 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors focus:outline-none"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <CreateJobModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onCreate={handleCreateJob} />
        </div>
    );
}
