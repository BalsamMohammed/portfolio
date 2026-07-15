import { useEffect, useState } from "react";
import { Project, Language } from "../types";
import { X, ArrowLeft, ArrowRight, Award, Compass, Layers, Wrench } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  lang: Language;
  onNavigate: (id: string) => void;
}

export default function ProjectDetailModal({
  project,
  onClose,
  lang,
  onNavigate,
}: ProjectDetailModalProps) {
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string; altAr?: string } | null>(null);

  // Disable background scrolling when modal is open or lightbox is open
  useEffect(() => {
    if (project || lightboxImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project, lightboxImg]);

  if (!project) return null;
  const isAr = lang === "ar";

  // Navigation handlers
  const handlePrev = () => {
    onNavigate(project.prevProjectId);
  };

  const handleNext = () => {
    onNavigate(project.nextProjectId);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080808]/98 backdrop-blur-2xl flex flex-col">
      {/* Dynamic Background Blob */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[500px] h-[500px] rounded-full filter blur-[120px] opacity-35 bg-[#3a113a] top-[-10%] right-[-10%] animate-drift-slow" />
        <div className="absolute w-[400px] h-[400px] rounded-full filter blur-[100px] opacity-35 bg-[#2a103c] bottom-[10%] left-[-5%] animate-drift-slower" />
      </div>

      {/* Floating Header */}
      <div className="sticky top-0 left-0 right-0 z-50 bg-[#080808]/80 backdrop-blur-md border-b border-[#E0E0E0]/10 py-4 px-6 md:px-12 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#E0E0E0]/10 hover:border-[#DFBEE6]/50 bg-[#121013]/40 text-xs font-semibold uppercase tracking-wider rtl:tracking-normal text-[#949494] hover:text-[#E0E0E0] transition-all duration-300"
          data-cursor="pointer"
        >
          {isAr ? "← إغلاق" : "← Close"}
        </button>

        <div className="font-serif italic text-[#949494] text-sm hidden sm:block">
          {isAr ? "دراسة حالة تفصيلية" : "Case Study Detail"}
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full border border-[#E0E0E0]/10 hover:bg-[#E0E0E0]/10 text-[#949494] hover:text-[#E0E0E0] transition-all duration-300"
          data-cursor="pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 w-full max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-20 relative z-10">
        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-12"
          style={{ direction: isAr ? "rtl" : "ltr" }}
        >
          <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs uppercase tracking-widest rtl:tracking-normal font-semibold text-[#DFBEE6] mb-4">
            <span>{isAr ? project.clientAr : project.client}</span>
            <span>·</span>
            <span>{project.year}</span>
            <span>·</span>
            <span>{isAr ? project.roleAr : project.role}</span>
          </div>
          
          <h1 className="font-serif italic font-medium text-4xl sm:text-5xl md:text-6xl text-[#E0E0E0] leading-tight mb-6">
            {isAr ? project.titleAr : project.title}
          </h1>

          <p className="text-lg md:text-xl text-[#949494] max-w-3xl leading-relaxed">
            {isAr ? project.briefAr : project.brief}
          </p>
        </motion.div>

        {/* Hero Cover Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-video rounded-2xl overflow-hidden border border-[#E0E0E0]/10 bg-gradient-to-tr from-[#121013] to-[#1a1a1a] mb-16 shadow-2xl cursor-pointer"
          onClick={() => setLightboxImg({ src: project.coverImage, alt: project.title, altAr: project.titleAr })}
          data-cursor="pointer"
          data-cursor-text={isAr ? "تكبير" : "expand"}
        >
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-[2000ms]"
            onError={(e) => {
              // Graceful placeholder fallback if asset is missing
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                const placeholder = document.createElement("div");
                placeholder.className = "absolute inset-0 flex flex-col items-center justify-center p-8 bg-radial from-[#DFBEE6]/10 to-transparent";
                placeholder.innerHTML = `
                  <div class="p-6 rounded-full bg-[#DFBEE6]/10 text-[#DFBEE6] mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="animate-pulse"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                  </div>
                  <h3 class="font-serif italic text-2xl mb-2 text-[#E0E0E0]">${isAr ? project.titleAr : project.title}</h3>
                  <p class="text-xs text-[#949494] uppercase tracking-widest">${isAr ? "تصميم هوية الفعاليات" : "Event Spatial Brand Design"}</p>
                `;
                parent.appendChild(placeholder);
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Dynamic Metric Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16" style={{ direction: isAr ? "rtl" : "ltr" }}>
          {project.stats.map((stat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              key={idx}
              className="p-6 rounded-xl border border-[#E0E0E0]/5 bg-[#121013]/40 backdrop-blur-md hover:border-[#DFBEE6]/20 transition-all duration-300"
            >
              <div className="font-serif italic text-3xl md:text-4xl text-[#DFBEE6] mb-1 font-semibold">
                {isAr ? stat.valueAr : stat.value}
              </div>
              <div className="text-[11px] uppercase tracking-widest text-[#949494]">
                {isAr ? stat.labelAr : stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Editorial Body layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16" style={{ direction: isAr ? "rtl" : "ltr" }}>
          {/* Main Case Details */}
          <div className="md:col-span-2 space-y-12">
            {/* The Approach Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-[#DFBEE6]/10 text-[#DFBEE6]">
                  <Compass size={18} />
                </span>
                <h3 className="font-serif italic text-2xl font-medium text-[#E0E0E0]">
                  {isAr ? "الرؤية والمنهجية" : "Concept & Strategic Approach"}
                </h3>
              </div>
              <p className="text-[#949494] leading-relaxed text-base sm:text-lg">
                {isAr ? project.approachAr : project.approach}
              </p>
            </section>

            {/* The Outcome Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-[#C7B9FA]/10 text-[#C7B9FA]">
                  <Award size={18} />
                </span>
                <h3 className="font-serif italic text-2xl font-medium text-[#E0E0E0]">
                  {isAr ? "النتيجة والأثر" : "Outcome & Spatial Impact"}
                </h3>
              </div>
              <p className="text-[#949494] leading-relaxed text-base sm:text-lg">
                {isAr ? project.outcomeAr : project.outcome}
              </p>
            </section>
          </div>

          {/* Sidebar Deliverables & Tools */}
          <div className="space-y-8 p-6 md:p-8 rounded-2xl border border-[#E0E0E0]/5 bg-[#121013]/20 backdrop-blur-md">
            {/* Deliverables */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider rtl:tracking-normal font-semibold text-[#DFBEE6]">
                <Layers size={14} />
                <span>{isAr ? "مخرجات الهوية" : "Brand Deliverables"}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(isAr ? project.deliverablesAr : project.deliverables).map((item, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 rounded-md border border-[#E0E0E0]/10 bg-[#080808]/60 text-[#E0E0E0]/90 font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            {/* Tools Used */}
            <section className="space-y-4 border-t border-[#E0E0E0]/10 pt-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider rtl:tracking-normal font-semibold text-[#DFBEE6]">
                <Wrench size={14} />
                <span>{isAr ? "الأدوات البرمجية" : "Design Toolkit"}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 rounded-md border border-[#DFBEE6]/30 bg-[#DFBEE6]/5 text-[#DFBEE6]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Asymmetrical Gallery Images */}
        <div className="space-y-8 mb-20">
          <div className="text-xs uppercase tracking-widest rtl:tracking-normal text-[#DFBEE6] mb-6 text-center border-b border-[#E0E0E0]/10 pb-4">
            {isAr ? "معرض الصور الميدانية والأصول المصممة" : "Project Artifacts & Spatial Media"}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.images.map((img, idx) => (
              <motion.div
                key={idx}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-[#E0E0E0]/5 bg-[#121013] shadow-lg flex items-center justify-center text-center p-8 cursor-pointer"
                onClick={() => setLightboxImg({ src: img.src, alt: img.alt, altAr: img.altAr })}
                data-cursor="pointer"
                data-cursor-text={isAr ? "تكبير" : "expand"}
              >
                <img
                  src={img.src}
                  alt={isAr ? img.altAr : img.alt}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement("div");
                      fallback.className = "absolute inset-0 flex flex-col items-center justify-center p-6 bg-radial from-[#121013] to-[#080808] border border-[#E0E0E0]/5 rounded-xl";
                      fallback.innerHTML = `
                        <div class="w-10 h-10 rounded-full border border-[#DFBEE6]/20 flex items-center justify-center text-[#DFBEE6] mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                        </div>
                        <p class="text-xs font-serif italic text-[#E0E0E0] mb-1">${isAr ? img.altAr : img.alt}</p>
                        <p class="text-[9px] uppercase tracking-widest text-[#949494]">${isAr ? "أصول الهوية البصرية" : "Visual Artifact Asset"}</p>
                      `;
                      parent.appendChild(fallback);
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                  <span className="text-xs font-serif italic text-white/90">
                    {isAr ? img.altAr : img.alt}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Project Infinite Slider Navigation */}
        <div className="border-t border-[#E0E0E0]/10 pt-12 flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="group flex flex-col items-start gap-1 p-4 rounded-xl hover:bg-[#E0E0E0]/5 text-left transition-colors duration-300"
            data-cursor="pointer"
            data-cursor-text={isAr ? "السابق" : "Prev"}
          >
            <span className="flex items-center gap-2 text-xs uppercase tracking-widest rtl:tracking-normal text-[#949494] group-hover:text-[#DFBEE6] transition-colors">
              <ArrowLeft size={12} />
              {isAr ? "المشروع السابق" : "Previous Project"}
            </span>
            <span className="font-serif italic text-lg text-[#E0E0E0] group-hover:underline">
              {isAr ? "اضغط للتصفح" : "Case Study Navigation"}
            </span>
          </button>

          <button
            onClick={handleNext}
            className="group flex flex-col items-end gap-1 p-4 rounded-xl hover:bg-[#E0E0E0]/5 text-right transition-colors duration-300"
            data-cursor="pointer"
            data-cursor-text={isAr ? "التالي" : "Next"}
          >
            <span className="flex items-center gap-2 text-xs uppercase tracking-widest rtl:tracking-normal text-[#949494] group-hover:text-[#DFBEE6] transition-colors">
              {isAr ? "المشروع التالي" : "Next Project"}
              <ArrowRight size={12} />
            </span>
            <span className="font-serif italic text-lg text-[#E0E0E0] group-hover:underline">
              {isAr ? "اضغط للتصفح" : "Case Study Navigation"}
            </span>
          </button>
        </div>
      </div>

      {/* Full screen Lightbox overlay */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#080808]/96 backdrop-blur-2xl flex flex-col items-center justify-center p-6"
            onClick={() => setLightboxImg(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 p-3 rounded-full border border-[#E0E0E0]/10 hover:bg-[#E0E0E0]/10 text-[#949494] hover:text-[#E0E0E0] transition-all duration-300 z-50 cursor-pointer"
              data-cursor="pointer"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>

            {/* Image Frame */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-full max-h-[80vh] rounded-xl overflow-hidden border border-[#E0E0E0]/10 bg-[#121013] shadow-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImg.src}
                alt={isAr ? lightboxImg.altAr : lightboxImg.alt}
                className="max-h-[80vh] w-auto max-w-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement("div");
                    fallback.className = "flex flex-col items-center justify-center p-12 bg-[#121013] border border-[#E0E0E0]/5 rounded-xl text-center max-w-sm";
                    fallback.innerHTML = `
                      <div class="mb-4 p-5 rounded-full bg-[#DFBEE6]/10 text-[#DFBEE6]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      </div>
                      <h4 class="font-serif italic text-xl text-[#E0E0E0] mb-2">${isAr ? lightboxImg.altAr || lightboxImg.alt : lightboxImg.alt}</h4>
                    `;
                    parent.appendChild(fallback);
                  }
                }}
              />
            </motion.div>

            {/* Captions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="max-w-xl text-center mt-6 p-4"
              onClick={(e) => e.stopPropagation()}
              style={{ direction: isAr ? "rtl" : "ltr" }}
            >
              <h3 className="font-serif italic text-lg md:text-xl font-medium text-[#E0E0E0]">
                {isAr ? lightboxImg.altAr || lightboxImg.alt : lightboxImg.alt}
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
