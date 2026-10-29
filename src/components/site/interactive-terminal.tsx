import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Command {
  input: string;
  output: string | JSX.Element;
  type?: "success" | "error" | "info";
}

const COMMANDS = {
  help: {
    output: (
      <div className="space-y-1">
        <p className="text-cyan-400">Available commands:</p>
        <p className="text-green-400 ml-4">help         - Show available commands</p>
        <p className="text-green-400 ml-4">about        - Learn about me</p>
        <p className="text-green-400 ml-4">skills       - View my technical skills</p>
        <p className="text-green-400 ml-4">projects     - See my recent work</p>
        <p className="text-green-400 ml-4">experience   - View work experience</p>
        <p className="text-green-400 ml-4">contact      - Get in touch</p>
        <p className="text-green-400 ml-4">sudo hire-me - Send hiring request</p>
        <p className="text-green-400 ml-4">clear        - Clear terminal</p>
      </div>
    ),
    type: "info" as const,
  },
  about: {
    output: (
      <div className="space-y-2">
        <p className="text-cyan-400">👨‍💻 Tejas Sangale</p>
        <p className="text-green-400">Final Year Computer Engineering Student</p>
        <p className="text-muted-foreground">
          Passionate about building innovative solutions with modern tech.
          Specialized in Full Stack Development, AI/ML, and Mobile Apps.
        </p>
        <p className="text-yellow-400 mt-2">🎯 Currently seeking internship opportunities</p>
      </div>
    ),
    type: "success" as const,
  },
  skills: {
    output: (
      <div className="space-y-2">
        <p className="text-cyan-400">💻 Technical Skills:</p>
        <div className="ml-4 space-y-1">
          <p className="text-green-400">Languages: JavaScript, TypeScript, Python, Java, C++</p>
          <p className="text-green-400">Frontend: React, Next.js, React Native, Tailwind CSS</p>
          <p className="text-green-400">Backend: Node.js, Express, Firebase, MongoDB</p>
          <p className="text-green-400">AI/ML: TensorFlow, OpenCV, LangChain, RAG</p>
          <p className="text-green-400">Tools: Git, Docker, VS Code, Postman</p>
        </div>
      </div>
    ),
    type: "success" as const,
  },
  projects: {
    output: (
      <div className="space-y-2">
        <p className="text-cyan-400">🚀 Featured Projects:</p>
        <div className="ml-4 space-y-2">
          <div>
            <p className="text-yellow-400">Smart Heal</p>
            <p className="text-sm text-muted-foreground">AI physiotherapy app with CV + Bluetooth</p>
          </div>
          <div>
            <p className="text-yellow-400">Finance Dashboard</p>
            <p className="text-sm text-muted-foreground">Full-stack app with Plaid integration</p>
          </div>
          <div>
            <p className="text-yellow-400">AI Interview Platform</p>
            <p className="text-sm text-muted-foreground">Resume analysis with Gemini API</p>
          </div>
        </div>
        <p className="text-green-400 mt-2">→ Scroll down to see more projects</p>
      </div>
    ),
    type: "success" as const,
  },
  experience: {
    output: (
      <div className="space-y-2">
        <p className="text-cyan-400">💼 Experience:</p>
        <div className="ml-4 space-y-2">
          <div>
            <p className="text-yellow-400">Internships & Projects</p>
            <p className="text-sm text-muted-foreground">• Developed multiple production apps</p>
            <p className="text-sm text-muted-foreground">• 500+ DSA problems solved</p>
            <p className="text-sm text-muted-foreground">• Active open source contributor</p>
          </div>
        </div>
      </div>
    ),
    type: "success" as const,
  },
  contact: {
    output: (
      <div className="space-y-2">
        <p className="text-cyan-400">📫 Get in touch:</p>
        <div className="ml-4 space-y-1">
          <p className="text-green-400">Email: hello@example.com</p>
          <p className="text-green-400">GitHub: github.com/yourusername</p>
          <p className="text-green-400">LinkedIn: linkedin.com/in/yourprofile</p>
        </div>
      </div>
    ),
    type: "success" as const,
  },
  "sudo hire-me": {
    output: (
      <div className="space-y-2">
        <p className="text-yellow-400">[sudo] password for hiring-manager:</p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-green-400"
        >
          ✓ Authentication successful
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-cyan-400"
        >
          📧 Hiring request sent to recruiters!
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-green-400"
        >
          → Check my resume and projects above
        </motion.p>
      </div>
    ),
    type: "success" as const,
  },
};

