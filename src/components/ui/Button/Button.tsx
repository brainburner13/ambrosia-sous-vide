import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "children"
  > & {
    href: string;
  };

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

function isLink(props: ButtonProps): props is ButtonAsLink {
  return typeof props.href === "string";
}

function domProps<T extends ButtonProps>(
  props: T,
): Omit<T, "variant" | "className"> {
  const dom = { ...props };
  delete dom.variant;
  delete dom.className;
  return dom;
}

export function Button(props: ButtonProps) {
  const className = cn(
    styles.button,
    styles[props.variant ?? "primary"],
    props.className,
  );

  if (isLink(props)) {
    const external = props.href.startsWith("http");
    const linkProps = domProps(props);

    return (
      <a
        {...linkProps}
        className={className}
        target={external ? (props.target ?? "_blank") : props.target}
        rel={external ? (props.rel ?? "noopener noreferrer") : props.rel}
      >
        {props.children}
      </a>
    );
  }

  return (
    <button
      {...domProps(props)}
      type={props.type ?? "button"}
      className={className}
    >
      {props.children}
    </button>
  );
}
