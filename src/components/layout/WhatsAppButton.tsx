import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/9779741765998"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with TrekVibe Nepal on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 hover:brightness-105 transition-[filter] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900"
    >
      <WhatsappLogo size={30} weight="fill" aria-hidden="true" />
    </a>
  );
}
