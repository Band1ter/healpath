export default function EmergencyBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#FF4D6A] px-4 py-2 flex items-center justify-between text-white text-xs sm:text-sm shadow-md">
      <span className="font-semibold shrink-0 mr-3">Crisis Line:</span>
      <div className="flex flex-wrap gap-x-4 gap-y-1 items-center">
        <a href="tel:911" className="font-bold hover:underline">
          911
        </a>
        <a href="tel:18007997233" className="hover:underline">
          DV Hotline: 1-800-799-7233
        </a>
        <a href="sms:741741" className="hover:underline hidden sm:inline">
          Text HOME → 741741
        </a>
        <a href="tel:18006564673" className="hover:underline hidden md:inline">
          RAINN: 1-800-656-4673
        </a>
      </div>
    </div>
  );
}
