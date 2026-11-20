import { siteConfig } from "@/content/site";

export default function NotFound() {
  const { title, message, linkLabel } = siteConfig.notFound;

  return (
    <section className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="text-[0.8125rem] font-medium tracking-[0.2em] text-brand">404</p>
        <h1 className="mt-3 font-display text-[1.75rem] font-semibold leading-snug tracking-[0.06em] text-ink sm:text-[1.875rem]">
          {title}
        </h1>
        <p className="mt-6 text-base text-sub">{message}</p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- 1 ページ構成のため、通常のリンクでトップを読み込む */}
        <a
          href="/"
          className="arrow-link mt-10 inline-flex items-center gap-8 bg-brand py-3.5 pl-7 pr-6 text-[0.9375rem] tracking-[0.12em] text-white transition-colors hover:bg-ink"
        >
          {linkLabel}
          <span className="arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
