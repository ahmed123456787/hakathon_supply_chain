import React from "react";
import youngMen from "../assets/young-man.svg";
import ProductCard from "../components/Cards";
import Property from "../components/Property";
import Payment_Logo from "../assets/secure-payment-fill.svg";
import Traffic_Logo from "../assets/truck-fill.svg";
import Deals_Logo from "../assets/discount-percent-fill.svg";
import Logo from "../assets/Logo.svg";
import Fb_Logo from "../assets/facebook-circle-fill.svg";
import Insta_Logo from "../assets/instagram-fill.svg";
import X_Logo from "../assets/twitter-x-fill.svg";
function Home() {
  const Property_data = [
    {
      id: 1,
      icon: Payment_Logo,
      name: "Secure Checkout & Support",
      desc: "Shop with Confidence – Secure & Safe!",
    },
    {
      id: 2,
      icon: Traffic_Logo,
      name: "Fast & Free Shipping",
      desc: "Hassle-Free Shipping, Every Time!",
    },
    {
      id: 3,
      icon: Deals_Logo,
      name: "Best Deals & Discounts",
      desc: "Shop More, Save More!",
    },
  ];
  const footerLinks = [
    {
      title: "About us",
      links: ["Our Store", "News", "Features", "Career"],
    },
    {
      title: "Products",
      links: ["Pricing", "Partnership", "News"],
    },
    {
      title: "Support",
      links: ["Contact", "Refund Policy", "FAQ"],
    },
  ];
  return (
    <div className="flex-col justify-center">
      <div className="flex justify-evenly items-center rounded-lg bg-soft-gray mt-5 ">
        <div className="flex flex-col justify-center items-start space-y-5 w-[30%]">
          <h1 className="text-4xl font-bold ">
            The best deales are waiting for you
          </h1>
          <button className="bg-slate-900 rounded-md text-white h-15 w-25 p-2 font-bold">
            Let's Go
          </button>
        </div>
        <div>
          <img src={youngMen} alt="" className="object-contain w-[650px]" />
        </div>
      </div>
      <div className=" flex justify-start items-center mt-5">
        <h1 className=" font-bold text-4xl p-4">🔥Feautured Product</h1>
      </div>
      <div className="flex space-x-5  items-center mt-5 overflow-auto scrollbar-hidden px-5">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-[300px]">
            <ProductCard />
          </div>
        ))}
      </div>
      <div className=" flex justify-start items-center mt-5">
        <h1 className=" font-bold text-4xl p-4">🔥New Product</h1>
      </div>
      <div className="flex space-x-5  items-center mt-5 overflow-auto scrollbar-hidden px-5">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-[300px]">
            <ProductCard />
          </div>
        ))}
      </div>
      <div className="px-5 mt-10 flex justify-between items-center">
        {Property_data.map((item) => (
          <Property icon={item.icon} name={item.name} desc={item.desc} />
        ))}
      </div>
      {/* Footer */}
      <div className="w-full bg-neutral-800 mt-5 ">
        <div className="px-4 flex justify-around space-x-10 items-start">
          {/* Logo Section */}
          <div className="flex flex-col w-[20%] space-y-5 p-5">
            <img src={Logo} alt="Logo" className="object-contain w-[200px]" />
            <p className="text-md text-zinc-700">Terms of service</p>
            <div className="flex space-x-4">
              {[Fb_Logo, Insta_Logo, X_Logo].map((icon, index) => (
                <img key={index} src={icon} alt={`Social ${index}`} />
              ))}
            </div>
          </div>

          {/* Dynamic Sections */}
          {footerLinks.map((section, index) => (
            <div key={index} className="flex flex-col space-y-5 p-5">
              <h5 className="text-white font-semibold">{section.title}</h5>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li
                    key={i}
                    className="text-zinc-700 cursor-pointer hover:text-white"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
