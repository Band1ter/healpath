import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        className="relative px-4 py-20 text-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 40% 60%, rgba(236,72,153,0.2) 0%, rgba(15,10,30,0) 65%), #0F0A1E",
        }}
      >
        <p className="text-xs font-medium tracking-widest text-[#9B8AC4] uppercase mb-4">
          About HealPath
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-[#F0EBF8] mb-4 leading-tight">
          Built for survivors,{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #A78BFA, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            by someone who cares.
          </span>
        </h1>
        <p className="text-[#9B8AC4] text-lg max-w-2xl mx-auto leading-relaxed">
          HealPath was created by Rishika Giriraddi, a high school student from
          North Brunswick, NJ — to make help feel reachable for survivors of
          domestic violence and sexual assault in Middlesex County and beyond.
        </p>
      </section>

      {/* About grid — brief's 2×2 cards */}
      <section className="px-4 py-12 bg-[#0F0A1E]">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {/* Mission */}
          <div className="bg-[#1A1030] border border-[#3D2B6B] rounded-2xl p-7">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
              style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </div>
            <h2 className="font-heading font-semibold text-[#F0EBF8] text-lg mb-2">Our Mission</h2>
            <p className="text-[#9B8AC4] text-sm leading-relaxed">
              Too many survivors face their hardest moments alone — not because
              help doesn&apos;t exist, but because finding it feels impossible when
              you&apos;re scared. HealPath exists to lower that barrier. We connect
              survivors to free hotlines, legal aid, shelter, and medical resources
              in one safe, judgment-free space.
            </p>
          </div>

          {/* Privacy First */}
          <div className="bg-[#1A1030] border border-[#3D2B6B] rounded-2xl p-7">
            <div className="w-10 h-10 bg-[#241840] rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#34D399" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <h2 className="font-heading font-semibold text-[#F0EBF8] text-lg mb-2">Privacy First</h2>
            <p className="text-[#9B8AC4] text-sm leading-relaxed">
              HealPath collects no personal information — no name, no email, no
              account. Stories are submitted anonymously. Conversations with Sage
              are never stored. We do not use cookies or analytics trackers. You
              can use this platform and leave no trace.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-2 h-2 rounded-full bg-[#34D399]" />
              <span className="text-xs text-[#34D399] font-medium">Zero data collected</span>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-[#1A1030] border border-[#3D2B6B] rounded-2xl p-7">
            <div className="w-10 h-10 bg-[#2e1a1a] rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FF4D6A" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <h2 className="font-heading font-semibold text-[#F0EBF8] text-lg mb-2">Disclaimer</h2>
            <p className="text-[#9B8AC4] text-sm leading-relaxed">
              HealPath provides general information and peer support — not legal
              advice, medical advice, or professional counseling. Sage is an AI
              companion, not a licensed therapist or attorney. For your specific
              situation, please consult a licensed professional or call one of the
              hotlines listed on this site. If you are in immediate danger, call 911.
            </p>
          </div>
        </div>
      </section>

      {/* Creator section */}
      <section className="bg-[#1A1030] border-y border-[#3D2B6B] px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-medium tracking-widest text-[#9B8AC4] uppercase mb-4">
            The Creator
          </p>
          <h2 className="font-heading text-2xl font-semibold text-[#F0EBF8] mb-4">
            Rishika Giriraddi
          </h2>
          <p className="text-[#9B8AC4] leading-relaxed mb-6">
            A high school student at North Brunswick Township High School in
            Middlesex County, NJ. HealPath began as a conviction: that technology
            should lower barriers to safety, not raise them. This platform is
            designed for real use by real people in crisis — and it is offered
            freely, with no agenda other than helping survivors find their footing.
          </p>
          <p className="font-heading text-[#A78BFA] italic text-lg">
            &ldquo;Reaching out is an act of courage. HealPath exists to make the
            first step feel a little safer.&rdquo;
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-14 text-center bg-[#0F0A1E]">
        <h3 className="font-heading text-xl text-[#F0EBF8] mb-6">
          Ready to find help?
        </h3>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/resources"
            className="px-6 py-3 rounded-full text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}
          >
            Browse free resources
          </Link>
          <Link
            href="/chat"
            className="px-6 py-3 rounded-full text-[#A78BFA] font-semibold text-sm border border-[#3D2B6B] hover:bg-[#1A1030] transition-colors"
          >
            Talk to Sage →
          </Link>
        </div>
      </section>
    </div>
  );
}
