import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, User, Mail, Lock, UserPlus, ArrowRight } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import AuthLayout from '@/layouts/auth-layout';

interface RegisterForm {
    [key: string]: any;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Create an Account" description="Join the PetStore community today">
            <Head title="Register" />

            <Card className="border-none shadow-none bg-transparent">
                <CardHeader className="p-0 mb-8">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-300">
                        <UserPlus className="h-7 w-7 text-primary" />
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <form className="space-y-5" onSubmit={submit}>
                        <div className="grid gap-2 group">
                            <Label htmlFor="name" className="flex items-center gap-2 font-semibold">
                                <User className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={data.name}
                                className="h-11 rounded-xl bg-muted/30 border-primary/10 focus:border-primary/40 focus:ring-primary/20 transition-all duration-300"
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2 group">
                            <Label htmlFor="email" className="flex items-center gap-2 font-semibold">
                                <Mail className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                Email address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="h-11 rounded-xl bg-muted/30 border-primary/10 focus:border-primary/40 focus:ring-primary/20 transition-all duration-300"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2 group">
                            <Label htmlFor="password" className="flex items-center gap-2 font-semibold">
                                <Lock className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="h-11 rounded-xl bg-muted/30 border-primary/10 focus:border-primary/40 focus:ring-primary/20 transition-all duration-300"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2 group">
                            <Label htmlFor="password_confirmation" className="flex items-center gap-2 font-semibold">
                                <Lock className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                Confirm Password
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="h-11 rounded-xl bg-muted/30 border-primary/10 focus:border-primary/40 focus:ring-primary/20 transition-all duration-300"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <Button type="submit" className="w-full h-11 rounded-xl shadow-lg shadow-primary/20 font-bold gap-2 group transition-all active:scale-95 mt-4" disabled={processing}>
                            {processing ? (
                                <LoaderCircle className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </Button>

                        <div className="text-muted-foreground text-center text-sm pt-4">
                            Already have an account?{' '}
                            <TextLink href={route('login')} className="font-bold text-primary hover:underline underline-offset-4">
                                Log in
                            </TextLink>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}
