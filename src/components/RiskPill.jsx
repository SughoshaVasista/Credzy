import { AlertCircleIcon } from 'lucide-react';

export default function RiskPill({ label, type = 'warning' }) {
    const styles = {
        warning: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
        danger: "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/20",
        info: "bg-blue-50 dark:bg-cyan-500/10 text-blue-700 dark:text-cyan-400 border-blue-200 dark:border-cyan-500/20"
    };

    const iconColors = {
        warning: "text-amber-500 dark:text-amber-400",
        danger: "text-rose-500 dark:text-rose-400",
        info: "text-blue-500 dark:text-cyan-400"
    };

    return (
        <div className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${styles[type]}`}>
            <AlertCircleIcon className={`w-3.5 h-3.5 mr-1.5 ${iconColors[type]}`} />
            {label}
        </div>
    );
}
