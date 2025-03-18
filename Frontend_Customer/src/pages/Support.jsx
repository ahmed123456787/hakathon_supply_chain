import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import FAQ from "../assets/questionnaire-fill.svg";
import Guid from "../assets/book-open-fill.svg";
import contact from "../assets/Vector.svg";
import Help from "../components/Help";
function Support() {
  const HelpData = [
    { icon: FAQ, name: "FAQ", desc: "Shop with Confidence – Secure & Safe!" },
    {
      icon: Guid,
      name: "Guides",
      desc: "Shop with Confidence – Secure & Safe!",
    },
    {
      icon: contact,
      name: "Contact",
      desc: "Shop with Confidence – Secure & Safe!",
    },
  ];
  return (
    <div className="bg-white w-full ">
      <div className="w-full bg-soft-gray rounded-lg mt-10 flex justify-center items-center ">
        <div className="flex flex-col justify-center items-center space-y-15 py-10 w-full">
          <h1 className="text-5xl font-extrabold">How can we help ?</h1>
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
            <Input
              type="text"
              placeholder="Search"
              className="w-full pl-10 h-12 rounded-lg bg-white border border-gray-300 focus:border-gray-500 focus:ring-0"
            />
          </div>
        </div>
      </div>
      <div className="px-5 mt-10 flex justify-between items-center">
        {HelpData.map((item) => (
          <Help icon={item.icon} name={item.name} desc={item.desc} />
        ))}
      </div>
      <div className="flex justify-center items-center mt-5 py-5">
        <h1 className="text-5xl font-extrabold">FAQ</h1>
      </div>
      <div className="flex-col justify-between space-y-5 mt-5">
        <p>What is your return policy?</p>
        <hr />
        <p>How long does shipping take?</p>
        <hr />
        <p>How do I reset my password?</p>
      </div>
      <div className="w-full bg-soft-gray rounded-lg mt-10 flex justify-center items-center ">
        <div className="flex f justify-between items-center space-y-15 py-10 w-full">
          <div className="flex-col space-y-5 w-[50%] px-10">
            <h1 className="text-5xl font-extrabold">Contact us</h1>
            <p>
              Need help? Our support team is here for you! Whether you have
              questions about your order, shipping, returns, or anything else,
              feel free to reach out. We’ll do our best to assist you as quickly
              as possible.
            </p>
          </div>
          <div className="flex-col justify-start space-y-5 w-[50%] px-10">
            
            <Input
              type="text"
              placeholder="Fullname"
              className="w-full  h-12 rounded-lg bg-white  focus:border-gray-500 focus:ring-0"
            />
            <Input
              type="email"
              placeholder="email"
              className="w-full  h-12 rounded-lg bg-white  focus:border-gray-500 focus:ring-0"
            />
            <Input
              type="text"
              placeholder="Message"
              className="w-full  h-50 align-top text-left rounded-lg bg-white   focus:border-gray-500 "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
