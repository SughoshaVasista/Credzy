import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { ShieldCheckIcon, EyeIcon, EyeOffIcon, ArrowRightIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth0 } from '@auth0/auth0-react';

// Validation Schema
const loginSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email address.').required('Email is required.'),
    password: yup.string().required('Password is required.'),
});

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, session } = useAuth();
    const { loginWithRedirect } = useAuth0();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty }
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: 'onChange' // Triggers instant validation
    });

    if (session) {
        if (session.role === 'recruiter') return <Navigate to="/dashboard" replace />;
        return <Navigate to="/jobs" replace />;
    }

    const onSubmit = (data) => {
        const newSession = login(data.email);
        if (newSession.role === 'recruiter') {
            navigate('/dashboard');
        } else {
            navigate('/jobs');
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-64px)] w-full relative bg-slate-50 dark:bg-slate-900 transition-colors animate-in fade-in duration-500">

            {/* Left Column: Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-24 xl:px-32 py-12 relative z-10 flex-shrink-0">
                <div className="w-full max-w-md mx-auto">
                    <div className="mb-10 animate-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-6 shadow-sm border border-indigo-100 dark:border-indigo-500/20">
                            <ShieldCheckIcon className="w-7 h-7" />
                        </div>
                        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Welcome back</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Log in to your Credzy account to continue.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 animate-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both" noValidate>
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                            <input
                                type="email"
                                {...register('email')}
                                className={`w-full px-4 py-3.5 rounded-xl border ${errors.email ? 'border-rose-500 focus:ring-rose-500/50 focus:border-rose-500' : 'border-slate-200 dark:border-slate-700/60 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/50 focus:border-indigo-500 dark:focus:border-indigo-500'} bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white outline-none transition-all font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm`}
                                placeholder="name@university.edu"
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-rose-500 font-medium flex items-center animate-in slide-in-from-top-1 fade-in duration-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-2 tracking-tight"></span>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register('password')}
                                    className={`w-full px-4 py-3.5 rounded-xl border ${errors.password ? 'border-rose-500 focus:ring-rose-500/50 focus:border-rose-500' : 'border-slate-200 dark:border-slate-700/60 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/50 focus:border-indigo-500 dark:focus:border-indigo-500'} bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white outline-none transition-all font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm pr-12`}
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
                            {errors.password && (
                                <p className="mt-2 text-sm text-rose-500 font-medium flex items-center animate-in slide-in-from-top-1 fade-in duration-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-2 tracking-tight"></span>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <label className="flex items-center cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 text-indigo-600 bg-slate-100 border-slate-300 rounded focus:ring-indigo-500 focus:ring-2 dark:bg-slate-800 dark:border-slate-600 cursor-pointer" />
                                <span className="ml-2 text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={!isValid && isDirty}
                            className="w-full bg-slate-900 dark:bg-indigo-500 hover:bg-slate-800 dark:hover:bg-indigo-400 text-white dark:text-slate-900 font-extrabold flex items-center justify-center py-4 rounded-xl shadow-md dark:shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:shadow-lg dark:hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all mt-8 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Sign In to Dashboard
                            <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 relative flexItems-center animate-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
                        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent opacity-75"></div>
                        <span className="relative z-10 bg-slate-50 dark:bg-slate-900 px-4 text-sm font-bold text-slate-500 mx-auto w-fit flex justify-center uppercase tracking-widest">Or continue with</span>
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
                            Enterprise SSO Login
                        </button>
                    </div>

                    <div className="mt-10 text-center animate-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                            Don't have an account?{' '}
                            <Link to="/signup/student" className="text-indigo-600 dark:text-indigo-400 hover:underline">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Column: Visual Branding (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#070b19] overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-emerald-500/10 mix-blend-screen pointer-events-none"></div>
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

                {/* Abstract Security UI Overlay */}
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="relative w-full max-w-lg aspect-square">
                        {/* Central Shield */}
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="w-48 h-48 bg-slate-900/80 backdrop-blur-xl rounded-full border border-slate-700/50 shadow-2xl flex items-center justify-center relative inner-shadow ring-1 ring-white/10 group animate-[spin_30s_linear_infinite_reverse]">
                                <div className="absolute inset-0 rounded-full border border-indigo-500/30 w-full h-full scale-110 animate-ping duration-1000"></div>
                                <ShieldCheckIcon className="w-20 h-20 text-indigo-400 group-hover:scale-110 transition-transform duration-500 group-hover:text-emerald-400 animate-[spin_30s_linear_infinite]" />
                            </div>
                        </div>

                        {/* Orbiting Elements */}
                        <div className="absolute inset-0 border border-slate-800 rounded-full animate-[spin_20s_linear_infinite]">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 font-mono text-[10px] text-emerald-400 font-bold shadow-lg shadow-emerald-500/20 rotate-0">SEC</div>
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 font-mono text-[10px] text-indigo-400 font-bold shadow-lg shadow-indigo-500/20 -rotate-180">AUTH</div>
                        </div>
                        <div className="absolute inset-8 border border-slate-800/60 rounded-full animate-[spin_15s_linear_infinite_reverse] border-dashed"></div>
                        <div className="absolute inset-16 border border-slate-700/40 rounded-full"></div>
                    </div>
                </div>

                <div className="absolute bottom-12 left-12 right-12 text-center z-20">
                    <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2">The Security Standard for Hiring</h3>
                    <p className="text-slate-400 font-medium">Protecting thousands of students and recruiters from identity fraud and employment scams globally.</p>
                </div>
            </div>

        </div>
    );
}
