import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import BreathingExercise from "@/components/ui/BreathingExercise";

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── Cinematic Hero ─────────────────────────────────────────── */}
      <section className="relative px-4 py-28 text-center overflow-hidden">
        {/* Background: deep radial glow */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(159,122,234,0.18) 0%, rgba(11,19,38,0) 70%), #0b1326",
          }}
        />
        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />

        <p className="hero-in text-xs font-medium tracking-[0.2em] text-[#9f7aea] uppercase mb-5">
          A safe space to begin
        </p>

        <h1 className="hero-in-2 font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#f1f5f9] mb-5 leading-tight max-w-3xl mx-auto">
          You are{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #c4b5fd, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            not alone.
          </span>
        </h1>

        <p className="hero-in-3 text-[#94a3b8] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          HealPath is a safe, anonymous space to find support, share your story,
          and access free help — on your terms, at your pace.
        </p>

        <div className="hero-in-4 flex flex-wrap gap-4 justify-center mb-16">
          <Link
            href="/chat"
            className="px-7 py-3.5 rounded-2xl text-white font-semibold text-sm shadow-lg card-lift"
            style={{ background: "linear-gradient(135deg, #9f7aea, #818cf8)" }}
          >
            Find Support Now
          </Link>
          <Link
            href="/about"
            className="px-7 py-3.5 rounded-2xl text-[#c4b5fd] font-semibold text-sm border border-[#2a3555] hover:border-[#9f7aea] transition-[border-color] duration-200"
          >
            About Our Mission
          </Link>
        </div>

        {/* Stats */}
        <ScrollReveal group className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { stat: "24/7", label: "Always available" },
            { stat: "100%", label: "Anonymous" },
            { stat: "32+", label: "Free resources" },
            { stat: "AI", label: "Trauma-informed" },
          ].map(({ stat, label }) => (
            <div
              key={stat}
              className="reveal bg-[#131b2e] border border-[#2a3555] rounded-2xl px-4 py-5"
            >
              <p className="font-heading text-2xl font-semibold text-[#c4b5fd] mb-1">
                {stat}
              </p>
              <p className="text-[#94a3b8] text-xs">{label}</p>
            </div>
          ))}
        </ScrollReveal>
      </section>

      {/* ── How HealPath works ─────────────────────────────────────── */}
      <section className="px-4 py-14 bg-[#0b1326]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="text-xs font-medium tracking-[0.15em] text-[#9f7aea] uppercase mb-2">
              How it works
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#f1f5f9]">
              Three steps, entirely on your terms
            </h2>
          </ScrollReveal>
          <ScrollReveal group className="grid sm:grid-cols-3 gap-4">
            {[
              {
                step: "1",
                title: "Arrive safely",
                body: "No account, no sign-up, no trace. The Quick Exit button and triple-Escape shortcut take you to a neutral page instantly.",
              },
              {
                step: "2",
                title: "Explore at your pace",
                body: "Talk to Sage, read stories from others who understand, or browse resources privately. Nothing is required of you.",
              },
              {
                step: "3",
                title: "Reach out when ready",
                body: "When it feels right, connect with a hotline, legal aid, shelter, or counselor. Every option is free or low-cost.",
              },
            ].map(({ step, title, body }) => (
              <div
                key={step}
                className="reveal relative bg-[#131b2e] border border-[#2a3555] rounded-2xl p-6 pt-8"
              >
                <span
                  className="absolute -top-4 left-6 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #9f7aea, #818cf8)" }}
                >
                  {step}
                </span>
                <h3 className="font-heading font-semibold text-[#f1f5f9] mb-2">{title}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{body}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ── Three feature cards ────────────────────────────────────── */}
      <section className="px-4 py-12 bg-[#0b1326]">
        <ScrollReveal group className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-4">
          <Link
            href="/chat"
            className="reveal bg-[#131b2e] border border-[#2a3555] rounded-2xl p-6 hover:border-[#9f7aea] card-lift text-left group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-[#1c2640]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#c4b5fd" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
            </div>
            <h2 className="font-heading font-semibold text-[#f1f5f9] mb-1">Talk to Sage</h2>
            <p className="text-sm text-[#94a3b8]">A warm AI companion, available 24/7, no judgment.</p>
          </Link>

          <Link
            href="/stories"
            className="reveal bg-[#131b2e] border border-[#2a3555] rounded-2xl p-6 hover:border-[#818cf8] card-lift text-left group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-[#1c2640]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#818cf8" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <h2 className="font-heading font-semibold text-[#f1f5f9] mb-1">Community Stories</h2>
            <p className="text-sm text-[#94a3b8]">Read from others. Share yours anonymously.</p>
          </Link>

          <Link
            href="/resources"
            className="reveal bg-[#131b2e] border border-[#2a3555] rounded-2xl p-6 hover:border-[#34D399] card-lift text-left group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-[#1c2640]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#34D399" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <h2 className="font-heading font-semibold text-[#f1f5f9] mb-1">Find Resources</h2>
            <p className="text-sm text-[#94a3b8]">Free legal, medical, and shelter help in NJ and NYC.</p>
          </Link>
        </ScrollReveal>
      </section>

      {/* ── Sage AI Companion spotlight ───────────────────────────── */}
      <section className="px-4 py-16 bg-[#131b2e] border-y border-[#2a3555]">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-10">
          {/* Glowing orb visual */}
          <div className="shrink-0 flex items-center justify-center">
            <div className="relative w-28 h-28">
              <div
                className="absolute inset-0 rounded-full blur-2xl animate-breathe-glow"
                style={{ background: "radial-gradient(circle, #9f7aea, #818cf8)" }}
              />
              <div
                className="relative w-28 h-28 rounded-full flex items-center justify-center"
                style={{
                  background: "radial-gradient(circle at 35% 35%, #c4b5fd, #9f7aea 50%, #818cf8)",
                  boxShadow: "0 0 40px rgba(159,122,234,0.4)",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-10 h-10 opacity-90">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-xs font-medium tracking-[0.15em] text-[#9f7aea] uppercase mb-2">
              AI Support Companion
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#f1f5f9] mb-3 leading-snug">
              Meet Sage
            </h2>
            <p className="text-[#94a3b8] leading-relaxed mb-6 max-w-lg">
              Sage is trained to listen without judgment, hold space for your experiences,
              and gently guide you toward resources when you are ready. Available any time,
              no account required.
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-semibold text-sm card-lift"
              style={{ background: "linear-gradient(135deg, #9f7aea, #818cf8)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
              </svg>
              Start a Chat
            </Link>
          </div>
        </div>
      </section>

      {/* ── Find Help Directory ────────────────────────────────────── */}
      <section className="px-4 py-14 bg-[#0b1326]">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-medium tracking-[0.15em] text-[#9f7aea] uppercase mb-2">
            Support Directory
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#f1f5f9] text-center mb-8">
            Find the Help You Need
          </h2>
          <ScrollReveal group className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "Medical",
                sub: "SANE exams, clinics, care",
                color: "#60a5fa",
                bg: "#0f1e2e",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#60a5fa" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                ),
                href: "/resources?category=medical",
              },
              {
                label: "Legal Aid",
                sub: "Rights, TROs, advocacy",
                color: "#34D399",
                bg: "#0f1e18",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#34D399" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.589-1.202L18.75 4.97Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.589-1.202L5.25 4.97Z" />
                  </svg>
                ),
                href: "/resources?category=legal",
              },
              {
                label: "Shelter",
                sub: "Safe housing, emergency stays",
                color: "#f472b6",
                bg: "#1e0f1a",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f472b6" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                ),
                href: "/resources?category=shelter",
              },
              {
                label: "Hotlines",
                sub: "Immediate, confidential support",
                color: "#c4b5fd",
                bg: "#150f26",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#c4b5fd" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                ),
                href: "/resources?category=hotline",
              },
            ].map(({ label, sub, color, bg, icon, href }) => (
              <Link
                key={label}
                href={href}
                className="reveal rounded-2xl p-5 border border-[#2a3555] hover:border-[#9f7aea] card-lift text-center flex flex-col items-center gap-2"
                style={{ background: bg }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#131b2e]">
                  {icon}
                </div>
                <p className="text-sm font-semibold" style={{ color }}>{label}</p>
                <p className="text-xs text-[#94a3b8] leading-snug">{sub}</p>
              </Link>
            ))}
          </ScrollReveal>
          <div className="text-center mt-6">
            <Link
              href="/resources"
              className="text-sm text-[#9f7aea] hover:text-[#c4b5fd] font-medium transition-colors duration-150"
            >
              View all 32+ resources →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Shared Stories ─────────────────────────────────────────── */}
      <section className="px-4 py-14 bg-[#131b2e] border-y border-[#2a3555]">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-xs font-medium tracking-[0.15em] text-[#9f7aea] uppercase mb-2">
            Community
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#f1f5f9]">
            Strength in Shared Stories
          </h2>
        </div>
        <ScrollReveal group className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto mb-8">
          {[
            {
              quote: "I didn't know what to call what was happening to me. Having a name for it gave me courage to ask for help.",
              category: "Domestic Violence",
            },
            {
              quote: "Sage listened without rushing me. I wasn't ready to call a hotline but I needed someone — and it was there.",
              category: "Support",
            },
            {
              quote: "I found a shelter I didn't know existed in my town. You don't have to leave your whole life behind.",
              category: "Shelter",
            },
          ].map(({ quote, category }) => (
            <div
              key={category}
              className="reveal bg-[#1c2640] border border-[#2a3555] rounded-2xl p-6 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#9f7aea" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <p className="font-heading text-[#f1f5f9] text-sm leading-relaxed italic">
                &ldquo;{quote}&rdquo;
              </p>
              <p className="text-xs text-[#9f7aea] font-medium mt-auto">
                Anonymous · {category}
              </p>
            </div>
          ))}
        </ScrollReveal>
        <div className="text-center">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#94a3b8] hover:text-[#c4b5fd] transition-colors duration-150"
          >
            Read more stories
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── A moment to breathe ───────────────────────────────────── */}
      <section className="px-4 py-16 bg-[#0b1326]">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.15em] text-[#9f7aea] uppercase mb-2">
              A moment for you
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#f1f5f9] mb-8">
              Take a breath before you continue
            </h2>
            <BreathingExercise />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Reach out section ─────────────────────────────────────── */}
      <section className="px-4 py-12 bg-[#0b1326]">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-xs font-medium tracking-[0.15em] text-[#9f7aea] uppercase mb-6">
            There is more than one way to reach out
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <a
              href="tel:18007997233"
              className="bg-[#131b2e] border border-[#2a3555] hover:border-[#9f7aea] rounded-2xl p-5 text-center card-lift"
            >
              <div className="flex justify-center mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#1c2640] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#c4b5fd" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
              </div>
              <p className="text-[#f1f5f9] text-sm font-medium mb-1">Call a hotline</p>
              <p className="text-[#94a3b8] text-xs leading-relaxed">Talk to a real person, free and confidential</p>
            </a>

            <a
              href="https://www.thehotline.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#131b2e] border border-[#2a3555] hover:border-[#9f7aea] rounded-2xl p-5 text-center card-lift"
            >
              <div className="flex justify-center mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#1c2640] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#c4b5fd" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                  </svg>
                </div>
              </div>
              <p className="text-[#f1f5f9] text-sm font-medium mb-1">Chat online</p>
              <p className="text-[#94a3b8] text-xs leading-relaxed">No phone needed. Text or chat at thehotline.org</p>
            </a>

            <a
              href="https://www.womenslaw.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#131b2e] border border-[#2a3555] hover:border-[#9f7aea] rounded-2xl p-5 text-center card-lift"
            >
              <div className="flex justify-center mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#1c2640] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#c4b5fd" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.589-1.202L18.75 4.97Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.589-1.202L5.25 4.97Z" />
                  </svg>
                </div>
              </div>
              <p className="text-[#f1f5f9] text-sm font-medium mb-1">Read your rights</p>
              <p className="text-[#94a3b8] text-xs leading-relaxed">Browse legal info privately at womenslaw.org</p>
            </a>
          </div>
        </div>
      </section>

      {/* ── Privacy note ──────────────────────────────────────────── */}
      <section className="px-4 py-10 text-center bg-[#0b1326]">
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#34D399]" />
          <p className="text-sm text-[#94a3b8]">
            Completely anonymous — no account, no tracking, no identity stored.
          </p>
        </div>
      </section>
    </div>
  );
}
