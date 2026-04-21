import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function AnimalRequestHero({ data }: { data?: any }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    },
  };

  return (
    <div className="relative w-full overflow-hidden min-h-[500px] lg:min-h-[650px] flex items-center bg-[#0F172A]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#3B82F6]" />
      <div className="absolute inset-0 opacity-40">
        <img 
          src={data?.image || "/images/animal_sourcing_vibrant.png"} 
          alt="Animal Sourcing" 
          className="w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/70 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
        <motion.div 
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex flex-col items-start gap-2 mb-10">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full px-6 py-2.5 text-white/90 text-xs md:text-sm font-bold tracking-widest uppercase shadow-2xl">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Castle Pets Premium Sourcing
            </div>
            <span className="text-[10px] md:text-xs text-white/40 font-['Alexandria'] px-6 tracking-wide italic">
              كاسل بيتس - توفير حيوانات مميز
            </span>
          </motion.div>
          
          {/* Headline */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-3xl md:text-5xl font-display font-black text-white leading-tight mb-4 tracking-tight drop-shadow-lg">
              YOU NAME IT,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-accent to-orange-500 relative">
                WE FIND IT.
              </span>
            </h1>
            <div className="flex items-center gap-3 group">
              <div className="h-[1px] w-6 bg-accent/50" />
              <h2 className="text-base md:text-2xl font-['Alexandria'] font-bold text-white/70 leading-none">
                اطلب ما تتمنى، ونحن نجده لك
              </h2>
            </div>
          </motion.div>
          
          {/* Description */}
          <motion.div variants={itemVariants} className="mb-8 space-y-4">
            <p className="text-base md:text-lg text-white/90 font-medium leading-relaxed max-w-xl">
              We specialize in sourcing <span className="text-white font-bold decoration-accent/50 underline underline-offset-4">any animal of any type</span> you love. 
              Safe, professional, and world-class delivery.
            </p>
            <p className="text-sm md:text-base text-white/50 font-['Alexandria'] font-medium max-w-xl leading-relaxed">
              نحن متخصصون في توفير أي حيوان تحبه من أي نوع. توصيل آمن، احترافي وبمستوى عالمي.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 items-center">
            <Button 
              size="lg" 
              className="h-auto py-4 px-10 bg-accent hover:bg-accent/90 text-white rounded-2xl transition-all duration-500 shadow-[0_15px_45px_rgba(249,115,22,0.3)] hover:shadow-[0_20px_60px_rgba(249,115,22,0.5)] border-none group flex flex-col items-center justify-center hover:-translate-y-1"
              onClick={() => {
                document.getElementById('animal-request-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl tracking-tight">GET STARTED</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
              </div>
              <span className="text-[10px] font-['Alexandria'] font-bold opacity-80 mt-1 tracking-wide">ابدأ الآن</span>
            </Button>

           
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-[-10%] w-[40%] h-[60%] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-[-5%] w-[30%] h-[40%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}
