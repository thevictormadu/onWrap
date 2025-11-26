import { FaTwitter, FaLinkedin, FaCopy } from "react-icons/fa";
import IconButton from "./IconButton.tsx";

interface ShareButtonProps {
  type: "twitter" | "linkedin" | "copy";
  url?: string;
  text?: string;
  onShare?: () => void;
}

export default function ShareButton({ type, url, text, onShare }: ShareButtonProps) {
  const shareUrl = url || window.location.href;
  const shareText = text || "Check out my 2024 GitHub Wrapped! #GitHubOnWrap";

  const handleShare = () => {
    if (onShare) {
      onShare();
    }

    switch (type) {
      case "twitter":
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, "_blank", "width=550,height=420");
        break;
      
      case "linkedin":
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        window.open(linkedinUrl, "_blank", "width=550,height=420");
        break;
      
      case "copy":
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
          // You could add a toast notification here
          if (import.meta.env.DEV) {
            console.log("Copied to clipboard!");
          }
        }).catch((err) => {
          if (import.meta.env.DEV) {
            console.error("Failed to copy:", err);
          }
        });
        break;
    }
  };

  const getIcon = () => {
    switch (type) {
      case "twitter":
        return <FaTwitter />;
      case "linkedin":
        return <FaLinkedin />;
      case "copy":
        return <FaCopy />;
    }
  };

  const getLabel = () => {
    switch (type) {
      case "twitter":
        return "Share on Twitter";
      case "linkedin":
        return "Share on LinkedIn";
      case "copy":
        return "Copy link";
    }
  };

  return (
    <IconButton
      icon={getIcon()}
      handleClick={handleShare}
      aria-label={getLabel()}
    />
  );
}

