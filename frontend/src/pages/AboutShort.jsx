import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const AboutShort = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const showBack = location.state?.fromHome;

  return (
    <>
    <section className="bg-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-6">

       
         {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Krishna Computers
        </h2>

        <div className="space-y-5 text-lg text-gray-800 leading-relaxed">

          <p>
            <span className="font-semibold text-blue-600">Krishna Computers</span> 
            is a trusted technology sales and service center with more than 
            <span className="font-semibold text-blue-600"> 10+ years of experience</span> 
            in the industry. We specialize in 
            <span className="font-semibold"> mobiles, laptops, desktop systems, and printers sales and services</span>.
          </p>

          <p>
            Over the years, we have successfully served 
            <span className="font-semibold text-blue-600"> 600+ satisfied customers across Tamil Nadu</span>, 
            providing reliable solutions with 
            <span className="font-semibold"> high-quality service and reasonable pricing</span>.
          </p>

          <p>
            At <span className="font-semibold text-blue-600">Krishna Computers</span>, 
            our goal is to deliver the 
            <span className="font-semibold"> best technical support and genuine products</span> 
            to our customers. We offer 
            <span className="font-semibold"> professional repair services, system maintenance, and product sales</span> 
            with complete care and expertise.
          </p>

          <p>
            For customer convenience, we also provide 
            <span className="font-semibold text-blue-600"> pickup and doorstep delivery services</span>, 
            ensuring that your devices are handled in a 
            <span className="font-semibold"> safe and secure manner</span>.
          </p>

          <p>
            In addition to device sales and service, we also supply a wide range of 
            <span className="font-semibold"> mobile accessories and computer accessories</span> 
            to meet all your technology needs in one place.
          </p>

          <p className="text-center font-semibold text-green-700 text-xl mt-6">
            Krishna Computers – Trusted Service, Quality Products, Reasonable Price.
          </p>

        </div>

      </div>
    </section>
      <Footer />
</>
  );
};

export default AboutShort;