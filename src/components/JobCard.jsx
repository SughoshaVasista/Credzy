import { MapPinIcon, BriefcaseIcon, DollarSignIcon } from 'lucide-react';
import TrustBadge from './TrustBadge';
import { useNavigate } from 'react-router-dom';

export default function JobCard({ job }) {
    const navigate = useNavigate();

    return (
        <div
            className="bg-white dark:bg-[#121b33] rounded-2xl p-6 border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all cursor-pointer group"
            onClick={() => navigate(`/jobs/${job.id}`)}
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-cyan-400 transition-colors">
                        {job.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-0.5">{job.company}</p>
                </div>
                {job.recruiter && <TrustBadge level={job.recruiter.trustLevel} />}
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600 dark:text-slate-300 mb-5">
                <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-1.5 text-slate-400 dark:text-slate-500" />
                    {job.location}
                </div>
                <div className="flex items-center">
                    <DollarSignIcon className="w-4 h-4 mr-1.5 text-slate-400 dark:text-slate-500" />
                    {job.stipend}
                </div>
                <div className="flex items-center">
                    <BriefcaseIcon className="w-4 h-4 mr-1.5 text-slate-400 dark:text-slate-500" />
                    {job.tags.join(', ')}
                </div>
            </div>

            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 line-clamp-2 mb-5 leading-relaxed">
                {job.description}
            </p>

            <div className="flex flex-wrap gap-2">
                {job.skillsRequired.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700/60 text-xs font-semibold">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}
