import { useState } from "react";
import "./UrlForm.css";
import { shortenUrl } from "../../services/urlService";
import toast from "react-hot-toast";

const UrlForm = ({ setShortUrl }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty input
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    // Remove extra spaces
    let formattedUrl = url.trim();

    // Automatically add https:// if missing
    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://")
    ) {
      formattedUrl = "https://" + formattedUrl;
    }

    // Validate URL
    const urlPattern =
      /^(https?:\/\/)([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;

    if (!urlPattern.test(formattedUrl)) {
      toast.error("Please enter a valid URL");
      return;
    }

    try {
      setLoading(true);

      const data = await shortenUrl(formattedUrl);

      setShortUrl(data.shortUrl);

      setUrl("");

      toast.success("Short URL created successfully!");

    } catch (error) {
      console.error(error);

      console.log("Backend Response:", error.response);

      toast.error(
        error.response?.data?.message || "Failed to shorten URL"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="url-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Paste your long URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={loading}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Shortening..." : "Shorten URL"}
      </button>
    </form>
  );
};

export default UrlForm;