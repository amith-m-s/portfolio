"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";

const COMMANDS = [
  { label: "View Projects", action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }), key: "P" },
  { label: "About Me", action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), key: "A" },
  { label: "Skills", action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }), key: "S" },
  { label: "Philosophy", action: () => document.getElementById("philosophy")?.scrollIntoView({ behavior: "smooth" }), key: "H" },
  { label: "GitHub Profile", action: () => window.open("https://github.com/amith-m-s", "_blank", "noopener,noreferrer"), key: "G" },
  { label: "Deep Resume Analyzer", action: () => window.open("https://deep-resume-analyzer.vercel.app/", "_blank", "noopener,noreferrer"), key: "D" },
  { label: "Send Email", action: () => { window.location.href = "mailto:amith6567@gmail.com"; }, key: "E" },
  { label: "Scroll to Top", action: () => window.scrollTo({ top: 0, behavior: "smooth" }), key: "T" },
];

const LIST_ID = "command-palette-results";
const visuallyHidden: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

function getOptionId(key: string) {
  return `command-option-${key.toLowerCase()}`;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = COMMANDS.filter((command) =>
    command.label.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const activeCommand = filtered[idx];

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setQuery("");
      setIdx(0);
    }
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
        setQuery("");
        setIdx(0);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const run = (command: (typeof COMMANDS)[number]) => {
    command.action();
    handleOpenChange(false);
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (filtered.length > 0) {
        setIdx((current) => Math.min(current + 1, filtered.length - 1));
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (filtered.length > 0) {
        setIdx((current) => Math.max(current - 1, 0));
      }
    } else if (event.key === "Enter" && activeCommand) {
      event.preventDefault();
      run(activeCommand);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 16px",
            background: "rgba(7,9,11,0.88)",
            border: "1px solid var(--bdr2)",
            borderRadius: 9,
            fontFamily: "var(--fm)",
            fontSize: 11,
            color: "var(--txt2)",
            cursor: "pointer",
            backdropFilter: "blur(20px)",
            transition: "all .18s",
            letterSpacing: ".04em",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
            event.currentTarget.style.color = "var(--txt)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.borderColor = "var(--bdr2)";
            event.currentTarget.style.color = "var(--txt2)";
          }}
        >
          <span aria-hidden="true" style={{ fontSize: 10, opacity: 0.6 }}>⌘</span>
          K — Command Palette
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: "rgba(7,9,11,0.7)",
            backdropFilter: "blur(8px)",
          }}
        />

        <Dialog.Content
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            inputRef.current?.focus();
          }}
          style={{
            position: "fixed",
            top: "28%",
            left: "50%",
            zIndex: 400,
            transform: "translateX(-50%)",
            width: "min(560px,90vw)",
            background: "#0d1117",
            border: "1px solid var(--bdr2)",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
            animation: "fadeUp .18s ease",
          }}
        >
          <Dialog.Title style={visuallyHidden}>Command palette</Dialog.Title>
          <Dialog.Description style={visuallyHidden}>
            Search available commands. Use the arrow keys to navigate and Enter to run a command.
          </Dialog.Description>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 18px",
              borderBottom: "1px solid var(--bdr)",
            }}
          >
            <span aria-hidden="true" style={{ fontFamily: "var(--fm)", fontSize: 13, color: "var(--txt3)" }}>⌘</span>
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-label="Search commands"
              aria-autocomplete="list"
              aria-expanded="true"
              aria-controls={LIST_ID}
              aria-activedescendant={activeCommand ? getOptionId(activeCommand.key) : undefined}
              autoComplete="off"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setIdx(0);
              }}
              onKeyDown={onInputKeyDown}
              placeholder="Type a command or search..."
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                fontFamily: "var(--fm)",
                fontSize: 13,
                color: "var(--txt)",
                letterSpacing: ".02em",
              }}
            />
            <kbd
              style={{
                fontFamily: "var(--fm)",
                fontSize: 10,
                color: "var(--txt3)",
                padding: "2px 5px",
                border: "1px solid var(--bdr)",
                borderRadius: 4,
              }}
            >
              ESC
            </kbd>
          </div>

          <div
            id={LIST_ID}
            role="listbox"
            aria-label="Available commands"
            style={{ maxHeight: 320, overflowY: "auto", padding: "6px 0" }}
          >
            {filtered.map((command, index) => (
              <div
                key={command.label}
                id={getOptionId(command.key)}
                role="option"
                aria-selected={index === idx}
                onClick={() => run(command)}
                onMouseMove={() => setIdx(index)}
                style={{
                  width: "100%",
                  padding: "10px 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: index === idx ? "rgba(91,156,246,0.1)" : "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background .12s",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--fm)",
                    fontSize: 12.5,
                    color: index === idx ? "var(--txt)" : "var(--txt2)",
                  }}
                >
                  {command.label}
                </span>
                <kbd
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--fm)",
                    fontSize: 9.5,
                    color: index === idx ? "var(--acc)" : "var(--txt3)",
                    padding: "2px 6px",
                    border: `1px solid ${index === idx ? "rgba(91,156,246,0.3)" : "var(--bdr)"}`,
                    borderRadius: 4,
                    transition: "all .12s",
                  }}
                >
                  {command.key}
                </kbd>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div
              role="status"
              style={{
                padding: 20,
                fontFamily: "var(--fm)",
                fontSize: 12,
                color: "var(--txt3)",
                textAlign: "center",
              }}
            >
              No commands found
            </div>
          )}

          <div
            aria-hidden="true"
            style={{
              padding: "9px 18px",
              borderTop: "1px solid var(--bdr)",
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontFamily: "var(--fm)",
              fontSize: 9.5,
              color: "var(--txt3)",
            }}
          >
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span>ESC close</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
