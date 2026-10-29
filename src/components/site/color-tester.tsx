import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function ColorTester() {
  const [lightBg, setLightBg] = useState("#FFDDB0");
  const [lightPrimary, setLightPrimary] = useState("#D97706");
  const [darkBg, setDarkBg] = useState("#0a0e1a");
  const [darkPrimary, setDarkPrimary] = useState("#90CAF9");
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [copied, setCopied] = useState<string | null>(null);

  const currentBg = mode === "light" ? lightBg : darkBg;
  const currentPrimary = mode === "light" ? lightPrimary : darkPrimary;
  const currentText = mode === "light" ? "#1a2e1a" : "#f5f7fa";

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const generateLighterShade = (hex: string, percent: number = 20) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.min(255, ((num >> 16) & 0xff) + Math.round(255 * (percent / 100)));
    const g = Math.min(255, ((num >> 8) & 0xff) + Math.round(255 * (percent / 100)));
    const b = Math.min(255, (num & 0xff) + Math.round(255 * (percent / 100)));
    return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
  };

  const generateDarkerShade = (hex: string, percent: number = 20) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.max(0, ((num >> 16) & 0xff) - Math.round(255 * (percent / 100)));
    const g = Math.max(0, ((num >> 8) & 0xff) - Math.round(255 * (percent / 100)));
    const b = Math.max(0, (num & 0xff) - Math.round(255 * (percent / 100)));
    return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-auto">
      {/* Live Preview Area */}
      <motion.div
        style={{ backgroundColor: currentBg, color: currentText }}
        className="min-h-screen transition-colors duration-300"
      >
        {/* Header */}
        <div className="p-8">
          <motion.h1
            className="text-6xl font-bold mb-4"
            style={{ color: currentPrimary }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Color Tester
          </motion.h1>
          <p className="text-xl opacity-75">
            Test your theme colors in real-time!
          </p>
        </div>

        {/* Control Panel */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Mode Toggle */}
            <div className="flex justify-center mb-6">
              <motion.div
                className="flex gap-2 p-1 rounded-lg bg-white/10"
                whileHover={{ scale: 1.02 }}
              >
                <button
                  onClick={() => setMode("light")}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    mode === "light"
                      ? "bg-white text-black"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  Light Mode
                </button>
                <button
                  onClick={() => setMode("dark")}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    mode === "dark"
                      ? "bg-white text-black"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  Dark Mode
                </button>
              </motion.div>
            </div>

            {/* Color Inputs */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Light Mode Colors */}
              <div className="space-y-4">
                <h3 className="text-white font-bold text-lg mb-3">
                  Light Mode Colors
                </h3>
                <ColorInput
                  label="Background"
                  value={lightBg}
                  onChange={setLightBg}
                  onCopy={() => copyToClipboard(lightBg, "lightBg")}
                  copied={copied === "lightBg"}
                />
                <ColorInput
                  label="Primary"
                  value={lightPrimary}
                  onChange={setLightPrimary}
                  onCopy={() => copyToClipboard(lightPrimary, "lightPrimary")}
                  copied={copied === "lightPrimary"}
                />
                <div className="text-xs text-white/60 mt-2">
                  <p>Lighter: {generateLighterShade(lightBg, 10)}</p>
                  <p>Darker: {generateDarkerShade(lightBg, 10)}</p>
                </div>
              </div>

              {/* Dark Mode Colors */}
              <div className="space-y-4">
                <h3 className="text-white font-bold text-lg mb-3">
                  Dark Mode Colors
                </h3>
                <ColorInput
                  label="Background"
                  value={darkBg}
                  onChange={setDarkBg}
                  onCopy={() => copyToClipboard(darkBg, "darkBg")}
                  copied={copied === "darkBg"}
                />
                <ColorInput
                  label="Primary"
                  value={darkPrimary}
                  onChange={setDarkPrimary}
                  onCopy={() => copyToClipboard(darkPrimary, "darkPrimary")}
                  copied={copied === "darkPrimary"}
                />
                <div className="text-xs text-white/60 mt-2">
                  <p>Lighter: {generateLighterShade(darkBg, 10)}</p>
                  <p>Darker: {generateDarkerShade(darkBg, 10)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="p-8 pb-[400px]">
          {/* Sample Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="p-6 rounded-xl backdrop-blur-sm"
                style={{
                  backgroundColor: generateLighterShade(currentBg, 5),
                  border: `2px solid ${currentPrimary}40`,
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: currentPrimary }}
                >
                  Card {i}
                </h3>
                <p className="opacity-75">
                  This is sample content to preview your colors.
                </p>
              </motion.div>
            ))}
          </div>

          {/* Sample Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <motion.button
              className="px-8 py-3 rounded-lg font-semibold text-white"
              style={{ backgroundColor: currentPrimary }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Primary Button
            </motion.button>
            <motion.button
              className="px-8 py-3 rounded-lg font-semibold"
              style={{
                backgroundColor: "transparent",
                border: `2px solid ${currentPrimary}`,
                color: currentPrimary,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Outline Button
            </motion.button>
          </div>

          {/* Sample Text */}
          <div className="max-w-4xl space-y-4">
            <h2 className="text-4xl font-bold" style={{ color: currentPrimary }}>
              Sample Heading
            </h2>
            <p className="text-lg opacity-75">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex gap-4">
              <span
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: currentPrimary + "20",
                  color: currentPrimary,
                }}
              >
                Badge 1
              </span>
              <span
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: currentPrimary + "20",
                  color: currentPrimary,
                }}
              >
                Badge 2
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ColorInput({
  label,
  value,
  onChange,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
        style={{ backgroundColor: value }}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "color";
          input.value = value;
          input.onchange = (e) => onChange((e.target as HTMLInputElement).value);
          input.click();
        }}
      />
      <div className="flex-1">
        <label className="text-white/60 text-xs block mb-1">{label}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 outline-none font-mono text-sm"
          placeholder="#000000"
        />
      </div>
      <motion.button
        onClick={onCopy}
        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
      </motion.button>
    </div>
  );
}
