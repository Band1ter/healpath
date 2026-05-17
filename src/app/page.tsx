import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        className="relative px-4 py-24 text-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(124,58,237,0.35) 0%, rgba(15,10,30,0) 70%), #0F0A1E",
        }}
      >
        <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-[#F0EBF8] mb-4 leading-tight">
          You are{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #A78BFA, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            not alone.
          </span>
        </h1>
        <p className="text-[#9B8AC4] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          HealPath is a safe, anonymous space to find support, share your story,
          and access free help — on your terms, at your pace.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-14">
          <Link
            href="/chat"
            className="px-6 py-3 rounded-full text-white font-semibold text-sm shadow-lg hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}
          >
            Talk to Sage — free &amp; anonymous
          </Link>
          <Link
            href="/resources"
            className="px-6 py-3 rounded-full text-[#A78BFA] font-semibold text-sm border border-[#3D2B6B] hover:bg-[#1A1030] transition-colors"
          >
            Find local resources →
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { stat: "24/7", label: "Always available" },
            { stat: "100%", label: "Anonymous" },
            { stat: "32+", label: "Free resources" },
            { stat: "AI", label: "Trauma-informed" },
          ].map(({ stat, label }) => (
            <div
              key={stat}
              className="bg-[#1A1030] border border-[#3D2B6B] rounded-2xl px-4 py-5"
            >
              <p className="font-heading text-2xl font-semibold text-[#A78BFA] mb-1">
                {stat}
              </p>
              <p className="text-[#9B8AC4] text-xs">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Three cards */}
      <section className="px-4 py-12 bg-[#0F0A1E]">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-4">
          <Link
            href="/chat"
            className="bg-[#1A1030] border border-[#3D2B6B] rounded-2xl p-6 hover:border-[#7C3AED] card-lift text-left group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-[#241840]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#A78BFA" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
            </div>
            <h2 className="font-heading font-semibold text-[#F0EBF8] mb-1">Talk to Sage</h2>
            <p className="text-sm text-[#9B8AC4]">A warm AI companion, available 24/7, no judgment.</p>
          </Link>

          <Link
            href="/stories"
            className="bg-[#1A1030] border border-[#3D2B6B] rounded-2xl p-6 hover:border-[#EC4899] card-lift text-left group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-[#241840]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#EC4899" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <h2 className="font-heading font-semibold text-[#F0EBF8] mb-1">Community Stories</h2>
            <p className="text-sm text-[#9B8AC4]">Read from others. Share yours anonymously.</p>
          </Link>

          <Link
            href="/resources"
            className="bg-[#1A1030] border border-[#3D2B6B] rounded-2xl p-6 hover:border-[#34D399] card-lift text-left group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-[#241840]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#34D399" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <h2 className="font-heading font-semibold text-[#F0EBF8] mb-1">Find Resources</h2>
            <p className="text-sm text-[#9B8AC4]">Free legal, medical, and shelter help in NJ and NYC.</p>
          </Link>
        </div>
      </section>

      {/* Mission quote */}
      <section className="bg-[#1A1030] border-y border-[#3D2B6B] px-4 py-16 text-center">
        <p className="font-heading text-xl text-[#A78BFA] max-w-2xl mx-auto leading-relaxed italic">
          &ldquo;Healing is not linear. Reaching out is an act of courage.
          HealPath exists to make the first step feel a little safer.&rdquo;
        </p>
      </section>

      {/* Many ways to get help */}
      <section className="px-4 py-12 bg-[#0F0A1E]">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-xs font-medium tracking-widest text-[#9B8AC4] uppercase mb-6">
            There is more than one way to reach out
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <a
              href="tel:18007997233"
              className="bg-[#1A1030] border border-[#3D2B6B] hover:border-[#7C3AED] rounded-2xl p-5 text-center card-lift group"
            >
              <div className="flex justify-center mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#241840] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#A78BFA" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
              </div>
              <p className="text-[#F0EBF8] text-sm font-medium mb-1">Call a hotline</p>
              <p className="text-[#9B8AC4] text-xs leading-relaxed">Talk to a real person, free and confidential</p>
            </a>

            <a
              href="https://www.thehotline.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1A1030] border border-[#3D2B6B] hover:border-[#7C3AED] rounded-2xl p-5 text-center card-lift group"
            >
              <div className="flex justify-center mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#241840] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#A78BFA" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                  </svg>
                </div>
              </div>
              <p className="text-[#F0EBF8] text-sm font-medium mb-1">Chat online</p>
              <p className="text-[#9B8AC4] text-xs leading-relaxed">No phone needed. Text or chat at thehotline.org</p>
            </a>

            <a
              href="https://www.womenslaw.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1A1030] border border-[#3D2B6B] hover:border-[#7C3AED] rounded-2xl p-5 text-center card-lift group"
            >
              <div className="flex justify-center mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#241840] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#A78BFA" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.589-1.202L18.75 4.97Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.589-1.202L5.25 4.97Z" />
                  </svg>
                </div>
              </div>
              <p className="text-[#F0EBF8] text-sm font-medium mb-1">Read your rights</p>
              <p className="text-[#9B8AC4] text-xs leading-relaxed">Browse legal info privately at womenslaw.org</p>
            </a>
          </div>
        </div>
      </section>

      {/* Privacy note */}
      <section className="px-4 py-10 text-center bg-[#0F0A1E]">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#34D399]" />
          <p className="text-sm text-[#9B8AC4]">
            Completely anonymous — no account, no tracking, no identity stored.
          </p>
        </div>
      </section>
    </div>
  );
}
