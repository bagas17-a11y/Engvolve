import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { buildWhatsAppLink, CONTACT_MESSAGES } from "@/lib/contact";

interface WhatsAppButtonProps {
  /** Optional preset message override. */
  message?: string;
}

/**
 * Floating WhatsApp support button.
 * Mounted on landing page (Index) and inside dashboard areas
 * where students might want a quick way to reach support.
 */
export const WhatsAppButton = ({ message = CONTACT_MESSAGES.generalHelp }: WhatsAppButtonProps) => {
  const [showTip, setShowTip] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-2">
      {showTip && (
        <div className="relative max-w-[240px] rounded-2xl rounded-br-sm bg-white text-gray-800 px-4 py-3 shadow-xl text-sm">
          <button
            onClick={() => setShowTip(false)}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
            aria-label="Dismiss"
          >
            <X className="w-3 h-3 text-gray-600" />
          </button>
          <p className="font-medium mb-1">Need help?</p>
          <p className="text-xs text-gray-600">
            Chat with us on WhatsApp — we usually reply within minutes during Jakarta hours.
          </p>
        </div>
      )}
      <a
        href={buildWhatsAppLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTip(true)}
        onFocus={() => setShowTip(true)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-xl flex items-center justify-center transition-all hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366]/40"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};
