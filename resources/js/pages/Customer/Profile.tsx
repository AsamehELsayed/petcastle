import CustomerLayout from '@/layouts/customer-layout';
import { User as UserType, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { User, Mail, Phone, Lock, Save, Trash2, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import InputError from '@/components/input-error';
import { Transition } from '@headlessui/react';
import { toast } from 'sonner';

interface ProfileForm {
    [key: string]: any;
    name: string;
    email: string;
    phone: string;
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<ProfileForm>({
        name: user.name,
        email: user.email,
        phone: (user.phone as string) || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('portal.profile.update'), {
            onSuccess: () => toast.success('Profile updated successfully!'),
        });
    };

    return (
        <CustomerLayout breadcrumbs={[{ title: 'Profile', href: route('portal.profile.edit') }]}>
            <Head title="My Profile" />

            <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Personal Information
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Update your account's profile information and email address.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold text-primary">General Details</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                            This information is used for deliveries and account identification.
                        </p>
                    </div>
                    
                    <Card className="md:col-span-2 border-primary/10 shadow-2xl shadow-primary/5">
                        <form onSubmit={submit}>
                            <CardContent className="pt-6 space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" /> Full Name
                                    </Label>
                                    <Input
                                        id="name"
                                        className="rounded-xl"
                                        value={data.name || ''}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        autoComplete="name"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" /> Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        className="rounded-xl"
                                        value={data.email || ''}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        autoComplete="username"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="phone" className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" /> Phone Number (Optional)
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        className="rounded-xl"
                                        value={data.phone || ''}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        autoComplete="tel"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                    <InputError message={errors.phone} />
                                </div>
                            </CardContent>

                            <CardFooter className="flex items-center gap-4 bg-muted/30 py-4 px-6 border-t rounded-b-xl">
                                <Button type="submit" disabled={processing} className="rounded-xl px-6 group transition-all">
                                    <Save className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                                    Save Changes
                                </Button>
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-green-600 font-medium">Saved!</p>
                                </Transition>
                            </CardFooter>
                        </form>
                    </Card>
                </div>

                <Separator className="bg-primary/5" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold text-red-500 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" /> Danger Zone
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2">
                            Permanently delete your account and all associated data.
                        </p>
                    </div>
                    
                    <Card className="md:col-span-2 border-red-500/10 shadow-2xl shadow-red-500/5">
                        <CardHeader>
                            <CardTitle className="text-red-500 font-bold">Unsubscribe / Delete Account</CardTitle>
                            <CardDescription>
                                Once your account is deleted, all of its resources and data will be permanently deleted.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="bg-red-50/50 py-4 px-6 border-t border-red-100 rounded-b-xl">
                            <Button variant="destructive" className="rounded-xl gap-2 font-bold px-6">
                                <Trash2 className="h-4 w-4" /> Delete My Account
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </CustomerLayout>
    );
}
