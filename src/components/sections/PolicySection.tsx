"use client";
import { siteConfig } from "@/content/site";
import { useInView } from "@/hooks/useInView";
import SectionHeading from "@/components/ui/SectionHeading";

export default function PolicySection() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id="policy"
      className={`bg-paper px-6 py-16 md:py-20 reveal ${inView ? "is-visible" : ""}`}
    >
      <div className="mx-auto max-w-5xl md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12">
        <SectionHeading en="POLICY">政策</SectionHeading>

        <ol className="border-t border-brand/25">
          {siteConfig.policies.map((policy, i) => (
            <li
              key={policy.title}
              className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 border-b border-brand/25 py-8 sm:grid-cols-[4rem_minmax(0,1fr)]"
            >
              <span
                className="font-display text-xl leading-[1.75] text-brand"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[1.1875rem] font-bold leading-[1.8] tracking-[0.06em] text-ink">
                  {policy.title}
                </h3>
                <p className="mt-2 text-base text-sub">{policy.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
