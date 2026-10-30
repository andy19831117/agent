import Link from "next/link";
import {
  clampChars,
  resolveSponsorTopBar,
  sponsorTopBar,
  SPONSOR_CTA_MAX,
  SPONSOR_HEADLINE_MAX,
  SPONSOR_SUBLINE_MAX,
  type SponsorTopBarModel,
} from "@/data/sponsors";

const ctaClass =
  "shrink-0 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-sm text-amber-100 hover:bg-amber-400/20";

const shellClass = "mx-auto flex w-full max-w-6xl items-center px-4 sm:px-6";

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

export function SponsorTopBar({
  model = sponsorTopBar,
}: {
  model?: SponsorTopBarModel;
}) {
  const shown = resolveSponsorTopBar(model);

  return (
    <div
      data-sponsor-state={shown.mode}
      className="box-border flex min-h-14 items-center border-b border-amber-400/20 bg-gradient-to-r from-amber-950/80 via-orange-950/50 to-slate-950 sm:h-16"
    >
      <div className={shellClass}>
        {shown.mode === "empty" ? <EmptyBar /> : <FilledBar model={shown} />}
      </div>
    </div>
  );
}

function EmptyBar() {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <p className="min-w-0 flex-1 text-sm font-medium leading-5 text-amber-50">
        成为赞助商——支持中文 Agent 生态
      </p>
      <Link href="/sponsors" className={ctaClass}>
        了解赞助
      </Link>
    </div>
  );
}

function FilledBar({
  model,
}: {
  model: Extract<SponsorTopBarModel, { mode: "filled" }>;
}) {
  const headline = clampChars(model.headline.trim(), SPONSOR_HEADLINE_MAX);
  const subline = model.subline?.trim()
    ? clampChars(model.subline.trim(), SPONSOR_SUBLINE_MAX)
    : "";
  const cta = clampChars(model.cta.trim(), SPONSOR_CTA_MAX);
  const className =
    "flex w-full flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3";

  const body = (
    <>
      <span className="flex min-w-0 items-center gap-2">
        {model.logoSrc ? (
          // Sponsor logos are operator URLs and are not listed in images.remotePatterns.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={model.logoSrc}
            alt={model.logoAlt}
            className="h-6 w-auto max-w-[7rem] shrink-0 object-contain sm:h-7"
          />
        ) : null}
        <span className="truncate text-sm font-medium text-amber-50">{headline}</span>
      </span>
      <span className="flex min-w-0 items-center justify-between gap-3 sm:justify-end">
        {subline ? (
          <span className="truncate text-sm text-amber-100/85">{subline}</span>
        ) : null}
        <span className={ctaClass}>{cta}</span>
      </span>
    </>
  );

  if (isExternal(model.href)) {
    return (
      <a
        href={model.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={model.href} className={className}>
      {body}
    </Link>
  );
}
