import type { ReactNode } from "react";
import type { UseCasePrimarySource, UseCasePrompt } from "@/data/types";
import { CopyPromptButton } from "./CopyPromptButton";

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function UseCaseNarrative({
  approach,
  outcomes,
  caveats,
  prompts,
  primarySource,
}: {
  approach?: string;
  outcomes?: string[];
  caveats?: string[];
  prompts?: UseCasePrompt[];
  primarySource?: UseCasePrimarySource;
}) {
  const approachText = approach?.trim() ?? "";
  const outcomeLines = cleanLines(outcomes);
  const caveatLines = cleanLines(caveats);
  const promptBlocks = cleanPrompts(prompts);
  const source = cleanSource(primarySource);
  const complete =
    approachText.length > 0 &&
    outcomeLines.length > 0 &&
    caveatLines.length > 0 &&
    promptBlocks.length > 0 &&
    source !== undefined;

  return (
    <section className="surface-card rounded-2xl p-6" aria-labelledby="usecase-narrative">
      <h2 id="usecase-narrative" className="text-base font-semibold text-slate-100">
        案例叙事
      </h2>
      {complete ? null : (
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          还没写完的部分用虚线标出。补上公开资料后，这里会换成正文。
        </p>
      )}
      <div className="mt-5 divide-y divide-white/10">
        <NarrativeSection index="01" title="他们做了什么">
          {approachText ? (
            <ApproachBody text={approachText} />
          ) : (
            <NarrativePlaceholder>
              做法整理中。补上公开的实现路径后，这里会写他们具体做了什么。
            </NarrativePlaceholder>
          )}
        </NarrativeSection>

        <NarrativeSection index="02" title="实际效果">
          {outcomeLines.length > 0 ? (
            <NarrativeList items={outcomeLines} />
          ) : (
            <NarrativePlaceholder>还没有可核对的效果说明。</NarrativePlaceholder>
          )}
        </NarrativeSection>

        <NarrativeSection index="03" title="值得知道">
          {caveatLines.length > 0 ? (
            <NarrativeList items={caveatLines} />
          ) : (
            <NarrativePlaceholder>暂无需要单独留意的限制或前提。</NarrativePlaceholder>
          )}
        </NarrativeSection>

        <NarrativeSection index="04" title="可复制提示词">
          {promptBlocks.length > 0 ? (
            <div className="mt-3 space-y-3">
              {promptBlocks.map((prompt) => (
                <article
                  key={`${prompt.title}\n${prompt.body}`}
                  className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/40"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
                    <h4 className="text-sm font-medium text-slate-100">{prompt.title}</h4>
                    <CopyPromptButton text={prompt.body} label={prompt.title} />
                  </div>
                  <pre className="overflow-x-auto whitespace-pre-wrap break-words px-4 py-3 font-mono text-[13px] leading-relaxed text-slate-300">
                    {prompt.body}
                  </pre>
                </article>
              ))}
            </div>
          ) : (
            <NarrativePlaceholder>
              提示词尚未收录。可以先看下方「怎么做」里的步骤。
            </NarrativePlaceholder>
          )}
        </NarrativeSection>

        <NarrativeSection index="05" title="一手来源">
          {source ? (
            <PrimarySource source={source} />
          ) : (
            <NarrativePlaceholder>
              还没有带日期的一手链接。页首「来源」仍指向这条用例现有的公开链接。
            </NarrativePlaceholder>
          )}
        </NarrativeSection>
      </div>
    </section>
  );
}

function NarrativeSection({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="py-5 first:pt-0 last:pb-0">
      <h3 className="flex items-baseline gap-2 text-base font-semibold text-slate-100">
        <span className="font-mono text-xs font-medium text-indigo-300/90">{index}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function NarrativePlaceholder({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-xl border border-dashed border-white/15 bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-slate-500">
      {children}
    </p>
  );
}

function ApproachBody({ text }: { text: string }) {
  const paragraphs = text
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  return (
    <div className="mt-3 space-y-3">
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="leading-relaxed text-slate-300">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function NarrativeList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
      {items.map((item) => (
        <li key={item} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

function PrimarySource({ source }: { source: UseCasePrimarySource }) {
  const dateLabel = source.dateLabel?.trim() || "日期";
  const formatted = formatNarrativeDate(source.date);
  const iso = ISO_DATE.test(source.date.trim()) ? source.date.trim() : undefined;
  const linkable = isHttpUrl(source.url);

  return (
    <div className="mt-3 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      {linkable ? (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 text-sm font-medium text-cyan-200 transition hover:text-cyan-100 hover:underline"
        >
          {source.label} ↗
        </a>
      ) : (
        <p className="min-w-0 text-sm font-medium text-slate-200">{source.label}</p>
      )}
      <p className="shrink-0 text-sm text-slate-300">
        <span className="mr-2 text-xs text-slate-500">{dateLabel}</span>
        {iso ? <time dateTime={iso}>{formatted}</time> : formatted}
      </p>
    </div>
  );
}

function cleanLines(items?: string[]): string[] {
  return (items ?? []).map((item) => item.trim()).filter(Boolean);
}

function cleanPrompts(prompts?: UseCasePrompt[]): UseCasePrompt[] {
  return (prompts ?? [])
    .map((prompt) => ({
      title: prompt.title.trim() || "提示词",
      body: prompt.body.trim(),
    }))
    .filter((prompt) => prompt.body.length > 0);
}

function cleanSource(source?: UseCasePrimarySource): UseCasePrimarySource | undefined {
  if (!source) return undefined;
  const url = source.url.trim();
  const label = source.label.trim();
  const date = source.date.trim();
  if (!url || !label || !date) return undefined;
  const dateLabel = source.dateLabel?.trim();
  return dateLabel ? { url, label, date, dateLabel } : { url, label, date };
}

function formatNarrativeDate(iso: string): string {
  const match = ISO_DATE.exec(iso.trim());
  if (!match) return iso.trim();
  return `${match[1]}年${Number(match[2])}月${Number(match[3])}日`;
}

function isHttpUrl(url: string): boolean {
  return url.startsWith("https://") || url.startsWith("http://");
}
