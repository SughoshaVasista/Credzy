import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserIcon, MailIcon, BadgeCheckIcon, CameraIcon, Edit2Icon, SaveIcon, XIcon, BriefcaseIcon } from 'lucide-react';

export default function ProfilePage() {
    const { session, updateProfile } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: session?.name || "Credzy User",
        title: session?.title || "Computer Science Student",
        bio: session?.bio || "Passionate about secure software development and building trust in digital ecosystems."
    });

    const [previewImage, setPreviewImage] = useState(session?.avatarUrl || null);
    const fileInputRef = useRef(null);

    if (!session) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageClick = () => {
        if (isEditing) {
            fileInputRef.current?.click();
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        updateProfile({
            ...formData,
            avatarUrl: previewImage
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            name: session.name || "Credzy User",
            title: session.title || "Computer Science Student",
            bio: session.bio || "Passionate about secure software development and building trust in digital ecosystems."
        });
        setPreviewImage(session.avatarUrl || null);
        setIsEditing(false);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 animate-in fade-in duration-500 w-full mb-12">
            <div className="bg-white dark:bg-[#121b33] rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-hidden transition-colors relative">
                <div className="absolute top-0 inset-x-0 h-32 bg-slate-900 dark:bg-cyan-900/40"></div>

                {/* Edit Toggle Button */}
                <div className="absolute top-4 right-4 z-20">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl backdrop-blur-md transition-colors text-sm font-bold border border-white/20"
                        >
                            <Edit2Icon className="w-4 h-4" />
                            <span>Edit Profile</span>
                        </button>
                    ) : (
                        <div className="flex space-x-2">
                            <button
                                onClick={handleCancel}
                                className="flex items-center space-x-2 bg-slate-800/50 hover:bg-slate-800 text-white px-4 py-2 rounded-xl backdrop-blur-md transition-colors text-sm font-bold border border-white/20"
                            >
                                <XIcon className="w-4 h-4" />
                                <span className="hidden sm:inline">Cancel</span>
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl backdrop-blur-md transition-colors text-sm font-bold shadow-md"
                            >
                                <SaveIcon className="w-4 h-4" />
                                <span className="hidden sm:inline">Save Changes</span>
                            </button>
                        </div>
                    )}
                </div>

                <div className="relative pt-16 px-6 sm:px-10 pb-10">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 mb-8">
                        {/* Profile Image Container */}
                        <div className="relative mb-4 sm:mb-0 z-10 flex-shrink-0 group">
                            <div
                                onClick={handleImageClick}
                                className={`w-32 h-32 rounded-full border-4 border-white dark:border-[#121b33] bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-md overflow-hidden relative ${isEditing ? 'cursor-pointer hover:border-emerald-400 dark:hover:border-cyan-400 transition-colors' : ''}`}
                            >
                                {previewImage ? (
                                    <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <UserIcon className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                                )}

                                {isEditing && (
                                    <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <CameraIcon className="w-8 h-8 text-white mb-1" />
                                        <span className="text-white text-xs font-bold">Change Image</span>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>

                        <div className="pb-2 flex-1 w-full">
                            {isEditing ? (
                                <div className="space-y-3 animate-in fade-in duration-300">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="text-3xl font-extrabold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border-b-2 border-emerald-500 dark:border-cyan-400 px-2 py-1 w-full outline-none focus:bg-white dark:focus:bg-slate-900 transition-colors rounded-t-md"
                                        placeholder="Your Full Name"
                                    />
                                    <div className="flex items-center text-slate-500 dark:text-slate-400 font-bold px-2">
                                        <BriefcaseIcon className="w-4 h-4 mr-2" />
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="bg-transparent border-b border-slate-300 dark:border-slate-600 outline-none focus:border-emerald-500 dark:focus:border-cyan-400 w-full sm:w-2/3"
                                            placeholder="Your Job Title or Status"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="animate-in fade-in duration-300">
                                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1.5 tracking-tight">{formData.name}</h1>
                                    <div className="flex flex-col sm:flex-row sm:items-center text-slate-500 dark:text-slate-400 font-bold sm:space-x-4 space-y-2 sm:space-y-0">
                                        <div className="flex items-center">
                                            <BriefcaseIcon className="w-4 h-4 mr-1.5" />
                                            {formData.title}
                                        </div>
                                        <div className="hidden sm:block text-slate-300 dark:text-slate-600">•</div>
                                        <div className="flex items-center">
                                            <MailIcon className="w-4 h-4 mr-1.5" />
                                            {session.email}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-[#070b19]/50 rounded-xl p-6 border border-slate-100 dark:border-slate-700/60 shadow-inner mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">About</h3>
                            <div className="px-3.5 py-1.5 bg-blue-50 dark:bg-cyan-500/10 text-blue-700 dark:text-cyan-400 rounded-lg text-sm font-extrabold border border-blue-100 dark:border-cyan-500/20 flex items-center shadow-sm">
                                <BadgeCheckIcon className="w-4 h-4 mr-1.5" />
                                {session.role === 'recruiter' ? 'Verified Recruiter' : 'Verified Student'}
                            </div>
                        </div>

                        {isEditing ? (
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-emerald-500/50 dark:focus:ring-cyan-500/50 font-medium resize-none shadow-sm mb-2"
                                placeholder="Tell us about yourself..."
                            />
                        ) : (
                            <p className="text-slate-600 dark:text-slate-400 font-medium mb-6">
                                {formData.bio}
                            </p>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-200 dark:border-slate-700/50">
                            <div>
                                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Account ID</p>
                                <p className="font-bold text-slate-900 dark:text-gray-100">{session.id}</p>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Status</p>
                                <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 mr-2 animate-pulse"></span>
                                    Active & Protected
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-[#070b19]/50 rounded-xl p-6 border border-slate-100 dark:border-slate-700/60 shadow-inner">
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-6">Platform Trust & Intelligence</h3>

                        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                            <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                    <path className="text-slate-200 dark:text-slate-700/60" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                    <path className="text-emerald-500 dark:text-cyan-400 transition-all duration-1000 ease-out" strokeDasharray="95, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                </svg>
                                <div className="absolute flex flex-col items-center justify-center">
                                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">95</span>
                                    <span className="text-xs font-bold text-emerald-600 dark:text-cyan-400 uppercase">Trust Score</span>
                                </div>
                            </div>

                            <div className="flex-1 w-full space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm font-bold mb-1.5">
                                        <span className="text-slate-700 dark:text-slate-300">Profile Consistency</span>
                                        <span className="text-emerald-600 dark:text-cyan-400">High Confidence</span>
                                    </div>
                                    <div className="w-full bg-slate-200 dark:bg-slate-700/60 rounded-full h-2">
                                        <div className="bg-emerald-500 dark:bg-cyan-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm font-bold mb-1.5">
                                        <span className="text-slate-700 dark:text-slate-300">Behavioral Stability</span>
                                        <span className="text-emerald-600 dark:text-cyan-400">Stable</span>
                                    </div>
                                    <div className="w-full bg-slate-200 dark:bg-slate-700/60 rounded-full h-2">
                                        <div className="bg-emerald-500 dark:bg-cyan-400 h-2 rounded-full" style={{ width: '98%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm font-bold mb-1.5">
                                        <span className="text-slate-700 dark:text-slate-300">Identity Checks</span>
                                        <span className="text-emerald-600 dark:text-cyan-400">Passed</span>
                                    </div>
                                    <div className="w-full bg-slate-200 dark:bg-slate-700/60 rounded-full h-2">
                                        <div className="bg-emerald-500 dark:bg-cyan-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-200 dark:border-slate-700/60 pt-5">
                            <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Account Trust History</h4>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="mt-1 mr-3 w-2 h-2 rounded-full bg-emerald-500 dark:bg-cyan-400 ring-4 ring-emerald-50 dark:ring-cyan-500/10"></div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Account verified & identity checks passed</p>
                                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Today</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="mt-1 mr-3 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-slate-100 dark:ring-slate-800"></div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Profile initialized in secure mode</p>
                                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Account creation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
