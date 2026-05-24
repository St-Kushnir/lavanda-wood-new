"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { SITE_CONTACT, SITE_CONTACT_TEL_HREF } from "@/lib/site-contact";
import { useLanguage } from "@/components/language-provider";

/** Вузький екран — натискання веде на набір номера (як у tresmont-new для телефону). */
const DIAL_BREAKPOINT = "(max-width: 639.98px)";

const TOAST_MS = 300;
/** Скільки мілісекунд на кнопці показується номер */
const PHONE_ON_BUTTON_MS = 2200;

function subscribeDialPreference(cb: () => void) {
  const mq = window.matchMedia(DIAL_BREAKPOINT);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getDialPreferenceSnapshot() {
  return window.matchMedia(DIAL_BREAKPOINT).matches;
}

function getDialPreferenceServerSnapshot() {
  return false;
}

function usePreferPhoneDial() {
  return useSyncExternalStore(
    subscribeDialPreference,
    getDialPreferenceSnapshot,
    getDialPreferenceServerSnapshot,
  );
}

type ConsultationCtaButtonProps = {
  className?: string;
  children?: ReactNode;
};

type ToastPhase = "off" | "enter" | "visible" | "exit";

export function ConsultationCtaButton({ className, children }: ConsultationCtaButtonProps) {
  const { locale } = useLanguage();
  const defaultLabel = locale === "ua" ? "Отримати консультацію" : "Get consultation";
  const label = children || defaultLabel;
  const preferDial = usePreferPhoneDial();
  const [showPhoneOnButton, setShowPhoneOnButton] = useState(false);
  const [toastPhase, setToastPhase] = useState<ToastPhase>("off");
  const busyRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const runCopyFeedback = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    clearTimers();

    setShowPhoneOnButton(true);
    setToastPhase("enter");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setToastPhase("visible"));
    });

    const t2 = window.setTimeout(() => {
      setToastPhase("exit");
    }, PHONE_ON_BUTTON_MS);

    const t3 = window.setTimeout(() => {
      setToastPhase("off");
      setShowPhoneOnButton(false);
      busyRef.current = false;
      clearTimers();
    }, PHONE_ON_BUTTON_MS + TOAST_MS);

    timersRef.current.push(t2, t3);
  }, [clearTimers]);

  const onClick = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (preferDial) return;
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(SITE_CONTACT.phoneRaw);
        runCopyFeedback();
      } catch {
        /* clipboard недоступний */
      }
    },
    [preferDial, runCopyFeedback],
  );

  const toastBase =
    "pointer-events-none absolute left-1/2 top-full z-20 mt-1.5 w-max max-w-[min(100vw-1.5rem,16rem)] -translate-x-1/2 rounded px-2 py-0.5 text-center text-[10px] font-medium uppercase tracking-[0.12em] text-[#C6A36D] shadow-md backdrop-blur-sm transition-[transform,opacity] duration-300 ease-out sm:text-[11px]";

  const toastMotion =
    toastPhase === "enter" || toastPhase === "exit"
      ? "translate-y-2 opacity-0"
      : toastPhase === "visible"
        ? "translate-y-0 opacity-100"
        : "";

  const probeLabel = typeof label === "string" ? label : "Отримати консультацію";

  return (
    <span className="relative inline-flex shrink-0 align-top">
      <a
        href={SITE_CONTACT_TEL_HREF}
        onClick={onClick}
        className={[className ?? "", "!inline-grid grid-cols-1 grid-rows-1 place-items-center"].filter(Boolean).join(" ")}
      >
        {/* Два невидимі рядки задають ширину = max(лейбл, номер); верстка не стрибає */}
        <span className="invisible col-start-1 row-start-1 justify-self-center whitespace-nowrap" aria-hidden>
          {probeLabel}
        </span>
        <span
          className="invisible col-start-1 row-start-1 justify-self-center whitespace-nowrap text-xs normal-case tracking-normal sm:text-sm"
          aria-hidden
        >
          {SITE_CONTACT.phoneDisplay}
        </span>
        <span className="col-start-1 row-start-1 flex w-full min-w-0 items-center justify-center justify-self-stretch text-center">
          {showPhoneOnButton ? (
            <span className=" ">{SITE_CONTACT.phoneDisplay}</span>
          ) : (
            label
          )}
        </span>
      </a>
      {toastPhase !== "off" ? (
        <span role="status" aria-live="polite" className={[toastBase, toastMotion].filter(Boolean).join(" ")}>
          {locale === "ua" ? "Скопійовано" : "Copied"}
        </span>
      ) : null}
    </span>
  );
}
