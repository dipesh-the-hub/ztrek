import type { Metadata } from "next";
import { Phone, EnvelopeSimple, MapPin, WhatsappLogo, Clock } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import InquiryForm from "@/components/forms/InquiryForm";
import { getAllTreks } from "@/lib/data/treks";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with TrekVibe Nepal in Kathmandu — call, WhatsApp or send an inquiry and our team will reply within 24 hours.",
};

const contactDetails = [
  { icon: Phone, label: "Call or WhatsApp", value: "+977 974-1765998", href: "tel:+9779741765998" },
  { icon: EnvelopeSimple, label: "Email", value: "adityaneupane53@gmail.com", href: "mailto:adityaneupane53@gmail.com" },
  { icon: MapPin, label: "Office", value: "Thamel, Kathmandu, Nepal", href: undefined },
  { icon: Clock, label: "Office Hours", value: "Sun–Fri, 9:00 AM – 6:00 PM (NPT)", href: undefined },
];

export default async function ContactPage() {
  const treks = await getAllTreks();
  return (
    <div className="section-y">
      <Container>
        <SectionHeading
          eyebrow="Get in Touch"
          title="Talk to our Kathmandu team"
          description="Questions about a specific trek, permits, or building a custom itinerary? Send us a message and we'll reply within 24 hours."
        />

        <div className="mt-12 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {contactDetails.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-navy-950 text-gold-400 shrink-0">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-stone-500">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-semibold text-navy-950 hover:text-gold-600">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-navy-950">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/9779741765998"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:brightness-105 transition-[filter] min-h-11"
            >
              <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
              Message us on WhatsApp
            </a>

            <div className="rounded-2xl overflow-hidden border border-stone-300/60 aspect-[4/3]">
              <iframe
                title="TrekVibe Nepal office location — Thamel, Kathmandu"
                src="https://www.google.com/maps?q=Thamel,+Kathmandu,+Nepal&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="lg:col-span-3 rounded-2xl border border-stone-300/60 bg-white p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-navy-950">Send us a message</h2>
            <div className="mt-6">
              <InquiryForm variant="contact" treks={treks} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
