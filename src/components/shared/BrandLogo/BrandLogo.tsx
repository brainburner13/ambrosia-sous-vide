import Image from "next/image";
import cloche from "./cloche.svg";
import { cn } from "@/utils/cn";
import styles from "./BrandLogo.module.css";

const LEFT = "АМБРОЗИЯ";
const RIGHT = "СУ-ВИД";
const BOTTOM = "РЕСТОРАННЫЕ РАЦИОНЫ БЕРЕЖНОГО ТОМЛЕНИЯ СУ-ВИД";

const STEP = 0.05;
const DURATION = 0.3;
const LEAD = 0.1;
const BOTTOM_START =
  LEAD + (Math.max(LEFT.length, RIGHT.length) - 1) * STEP + DURATION + 0.05;

interface BrandLogoProps {
  animated?: boolean;
}

export function BrandLogo({ animated = false }: BrandLogoProps) {
  return (
    <span className={cn(styles.wordmark, !animated && styles.static)}>
      <span className={styles.row}>
        <SideText text={LEFT} side="left" animated={animated} />
        <Image
          src={cloche}
          alt=""
          width={480}
          height={400}
          priority={animated}
          className={styles.icon}
        />
        <SideText text={RIGHT} side="right" animated={animated} />
      </span>
      <span
        className={styles.tagline}
        style={animated ? { animationDelay: `${BOTTOM_START}s` } : undefined}
        aria-hidden="true"
      >
        {BOTTOM}
      </span>
    </span>
  );
}

function SideText({
  text,
  side,
  animated,
}: {
  text: string;
  side: "left" | "right";
  animated: boolean;
}) {
  const chars = Array.from(text);

  return (
    <span className={styles.line} aria-hidden="true">
      {chars.map((char, index) => {
        const steps = side === "left" ? chars.length - 1 - index : index;

        return (
          <span
            key={`${side}-${index}`}
            className={cn(styles.letter, animated && styles[side])}
            style={
              animated
                ? {
                    animationDelay: `${LEAD + steps * STEP}s`,
                    ["--steps" as string]: steps,
                  }
                : undefined
            }
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
