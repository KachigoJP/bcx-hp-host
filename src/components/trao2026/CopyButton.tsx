import React from "react";

type Props = {
  text: string;
  label?: string;
  small?: boolean;
  dark?: boolean;
};

const CopyButton: React.FC<Props> = ({ text, label = "Copy", small, dark }) => {
  const [copied, setCopied] = React.useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontSize: small ? 12 : 13,
        padding: small ? "2px 10px" : "5px 14px",
        borderRadius: 6,
        border: dark ? "1px solid rgba(255,255,255,0.4)" : "1px solid #4caf50",
        backgroundColor: copied ? (dark ? "rgba(255,255,255,0.25)" : "#e8f5e9") : "transparent",
        color: dark ? "#fff" : "#2e7d32",
        cursor: "pointer",
        transition: "all 0.2s",
        whiteSpace: "nowrap",
      }}
    >
      {copied ? "✓ Đã copy" : `📋 ${label}`}
    </button>
  );
};

export default CopyButton;
