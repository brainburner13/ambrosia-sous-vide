"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/utils/cn";
import styles from "./SousVideProcess.module.css";

const STEP_MS = 4500;

const steps = [
  {
    id: "vacuum",
    name: "Вакуумирование",
    title: "Свежесть без кислорода",
    description:
      "Свежие мясные и рыбные медальоны запечатываются в плотную сертифицированную упаковку вместе со специями и маринадом. Отсутствие воздуха останавливает размножение бактерий естественным путем.",
  },
  {
    id: "cook",
    name: "Бережное томление",
    title: "Точный температурный контроль",
    description:
      "Продукты готовятся на водяной бане при строго контролируемой низкой температуре (от 55°C до 75°C) в течение нескольких часов. Волокна не разрушаются, а все соки и витамины остаются внутри.",
  },
  {
    id: "chill",
    name: "Шоковое охлаждение",
    title: "Заморозка вкуса",
    description:
      "Сразу после водяной бани пакеты отправляются в ледяную ванну. Это мгновенно останавливает процесс приготовления и «консервирует» сочность, идеальную текстуру и до 90% полезных веществ.",
  },
  {
    id: "serve",
    name: "5 минут у вас на столе",
    title: "Просто разогрейте",
    description:
      "Рацион хранится в вашем холодильнике от 7 до 14 дней. Когда вы голодны, вам достаточно опустить закрытый пакет в горячую воду на 5 минут или слегка обжарить на сковороде для аппетитной корочки.",
  },
] as const;

export function SousVideProcess() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const progress = active / (steps.length - 1);
  const current = steps[active];

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || paused) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActive((index) => (index + 1) % steps.length);
    }, STEP_MS);

    return () => window.clearTimeout(timer);
  }, [active, paused]);

  function move(next: number, focus = false) {
    const last = steps.length - 1;
    const index = Math.min(last, Math.max(0, next));
    setActive(index);
    if (focus) {
      buttons.current[index]?.focus();
    }
  }

  return (
    <section
      className={styles.section}
      id="process"
      aria-labelledby="process-title"
    >
      <div className="container">
        <header className={styles.header}>
          <p className="eyebrow">Технология</p>
          <h2 id="process-title">Магия су-вид: как это устроено?</h2>
          <p className={styles.lead}>
            Вакуум держит порцию сочной без консервантов: воздух убран,
            температура точная, охлаждение мгновенное. На шкале — четыре шага от
            упаковки до тарелки.
          </p>
        </header>

        <div
          className={styles.scale}
          role="radiogroup"
          aria-label="Шаги приготовления су-вид"
          style={
            { "--progress": progress } as CSSProperties & {
              "--progress": number;
            }
          }
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowDown") {
              event.preventDefault();
              move(active + 1, true);
            }
            if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
              event.preventDefault();
              move(active - 1, true);
            }
            if (event.key === "Home") {
              event.preventDefault();
              move(0, true);
            }
            if (event.key === "End") {
              event.preventDefault();
              move(steps.length - 1, true);
            }
          }}
        >
          <span className={styles.track} aria-hidden="true" />
          <span className={styles.fill} aria-hidden="true" />
          {steps.map((step, index) => {
            const selected = index === active;

            return (
              <button
                key={step.id}
                type="button"
                role="radio"
                aria-checked={selected}
                tabIndex={selected ? 0 : -1}
                ref={(node) => {
                  buttons.current[index] = node;
                }}
                className={cn(styles.step, selected && styles.stepActive)}
                onClick={() => move(index)}
              >
                <span className={styles.index}>{index + 1}</span>
                <span className={styles.name}>{step.name}</span>
                <span className={styles.stepTitle}>{step.title}</span>
              </button>
            );
          })}
        </div>

        <p key={current.id} className={styles.detail} aria-live="polite">
          {current.description}
        </p>
      </div>
    </section>
  );
}