export function InteractiveTerminal() {
  const [history, setHistory] = useState<Command[]>([
    {
      input: "",
      output: (
        <div className="space-y-1">
          <p className="text-cyan-400">Welcome to Aarav's Portfolio Terminal v1.0.0</p>
          <p className="text-muted-foreground">Type 'help' to see available commands</p>
        </div>
      ),
      type: "info",
    },
  ]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const availableCommands = Object.keys(COMMANDS);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    const command = COMMANDS[trimmed as keyof typeof COMMANDS];

    if (command) {
      setHistory((prev) => [
        ...prev,
        {
          input: cmd,
          output: command.output,
          type: command.type,
        },
      ]);
    } else if (trimmed) {
      setHistory((prev) => [
        ...prev,
        {
          input: cmd,
          output: (
            <div>
              <p className="text-red-400">Command not found: {trimmed}</p>
              <p className="text-muted-foreground">Type 'help' for available commands</p>
            </div>
          ),
          type: "error",
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(input);
      setInput("");
      setSuggestions([]);
      setSelectedSuggestion(0);
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[selectedSuggestion]);
        setSuggestions([]);
      } else if (input) {
        const matches = availableCommands.filter((cmd) =>
          cmd.startsWith(input.toLowerCase())
        );
        if (matches.length === 1) {
          setInput(matches[0]);
        } else if (matches.length > 1) {
          setSuggestions(matches);
        }
      }
    } else if (e.key === "ArrowUp" && suggestions.length > 0) {
      e.preventDefault();
      setSelectedSuggestion((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "ArrowDown" && suggestions.length > 0) {
      e.preventDefault();
      setSelectedSuggestion((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "Escape") {
      setSuggestions([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value) {
      const matches = availableCommands.filter((cmd) =>
        cmd.startsWith(value.toLowerCase())
      );
      setSuggestions(matches);
      setSelectedSuggestion(0);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-sm"
    >
      <div className="glass rounded-3xl p-6 bg-black/40 backdrop-blur-xl border border-primary/10">
        {/* Terminal Header */}
        <div className="flex items-center gap-1.5 mb-4">
          <span className="size-3 rounded-full bg-red-500/80" />
          <span className="size-3 rounded-full bg-yellow-500/80" />
          <span className="size-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-muted-foreground">terminal</span>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="h-[400px] overflow-y-auto font-mono text-sm space-y-3 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
          onClick={() => inputRef.current?.focus()}
        >
          <AnimatePresence>
            {history.map((cmd, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-1"
              >
                {cmd.input && (
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">❯</span>
                    <span className="text-cyan-400">{cmd.input}</span>
                  </div>
                )}
                <div className="ml-4">{cmd.output}</div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Input Line */}
          <div className="flex items-center gap-2">
            <span className="text-green-400">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-cyan-400 caret-green-400"
              placeholder="Type 'help' for commands..."
              autoFocus
            />
          </div>

          {/* Tab Suggestions */}
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="ml-4 space-y-0.5"
            >
              {suggestions.map((suggestion, i) => (
                <p
                  key={suggestion}
                  className={`text-xs ${
                    i === selectedSuggestion
                      ? "text-yellow-400 font-bold"
                      : "text-muted-foreground"
                  }`}
                >
                  {suggestion}
                </p>
              ))}
            </motion.div>
          )}
        </div>

        {/* Terminal Footer Hint */}
        <div className="mt-3 pt-3 border-t border-primary/10">
          <p className="text-[10px] text-muted-foreground text-center">
            Press <kbd className="px-1 py-0.5 bg-primary/10 rounded">Tab</kbd> for autocomplete
          </p>
        </div>
      </div>
    </motion.div>
  );
}
