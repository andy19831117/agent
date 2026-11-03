"use client";

import { useEffect, useRef, useState } from "react";

export function CopyPromptButton({
  text,
  label,
}: {
  text: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    setCopied(true);
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
    await writeClipboard(text);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      aria-label={copied ? "已复制" : `复制${label}`}
      className="shrink-0 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-slate-200 transition hover:border-indigo-400/40"
    >
      {copied ? "已复制" : "复制"}
    </button>
  );
}

async function writeClipboard(text: string) {
  if (!navigator.clipboard?.writeText) {
    copyWithSelection(text);
    return;
  }
  const write = navigator.clipboard.writeText(text).then(
    () => "copied" as const,
    () => "failed" as const,
  );
  const result = await Promise.race([write, delay("timeout" as const, 800)]);
  if (result !== "copied") copyWithSelection(text);
}

function delay<T>(value: T, ms: number) {
  return new Promise<T>((resolve) => {
    window.setTimeout(() => resolve(value), ms);
  });
}

function copyWithSelection(text: string) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.top = "0";
  area.style.left = "-9999px";
  document.body.appendChild(area);
  area.focus();
  area.select();
  try {
    document.execCommand("copy");
  } catch {
    /* ignore */
  }
  area.remove();
}
