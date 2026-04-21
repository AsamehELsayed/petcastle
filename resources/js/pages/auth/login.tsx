import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail, Lock, LogIn, ArrowRight, ShieldCheck, User as UserIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import AuthLayout from '@/layouts/auth-layout';
import { cn } from '@/lib/utils';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

interface LoginForm {
    [key: string]: any;
    email: string;
    password: string;
    remember: boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [role, setRole] = useState<'customer' | 'admin'>('customer');

    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout 
            title={role === 'admin' ? "Admin Portal" : "Welcome Back!"} 
            description={role === 'admin' ? "Secure gateway for Pet Castle management." : "Sign in to continue your pet shopping journey"}
        >
            <Head title={role === 'admin' ? "Admin Login" : "Log in"} />

            <div className="space-y-8">
                {/* Role Switcher */}
                <div className="flex p-1 bg-muted/50 backdrop-blur-sm rounded-2xl border border-primary/5 shadow-inner">
                    <button
                        onClick={() => setRole('customer')}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300",
                            role === 'customer' ? "bg-background text-primary shadow-lg ring-1 ring-primary/10" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <UserIcon className="h-4 w-4" />
                        Customer
                    </button>
                    <button
                        onClick={() => setRole('admin')}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300",
                            role === 'admin' ? "bg-background text-primary shadow-lg ring-1 ring-primary/10" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <ShieldCheck className="h-4 w-4" />
                        Administrator
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={role}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <form className="space-y-6" onSubmit={submit}>
                            <div className="space-y-4">
                                <div className="grid gap-2 group">
                                    <Label htmlFor="email" className="flex items-center gap-2 font-semibold text-[13px] ml-1">
                                        <Mail className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" /> 
                                        Email address
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="name@example.com"
                                            className="h-12 rounded-2xl bg-muted/20 border-primary/10 focus:border-primary/40 focus:ring-primary/20 transition-all duration-300 pl-4"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2 group">
                                    <div className="flex items-center justify-between ml-1">
                                        <Label htmlFor="password" className="flex items-center gap-2 font-semibold text-[13px]">
                                            <Lock className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" /> 
                                            Password
                                        </Label>
                                        {canResetPassword && (
                                            <TextLink href={route('password.request')} className="text-xs font-medium transition-colors hover:text-primary" tabIndex={5}>
                                                Forgot password?
                                            </TextLink>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="h-12 rounded-2xl bg-muted/20 border-primary/10 focus:border-primary/40 focus:ring-primary/20 transition-all duration-300 pl-4"
                                    />
                                    <InputError message={errors.password} />
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 bg-muted/10 p-3.5 rounded-2xl border border-primary/5 transition-all hover:bg-muted/20 hover:border-primary/10 cursor-pointer group/check">
                                <Checkbox 
                                    id="remember" 
                                    name="remember" 
                                    tabIndex={3} 
                                    checked={data.remember}
                                    onCheckedChange={(checked) => setData('remember', checked as boolean)}
                                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                />
                                <Label htmlFor="remember" className="text-sm font-medium cursor-pointer text-muted-foreground group-hover/check:text-foreground transition-colors">Keep me logged in</Label>
                            </div>

                            <Button type="submit" className="w-full h-12 rounded-2xl shadow-xl shadow-primary/20 font-bold gap-2 group transition-all active:scale-[0.98] bg-primary hover:bg-primary/90" tabIndex={4} disabled={processing}>
                                {processing ? (
                                    <LoaderCircle className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        {role === 'admin' ? "Access Dashboard" : "Sign In to Store"}
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </Button>

                            <div className="relative py-2">
                                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-muted/60" /></div>
                                <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold"><span className="bg-background px-4 text-muted-foreground/60">Or connect with</span></div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" type="button" className="h-12 rounded-2xl bg-muted/5 border-primary/5 hover:bg-muted/10 transition-all gap-2">
                                    <FaGoogle className="h-4 w-4 text-red-500" />
                                    <span className="text-xs font-bold">Google</span>
                                </Button>
                                <Button variant="outline" type="button" className="h-12 rounded-2xl bg-muted/5 border-primary/5 hover:bg-muted/10 transition-all gap-2">
                                    <FaFacebook className="h-4 w-4 text-blue-600" />
                                    <span className="text-xs font-bold">Facebook</span>
                                </Button>
                            </div>

                            {role === 'customer' && (
                                <div className="text-muted-foreground text-center text-sm pt-2">
                                    Don't have an account?{' '}
                                    <TextLink href={route('register')} tabIndex={5} className="font-extrabold text-primary hover:underline underline-offset-4 decoration-2">
                                        Create an account
                                    </TextLink>
                                </div>
                            )}
                        </form>
                    </motion.div>
                </AnimatePresence>

                {status && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-center text-sm font-semibold text-green-600 shadow-sm"
                    >
                        {status}
                    </motion.div>
                )}
            </div>
        </AuthLayout>
    );
}
