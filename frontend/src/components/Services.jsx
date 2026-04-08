import laptopImg from "../assets/laptop.jpg";
import mobileImg from "../assets/mobile.jpg";
import printerImg from "../assets/printer.jpg";

const Services = () => {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        Our Services
      </h2>

      <div className="flex flex-wrap justify-center gap-6">

        {/* Laptop */}
        <div className="w-40 h-20 bg-white shadow-md rounded-lg flex flex-col items-center justify-center text-center p-2">
          <img
            src={laptopImg}
            alt="laptop"
            className="w-40 h-20 mb-1"
          />
          <p className="text-[10px]">Laptop Service</p>
        </div>

        {/* Mobile */}
        <div className="w-20 h-20 bg-white shadow-md rounded-lg flex flex-col items-center justify-center text-center p-2">
          <img
            src="/images/mobile.png"
            alt="mobile"
            className="w-6 h-6 mb-1"
          />
          <p className="text-[10px]">Mobile Service</p>
        </div>

        {/* Printer */}
        <div className="w-20 h-20 bg-white shadow-md rounded-lg flex flex-col items-center justify-center text-center p-2">
          <img
            src="/images/printer.png"
            alt="printer"
            className="w-6 h-6 mb-1"
          />
          <p className="text-[10px]">Printer Service</p>
        </div>

      </div>
    </section>
  );
};

export default Services;