import { CheckCircleIcon, AlertTriangleIcon, ShieldAlertIcon } from 'lucide-react';

export default function TrustBadge({ level }) {
    if (level === 'verified') {
        return (
            <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-cyan-300 bg-emerald-50 dark:bg-cyan-500/10 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-200 dark:border-cyan-500/20 flex-shrink-0 shadow-sm dark:shadow-[0_0_10px_rgba(34,211,238,0.15)] transition-colors">
                <CheckCircleIcon className="w-4 h-4" />
                <span>Verified Recruiter</span>
            </div>
        );
    }
    if (level === 'suspicious') {
        return (
            <div className="flex items-center space-x-1.5 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-3 py-1.5 rounded-full text-xs font-bold border border-amber-200 dark:border-amber-500/20 flex-shrink-0 shadow-sm transition-colors">
                <AlertTriangleIcon className="w-4 h-4" />
                <span>Limited History</span>
            </div>
        );
    }
    return (
        <div className="flex items-center space-x-1.5 text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-3 py-1.5 rounded-full text-xs font-bold border border-rose-200 dark:border-rose-500/20 flex-shrink-0 shadow-sm transition-colors">
            <ShieldAlertIcon className="w-4 h-4" />
            <span>Risk Signals</span>
        </div>
    );
}
