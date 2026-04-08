import { FaFacebook, FaInstagram, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-8" id="footer">

      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {/* Company */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">
            Krishna Computers
          </h2>

          <p className="text-sm text-gray-400">
            Trusted destination for laptops, accessories and computer repair services.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-md font-semibold text-white mb-2">
            Our Services
          </h3>

          <ul className="space-y-1 text-sm text-gray-400">
            <li className="hover:text-white transition cursor-pointer">Laptop Sales</li>
            <li className="hover:text-white transition cursor-pointer">Computer Repair</li>
            <li className="hover:text-white transition cursor-pointer">Printer Service</li>
            <li className="hover:text-white transition cursor-pointer"> Hardware Upgrade</li>
            <li className="hover:text-white transition cursor-pointer">Accessories Sales</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-md font-semibold text-white mb-2">
            Contact
          </h3>

          <ul className="space-y-2 text-sm text-gray-400">

            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-400"/>
              Sankagiri
            </li>

            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-green-400"/>
              +91 90425 80407
            </li>

            <li className="flex items-center gap-2">
              <FaEnvelope className="text-red-400"/>
              krishnacomputerskk@gmail.com
            </li>

          </ul>

          {/* Social */}
          <div className="flex gap-3 mt-3">

            <div className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition cursor-pointer">
              <FaFacebook className="text-white"/>
            </div>

            <div className="bg-gray-800 p-2 rounded-full hover:bg-pink-500 transition cursor-pointer">
              <FaInstagram className="text-white"/>
            </div>

            <div className="bg-gray-800 p-2 rounded-full hover:bg-green-500 transition cursor-pointer">
              <FaWhatsapp className="text-white"/>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-5 text-sm text-gray-400">

        © {new Date().getFullYear()} Krishna Computers. All Rights Reserved.

      </div>

    </footer>
  );
};

export default Footer;