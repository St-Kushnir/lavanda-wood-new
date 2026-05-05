import type { ReactNode } from "react";

export type MissingMediaKind = "image" | "icon" | "video" | "logo" | "map";

type MediaPlaceholderProps = {
  kind: MissingMediaKind;
  /** Лише для коду / a11y; на екрані не показується. */
  description?: string;
  className?: string;
  children?: ReactNode;
  compact?: boolean;
};

/**
 * Нейтральний резерв під медіа: без пояснень для відвідувача про файли чи наповнення.
 */
export function MediaPlaceholder({ kind, description, className = "", children, compact: _compact }: MediaPlaceholderProps) {
  void kind;
  void description;
  void _compact;

  return (
    <div
      role="presentation"
      aria-hidden
      className={[
        "flex flex-col items-center justify-center gap-3 border border-dashed border-[#C6A36D]/35 bg-[#141414]/90",
        "text-center transition-colors hover:border-[#C6A36D]/55",
        className,
      ].join(" ")}
    >
      <span className="h-px w-10 bg-[#C6A36D]/40" aria-hidden />
      {children}
    </div>
  );
}
