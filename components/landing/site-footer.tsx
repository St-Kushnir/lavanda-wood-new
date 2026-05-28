"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { SITE_CONTACT, SITE_CONTACT_MAILTO_HREF, SITE_CONTACT_TEL_HREF } from "@/lib/site-contact";

export function SiteFooter() {
  const { locale } = useLanguage();

  // Structured Data (JSON-LD) for Local Business and Construction Business (SEO Best Practice)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "LAVANDA — Handcrafted Log Homes",
    "image": "https://lavanda-wood.com/images/logo.png",
    "@id": "https://lavanda-wood.com/#organization",
    "url": "https://lavanda-wood.com/",
    "telephone": SITE_CONTACT.phoneRaw,
    "email": SITE_CONTACT.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": locale === "ua" ? "село Городжів" : "Horodzhiv village",
      "addressLocality": locale === "ua" ? "Жовківський район" : "Zhovkva district",
      "addressRegion": locale === "ua" ? "Львівська область" : "Lviv region",
      "postalCode": "80331",
      "addressCountry": "UA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.147285,
      "longitude": 23.831526
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": SITE_CONTACT.phoneRaw,
        "contactType": "sales",
        "areaServed": ["UA", "Europe"],
        "availableLanguage": ["Ukrainian", "English"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+380325269187",
        "contactType": "office"
      }
    ],
    "sameAs": [
      "https://holzbaurustikal.de/",
      "https://lavanda-wood.com/"
    ]
  };

  return (
    <footer className="border-t border-white/5 bg-[#080808] py-16 text-sm text-[#8B7355]">
      {/* Insert JSON-LD Structured Data for Google search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="reveal-item mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8 lg:gap-12 xl:gap-16">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <p className="font-serif text-2xl tracking-[0.18em] text-[#EAE7E1]">LAVANDA</p>
              <p className="mt-4 max-w-xs font-sans text-xs leading-relaxed text-[#8B7355]/80 uppercase tracking-widest">
                Handcrafted log homes since 1995
              </p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-[#EAE7E1]/70">
                {locale === "ua"
                  ? "Створення преміальних дерев'яних резиденцій за канадською технологією ручної рубки в Україні та Європі."
                  : "Creating premium handcrafted log residences using authentic Canadian technology across Ukraine and Europe."}
              </p>
            </div>
            
            <div className="hidden md:block mt-12 text-xs text-[#8B7355]/50 space-y-1">
              <p>
                © {new Date().getFullYear()} Lavanda.{" "}
                {locale === "ua" ? "Усі права захищені." : "All rights reserved."}
              </p>
            </div>
          </div>

          {/* Column 2: Sales & Consultation Contacts */}
          <div className="md:col-span-3">
            <h3 className="font-serif text-lg font-normal tracking-wider text-[#C6A36D] mb-5">
              {locale === "ua" ? "Замовлення та консультації" : "Sales & Consultations"}
            </h3>
            <address className="not-italic space-y-4 font-sans text-sm text-[#EAE7E1]/85">
              {/* Person Name */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-wider text-[#8B7355]/70 font-semibold">
                  {locale === "ua" ? "Контактна особа" : "Representative"}
                </span>
                <span className="text-base text-[#EAE7E1] font-serif">
                  {SITE_CONTACT.personName}
                </span>
              </div>

              {/* Direct Mobile Phone */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-wider text-[#8B7355]/70 font-semibold">
                  {locale === "ua" ? "Прямий мобільний" : "Direct Mobile"}
                </span>
                <a
                  href={SITE_CONTACT_TEL_HREF}
                  className="w-fit text-base font-serif text-[#C6A36D] hover:underline"
                >
                  {SITE_CONTACT.phoneDisplay}
                </a>
              </div>

              {/* Consultation Email */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-wider text-[#8B7355]/70 font-semibold">
                  Email
                </span>
                <a
                  href={SITE_CONTACT_MAILTO_HREF}
                  className="w-fit text-sm text-[#EAE7E1] transition hover:text-[#C6A36D]"
                >
                  {SITE_CONTACT.email}
                </a>
              </div>
            </address>
          </div>

          {/* Column 3: Office, Production & Address */}
          <div className="md:col-span-3">
            <h3 className="font-serif text-lg font-normal tracking-wider text-[#C6A36D] mb-5">
              {locale === "ua" ? "Офіс та виробництво" : "Office & Production"}
            </h3>
            <address className="not-italic space-y-4 font-sans text-sm text-[#EAE7E1]/85">
              {/* Office Landline Phone */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-wider text-[#8B7355]/70 font-semibold">
                  {locale === "ua" ? "Робочий телефон" : "Office Landline"}
                </span>
                <a
                  href="tel:+380325269187"
                  className="w-fit text-base font-serif text-[#EAE7E1] transition hover:text-[#C6A36D]"
                >
                  +38 (03252) 69-187
                </a>
              </div>

              {/* Physical Address */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-wider text-[#8B7355]/70 font-semibold">
                  {locale === "ua" ? "Адреса" : "Address"}
                </span>
                <div className="text-sm text-[#EAE7E1]/80 leading-relaxed">
                  {locale === "ua" ? (
                    <>
                      Україна, <br />
                      Львівська область, <br />
                      Жовківський район, <br />
                      село Городжів, 80331
                    </>
                  ) : (
                    <>
                      Horodzhiv village, 80331 <br />
                      Zhovkva district, <br />
                      Lviv region, Ukraine
                    </>
                  )}
                </div>
              </div>

              {/* Partner link */}
              <div className="pt-4 flex flex-col gap-1 border-t border-white/5">
                <span className="text-[10px] uppercase tracking-wider text-[#8B7355]/70 font-semibold">
                  {locale === "ua" ? "Міжнародний партнер" : "International Partner"}
                </span>
                <Link
                  href="https://holzbaurustikal.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm text-[#C6A36D] transition hover:text-[#d4b07e] font-serif"
                >
                  <span>holzbaurustikal.de</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </div>
            </address>
          </div>

          {/* Column 4: Map location */}
          <div className="md:col-span-3 flex flex-col">
            <h3 className="font-serif text-lg font-normal tracking-wider text-[#C6A36D] mb-5">
              {locale === "ua" ? "Локація" : "Location"}
            </h3>
            <div className="group relative flex-1 min-h-[160px] overflow-hidden rounded-sm border border-white/10 bg-white/[0.02]">
              {/* Embedded Google Maps with dark gray premium filter */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2556.7027376378417!2d23.8315264!3d50.1472852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4724b07ab68efb3f%3A0xc47e3ab8256a42a3!2z0JPQvtGA0L7QtNC20ZbQsiwg0JvRjNCy0ZbQstGB0YzQutCwINC-0LHQuy4sIDgwMzMx!5e0!3m2!1suk!2sua!4v1716920000000!5m2!1suk!2sua"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full opacity-60 transition-opacity duration-500 group-hover:opacity-80"
              />
              {/* Smooth dark overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
              
              {/* Action Button to Open Google Maps */}
              <a
                href="https://maps.app.goo.gl/b2VcnjGqoVtdRzY46?g_st=it"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 rounded-sm border border-[#C6A36D]/40 bg-black/85 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#C6A36D] backdrop-blur-md transition-all duration-300 hover:border-[#C6A36D] hover:bg-[#C6A36D] hover:text-[#0F0F0F]"
              >
                <span>{locale === "ua" ? "Відкрити на карті" : "Open in Google Maps"}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Small footer Copyright on mobile */}
        <p className="block md:hidden mt-12 text-xs text-[#8B7355]/50 border-t border-white/5 pt-8">
          © {new Date().getFullYear()} Lavanda.{" "}
          {locale === "ua" ? "Усі права захищені." : "All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
