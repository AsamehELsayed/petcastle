import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CheckCircle2, PawPrint, Mail, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AnimalRequestForm() {
    const { data, setData, post, processing, reset, recentlySuccessful } = useForm({
        name: "",
        contact: "",
        animal_type: "",
        description: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('animal.request.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success("Request sent successfully!");
            },
        });
    };

    return (
        <section id="animal-request-form" className="py-20 bg-background overflow-hidden relative border-y border-border">
            {/* Colorful Accents */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row gap-16 items-center">
                <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6 text-primary text-xs font-black uppercase tracking-widest">
                        Don't see your dream pet?
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-black text-[#1E3A8A] mb-6 leading-[1.1]">
                        Request Your <br/>
                        <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-4">Dream Animal</span>
                    </h2>
                    <p className="text-muted-foreground text-xl max-w-xl mx-auto lg:mx-0">
                        Our sourcing experts specialize in finding the world's most beautiful and rare animals. 
                        Tell us what you're looking for!
                    </p>
                </div>

                <div className="flex-1 w-full max-w-xl">
                    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-border relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
                        
                        <AnimatePresence mode="wait">
                            {recentlySuccessful ? (
                                <motion.div 
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12 flex flex-col items-center text-center"
                                >
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">Request Shared!</h3>
                                    <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input 
                                                    value={data.name}
                                                    onChange={e => setData('name', e.target.value)}
                                                    placeholder="Enter name"
                                                    className="pl-10 h-12 bg-muted/50 border-border focus:ring-primary"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Contact Info</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input 
                                                    value={data.contact}
                                                    onChange={e => setData('contact', e.target.value)}
                                                    placeholder="Email or Phone"
                                                    className="pl-10 h-12 bg-muted/50 border-border focus:ring-primary"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Desired animal</label>
                                        <div className="relative">
                                            <PawPrint className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input 
                                                value={data.animal_type}
                                                onChange={e => setData('animal_type', e.target.value)}
                                                placeholder="What are you looking for?"
                                                className="pl-10 h-12 bg-muted/50 border-border focus:ring-primary"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Additional details</label>
                                        <Textarea 
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            placeholder="Tell us more about your ideal pet..."
                                            className="bg-muted/50 border-border focus:ring-primary min-h-[80px]"
                                            required
                                        />
                                    </div>

                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="w-full h-14 bg-[#1E3A8A] hover:bg-primary/90 text-white font-black rounded-xl shadow-xl shadow-primary/10 transition-all hover:scale-[1.02]"
                                    >
                                        {processing ? "SUBMITTING..." : "SEND SOURCING REQUEST"}
                                    </Button>
                                </form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
