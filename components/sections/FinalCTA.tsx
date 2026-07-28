import Reveal from "@/components/Reveal";

export default function FinalCTA() {
  return (
    <section id="demo" className="relative overflow-hidden py-[110px] text-center">
      <div className="absolute -bottom-52 right-[30%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,#0fb89a55,transparent_70%)] opacity-40 blur-[90px]" />
      <div className="wrap relative z-[2]">
        <Reveal>
          <span className="eyebrow eyebrow-center mb-4">Book a demo</span>
          <h2 className="display mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">
            See PGAK protect a space in real time.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[1.1rem] text-ink-soft">
            In 20 minutes, we&rsquo;ll show you exactly how PGAK turns your
            existing cameras into an intelligent security system — live, on a
            real feed.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a href="#dealer" className="btn btn-primary">
              Book a free demo →
            </a>
            <a href="#contact" className="btn btn-ghost">
              Contact us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
