import { FaArrowRight, FaLink } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <section className="relative overflow-hidden">

      {/* Background Blur */}

      <div className="absolute -top-36 left-20 h-96 w-96 rounded-full bg-blue-200 blur-3xl opacity-30"></div>

      <div className="absolute top-32 right-0 h-96 w-96 rounded-full bg-cyan-200 blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-700">

            <FaLink />

            Trusted by Developers Worldwide

          </div>

          <h1 className="mt-8 text-6xl font-extrabold leading-tight text-gray-900">

            Shorten URLs

            <br />

            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">

              Share Smarter.

            </span>

          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg text-gray-500 leading-8">

            Create secure, beautiful and trackable short links
            in seconds. Manage all your links from one place
            with analytics and custom aliases.

          </p>

          <div className="mt-12 flex justify-center">

            <button
              onClick={handleGetStarted}
              className="flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
            >

              Get Started

              <FaArrowRight />

            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;