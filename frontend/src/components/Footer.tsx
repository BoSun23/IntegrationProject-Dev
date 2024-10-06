import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"; 
const Footer = () => {
  return (
    <div className="bg-[#ADD8E6] py-5">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Social Media Icons */}
        <span className="flex gap-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-blue-600"
          >
            <FaFacebook size={25} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-pink-500"
          >
            <FaInstagram size={25} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-blue-400"
          >
            <FaTwitter size={25} />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-red-600"
          >
            <FaYoutube size={25} />
          </a>
          </span>
          <span className="text-black font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
          <p className="cursor-pointer">Contact</p>
        </span>
        
      </div>
    </div>
  );
};

export default Footer;
