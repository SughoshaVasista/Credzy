import { useState } from 'react';
import {
    BuildingIcon,
    SearchIcon,
    ShieldCheckIcon,
    ShieldAlertIcon,
    AlertTriangleIcon,
    ExternalLinkIcon,
    FilterIcon
} from 'lucide-react';

const mockCompanies = [
    {
        id: 'C-001',
        name: 'TechFlow Solutions',
        domain: 'techflow.io',
        status: 'verified',
        trustScore: 98,
        description: 'Enterprise software consulting and cloud architecture. Verified campus hiring partner.',
        lastActivity: '2 days ago'
    },
    {
        id: 'C-002',
        name: 'Nexus Data Systems',
        domain: 'nexus-data-systems.com',
        status: 'warning',
        trustScore: 65,
        description: 'Emerging analytics firm. Missing standard HR verification records. Proceed with caution.',
        lastActivity: '1 week ago'
    },
    {
        id: 'C-003',
        name: 'Global Tech Recruiters Inc.',
        domain: 'global-tech-jobs-hr.net',
        status: 'flagged',
        trustScore: 12,
        description: 'Domain registered recently. Multiple reports of requesting upfront training fees.',
        lastActivity: '10 hours ago'
    },
    {
        id: 'C-004',
        name: 'Stellar Innovations',
        domain: 'stellar.co',
        status: 'verified',
        trustScore: 95,
        description: 'AI hardware startup. Officially partnered with 12 universities for Fall 2026 hiring.',
        lastActivity: 'Just now'
    },
    {
        id: 'C-005',
        name: 'CloudScale Consulting',
        domain: 'cloud-scale-careers.org',
        status: 'flagged',
        trustScore: 18,
        description: 'Posing as a known enterprise. Uses free email providers (Gmail) for official communication.',
        lastActivity: '1 day ago'
    },
    {
        id: 'C-006',
        name: 'Horizon FinTech',
        domain: 'horizonfi.com',
        status: 'verified',
        trustScore: 91,
        description: 'Regulated financial technology institution. Rigorous corporate identity baseline verified.',
        lastActivity: '3 weeks ago'
    }
];

export default function CompanyDirectoryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'verified', 'warning', 'flagged'

    const filteredCompanies = mockCompanies.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            company.domain.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' || company.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusIcon = (status) => {
        switch (status) {
            case 'verified': return <ShieldCheckIcon className="w-5 h-5 text-emerald-500 dark:text-cyan-400" />;
            case 'warning': return <AlertTriangleIcon className="w-5 h-5 text-amber-500" />;
            case 'flagged': return <ShieldAlertIcon className="w-5 h-5 text-rose-500" />;
            default: return null;
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'verified': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/20';
            case 'warning': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';
            case 'flagged': return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20';
            default: return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in zoom-in-95 duration-500 w-full mb-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 animate-in slide-in-from-top-4 fade-in duration-700 relative">
                <div className="absolute -top-10 left-10 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none -z-10"></div>
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center mb-2">
                        <BuildingIcon className="w-8 h-8 mr-3 text-indigo-600 dark:text-indigo-400 group-hover:rotate-12 transition-transform" />
                        Company Trust Directory
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-bold max-w-2xl">
                        Verify the legitimacy of organizations before applying. Our automated system continuously ranks corporate domains against known phishing databases.
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white dark:bg-[#121b33] rounded-2xl p-4 border border-slate-200 dark:border-slate-700/60 shadow-sm mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">

                {/* Search */}
                <div className="relative w-full md:w-96">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search company or domain..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#070b19]/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-cyan-500 outline-none transition-all placeholder:font-medium placeholder:text-slate-400"
                    />
                </div>

                {/* Filters */}
                <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <FilterIcon className="w-4 h-4 text-slate-400 mr-2 shrink-0 hidden md:block" />
                    {['all', 'verified', 'warning', 'flagged'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-lg text-xs font-extrabold capitalize transition-all shrink-0 ${filterStatus === status
                                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 border border-transparent dark:border-slate-700'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                {/* Background Grid Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-500/5 dark:bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

                {filteredCompanies.map((company, idx) => (
                    <div
                        key={company.id}
                        className="bg-white dark:bg-[#121b33]/80 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm p-6 flex flex-col hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden animate-in fade-in slide-in-from-bottom-4"
                        style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 dark:via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/50 flex items-center justify-center text-xl font-black text-slate-400 dark:text-slate-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors shadow-sm">
                                    {company.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-slate-900 dark:text-white truncate max-w-[160px] sm:max-w-[200px] group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors" title={company.name}>
                                        {company.name}
                                    </h3>
                                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center hover:text-indigo-600 dark:hover:text-cyan-400 cursor-pointer">
                                        {company.domain} <ExternalLinkIcon className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 flex-1">
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                                {company.description}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                            <div className={`flex items-center px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide border ${getStatusStyles(company.status)}`}>
                                <span className="mr-1.5">{getStatusIcon(company.status)}</span>
                                {company.status}
                            </div>

                            <div className="flex flex-col items-end">
                                <span className="text-xs font-bold text-slate-400 dark:text-slate-500">Trust Score</span>
                                <span className={`text-lg font-black ${company.trustScore >= 80 ? 'text-emerald-600 dark:text-cyan-400' :
                                    company.trustScore >= 50 ? 'text-amber-500' : 'text-rose-600 dark:text-rose-400'
                                    }`}>
                                    {company.trustScore}
                                </span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            {filteredCompanies.length === 0 && (
                <div className="text-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <BuildingIcon className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4 animate-pulse" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">No companies found</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Try adjusting your search or filters.</p>
                </div>
            )}

            <style>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}
