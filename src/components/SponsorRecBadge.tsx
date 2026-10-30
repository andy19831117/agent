import {
  clampChars,
  DEFAULT_REC_TOOLTIP,
  SPONSOR_REC_TOOLTIP_MAX,
} from "@/data/sponsors";

export function SponsorRecBadge({
  tooltip,
  href,
}: {
  tooltip?: string;
  href?: string;
}) {
  const label = clampChars(
    (tooltip?.trim() || DEFAULT_REC_TOOLTIP).trim(),
    SPONSOR_REC_TOOLTIP_MAX,
  );

  const chip = (
    <span
      className="inline-flex h-4 items-center rounded border border-amber-400/40 bg-amber-400/15 px-1 text-[10px] font-medium leading-none text-amber-100"
      title={label}
    >
      荐
    </span>
  );

  return (
    <span className="group/rec relative inline-flex">
      {href ? (
        <a
          href={href}
          target={/^https?:\/\//.test(href) ? "_blank" : undefined}
          rel={/^https?:\/\//.test(href) ? "noopener noreferrer" : undefined}
          aria-label={`赞助推荐：${label}`}
          className="inline-flex"
        >
          {chip}
        </a>
      ) : (
        <span aria-label={`赞助推荐：${label}`} className="inline-flex">
          {chip}
        </span>
      )}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden w-max max-w-[14rem] -translate-x-1/2 rounded-md border border-amber-400/30 bg-slate-950 px-2 py-1 text-left text-[11px] leading-snug text-amber-50 group-hover/rec:block"
      >
        {label}
      </span>
    </span>
  );
}
