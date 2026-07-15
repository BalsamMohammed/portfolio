import { useState, useRef } from "react";
import { GalleryItem, Language } from "../types";
import { GALLERY_ITEMS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, ChevronLeft, ChevronRight, ArrowLeftRight } from "lucide-react";

interface GallerySectionProps {
  lang: Language;
}

export default function GallerySection({ lang }: GallerySectionProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isAr = lang === "ar";

  // Display all gallery items directly
  const filteredItems = GALLERY_ITEMS;

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      // In RTL, standard browser scrolling behaves inverted under coordinates.
      // We check writing direction and adjust the sign.
      const multiplier = isAr ? -1 : 1;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount * multiplier : scrollAmount * multiplier,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="w-full">
      {/* Horizontal Carousel Experience */}
      <div className="relative group/carousel">
        {/* Navigation Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-[-15px] sm:left-[-30px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#E0E0E0]/10 bg-[#121013]/90 hover:bg-[#DFBEE6]/20 hover:border-[#DFBEE6] text-[#949494] hover:text-[#E0E0E0] hover:scale-105 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-xl backdrop-blur-md cursor-pointer"
          data-cursor="pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-[-15px] sm:right-[-30px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#E0E0E0]/10 bg-[#121013]/90 hover:bg-[#DFBEE6]/20 hover:border-[#DFBEE6] text-[#949494] hover:text-[#E0E0E0] hover:scale-105 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-xl backdrop-blur-md cursor-pointer"
          data-cursor="pointer"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 py-6 px-4 scrollbar-none snap-x snap-mandatory scroll-smooth w-full select-none cursor-grab active:cursor-grabbing"
          style={{ direction: isAr ? "rtl" : "ltr" }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="flex-shrink-0 w-[250px] sm:w-[280px] md:w-[310px] aspect-[3/4] snap-start relative rounded-xl overflow-hidden border border-[#E0E0E0]/5 bg-[#121013] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[#DFBEE6]/30"
                data-cursor="pointer"
                data-cursor-text={isAr ? "تكبير" : "expand"}
              >
                {/* Badge if present */}
                {(item.badge || item.badgeAr) && (
                  <div className="absolute top-2.5 left-2.5 z-10 bg-[#DFBEE6] text-[#080808] text-[9px] uppercase tracking-wider rtl:tracking-normal font-extrabold px-2.5 py-1 rounded-full shadow-md leading-none">
                    {isAr ? item.badgeAr || item.badge : item.badge}
                  </div>
                )}

                {/* Poster image with dynamic placeholder */}
                <img
                  src={`/assets/gallery/${item.filename}`}
                  alt={isAr ? item.labelAr : item.label}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement("div");
                      fallback.className = "absolute inset-0 flex flex-col items-center justify-center p-5 bg-radial from-[#121013] via-[#080808] to-[#080808] text-center border border-[#E0E0E0]/5 rounded-xl";
                      
                      const color = item.category === "awareness" ? "text-[#DFBEE6]" : item.category === "events" ? "text-[#C7B9FA]" : "text-[#DFBEE6]";
                      const labelStyle = "font-serif italic text-sm text-[#E0E0E0] line-clamp-2 px-2 mb-1.5 leading-snug";
                      
                      fallback.innerHTML = `
                        <div class="mb-3 p-3.5 rounded-full bg-[#E0E0E0]/5 ${color}">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><circle cx="10" cy="13" r="2"/><path d="m20 17-1.2-1.2"/></svg>
                        </div>
                        <p class="${labelStyle}">${isAr ? item.labelAr : item.label}</p>
                        <span class="text-[9px] text-[#949494] uppercase tracking-widest rtl:tracking-normal font-sans font-medium">${isAr ? "ملصق بصري" : "Spatial Poster Print"}</span>
                      `;
                      parent.appendChild(fallback);
                    }
                  }}
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-widest rtl:tracking-normal font-bold text-[#DFBEE6]">
                      {item.category === "clubs" ? (isAr ? "منظمات طلابية" : "Student Orgs") : (isAr ? "بوستر إعلامي" : "PR Media")}
                    </span>
                    <Maximize2 size={12} className="text-[#949494]" />
                  </div>
                  <h4 className="font-serif italic text-[#E0E0E0] text-sm leading-snug line-clamp-2">
                    {isAr ? item.labelAr : item.label}
                  </h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Swipe interaction hints */}
        <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs text-[#949494]/60 mt-2 uppercase tracking-widest rtl:tracking-normal font-sans font-medium">
          <ArrowLeftRight size={13} className="animate-pulse text-[#DFBEE6]" />
          <span>{isAr ? "اسحب لليمين أو اليسار للتصفح المالي" : "Swipe left or right to explore posters"}</span>
        </div>
      </div>

      {/* Full screen Lightbox overlay */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
            onClick={() => setSelectedItem(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-3 rounded-full border border-[#E0E0E0]/10 hover:bg-[#E0E0E0]/10 text-[#949494] hover:text-[#E0E0E0] transition-all duration-300"
              data-cursor="pointer"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>

            {/* Poster Frame */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-full max-h-[70vh] aspect-[3/4] rounded-xl overflow-hidden border border-[#E0E0E0]/10 bg-[#121013] shadow-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Stop propagation from closing light box
            >
              <img
                src={`/assets/gallery/${selectedItem.filename}`}
                alt={isAr ? selectedItem.labelAr : selectedItem.label}
                className="w-full h-full object-contain"
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
                      <h4 class="font-serif italic text-xl text-[#E0E0E0] mb-2">${isAr ? selectedItem.labelAr : selectedItem.label}</h4>
                      <p class="text-xs text-[#949494] uppercase tracking-widest rtl:tracking-normal leading-relaxed">${isAr ? "منشور رسمي — الجامعة العربية المفتوحة" : "Official Publication Deliverable — Arab Open University"}</p>
                    `;
                    parent.appendChild(fallback);
                  }
                }}
              />
            </motion.div>

            {/* Information Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="max-w-lg text-center mt-6 p-4"
              onClick={(e) => e.stopPropagation()}
              style={{ direction: isAr ? "rtl" : "ltr" }}
            >
              <span className="text-xs uppercase tracking-widest rtl:tracking-normal text-[#DFBEE6] font-semibold">
                {selectedItem.category === "clubs" ? (isAr ? "منظمات طلابية" : "Student Clubs") : (isAr ? "العلاقات العامة والإعلام" : "PR & Graphic Media")}
              </span>
              <h3 className="font-serif italic text-xl md:text-2xl font-medium text-[#E0E0E0] mt-2 mb-3">
                {isAr ? selectedItem.labelAr : selectedItem.label}
              </h3>
              <p className="text-xs text-[#949494] leading-relaxed">
                {selectedItem.category === "clubs"
                  ? (isAr ? "منشور رسمي معتمد من الأندية الطلابية والجامعة العربية المفتوحة." : "Official publication piece approved by the clubs and AOU")
                  : (isAr ? "منشور رسمي مصمم ومعتمد من قبل الجامعة العربية المفتوحة." : "Official publication piece designed, approved, By AOU")
                }
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
