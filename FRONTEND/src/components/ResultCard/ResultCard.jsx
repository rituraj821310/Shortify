import { useRef, useState } from "react";
import {
  FaCopy,
  FaCheck,
  FaArrowUpRightFromSquare,
  FaDownload,
} from "react-icons/fa6";
import QRCode from "react-qr-code";
import toast from "react-hot-toast";
import * as htmlToImage from "html-to-image";
import "./ResultCard.css";

const ResultCard = ({ shortUrl }) => {
  const [copied, setCopied] = useState(false);

  const qrRef = useRef(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      setCopied(true);

      toast.success("Copied to clipboard!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (error) {
      console.error(error);
      toast.error("Failed to copy URL");
    }
  };

  const downloadQR = async () => {
    try {

      const dataUrl = await htmlToImage.toPng(qrRef.current);

      const link = document.createElement("a");

      link.download = "shortify-qr.png";

      link.href = dataUrl;

      link.click();

      toast.success("QR Code downloaded!");

    } catch (error) {

      console.error(error);

      toast.error("Failed to download QR");

    }
  };

  return (
    <div className="result-card">

      <h3>Your Short URL</h3>

      <div className="result-url">
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {shortUrl}
        </a>
      </div>

      <div className="result-actions">

        <button onClick={handleCopy}>
          {copied ? (
            <>
              <FaCheck />
              Copied
            </>
          ) : (
            <>
              <FaCopy />
              Copy
            </>
          )}
        </button>

        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="visit-btn"
        >
          <FaArrowUpRightFromSquare />
          Visit
        </a>

      </div>

      <div className="qr-section">

        <h4>QR Code</h4>

        <div
          className="qr-box"
          ref={qrRef}
        >
          <QRCode
            value={shortUrl}
            size={170}
          />
        </div>

        <button
          className="download-btn"
          onClick={downloadQR}
        >
          <FaDownload />
          Download QR
        </button>

      </div>

    </div>
  );
};

export default ResultCard;