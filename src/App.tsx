import { useState, useEffect } from "react";
import { Language, Project } from "./types";
import { PROJECTS } from "./data";
import Header from "./components/Header";
import CustomCursor from "./components/CustomCursor";
import ProjectDetailModal from "./components/ProjectDetailModal";
import GallerySection from "./components/GallerySection";
import AnimatedCounter from "./components/AnimatedCounter";
import { 
  ArrowRight, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  ExternalLink, 
  Sparkles,
  MousePointerClick,
  MonitorPlay,
  HeartHandshake
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const isAr = lang === "ar";

  // Navigation scrollspy to highlight active navbar element
  useEffect(() => {
    const sections = ["hero", "about", "portfolio", "gallery", "services", "contact"];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Fine-tuned scroll position detection
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollY >= offsetTop - windowHeight / 3 && scrollY < offsetTop + offsetHeight - windowHeight / 3) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Modal deep navigation handler (Prev / Next project)
  const handleProjectNavigation = (projectId: string) => {
    const nextProj = PROJECTS.find((p) => p.id === projectId);
    if (nextProj) {
      setSelectedProject(nextProj);
    }
  };

  return (
    <div 
      className="min-h-screen relative font-sans text-[#E0E0E0] bg-[#080808] overflow-x-hidden selection:bg-[#d946ef] selection:text-[#080808]"
      style={{ direction: isAr ? "rtl" : "ltr" }}
    >
      {/* Cinematic Film Grain & Background Grid Line Layer */}
      <div className="grain" />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="grid-lines" />
      </div>

      {/* Ambient drifting blur lights */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#3a113a] rounded-full blur-[120px] animate-drift-slow" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-[#2a103c] rounded-full blur-[100px] animate-drift-slower" />
      </div>

      {/* Desktop Luxury Magnetic Cursor */}
      <CustomCursor />

      {/* Global Navigation Header */}
      <Header lang={lang} setLang={setLang} activeSection={activeSection} />

      {/* 1. HERO SECTION */}
      <section 
        id="hero" 
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E0E0E0]/10 bg-[#121013]/40 backdrop-blur-md text-[10px] md:text-xs font-semibold tracking-widest rtl:tracking-normal text-[#DFBEE6] uppercase mb-8"
          >
            <Sparkles size={12} className="animate-pulse" />
            <span>
              {isAr ? "مصممة جرافيك ومرئيات الفعاليات الكبرى" : "Graphic Designer & Spatial Brand Director"}
            </span>
          </motion.div>

          {/* Epic Editorial Name Heading with focus glow light */}
          <div className="relative mb-8 w-full flex flex-col items-center justify-center text-center">
            {/* Soft ambient focal lighting background - elegant quiet pulsing pastel glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] md:w-[700px] h-[120px] sm:h-[220px] bg-[radial-gradient(circle_at_center,rgba(223,190,230,0.35)_0%,transparent_65%)] blur-3xl pointer-events-none z-0 animate-pulse" style={{ animationDuration: "8s" }} />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full flex items-center justify-center text-center mx-auto"
            >
              <h1 className="font-serif italic font-medium text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#E0E0E0] leading-none select-none tracking-tight rtl:tracking-normal text-center mx-auto block w-full">
                {isAr ? "بلسم بارود" : "Balsam Baroud"}
              </h1>
            </motion.div>
          </div>

          {/* Premium Tagline with Shimmer */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-[#949494] max-w-2xl mx-auto mb-12 leading-relaxed font-light"
          >
            {isAr 
              ? "متخصصة في تطبيق وتجسيد الهوية البصرية، تصميم مرئيات الفعاليات الكبرى والمطبوعات للمؤسسات التعليمية التي تبني حضوراً حقيقياً ومؤثراً." 
              : "Applying visual identity systems, designing expansive physical event backdrops, and editorial typography layouts for prestigious institutions that command physical presence."
            }
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#portfolio"
              className="px-8 py-4 rounded-full bg-[#DFBEE6] text-[#080808] text-sm font-bold uppercase tracking-wider rtl:tracking-normal hover:bg-[#DFBEE6]/80 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-[#DFBEE6]/10"
              data-cursor="pointer"
              data-cursor-text={isAr ? "رؤية أعمالي" : "view work"}
            >
              {isAr ? "تصفح المشاريع" : "View Portfolio"}
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full border border-[#E0E0E0]/10 hover:border-[#DFBEE6]/30 bg-[#121013]/40 text-sm font-bold uppercase tracking-wider rtl:tracking-normal text-[#E0E0E0] hover:text-[#DFBEE6] hover:scale-105 active:scale-95 transition-all duration-300"
              data-cursor="pointer"
            >
              {isAr ? "تواصل معي" : "Get In Touch"}
            </a>
          </motion.div>

          {/* Scroll Down Hint Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => {
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="text-[9px] uppercase tracking-widest text-[#949494] font-semibold">
              {isAr ? "اسحب للأسفل" : "Scroll to explore"}
            </span>
            <div className="w-[1.5px] h-12 bg-gradient-to-b from-[#DFBEE6] to-transparent animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section 
        id="about" 
        className="py-24 md:py-36 border-t border-[#E0E0E0]/5 relative"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Header and Bio Narrative */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest rtl:tracking-normal font-semibold text-[#DFBEE6]">
                  01 · {isAr ? "التعريف الشخصي" : "About Me"}
                </span>
                <h2 className="font-serif italic font-medium text-4xl sm:text-5xl md:text-6xl text-[#E0E0E0]">
                  {isAr ? "التصميم بمقاييس دقيقة وأثر حقيقي" : "Design engineered for structural scale."}
                </h2>
              </div>

              <div className="space-y-6 text-[#949494] text-base md:text-lg leading-relaxed font-light">
                <p>
                  {isAr 
                    ? "أنا مصممة جرافيك أقيم بالمدينة المنورة بالمملكة العربية السعودية، أعمل حالياً في قسم العلاقات العامة والتسويق بالجامعة العربية المفتوحة. ما بدأ كشغف لتصميم ملصقات منصات التواصل تطور اليوم ليصبح أنظمة وهوية بصرية كاملة لأضخم الفعاليات والمؤتمرات المؤسسية والأكاديمية بالمملكة — من منصات العرض، اللوحات الإرشادية، المطبوعات الكبرى وحتى العروض والكتيبات لحشود تضم الآلاف."
                    : "Based in the historic city of Madinah, Saudi Arabia, I direct graphic systems and visual media within the Public Relations & Marketing department at Arab Open University. What originated as a passion for localized digital campaigns has expanded into full-spectrum visual identity ecosystems for flagship institutional events — stagecraft, wayfinding, multi-city environmental print, and digital stages for audiences in the thousands."
                  }
                </p>
                <p>
                  {isAr
                    ? "بالتوازي مع عملي الإبداعي المهني، أوشك على التخرج بشهادة البكالوريوس في علوم الحاسب، وأقود لجان التصميم الفنية في ثلاث أندية طلابية بالجامعة. في عام ٢٠٢٦، تم اختياري كواحدة من بين ٥٠ زميلاً على مستوى المملكة — من بين أكثر من ١٨,٠٠٠ متقدم — للانضمام لبرنامج 'زمالة قمم' المرموق لتأهيل وإعداد القيادات الوطنية الواعدة."
                    : "Simultaneously balancing high-end client deliverables, I am completing my BSc in Computer Science and command the graphic design directorates for three student organizations at AOU. In 2026, I was selected as one of the 50 high-potential fellows nationwide — out of over 18,000 highly competitive applicants — for the prestigious Qimam Fellowship, a national leadership program."
                  }
                </p>
              </div>
            </div>

            {/* Right Fact Sheet / Bento Stats Panel */}
            <div className="lg:col-span-5 w-full p-6 md:p-8 rounded-2xl border border-[#E0E0E0]/5 bg-[#121013]/30 backdrop-blur-md space-y-6">
              <h3 className="font-serif italic text-xl font-medium text-[#E0E0E0] border-b border-[#E0E0E0]/10 pb-4">
                {isAr ? "مؤشرات وأرقام مهنية" : "Key Metrics & Milestones"}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Stat 1: Designs Count */}
                <div className="p-4 rounded-xl border border-[#E0E0E0]/5 bg-[#080808]/40 hover:border-[#DFBEE6]/20 transition-all duration-300">
                  <div className="text-3xl font-extrabold text-[#DFBEE6] font-serif">
                    <AnimatedCounter target={110} prefix="+" isAr={isAr} duration={3000} />
                  </div>
                  <div className="text-[11px] uppercase tracking-widest rtl:tracking-normal text-[#949494] mt-1">
                    {isAr ? "منشور رقمي وتصميم" : "Digital Poster Designs"}
                  </div>
                </div>

                {/* Stat 2: Projects Count */}
                <div className="p-4 rounded-xl border border-[#E0E0E0]/5 bg-[#080808]/40 hover:border-[#DFBEE6]/20 transition-all duration-300">
                  <div className="text-3xl font-extrabold text-[#DFBEE6] font-serif">
                    <AnimatedCounter target={3} isAr={isAr} duration={3000} />
                  </div>
                  <div className="text-[11px] uppercase tracking-widest rtl:tracking-normal text-[#949494] mt-1">
                    {isAr ? "مشاريع وفعاليات كبرى" : "Major Projects & Events"}
                  </div>
                </div>

                {/* Stat 3: Experience Years */}
                <div className="p-4 rounded-xl border border-[#E0E0E0]/5 bg-[#080808]/40 hover:border-[#DFBEE6]/20 transition-all duration-300">
                  <div className="text-3xl font-extrabold text-[#DFBEE6] font-serif">
                    <AnimatedCounter target={3.5} prefix="+" decimals={1} isAr={isAr} duration={3000} />
                  </div>
                  <div className="text-[11px] uppercase tracking-widest rtl:tracking-normal text-[#949494] mt-1">
                    {isAr ? "سنوات خبرة تطبيقية" : "Years Practical Experience"}
                  </div>
                </div>

                {/* Stat 4: Qimam fellowship */}
                <div className="p-4 rounded-xl border border-[#E0E0E0]/5 bg-[#080808]/40 hover:border-[#DFBEE6]/20 transition-all duration-300 flex flex-col justify-center">
                  <div className="text-sm font-bold text-[#DFBEE6] flex items-center gap-1">
                    <Award size={15} />
                    <span>{isAr ? "برنامج قمم" : "Qimam '26"}</span>
                  </div>
                  <div className="text-[11px] uppercase tracking-widest rtl:tracking-normal text-[#949494] mt-1">
                    {isAr ? "زمالة القيادات الوطنية" : "National Leadership Fellow"}
                  </div>
                </div>
              </div>

              {/* Stat 5: Last Project (Clickable redirecting card) */}
              <div 
                onClick={() => {
                  const forumProj = PROJECTS.find(p => p.id === "forum");
                  if (forumProj) setSelectedProject(forumProj);
                }}
                className="p-4 rounded-xl border border-[#E0E0E0]/5 bg-[#080808]/40 hover:border-[#DFBEE6]/20 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                data-cursor="pointer"
                data-cursor-text={isAr ? "عرض" : "view"}
              >
                <div className="text-[10px] uppercase tracking-widest rtl:tracking-normal text-[#949494] mb-1 font-semibold flex items-center justify-between">
                  <span>{isAr ? "آخر عمل جاري أو مكتمل" : "Latest Active Project"}</span>
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#DFBEE6]" />
                </div>
                <div className="text-sm font-semibold text-[#E0E0E0] font-serif italic group-hover:text-[#DFBEE6] transition-colors leading-tight">
                  {isAr ? "المنتدى السنوي للبحث العلمي 2026" : "Annual Scientific Research Forum 2026"}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FLAGSHIP PROJECTS SECTION */}
      <section 
        id="portfolio" 
        className="py-24 md:py-36 border-t border-[#E0E0E0]/5 bg-[#121013]/30 relative"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest rtl:tracking-normal font-semibold text-[#DFBEE6]">
                02 · {isAr ? "المشاريع الرئيسية" : "Flagship Projects"}
              </span>
              <h2 className="font-serif italic font-medium text-4xl sm:text-5xl md:text-6xl text-[#E0E0E0]">
                {isAr ? "أعمال متميزة غير تقليدية" : "Spatial identity at scale."}
              </h2>
            </div>
            <p className="text-[#949494] max-w-sm text-sm font-light">
              {isAr 
                ? "مشاريع شاملة قمت بقيادتها بشكل منفرد، مغطية التصميم ثلاثي الأبعاد للمنصات، المطبوعات المعمارية وشاشات العرض." 
                : "Full-scale identity rollouts conceptualized and engineered individually, marrying print, stage, and spatial wayfinding."
              }
            </p>
          </div>

          {/* Luxury Case Studies Stack */}
          <div className="space-y-8">
            {PROJECTS.map((project, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative p-8 md:p-12 rounded-2xl border border-[#E0E0E0]/5 hover:border-[#DFBEE6]/30 bg-[#121013]/30 hover:bg-[#121013]/60 backdrop-blur-md cursor-pointer transition-all duration-500"
                data-cursor="pointer"
                data-cursor-text={isAr ? "استكشاف" : "explore"}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Aspect-Ratio Immersive Frame Thumbnail */}
                  <div className="lg:col-span-4 aspect-video lg:aspect-square rounded-xl overflow-hidden border border-[#E0E0E0]/10 bg-[#080808] relative flex items-center justify-center">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          const iconDiv = document.createElement("div");
                          iconDiv.className = "absolute inset-0 flex flex-col items-center justify-center bg-[#121013] p-6 text-center";
                          iconDiv.innerHTML = `
                            <div class="mb-2 p-3 rounded-full bg-[#DFBEE6]/10 text-[#DFBEE6]">
                              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                            </div>
                            <span class="font-serif italic text-sm text-[#E0E0E0]">${isAr ? project.titleAr : project.title}</span>
                          `;
                          parent.appendChild(iconDiv);
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/40 to-transparent pointer-events-none" />
                  </div>

                  {/* Project Content Text Block */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest rtl:tracking-normal text-[#DFBEE6] font-semibold">
                      <span>{isAr ? project.clientAr : project.client}</span>
                      <span>·</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="font-serif italic font-medium text-2xl sm:text-3xl md:text-4xl text-[#E0E0E0] group-hover:text-[#DFBEE6] transition-colors">
                      {isAr ? project.titleAr : project.title}
                    </h3>

                    <p className="text-sm md:text-base text-[#949494] leading-relaxed font-light line-clamp-3">
                      {isAr ? project.briefAr : project.brief}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tools.map((tool) => (
                        <span 
                          key={tool}
                          className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md border border-[#E0E0E0]/10 bg-[#080808]/60 text-[#949494]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Icon (Desktop right aligned) */}
                  <div className="lg:col-span-1 hidden lg:flex items-center justify-end">
                    <div className="w-12 h-12 rounded-full border border-[#E0E0E0]/10 group-hover:border-[#DFBEE6] flex items-center justify-center text-[#949494] group-hover:text-[#DFBEE6] group-hover:scale-110 group-hover:rotate-45 transition-all duration-300">
                      <ArrowRight size={18} />
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. POSTERS & ONGOING GALLERY SECTION */}
      <section 
        id="gallery" 
        className="py-24 md:py-36 border-t border-[#F3F0F6]/5 relative"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest rtl:tracking-normal font-semibold text-[#DFBEE6]">
              03 · {isAr ? "معرض الأعمال والتوعية" : "Ongoing Gallery"}
            </span>
            <h2 className="font-serif italic font-medium text-4xl sm:text-5xl md:text-6xl text-[#E0E0E0]">
              {isAr ? "التفاصيل الصغيرة تصنع التميز" : "The granular print detail."}
            </h2>
            <p className="text-[#949494] text-sm md:text-base max-w-2xl font-light">
              {isAr 
                ? "مجموعة من البوسترات، الحملات الإعلانية المعتمدة للأيام العالمية والأنشطة الطلابية، صُممت لتنشر التوعية وتسرد قصصاً بصرية مكثفة."
                : "A curatorial index of digital posters, editorial layouts, and campus campaigns built for student directories, corporate drives, and cultural holidays."
              }
            </p>
          </div>

          {/* Interactive Filtering and Post Gallery Layout */}
          <GallerySection lang={lang} />
        </div>
      </section>

      {/* 5. SERVICES & SKILLS SECTION */}
      <section 
        id="services" 
        className="py-24 md:py-36 border-t border-[#E0E0E0]/5 bg-[#121013]/30 relative"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest rtl:tracking-normal font-semibold text-[#DFBEE6]">
              04 · {isAr ? "الخدمات والقدرات الفنية" : "Services & Capabilities"}
            </span>
            <h2 className="font-serif italic font-medium text-4xl sm:text-5xl md:text-6xl text-[#E0E0E0]">
              {isAr ? "كيف أضيف قيمة إبداعية لمشروعك؟" : "The design toolbelt."}
            </h2>
          </div>

          {/* Modern 3-Column Bento Grid Services Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            
            {/* Service Block 1 */}
            <div className="p-8 rounded-2xl border border-[#E0E0E0]/5 bg-[#121013]/30 hover:border-[#DFBEE6]/30 transition-all duration-300 space-y-4">
              <div className="p-3 w-fit rounded-xl bg-[#DFBEE6]/10 text-[#DFBEE6]">
                <MousePointerClick size={22} />
              </div>
              <h3 className="font-serif italic text-xl font-medium text-[#E0E0E0]">
                {isAr ? "حملات منصات التواصل" : "Social Campaign Systems"}
              </h3>
              <p className="text-sm text-[#949494] leading-relaxed font-light">
                {isAr 
                  ? "تصميم حملات تسويقية متسلسلة وإعلانات الأيام العالمية بمرونة وسرعة فائقة، مع الحفاظ الكامل على الهوية البصرية للجامعة والمؤسسات."
                  : "Developing serial digital campaigns and commemorative event graphics optimized for digital channels with cohesive structural hierarchy."
                }
              </p>
            </div>

            {/* Service Block 2 */}
            <div className="p-8 rounded-2xl border border-[#E0E0E0]/5 bg-[#121013]/30 hover:border-[#DFBEE6]/30 transition-all duration-300 space-y-4">
              <div className="p-3 w-fit rounded-xl bg-[#C7B9FA]/10 text-[#C7B9FA]">
                <MonitorPlay size={22} />
              </div>
              <h3 className="font-serif italic text-xl font-medium text-[#E0E0E0]">
                {isAr ? "تصميم وهوية الفعاليات الضخمة" : "Event Spatial Identity"}
              </h3>
              <p className="text-sm text-[#949494] leading-relaxed font-light">
                {isAr 
                  ? "بناء مرئيات الفعاليات الكبرى من الصفر وحتى خشبة المسرح، ويشمل شاشات العرض LCD الرقمية، ومكعبات الهوية المضيئة الفاخرة."
                  : "Creating cohesive systems for flagship forums spanning giant physical staging overlays, spatial LCD coordinates, and branding cubes."
                }
              </p>
            </div>

            {/* Service Block 3 */}
            <div className="p-8 rounded-2xl border border-[#E0E0E0]/5 bg-[#121013]/30 hover:border-[#DFBEE6]/30 transition-all duration-300 space-y-4">
              <div className="p-3 w-fit rounded-xl bg-[#C7B9FA]/10 text-[#C7B9FA]">
                <HeartHandshake size={22} />
              </div>
              <h3 className="font-serif italic text-xl font-medium text-[#E0E0E0]">
                {isAr ? "المطبوعات واللوحات الإرشادية" : "Print & Wayfinding Design"}
              </h3>
              <p className="text-sm text-[#949494] leading-relaxed font-light">
                {isAr 
                  ? "إخراج اللوحات الكبيرة، لافتات المعارض المبتكرة، التذاكر، شهادات التخرج، ومسارات التوجيه اللوجستية بدقة طباعية متناهية."
                  : "Drafting production files for architectural arches, informational student galleries, physical badges, certificates, and outdoor flag rollouts."
                }
              </p>
            </div>

          </div>

          {/* Deep-Dive Skill tags categorization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-[#E0E0E0]/10 pt-16">
            {/* Toolkit */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest rtl:tracking-normal font-semibold text-[#DFBEE6]">
                {isAr ? "أدواتي البرمجية والإبداعية" : "Design Toolkit"}
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {["Affinity Designer", "Adobe InDesign", "Canva Pro"].map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 rounded-full border border-[#DFBEE6]/30 bg-[#DFBEE6]/5 text-xs text-[#DFBEE6] font-medium tracking-wide rtl:tracking-normal hover:bg-[#DFBEE6]/15 transition-all duration-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Capabilities */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest rtl:tracking-normal font-semibold text-[#C7B9FA]">
                {isAr ? "القدرات الفنية والخبرات" : "Proven Capabilities"}
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Visual Identity Systems",
                  "Environmental Graphic Design",
                  "Large-Format Production Print",
                  "Bilingual Arabic/English Layouts",
                  "Creative Leadership & Public Relations"
                ].map((cap) => (
                  <span
                    key={cap}
                    className="px-4 py-2 rounded-full border border-[#C7B9FA]/30 bg-[#C7B9FA]/5 text-xs text-[#C7B9FA] font-medium tracking-wide rtl:tracking-normal hover:bg-[#C7B9FA]/15 transition-all duration-300"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section 
        id="contact" 
        className="py-24 md:py-36 border-t border-[#E0E0E0]/5 relative text-center overflow-hidden"
      >
        {/* Massive background Typography */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-[15vw] font-serif italic text-[#E0E0E0]/[0.015] leading-none select-none pointer-events-none w-max">
          BAROUD
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 space-y-8">
          <span className="text-xs uppercase tracking-widest rtl:tracking-normal font-semibold text-[#DFBEE6]">
            05 · {isAr ? "قنوات التواصل الفوري" : "Available for collaboration"}
          </span>

          <h2 className="font-serif italic font-medium text-4xl sm:text-6xl md:text-7xl text-[#E0E0E0] tracking-tight leading-tight">
            {isAr ? "لنصنع معاً مرئيات وتصاميم استثنائية" : "Let's create exceptional visuals & designs."}
          </h2>

          <p className="text-sm md:text-base text-[#949494] max-w-xl mx-auto leading-relaxed font-light">
            {isAr 
              ? "سواء كنت ترغب في تصميم مرئيات لفعاليتك الأكاديمية القادمة، أو بناء حملة إعلامية متسقة، تواصل معي وسنتعاون لإبرازها بأفضل صورة طباعية ورقمية."
              : "Whether you seek custom visuals for your next academic event, or a cohesive marketing campaign, get in touch and we will collaborate to deliver it in pristine print and digital form."
            }
          </p>

          {/* Magnetic high-contrast channels buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/balsam-baroud/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-[#E0E0E0]/10 hover:border-[#DFBEE6] bg-[#121013]/40 text-xs font-semibold uppercase tracking-wider rtl:tracking-normal text-[#E0E0E0] hover:text-[#DFBEE6] hover:scale-105 active:scale-95 transition-all duration-300"
              data-cursor="pointer"
              data-cursor-text={isAr ? "لينكد إن" : "linkedin"}
            >
              <Linkedin size={15} />
              <span>LinkedIn Profile</span>
            </a>

            {/* Email */}
            <a
              href="mailto:balsambaroud.work@gmail.com"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-[#E0E0E0]/10 hover:border-[#DFBEE6] bg-[#121013]/40 text-xs font-semibold uppercase tracking-wider rtl:tracking-normal text-[#E0E0E0] hover:text-[#DFBEE6] hover:scale-105 active:scale-95 transition-all duration-300"
              data-cursor="pointer"
              data-cursor-text={isAr ? "بريد" : "email"}
            >
              <Mail size={15} />
              <span>balsambaroud.work@gmail.com</span>
            </a>

            {/* Telephone */}
            <a
              href="tel:+966532199022"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-[#E0E0E0]/10 hover:border-[#DFBEE6] bg-[#121013]/40 text-xs font-semibold uppercase tracking-wider rtl:tracking-normal text-[#E0E0E0] hover:text-[#DFBEE6] hover:scale-105 active:scale-95 transition-all duration-300"
              data-cursor="pointer"
              data-cursor-text={isAr ? "اتصال" : "call"}
            >
              <Phone size={15} />
              <span>+966 53 219 9022</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-[#949494] pt-6 font-light">
            <MapPin size={13} className="text-[#DFBEE6]" />
            <span>{isAr ? "المدينة المنورة، المملكة العربية السعودية" : "Madinah, Saudi Arabia"}</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E0E0E0]/5 py-8 text-center text-xs text-[#949494] relative z-10 font-light bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © 2026 Balsam Baroud. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </div>
          <div className="font-serif italic text-[#E0E0E0]/60">
            {isAr ? "صُنع الشغف للتفاصيل البصرية." : "Crafted with architectural design intent."}
          </div>
        </div>
      </footer>

      {/* Full screen Case study modal rendering under state */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectDetailModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              lang={lang}
              onNavigate={handleProjectNavigation}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
