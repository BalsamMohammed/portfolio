import { useState, useEffect } from "react";
import { Language } from "../types";
import { Menu, X, Globe, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  activeSection: string;
}

export default function Header({ lang, setLang, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-hide navigation on scroll-down, show on scroll-up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled enough to blur the background
      setIsScrolled(currentScrollY > 20);

      // Hide or show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { id: "about", label: "About", labelAr: "نبذة" },
    { id: "portfolio", label: "Projects", labelAr: "المشاريع" },
    { id: "gallery", label: "Gallery", labelAr: "المعرض" },
    { id: "services", label: "Services", labelAr: "الخدمات" },
    { id: "contact", label: "Contact", labelAr: "اتصال" },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const isAr = lang === "ar";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#080808]/85 backdrop-blur-md border-b border-[#E0E0E0]/10 py-4 shadow-lg shadow-black/10" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Name */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group text-left rtl:text-right"
            data-cursor="pointer"
            data-cursor-text={isAr ? "البداية" : "top"}
          >
            <span className="font-serif italic text-lg md:text-xl font-bold tracking-tight rtl:tracking-normal text-[#E0E0E0] group-hover:text-[#DFBEE6] transition-colors duration-300">
              {isAr ? "بلسم بارود" : "Balsam Baroud"}
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const active = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-sm font-medium tracking-wide uppercase relative py-1 transition-colors duration-300 ${
                    active ? "text-[#DFBEE6]" : "text-[#949494] hover:text-[#E0E0E0]"
                  }`}
                  data-cursor="pointer"
                >
                  {isAr ? link.labelAr : link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#DFBEE6]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Tools (Language toggle + contact) */}
          <div className="flex items-center gap-4">
            {/* Elegant Language Switcher */}
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E0E0E0]/10 hover:border-[#DFBEE6]/30 bg-[#121013]/40 hover:bg-[#DFBEE6]/10 text-xs font-semibold tracking-wider rtl:tracking-normal text-[#949494] hover:text-[#DFBEE6] transition-all duration-300"
              data-cursor="pointer"
              data-cursor-text={isAr ? "English" : "العربية"}
              title="Toggle Language"
            >
              <Globe size={13} className={isAr ? "" : "animate-spin-slow"} />
              <span>{isAr ? "EN" : "العربية"}</span>
            </button>

            {/* Let's Work Button (Desktop) */}
            <button
              onClick={() => handleLinkClick("contact")}
              className="hidden sm:flex items-center gap-1 px-5 py-2 rounded-full bg-[#DFBEE6] text-[#080808] text-xs font-bold uppercase tracking-wider rtl:tracking-normal hover:bg-[#DFBEE6]/80 hover:scale-105 active:scale-95 transition-all duration-300"
              data-cursor="pointer"
            >
              <span>{isAr ? "تواصل معي" : "Hire Me"}</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#949494] hover:text-[#E0E0E0] focus:outline-none md:hidden rounded-full hover:bg-[#E0E0E0]/5"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Navigation overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-[65px] bg-[#080808]/98 backdrop-blur-xl z-40 md:hidden flex flex-col p-8 justify-between border-t border-[#E0E0E0]/10"
            style={{ direction: isAr ? "rtl" : "ltr" }}
          >
            <div className="flex flex-col gap-6 py-8">
              {navLinks.map((link) => {
                const active = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-2xl font-serif italic font-medium text-left ${
                      isAr ? "text-right" : "text-left"
                    } py-2 border-b border-[#E0E0E0]/5 transition-colors duration-300 ${
                      active ? "text-[#DFBEE6]" : "text-[#E0E0E0]"
                    }`}
                  >
                    <span className="text-[#949494] font-sans text-xs uppercase tracking-widest mr-4 inline-block">
                      0{navLinks.indexOf(link) + 1}
                    </span>
                    {isAr ? link.labelAr : link.label}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-[#E0E0E0]/10 pt-6 pb-12 flex flex-col gap-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLinkClick("contact");
                }}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#DFBEE6] text-[#080808] text-sm font-bold uppercase tracking-wider rtl:tracking-normal"
              >
                <span>{isAr ? "تواصل معي" : "Hire Me"}</span>
                <ArrowUpRight size={16} />
              </button>
              <div className="text-center text-xs text-[#9b96a3]">
                © 2026 {isAr ? "بلسم بارود" : "Balsam Baroud"}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
