import { SITE_URL, faq, htmlLang, localeMeta, type Locale } from "@/lib/i18n";

/**
 * Серверний JSON-LD (рендериться в початковий HTML) для SEO/GEO.
 * Organization/HomeAndConstructionBusiness лишається у футері (за вимогою — не чіпаємо);
 * тут додаємо WebSite, FAQPage та BreadcrumbList, яких немає у футері.
 */
export function StructuredData({ locale }: { locale: Locale }) {
  const lang = htmlLang(locale);

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: "LAVANDA",
    description: localeMeta[locale].description,
    inLanguage: lang,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "ua" ? "Головна" : "Home",
        item: `${SITE_URL}/`,
      },
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: faq[locale].map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const graph = [website, breadcrumb, faqPage];

  return (
    <>
      {graph.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  );
}
