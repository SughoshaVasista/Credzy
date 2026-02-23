import { useState } from 'react';
import { XIcon, BriefcaseIcon, PlusIcon } from 'lucide-react';

export default function CreateJobModal({ isOpen, onClose, onCreate }) {
    const [title, setTitle] = useState('');
    const [stipend, setStipend] = useState('');
    const [location, setLocation] = useState('');
    const [skills, setSkills] = useState('');
    const [description, setDescription] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({
            id: "j" + Math.random().toString(36).substr(2, 9),
            title,
            stipend,
            location,
            skillsRequired: skills.split(',').map(s => s.trim()).filter(Boolean),
            description,
            status: 'Active',
            tags: ['Remote', 'Full-time'] // default for mock
        });
        // Reset
        setTitle('');
        setStipend('');
        setLocation('');
        setSkills('');
        setDescription('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 dark:bg-[#070b19]/80 backdrop-blur-sm transition-opacity">
            <div className="bg-white dark:bg-[#121b33] rounded-2xl w-full max-w-lg shadow-2xl dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-transparent dark:border-slate-700/60">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700/60 flex justify-between items-center bg-slate-50 dark:bg-[#070b19]/50">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 dark:bg-indigo-500/10 text-blue-600 dark:text-indigo-400 rounded-lg">
                            <BriefcaseIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Post New Job</h3>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors focus:outline-none">
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Job Title</label>
                        <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border border-slate-200 dark:border-slate-700/60 rounded-xl text-sm bg-white dark:bg-[#070b19]/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-indigo-500/50 focus:border-blue-500 outline-none transition-colors font-medium" placeholder="E.g. Senior Product Designer" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Stipend / Salary</label>
                            <input required type="text" value={stipend} onChange={e => setStipend(e.target.value)} className="w-full p-3 border border-slate-200 dark:border-slate-700/60 rounded-xl text-sm bg-white dark:bg-[#070b19]/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-indigo-500/50 focus:border-blue-500 outline-none transition-colors font-medium" placeholder="$5,000/mo" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Location</label>
                            <input required type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full p-3 border border-slate-200 dark:border-slate-700/60 rounded-xl text-sm bg-white dark:bg-[#070b19]/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-indigo-500/50 focus:border-blue-500 outline-none transition-colors font-medium" placeholder="Remote, NY" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Skills (comma-separated)</label>
                        <input required type="text" value={skills} onChange={e => setSkills(e.target.value)} className="w-full p-3 border border-slate-200 dark:border-slate-700/60 rounded-xl text-sm bg-white dark:bg-[#070b19]/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-indigo-500/50 focus:border-blue-500 outline-none transition-colors font-medium" placeholder="React, Figma, UX" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
                        <textarea required value={description} onChange={e => setDescription(e.target.value)} rows="3" className="w-full p-3 border border-slate-200 dark:border-slate-700/60 rounded-xl text-sm bg-white dark:bg-[#070b19]/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-indigo-500/50 focus:border-blue-500 outline-none transition-colors font-medium resize-none" placeholder="Describe the role..."></textarea>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex justify-end space-x-3 mt-4">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-[#121b33] border border-slate-200 dark:border-slate-700/60 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="flex items-center px-5 py-2.5 text-sm font-bold text-white dark:text-slate-900 bg-blue-600 dark:bg-indigo-400 rounded-xl hover:bg-blue-700 dark:hover:bg-indigo-300 transition-all shadow-sm dark:shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                            <PlusIcon className="w-4 h-4 mr-1.5" />
                            Create Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
