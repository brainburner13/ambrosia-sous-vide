"use client";

import { useRef, useState, type ReactNode } from "react";
import styles from "./CopyContact.module.css";

function copyText(value: string) {
  const active = document.activeElement;
  const area = document.createElement("textarea");
  area.value = value;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.top = "0";
  area.style.left = "-9999px";
  document.body.append(area);

  let copied = false;
  const onCopy = (event: ClipboardEvent) => {
    if (!event.clipboardData) {
      return;
    }
    event.preventDefault();
    event.clipboardData.setData("text/plain", value);
    copied = true;
  };

  document.addEventListener("copy", onCopy, true);
  area.focus();
  area.select();

  try {
    copied = document.execCommand("copy") || copied;
  } catch {
    copied = false;
  } finally {
    document.removeEventListener("copy", onCopy, true);
    area.remove();
    if (active instanceof HTMLElement) {
      active.focus();
    }
  }

  if (copied || !navigator.clipboard) {
    return copied;
  }

  return navigator.clipboard.writeText(value).then(
    () => true,
    () => false,
  );
}

interface CopyContactProps {
  value: string;
  label: string;
  children: ReactNode;
}

export function CopyContact({ value, label, children }: CopyContactProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  return (
    <>
      <button
        type="button"
        className={styles.button}
        aria-label={label}
        onClick={() => {
          const result = copyText(value);
          const show = (didCopy: boolean) => {
            if (!didCopy) {
              return;
            }

            setCopied(true);
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setCopied(false), 2600);
          };

          if (typeof result === "boolean") {
            show(result);
            return;
          }

          void result.then(show);
        }}
      >
        {children}
      </button>
      {copied ? (
        <p className={styles.notice} role="status">
          Скопировано
        </p>
      ) : null}
    </>
  );
}
