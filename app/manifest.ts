import type { MetadataRoute } from "next";
import { localeMeta } from "@/lib/i18n";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LAVANDA — handcrafted log homes",
    short_name: "LAVANDA",
    description: localeMeta.ua.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0F0F0F",
    theme_color: "#0F0F0F",
    lang: "uk",
    icons: [
      {
        src: "/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
        purpose: "any",
      },
    ],
  };
}
