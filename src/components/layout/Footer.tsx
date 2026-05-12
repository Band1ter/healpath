export default function Footer() {
  return (
    <footer className="bg-[#1A1030] border-t border-[#3D2B6B] mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-[#9B8AC4]">
        <p className="mb-2 font-heading font-semibold text-[#A78BFA] text-base">HealPath</p>
        <p className="mb-4 text-[#9B8AC4]">
          Built by Rishika Giriraddi · North Brunswick, NJ
        </p>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-[#9B8AC4] mb-4">
          <a href="tel:18007997233" className="hover:text-[#A78BFA] transition-colors">
            DV Hotline: 1-800-799-7233
          </a>
          <a href="tel:18006564673" className="hover:text-[#A78BFA] transition-colors">
            RAINN: 1-800-656-4673
          </a>
          <a href="sms:741741" className="hover:text-[#A78BFA] transition-colors">
            Text HOME → 741741
          </a>
          <a href="tel:911" className="font-semibold text-[#FF4D6A] hover:text-white transition-colors">
            Emergency: 911
          </a>
        </div>

        <p className="text-xs text-[#3D2B6B]">
          This site does not collect your name, email, or any identifying information.
          All conversations are private and not stored.
        </p>
      </div>
    </footer>
  );
}
