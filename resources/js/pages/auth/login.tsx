import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import AuthLayout from '@/layouts/auth-layout';

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
        <AuthLayout title="Welcome Back!" description="Sign in to continue your pet shopping journey">
            <Head title="Log in" />

            <Card className="border-none shadow-none bg-transparent">
                <CardHeader className="p-0 mb-8 space-y-2">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-300">
                        <LogIn className="h-7 w-7 text-primary" />
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <form className="space-y-6" onSubmit={submit}>
                        <div className="space-y-4">
                            <div className="grid gap-2 group">
                                <Label htmlFor="email" className="flex items-center gap-2 font-semibold">
                                    <Mail className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" /> 
                                    Email address
                                </Label>
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
                                    className="h-11 rounded-xl bg-muted/30 border-primary/10 focus:border-primary/40 focus:ring-primary/20 transition-all duration-300"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2 group">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="flex items-center gap-2 font-semibold">
                                        <Lock className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" /> 
                                        Password
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink href={route('password.request')} className="text-xs transition-colors hover:text-primary" tabIndex={5}>
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
                                    className="h-11 rounded-xl bg-muted/30 border-primary/10 focus:border-primary/40 focus:ring-primary/20 transition-all duration-300"
                                />
                                <InputError message={errors.password} />
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 bg-muted/30 p-3 rounded-xl border border-primary/5 transition-colors hover:bg-muted/50 cursor-pointer">
                            <Checkbox 
                                id="remember" 
                                name="remember" 
                                tabIndex={3} 
                                checked={data.remember}
                                onCheckedChange={(checked) => setData('remember', checked as boolean)}
                            />
                            <Label htmlFor="remember" className="text-sm font-medium cursor-pointer">Keep me logged in</Label>
                        </div>

                        <Button type="submit" className="w-full h-11 rounded-xl shadow-lg shadow-primary/20 font-bold gap-2 group transition-all active:scale-95" tabIndex={4} disabled={processing}>
                            {processing ? (
                                <LoaderCircle className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In 
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </Button>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-muted" /></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or connect with</span></div>
                        </div>

                        <div className="text-muted-foreground text-center text-sm">
                            Don't have an account?{' '}
                            <TextLink href={route('register')} tabIndex={5} className="font-bold text-primary hover:underline underline-offset-4">
                                Create an account
                            </TextLink>
                        </div>
                    </form>
                </CardContent>

                {status && <div className="mt-6 p-3 rounded-xl bg-green-50 border border-green-100 text-center text-sm font-medium text-green-700 animate-in fade-in transition-all">{status}</div>}
            </Card>
        </AuthLayout>
    );
}
