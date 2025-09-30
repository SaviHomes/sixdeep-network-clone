import Navigation from "@/components/Navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  const faqs = [
    {
      question: "How does the 6-level commission system work?",
      answer: "When you refer someone (Level 1), you earn commission on their purchases. When they refer someone (Level 2), you also earn a smaller commission. This continues up to 6 levels deep, creating a powerful passive income stream as your network grows.",
    },
    {
      question: "Is it free to join?",
      answer: "Yes! Joining SixDeep is completely free. There are no signup fees, no monthly costs, and no hidden charges. You only earn commissions when sales are made through your network.",
    },
    {
      question: "How do I get paid?",
      answer: "Commissions are tracked in real-time in your dashboard. Payments are processed monthly via your preferred payment method. Minimum payout threshold is $50.",
    },
    {
      question: "What commission rates do I earn?",
      answer: "Level 1: 10%, Level 2: 8%, Level 3: 6%, Level 4: 4%, Level 5: 2%, Level 6: 1%. These rates apply to all product purchases made by members in your network.",
    },
    {
      question: "Can I promote products on social media?",
      answer: "Absolutely! We encourage you to share your unique referral link on all your social media platforms, blogs, YouTube channels, or anywhere your audience engages with you.",
    },
    {
      question: "How do I track my referrals?",
      answer: "Your dashboard provides real-time tracking of all your referrals, commission earnings, network growth, and detailed analytics to help you optimize your strategy.",
    },
    {
      question: "What kind of products can I promote?",
      answer: "We offer a wide range of products across multiple categories including home goods, fashion, electronics, health, beauty, and more. You can promote any products that align with your audience.",
    },
    {
      question: "Is there a limit to how much I can earn?",
      answer: "No! There's no cap on your earnings. The more you grow your network and the more active your network members are, the more you can earn. Top affiliates earn thousands per month.",
    },
    {
      question: "Do I need to purchase products to be an affiliate?",
      answer: "No, you don't need to purchase anything to join or maintain your affiliate status. However, many successful affiliates do use and review products to provide authentic recommendations to their audience.",
    },
    {
      question: "What support do you provide to affiliates?",
      answer: "We provide marketing materials, product information, training resources, and dedicated support to help you succeed. Join our affiliate community to connect with other successful affiliates and learn best practices.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about SixDeep
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-medium hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Please reach out to our support team.
            </p>
            <a href="/contact" className="text-primary hover:underline font-medium">
              Contact Support →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQs;
