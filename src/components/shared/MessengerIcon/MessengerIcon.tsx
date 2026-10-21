import { cn } from "@/utils/cn";
import styles from "./MessengerIcon.module.css";

export type MessengerIconName = "telegram" | "vk" | "max";

export function MessengerIcon({
  name,
  className,
}: {
  name: MessengerIconName;
  className?: string;
}) {
  return (
    <span
      className={cn(styles.icon, styles[name], className)}
      aria-hidden="true"
    />
  );
}
