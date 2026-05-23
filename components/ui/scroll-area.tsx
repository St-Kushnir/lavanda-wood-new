"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  orientation?: "vertical" | "horizontal" | "both";
}

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, orientation = "vertical", ...props }, ref) => {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [showTopShadow, setShowTopShadow] = React.useState(false);
  const [showBottomShadow, setShowBottomShadow] = React.useState(false);

  const updateShadows = React.useCallback(() => {
    if (orientation === "horizontal") return;
    const el = viewportRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;

    const noScroll = scrollHeight <= clientHeight;
    setShowTopShadow(!noScroll && scrollTop > 0);
    setShowBottomShadow(!noScroll && scrollTop + clientHeight < scrollHeight);
  }, [orientation]);

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    updateShadows();

    el.addEventListener("scroll", updateShadows);

    const resizeObserver = new ResizeObserver(updateShadows);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", updateShadows);
      resizeObserver.disconnect();
    };
  }, [updateShadows]);

  return (
    <ScrollAreaPrimitive.Root ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        className={cn(
          "h-full w-full rounded-[inherit]",
          orientation === "vertical" && !(showTopShadow || showBottomShadow) && "overflow-x-hidden overflow-y-hidden",
          orientation === "horizontal" && "overflow-y-hidden"
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>

      {orientation !== "horizontal" && showTopShadow && (
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-8 bg-gradient-to-b from-[#0B0B0C] to-transparent" />
      )}

      {orientation !== "horizontal" && showBottomShadow && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-8 bg-gradient-to-t from-[#0B0B0C] to-transparent" />
      )}

      {(orientation === "vertical" || orientation === "both") && <ScrollBar orientation="vertical" />}
      {(orientation === "horizontal" || orientation === "both") && <ScrollBar orientation="horizontal" />}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2 flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-white/10 hover:bg-[#C6A36D]/40 transition-colors duration-300" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollBar };
