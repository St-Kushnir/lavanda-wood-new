/** Контактні дані для сайту (телефон у форматі E.164 для tel / clipboard) */
export const SITE_CONTACT = {
  personName: "Rostyslav Vasyna",
  phoneRaw: "+380677757750",
  phoneDisplay: "+38 067 777 57 50",
  email: "office.lavandawood@gmail.com",
} as const;

export const SITE_CONTACT_TEL_HREF = `tel:${SITE_CONTACT.phoneRaw}` as const;
export const SITE_CONTACT_MAILTO_HREF = `mailto:${SITE_CONTACT.email}` as const;
