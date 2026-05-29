"use client";

import { motion } from "framer-motion";
import { Star, ArrowDown, Phone, MapPin } from "lucide-react";
import { businessData, aiContent, siteConfig } from "@/data/site-data";

export function HeroSection() {
  // Use heroVariant from design engine (more specific than layout)
  const heroVariant = (siteConfig as any).heroVariant || "minimal-centered";
  const layout = siteConfig.layout;

  // Map heroVariant to component
  if (heroVariant === "left-text-right-image" || heroVariant === "floating-cards") return <HeroSplit />;
  if (heroVariant === "animated-typography" || heroVariant === "minimal-centered") return <HeroMinimal />;
  if (heroVariant === "stats-focused" || heroVariant === "testimonial-first") return <HeroBold />;
  if (heroVariant === "fullscreen-cinematic" || heroVariant === "image-collage") return <HeroCinematic />;
  if (heroVariant === "product-showcase" || heroVariant === "split-diagonal") return <HeroSplit />;

  // Fallback: map layout style to hero
  if (["split", "bento-grid", "asymmetrical-modern", "editorial-magazine"].includes(layout)) return <HeroSplit />;
  if (["minimal-luxury", "scandinavian", "apple-minimal", "organic-fluid"].includes(layout)) return <HeroMinimal />;
  if (["neo-brutalism", "bold", "retro-vintage", "interactive-3d"].includes(layout)) return <HeroBold />;
  if (["dark-futuristic", "cyberpunk", "cinematic", "glassmorphism"].includes(layout)) return <HeroCinematic />;

  return <HeroDefault />;
}

// ─── Layout: Default (centered with gradient orbs) ───
function HeroDefault() {
  const heroImage = businessData.images[0] || null;
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {heroImage && (
        <div className="absolute inset-0">
          <img src={heroImage} alt={businessData.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
      )}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>
      <div className="container-custom relative z-10 text-center px-4 pt-20">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
          <RatingBadge />
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6">
            <span className="gradient-text">{aiContent.tagline}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-10">
            {aiContent.heroDescription}
          </motion.p>
          <CTAButtons />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Layout: Split (left text, right image/info) ───
function HeroSplit() {
  const heroImage = businessData.images[0] || null;
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 items-center px-4 pt-24">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            {businessData.category}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
            {aiContent.tagline}
          </h1>
          <p className="text-lg text-foreground/60 mb-8 max-w-lg">{aiContent.heroDescription}</p>
          <CTAButtons />
          <RatingBadge className="mt-8" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:block">
          {heroImage ? (
            <img src={heroImage} alt={businessData.name} className="rounded-3xl shadow-2xl w-full h-[500px] object-cover" />
          ) : (
            <div className="space-y-4">
              <InfoCard icon={<MapPin size={24} />} title="Visit Us" text={businessData.address} />
              {businessData.phone && <InfoCard icon={<Phone size={24} />} title="Call Us" text={businessData.phone} />}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Layout: Minimal (bottom-aligned, large type) ───
function HeroMinimal() {
  return (
    <section className="relative min-h-screen flex items-end pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-32 right-20 w-40 h-40 border border-foreground/5 rounded-full" />
      <div className="absolute bottom-40 left-20 w-24 h-24 border border-foreground/5 rounded-full" />
      <div className="container-custom relative z-10 px-4 w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-primary font-mono text-sm mb-4 tracking-wider uppercase">{businessData.category}</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-none tracking-tight mb-8">
            {aiContent.tagline}
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="max-w-md text-foreground/50 text-lg">{aiContent.heroDescription}</p>
            <CTAButtons />
          </div>
          <RatingBadge className="mt-10" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Layout: Bold (brutalist, strong lines) ───
function HeroBold() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
      <div className="absolute top-1/3 left-0 w-2/3 h-px bg-foreground/5" />
      <div className="absolute top-2/3 right-0 w-1/2 h-px bg-foreground/5" />
      <div className="container-custom relative z-10 px-4 grid lg:grid-cols-12 gap-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="lg:col-span-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-foreground/60 uppercase tracking-widest text-xs">{businessData.category}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tight mb-6">
            {aiContent.tagline}
          </h1>
          <p className="text-xl text-foreground/40 font-light italic mb-8">{aiContent.heroDescription}</p>
          <a href="#contact" className="inline-block px-10 py-5 bg-primary text-white font-bold text-lg uppercase tracking-wide hover:opacity-90 transition-colors">
            {aiContent.ctaButtonText || "Contact Now"}
          </a>
        </motion.div>
        <div className="lg:col-span-4 flex flex-col justify-center gap-6">
          {businessData.rating && (
            <div className="border-l-2 border-primary pl-6">
              <div className="text-4xl font-heading font-bold">{businessData.rating}</div>
              <div className="text-foreground/40 text-sm">Rating</div>
            </div>
          )}
          {businessData.reviewsCount && (
            <div className="border-l-2 border-secondary pl-6">
              <div className="text-4xl font-heading font-bold">{businessData.reviewsCount}</div>
              <div className="text-foreground/40 text-sm">Reviews</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Layout: Cinematic (full-screen image bg) ───
function HeroCinematic() {
  const heroImage = businessData.images[0] || null;
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {heroImage ? (
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
      )}
      <div className="container-custom relative z-10 text-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-primary flex items-center justify-center text-3xl text-white font-bold shadow-2xl shadow-primary/30">
            {businessData.name?.charAt(0)}
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">{aiContent.tagline}</h1>
          <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">{aiContent.heroDescription}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#contact" className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold hover:bg-white/20 transition-all">
              {aiContent.ctaButtonText || "Explore"}
            </a>
            {businessData.phone && (
              <a href={`tel:${businessData.phone.replace(/[^+\d]/g, "")}`} className="px-8 py-4 rounded-2xl bg-primary text-white font-semibold hover:opacity-90 transition-all">
                Call Now
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Shared Sub-components ───
function RatingBadge({ className = "" }: { className?: string }) {
  if (!businessData.rating) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-card border border-border ${className}`}>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className={i < Math.round(parseFloat(businessData.rating)) ? "text-yellow-500 fill-yellow-500" : "text-foreground/20"} />
        ))}
      </div>
      <span className="font-bold text-sm">{businessData.rating}</span>
      {businessData.reviewsCount && <span className="text-foreground/50 text-xs">({businessData.reviewsCount} reviews)</span>}
    </motion.div>
  );
}

function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a href="#contact" className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:opacity-90 transition-all hover:shadow-xl hover:shadow-primary/25">
        {aiContent.ctaButtonText || "Get Started"}
      </a>
      <a href="#services" className="px-8 py-4 rounded-full border border-border font-semibold text-lg hover:bg-card transition-all">
        Our Services
      </a>
    </div>
  );
}

function InfoCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-foreground/60 text-sm">{text}</p>
      </div>
    </div>
  );
}
