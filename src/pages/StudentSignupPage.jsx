import { useState, useEffect } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { ShieldCheckIcon, EyeIcon, EyeOffIcon, ArrowRightIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth0 } from '@auth0/auth0-react';

const signupSchema = yup.object().shape({
    name: yup.string().required('Full name is required.'),
    email: yup.string().email('Please enter a valid email address.').required('Email is required.'),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters long.')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
        .matches(/[0-9]/, 'Password must contain at least one number.')
        .required('Password is required.'),
});

export default function StudentSignupPage() {
    const navigate = useNavigate();
    const { signup, session } = useAuth();
    const { loginWithRedirect } = useAuth0();
    const [showPassword, setShowPassword] = useState(false);

    // Live password tracking state
    const [pwdStatus, setPwdStatus] = useState({ length: false, upper: false, number: false });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid, isDirty }
    } = useForm({
        resolver: yupResolver(signupSchema),
        mode: 'onChange' // Triggers instant validation
    });

    // Watch the password field for real-time visual feedback checklist
    const watchPassword = watch('password', '');
    useEffect(() => {
        setPwdStatus({
            length: watchPassword.length >= 8,
            upper: /[A-Z]/.test(watchPassword),
            number: /[0-9]/.test(watchPassword)
        });
    }, [watchPassword]);

    if (session) {
        if (session.role === 'recruiter') return <Navigate to="/dashboard" replace />;
        return <Navigate to="/jobs" replace />;
    }

    const onSubmit = (data) => {
        signup({ name: data.name, email: data.email, role: 'student' });
        navigate('/jobs');
    };

    return (
        <div className="flex min-h-[calc(100vh-64px)] w-full relative bg-slate-50 dark:bg-slate-900 transition-colors animate-in fade-in duration-500">

            {/* Left Column: Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-24 xl:px-32 py-12 relative z-10 flex-shrink-0">
                <div className="w-full max-w-md mx-auto">
                    <div className="mb-10 animate-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 dark:bg-cyan-500/10 text-emerald-600 dark:text-cyan-400 mb-6 shadow-sm border border-emerald-100 dark:border-cyan-500/20">
                            <ShieldCheckIcon className="w-7 h-7" />
                        </div>
                        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Create an account</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Join Credzy as a student to securely verify your profile.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both" noValidate>
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                            <input
                                type="text"
                                {...register('name')}
                                className={`w-full px-4 py-3.5 rounded-xl border ${errors.name ? 'border-rose-500 focus:ring-rose-500/50' : 'border-slate-200 dark:border-slate-700/60 focus:ring-emerald-500/50 dark:focus:ring-cyan-500/50'} bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white outline-none transition-all font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm`}
                                placeholder="Alex Johnson"
                            />
                            {errors.name && (
                                <p className="mt-1.5 text-sm text-rose-500 font-medium flex items-center animate-in slide-in-from-top-1 fade-in duration-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-2"></span>{errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">University Email</label>
                            <input
                                type="email"
                                {...register('email')}
                                className={`w-full px-4 py-3.5 rounded-xl border ${errors.email ? 'border-rose-500 focus:ring-rose-500/50' : 'border-slate-200 dark:border-slate-700/60 focus:ring-emerald-500/50 dark:focus:ring-cyan-500/50'} bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white outline-none transition-all font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm`}
                                placeholder="name@university.edu"
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-sm text-rose-500 font-medium flex items-center animate-in slide-in-from-top-1 fade-in duration-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-2"></span>{errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Secure Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register('password')}
                                    className={`w-full px-4 py-3.5 rounded-xl border ${errors.password && isDirty ? 'border-rose-500 focus:ring-rose-500/50' : isValid ? 'border-emerald-500/50 focus:border-emerald-500' : 'border-slate-200 dark:border-slate-700/60 focus:ring-emerald-500/50'} bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white outline-none transition-all font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm pr-12`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors focus:outline-none"
                                >
                                    {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Live Password Checklist - Removing explicit confirm password flow */}
                            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                                <div className={`flex items-center px-2 py-1 rounded-md transition-colors ${pwdStatus.length ? 'bg-emerald-50 text-emerald-700 dark:bg-cyan-500/10 dark:text-cyan-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                                    {pwdStatus.length ? <CheckCircleIcon className="w-3.5 h-3.5 mr-1.5" /> : <XCircleIcon className="w-3.5 h-3.5 mr-1.5 opacity-50" />}
                                    8+ chars
                                </div>
                                <div className={`flex items-center px-2 py-1 rounded-md transition-colors ${pwdStatus.upper ? 'bg-emerald-50 text-emerald-700 dark:bg-cyan-500/10 dark:text-cyan-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                                    {pwdStatus.upper ? <CheckCircleIcon className="w-3.5 h-3.5 mr-1.5" /> : <XCircleIcon className="w-3.5 h-3.5 mr-1.5 opacity-50" />}
                                    Uppercase
                                </div>
                                <div className={`flex items-center px-2 py-1 rounded-md transition-colors ${pwdStatus.number ? 'bg-emerald-50 text-emerald-700 dark:bg-cyan-500/10 dark:text-cyan-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                                    {pwdStatus.number ? <CheckCircleIcon className="w-3.5 h-3.5 mr-1.5" /> : <XCircleIcon className="w-3.5 h-3.5 mr-1.5 opacity-50" />}
                                    Number
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!isValid}
                            className="w-full bg-slate-900 dark:bg-cyan-500 hover:bg-slate-800 dark:hover:bg-cyan-400 text-white dark:text-slate-900 font-extrabold flex items-center justify-center py-4 rounded-xl shadow-md dark:shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-lg dark:hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all mt-8 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create Student Account
                            <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 relative flexItems-center animate-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
                        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent opacity-75"></div>
                        <span className="relative z-10 bg-slate-50 dark:bg-slate-900 px-4 text-sm font-bold text-slate-500 mx-auto w-fit flex justify-center uppercase tracking-widest">Or sign up with</span>
                    </div>

                    <div className="mt-8 animate-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                        <button
                            type="button"
                            onClick={() => loginWithRedirect()}
                            className="w-full py-4 text-center text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 hover:bg-slate-50 dark:hover:bg-slate-700/80 rounded-xl transition-colors shadow-sm flex items-center justify-center group"
                        >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                            </svg>
                            Enterprise Single Sign-On
                        </button>
                    </div>

                    <div className="mt-8 text-center animate-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-emerald-600 dark:text-cyan-400 hover:underline">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Column: Visual Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#070b19] overflow-hidden items-center justify-center">
                {/* Decorative background blur and geometry */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiMxMTFmMzMiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-[0.03]"></div>

                <div className="relative z-10 max-w-lg text-center px-12 animate-in fade-in zoom-in-95 duration-1000 delay-300">
                    <div className="mb-8 relative select-none pointer-events-none flex justify-center">
                        <div className="w-64 h-80 bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700 shadow-2xl rotate-[-6deg] absolute left-0 translate-y-8 opacity-60"></div>
                        <div className="w-64 h-80 bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-600 shadow-2xl rotate-[6deg] absolute right-0 translate-y-4 opacity-80"></div>
                        <div className="w-64 h-80 bg-slate-900 backdrop-blur-2xl rounded-2xl border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)] flex flex-col items-center justify-center relative inner-shadow">
                            <ShieldCheckIcon className="w-16 h-16 text-emerald-400 mb-4" />
                            <div className="text-emerald-300 font-bold mb-1">Identity Verified</div>
                            <div className="h-1.5 w-24 bg-slate-800 rounded-full overflow-hidden mt-2"><div className="w-full h-full bg-emerald-500"></div></div>
                        </div>
                    </div>
                    <h3 className="text-3xl font-extrabold text-white tracking-tight mb-4">You own your reputation.</h3>
                    <p className="text-slate-400 font-medium text-lg min-w-[300px]">Set up your Credzy profile once and use it to instantly verify your identity with thousands of recruiters.</p>
                </div>
            </div>

        </div>
    );
}
