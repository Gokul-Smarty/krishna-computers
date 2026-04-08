import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
   const handleShopNow = () => {
    navigate("/products", { state: { fromShop: true } });
  };

  const goToAbout = () => {
    navigate("/aboutshort", { state: { fromHome: true } });
  };

  return (
    <section className="bg-gray-100">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 items-center gap-10">

        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Best Computer Sales & Service
            <span className="text-blue-500"> in Your City</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Krishna Computers provides high quality laptops, desktops,
            accessories and professional repair services at affordable prices.
          </p>

          <div className="mt-8 flex gap-4">
            <button
      onClick={handleShopNow}
      className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
    >
      Shop Now
    </button>

             <button
      onClick={goToAbout}
      className="border border-blue-500 text-blue-500 px-6 py-3 rounded-lg hover:bg-blue-50"
    >
      Our Services
    </button>
          </div>
          
        </div>

        {/* Right Image Carousel */}
        <div className="rounded-xl overflow-hidden shadow-lg">

          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 4000 }}
            loop={true}
          >

            <SwiperSlide>
              <img
                src="https://images.unsplash.com/photo-1593642634367-d91a135587b5"
                className="w-full h-[350px] object-cover"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
                className="w-full h-[350px] object-cover"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7"
                className="w-full h-[350px] object-cover"
              />
            </SwiperSlide>

          </Swiper>

        </div>

      </div>

    
 <p className="text-center font-semibold text-blue-800 text-xl p-2">
            Krishna Computers – Trusted Service, Quality Products, Reasonable Price.
          </p>
    </section>
  );
};

export default Hero;