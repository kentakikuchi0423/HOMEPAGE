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
      className={`bg-paper px-6 py-20 md:py-32 reveal ${inView ? "is-visible" : ""}`}
    >
      <div className="mx-auto max-w-5xl md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12">
        <SectionHeading en="POLICY">政策</SectionHeading>

        <ol className="border-t border-ink/15">
          {siteConfig.policies.map((policy, i) => (
            <li
              key={policy.title}
              className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 border-b border-ink/15 py-8 sm:grid-cols-[4rem_minmax(0,1fr)]"
            >
              <span
                className="font-display text-lg leading-[1.9] text-brand"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-bold leading-[1.9] tracking-[0.06em] text-ink">
                  {policy.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] text-sub">{policy.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
