/** Photos du site (dossier public/pics/) — hero + galerie */
export const sitePics: string[] = [
  "photo1.webp",
  "photo2.webp",
  "photo3.webp",
  "photo4.webp",
  "photo5.webp",
  "photo6.webp",
];

export function picSrc(file: string) {
  return `/pics/${file}`;
}

/** Clé de traduction gallery.captions (sans extension, ex. photo1.jpeg → photo1) */
export function picCaptionKey(file: string) {
  return file.replace(/\.[^.]+$/, "");
}
