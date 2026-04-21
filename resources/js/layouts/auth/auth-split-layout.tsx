import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: AuthLayoutProps) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-4 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden">
            {/* Left side: Cinematic Panel */}
            <div className="relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r overflow-hidden group">
                <div className="absolute inset-0 bg-zinc-950">
                    <motion.div 
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0 h-full w-full"
                    >
                        <img 
                            src="/images/auth-bg.png" 
                            alt="Pet Store Background" 
                            className="h-full w-full object-cover transition-transform duration-10000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="relative z-20 flex items-center text-xl font-bold tracking-tight"
                >
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                        <AppLogoIcon className="h-6 w-6 fill-current text-white" />
                    </div>
                    {name}
                </motion.div>

                <AnimatePresence mode="wait">
                    {quote && (
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="relative z-20 mt-auto"
                        >
                            <div className="p-8 rounded-3xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl max-w-xl">
                                <blockquote className="space-y-4">
                                    <p className="text-2xl font-light italic leading-relaxed text-neutral-100 italic">
                                        &ldquo;{quote.message}&rdquo;
                                    </p>
                                    <footer className="flex items-center gap-3">
                                        <div className="h-px w-8 bg-primary" />
                                        <span className="text-sm font-semibold uppercase tracking-widest text-primary/80">{quote.author}</span>
                                    </footer>
                                </blockquote>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Right side: Form Panel */}
            <div className="w-full lg:p-12 xl:p-24 relative flex items-center justify-center bg-background/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.05),transparent_50%)] pointer-events-none" />
                
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[420px]"
                >
                    <div className="lg:hidden flex flex-col items-center gap-6 mb-4">
                        <Link href={route('home')} className="flex items-center gap-3">
                             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                                <AppLogoIcon className="h-8 w-8 fill-current text-primary" />
                            </div>
                            <span className="text-2xl font-bold tracking-tighter">{name}</span>
                        </Link>
                    </div>

                    <div className="flex flex-col gap-3 text-center sm:text-left">
                        <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            {title}
                        </h1>
                        <p className="text-muted-foreground text-base max-w-[320px] mx-auto sm:mx-0">
                            {description}
                        </p>
                    </div>

                    <div className="relative">
                         {children}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

