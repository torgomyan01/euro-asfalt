/** Сгенерировано из загруженных фото: bruschatka-01.jpg … bruschatka-46.jpg */
export const BRUSCHATKA_GALLERY_COUNT = 46;

export function getBruschatkaGalleryPaths(): string[] {
  return Array.from({ length: BRUSCHATKA_GALLERY_COUNT }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return `/images/bruschatka/bruschatka-${n}.jpg`;
  });
}
