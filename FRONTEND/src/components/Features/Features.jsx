import {
  FaBolt,
  FaShieldHalved,
  FaChartLine,
  FaQrcode,
  FaGlobe,
  FaLink,
} from "react-icons/fa6";

import "./Features.css";

const features = [
  {
    icon: <FaBolt />,
    title: "Lightning Fast",
    desc: "Generate short URLs instantly with high performance.",
  },
  {
    icon: <FaShieldHalved />,
    title: "Secure",
    desc: "Your links are protected with secure infrastructure.",
  },
  {
    icon: <FaChartLine />,
    title: "Analytics",
    desc: "Track clicks and monitor link performance.",
  },
  {
    icon: <FaQrcode />,
    title: "QR Code",
    desc: "Generate QR codes for every shortened URL.",
  },
  {
    icon: <FaGlobe />,
    title: "Global Access",
    desc: "Access your links from anywhere in the world.",
  },
  {
    icon: <FaLink />,
    title: "Custom Alias",
    desc: "Create memorable custom short links.",
  },
];

const Features = () => {
  return (
    <section className="features">

      <div className="features-heading">
        <h2>Why Choose Shortify?</h2>
        <p>
          Everything you need to create, manage and analyze your short links.
        </p>
      </div>

      <div className="feature-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Features;