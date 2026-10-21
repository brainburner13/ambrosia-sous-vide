"use client";

import { useEffect, useRef } from "react";
import { publicPath } from "@/utils/publicPath";
import styles from "./Hero.module.css";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function sync() {
      if (!video) {
        return;
      }

      if (motion.matches) {
        video.pause();
        return;
      }

      void video.play().catch(() => undefined);
    }

    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={videoRef}
      className={styles.video}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src={publicPath("/hero-video.webm")} type="video/webm" />
    </video>
  );
}
