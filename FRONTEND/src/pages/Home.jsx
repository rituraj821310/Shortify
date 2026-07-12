import { useState } from "react";

import Hero from "../components/Hero/Hero";
import UrlForm from "../components/UrlForm/UrlForm";
import ResultCard from "../components/ResultCard/ResultCard";
import History from "../components/History/History";
import Features from "../components/Features/Features";
import Stats from "../components/Stats/Stats";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const [shortUrl, setShortUrl] = useState("");

  return (
    <>
      <Hero />

      <UrlForm setShortUrl={setShortUrl} />

      {shortUrl && <ResultCard shortUrl={shortUrl} />}

      <History />

      <Features />

      <Stats />

      <Footer />
    </>
  );
};

export default Home;