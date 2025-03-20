import React from "react";
import Logo from "../assets/Logo.svg";
import Fb_Logo from "../assets/facebook-circle-fill.svg";
import Insta_Logo from "../assets/instagram-fill.svg";
import X_Logo from "../assets/twitter-x-fill.svg";
function Footer() {
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
  );
}

export default Footer;
