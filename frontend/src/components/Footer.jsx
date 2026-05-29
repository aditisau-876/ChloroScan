import logo from "../assets/logo.png";
import {FaInstagram, FaGithub, FaLinkedin, FaTwitter,} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full mt-20 border-t border-gray-200 bg-white">
      <div className="max-w-[1500px] mx-auto px-8 lg:px-16 py-14">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <img src={logo} alt="ChloroScan Logo" className="h-16 object-contain"/>
            <p className="mt-5 text-gray-600 leading-relaxed max-w-sm">
              ChloroScan helps users identify plants instantly and provides detailed AI-powered care guides, reminders, and growing tips.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-900"> Quick Links </h3>
            <ul className="mt-5 space-y-3 text-gray-600">
              <li className="hover:text-green-600 cursor-pointer transition"> Home </li>
              <li className="hover:text-green-600 cursor-pointer transition"> About</li>
              <li className="hover:text-green-600 cursor-pointer transition"> Contact </li>
              <li className="hover:text-green-600 cursor-pointer transition"> Privacy Policy </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-900"> Connect With Us</h3>
            <p className="mt-5 text-gray-600"> Follow ChloroScan on social media.</p>

            <div className="flex gap-5 mt-6 text-2xl">
              <a href="#" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-green-600 hover:text-white transition"><FaInstagram /></a>
              <a href="#" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-green-600 hover:text-white transition"><FaGithub /></a>
              <a href="#" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-green-600 hover:text-white transition"><FaLinkedin /></a>
              <a href="#" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-green-600 hover:text-white transition"><FaTwitter /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-500">© 2026 ChloroScan. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;