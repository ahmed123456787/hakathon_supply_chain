import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { BookOpen, ChevronDown, HelpCircle, Mail, Search } from "lucide-react";
import React from "react";

function Support() {
  const HelpData = [
    {
      icon: <HelpCircle size={24} />,
      name: "FAQ",
      desc: "Get answers to common questions.",
    },
    {
      icon: <BookOpen size={24} />,
      name: "Guides",
      desc: "Step-by-step shopping guides.",
    },
    {
      icon: <Mail size={24} />,
      name: "Contact",
      desc: "Reach out for support.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="bg-white/80 shadow-xl backdrop-blur-md rounded-3xl p-10 flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            How can we help?
          </h1>
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Help Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {HelpData.map((item) => (
            <div
              key={item.name}
              className="p-6 bg-white shadow-lg rounded-2xl flex flex-col items-center text-center"
            >
              <div className="text-blue-600 mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-4xl font-semibold text-gray-900">FAQ</h2>
          <div className="mt-8 space-y-6">
            <Accordion type="single" collapsible>
              {[
                {
                  question: "What is your return policy?",
                  answer:
                    "You have 30 days to return an item from the date of purchase.",
                },
                {
                  question: "How long does shipping take?",
                  answer:
                    "Domestic shipping takes 5-7 days, international shipping 10-15 days.",
                },
                {
                  question: "How do I reset my password?",
                  answer:
                    'Go to "Forgot Password" on the login page and follow the instructions.',
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="w-full bg-white border rounded-xl p-4 text-left text-lg font-medium flex justify-between items-center">
                    <span>{faq.question}</span>
                    <ChevronDown size={20} className="shrink-0" />
                  </AccordionTrigger>
                  <AccordionContent className="p-4 bg-gray-50 border rounded-xl">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="mt-16 bg-white shadow-lg rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Contact us
            </h2>
            <p className="text-gray-600 text-lg">
              Need help? Our support team is here for you!
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <form className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Email"
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Message"
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
