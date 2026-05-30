export default function Footer() {
  return (
    <footer className="bg-[#131b2e] border-t border-[#2a3555] mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-[#94a3b8]">
        <p className="mb-2 font-heading font-semibold text-[#c4b5fd] text-base">HealPath</p>
        <p className="mb-4 text-[#94a3b8]">
          Built by Rishika Giriraddi · North Brunswick, NJ
        </p>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-[#94a3b8] mb-4">
          <a href="tel:18007997233" className="hover:text-[#c4b5fd] transition-colors duration-150">
            DV Hotline: 1-800-799-7233
          </a>
          <a href="tel:18006564673" className="hover:text-[#c4b5fd] transition-colors duration-150">
            RAINN: 1-800-656-4673
          </a>
          <a href="sms:741741" className="hover:text-[#c4b5fd] transition-colors duration-150">
            Text HOME to 741741
          </a>
          <a href="tel:911" className="font-semibold text-[#FF4D6A] hover:text-white transition-colors duration-150">
            Emergency: 911
          </a>
        </div>

        <p className="text-xs text-[#2a3555]">
          This site does not collect your name, email, or any identifying information.
          All conversations are private and not stored.
        </p>
      </div>
    </footer>
  );
}
