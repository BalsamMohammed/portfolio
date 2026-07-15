import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const ringRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if device is touch-based
    const checkTouch = () => {
      setIsTouchDevice(
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      );
    };
    checkTouch();

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    if (!isTouchDevice) {
      window.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseleave", onMouseLeave);
    }

    // Dynamic scale and content based on hover target
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if target or parent is clickable or has custom cursor data
      const interactiveEl = target.closest("[data-cursor]");
      if (interactiveEl) {
        setIsHovered(true);
        const text = interactiveEl.getAttribute("data-cursor-text") || "";
        setCursorText(text);
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isTouchDevice]);

  // Inertial follow for the outer ring
  useEffect(() => {
    if (isTouchDevice) return;

    const followMouse = () => {
      setRingPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Ease value: lower = slower/smoother follow
        const ease = 0.15;
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease,
        };
      });
      requestRef.current = requestAnimationFrame(followMouse);
    };

    requestRef.current = requestAnimationFrame(followMouse);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundColor: isHovered ? "#080808" : "#e05a3e",
          width: isHovered ? "0px" : "8px",
          height: isHovered ? "0px" : "8px",
        }}
      />
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="custom-cursor-ring flex items-center justify-center font-display"
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
          width: isHovered ? (cursorText ? "80px" : "56px") : "36px",
          height: isHovered ? (cursorText ? "80px" : "56px") : "36px",
          borderColor: isHovered ? "#e05a3e" : "rgba(224, 90, 62, 0.4)",
          backgroundColor: isHovered ? "rgba(224, 90, 62, 0.95)" : "transparent",
        }}
      >
        {isHovered && cursorText && (
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#080808] text-center px-1 leading-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
