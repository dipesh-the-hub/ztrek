import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQAccordion from "@/components/home/FAQAccordion";
import { generalFaqs } from "@/lib/faqs";

export default function FAQSection() {
  return (
    <section className="section-y bg-cream">
      <Container className="max-w-4xl mx-auto">
        <SectionHeading
          align="center"
          eyebrow="Good to Know"
          title="Frequently asked questions"
        />
        <div className="mt-10">
          <FAQAccordion items={generalFaqs} />
        </div>
      </Container>
    </section>
  );
}
