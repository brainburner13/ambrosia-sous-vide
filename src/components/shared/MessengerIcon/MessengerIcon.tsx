import type { CSSProperties } from "react";
import { cn } from "@/utils/cn";
import { publicPath } from "@/utils/publicPath";
import styles from "./MessengerIcon.module.css";

export type MessengerIconName = "telegram" | "vk" | "max";

const iconFile: Record<MessengerIconName, string> = {
  telegram: "/Telegram.svg",
  vk: "/VK.svg",
  max: "/Max.svg",
};

export function MessengerIcon({
  name,
  className,
}: {
  name: MessengerIconName;
  className?: string;
}) {
  const mask = `url("${publicPath(iconFile[name])}")`;

  return (
    <span
      className={cn(styles.icon, className)}
      style={{ "--icon-mask": mask } as CSSProperties}
      aria-hidden="true"
    />
  );
}
