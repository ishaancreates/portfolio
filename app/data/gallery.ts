/**
 * Gallery photos. Each `file` has {file}-800.webp and -1600.webp
 * in public/images/gallery (resized from the originals in public/images/*).
 * Photos show in this order inside their section. Change `alt` to describe a
 * photo, or change `section` to move it.
 */

export type GallerySection = 'Shutterbug' | 'Travel' | 'Me'

export interface Photo {
  file: string
  section: GallerySection
  alt: string
  /** Intrinsic size of the 1600px version, used to reserve space. */
  width: number
  height: number
}

/** Page order: Shutterbug on top, then Travel, then Me. */
export const gallerySections: { id: GallerySection; slug: string; index: string }[] = [
  { id: 'Shutterbug', slug: 'shutterbug', index: '01' },
  { id: 'Travel', slug: 'travel', index: '02' },
  { id: 'Me', slug: 'me', index: '03' },
]

export const photos: Photo[] = [
  { file: 'shutterbug-01', section: 'Shutterbug', alt: 'Shutterbug photo 01', width: 1600, height: 1200 },
  { file: 'shutterbug-02', section: 'Shutterbug', alt: 'Shutterbug photo 02', width: 1600, height: 2134 },
  { file: 'shutterbug-03', section: 'Shutterbug', alt: 'Shutterbug photo 03', width: 1600, height: 2134 },
  { file: 'shutterbug-04', section: 'Shutterbug', alt: 'Shutterbug photo 04', width: 1600, height: 2134 },
  { file: 'shutterbug-05', section: 'Shutterbug', alt: 'Shutterbug photo 05', width: 1600, height: 2134 },
  { file: 'shutterbug-06', section: 'Shutterbug', alt: 'Shutterbug photo 06', width: 1600, height: 2134 },
  { file: 'shutterbug-07', section: 'Shutterbug', alt: 'Shutterbug photo 07', width: 1600, height: 1200 },
  { file: 'shutterbug-08', section: 'Shutterbug', alt: 'Shutterbug photo 08', width: 1600, height: 2134 },
  { file: 'shutterbug-09', section: 'Shutterbug', alt: 'Shutterbug photo 09', width: 1600, height: 2134 },
  { file: 'shutterbug-10', section: 'Shutterbug', alt: 'Shutterbug photo 10', width: 1600, height: 1200 },
  { file: 'shutterbug-11', section: 'Shutterbug', alt: 'Shutterbug photo 11', width: 1600, height: 1200 },
  { file: 'shutterbug-12', section: 'Shutterbug', alt: 'Shutterbug photo 12', width: 1600, height: 2134 },
  { file: 'shutterbug-13', section: 'Shutterbug', alt: 'Shutterbug photo 13', width: 1600, height: 2134 },
  { file: 'shutterbug-14', section: 'Shutterbug', alt: 'Shutterbug photo 14', width: 1600, height: 2134 },
  { file: 'shutterbug-15', section: 'Shutterbug', alt: 'Shutterbug photo 15', width: 1600, height: 2134 },
  { file: 'shutterbug-16', section: 'Shutterbug', alt: 'Shutterbug photo 16', width: 1600, height: 2134 },
  { file: 'shutterbug-17', section: 'Shutterbug', alt: 'Shutterbug photo 17', width: 1600, height: 2134 },
  { file: 'shutterbug-18', section: 'Shutterbug', alt: 'Shutterbug photo 18', width: 1600, height: 2134 },
  { file: 'shutterbug-19', section: 'Shutterbug', alt: 'Shutterbug photo 19', width: 1600, height: 2134 },
  { file: 'shutterbug-20', section: 'Shutterbug', alt: 'Shutterbug photo 20', width: 1600, height: 1200 },
  { file: 'shutterbug-21', section: 'Shutterbug', alt: 'Shutterbug photo 21', width: 1600, height: 2134 },
  { file: 'shutterbug-22', section: 'Shutterbug', alt: 'Shutterbug photo 22', width: 1600, height: 2134 },
  { file: 'shutterbug-23', section: 'Shutterbug', alt: 'Shutterbug photo 23', width: 1600, height: 2134 },
  { file: 'shutterbug-24', section: 'Shutterbug', alt: 'Shutterbug photo 24', width: 1600, height: 2134 },
  { file: 'shutterbug-25', section: 'Shutterbug', alt: 'Shutterbug photo 25', width: 1600, height: 1200 },
  { file: 'shutterbug-26', section: 'Shutterbug', alt: 'Shutterbug photo 26', width: 1600, height: 2134 },
  { file: 'shutterbug-27', section: 'Shutterbug', alt: 'Shutterbug photo 27', width: 1600, height: 2134 },
  { file: 'shutterbug-28', section: 'Shutterbug', alt: 'Shutterbug photo 28', width: 1600, height: 2134 },
  { file: 'shutterbug-29', section: 'Shutterbug', alt: 'Shutterbug photo 29', width: 1600, height: 2134 },
  { file: 'travel-01', section: 'Travel', alt: 'Travel photo 01', width: 1600, height: 1200 },
  { file: 'travel-02', section: 'Travel', alt: 'Travel photo 02', width: 1600, height: 2134 },
  { file: 'travel-03', section: 'Travel', alt: 'Travel photo 03', width: 1600, height: 1200 },
  { file: 'travel-04', section: 'Travel', alt: 'Travel photo 04', width: 1600, height: 2134 },
  { file: 'travel-05', section: 'Travel', alt: 'Travel photo 05', width: 1600, height: 2134 },
  { file: 'travel-06', section: 'Travel', alt: 'Travel photo 06', width: 1600, height: 1200 },
  { file: 'travel-07', section: 'Travel', alt: 'Travel photo 07', width: 1600, height: 1200 },
  { file: 'travel-08', section: 'Travel', alt: 'Travel photo 08', width: 1600, height: 1200 },
  { file: 'travel-09', section: 'Travel', alt: 'Travel photo 09', width: 1600, height: 1200 },
  { file: 'travel-10', section: 'Travel', alt: 'Travel photo 10', width: 1600, height: 2134 },
  { file: 'travel-11', section: 'Travel', alt: 'Travel photo 11', width: 1600, height: 2134 },
  { file: 'travel-12', section: 'Travel', alt: 'Travel photo 12', width: 1600, height: 2134 },
  { file: 'travel-13', section: 'Travel', alt: 'Travel photo 13', width: 1600, height: 2134 },
  { file: 'travel-14', section: 'Travel', alt: 'Travel photo 14', width: 1600, height: 2134 },
  { file: 'travel-15', section: 'Travel', alt: 'Travel photo 15', width: 1600, height: 1200 },
  { file: 'travel-16', section: 'Travel', alt: 'Travel photo 16', width: 1600, height: 1200 },
  { file: 'travel-17', section: 'Travel', alt: 'Travel photo 17', width: 1600, height: 2134 },
  { file: 'travel-18', section: 'Travel', alt: 'Travel photo 18', width: 1600, height: 2134 },
  { file: 'travel-19', section: 'Travel', alt: 'Travel photo 19', width: 1600, height: 1200 },
  { file: 'travel-20', section: 'Travel', alt: 'Travel photo 20', width: 1600, height: 2134 },
  { file: 'travel-21', section: 'Travel', alt: 'Travel photo 21', width: 1600, height: 2134 },
  { file: 'travel-22', section: 'Travel', alt: 'Travel photo 22', width: 1600, height: 1200 },
  { file: 'travel-23', section: 'Travel', alt: 'Travel photo 23', width: 1600, height: 2134 },
  { file: 'travel-24', section: 'Travel', alt: 'Travel photo 24', width: 1600, height: 2134 },
  { file: 'travel-25', section: 'Travel', alt: 'Travel photo 25', width: 1600, height: 2134 },
  { file: 'travel-26', section: 'Travel', alt: 'Travel photo 26', width: 1600, height: 2134 },
  { file: 'travel-27', section: 'Travel', alt: 'Travel photo 27', width: 1600, height: 1200 },
  { file: 'travel-28', section: 'Travel', alt: 'Travel photo 28', width: 1600, height: 1200 },
  { file: 'travel-29', section: 'Travel', alt: 'Travel photo 29', width: 1600, height: 2844 },
  { file: 'travel-30', section: 'Travel', alt: 'Travel photo 30', width: 1600, height: 2844 },
  { file: 'travel-31', section: 'Travel', alt: 'Travel photo 31', width: 1600, height: 2844 },
  { file: 'img3', section: 'Me', alt: 'Ishaan taking a mirror selfie in a brown jacket', width: 960, height: 1280 },
  { file: 'img2', section: 'Me', alt: 'Ishaan standing beside a green Royal Enfield motorcycle', width: 1600, height: 2134 },
  { file: 'img5', section: 'Me', alt: 'Ishaan smiling beside a pool table', width: 640, height: 640 },
  { file: 'img10', section: 'Me', alt: 'Ishaan holding a small camera under a tree', width: 1600, height: 2134 },
  { file: 'img4', section: 'Me', alt: 'Ishaan photographing his reflection', width: 1280, height: 960 },
  { file: 'img1', section: 'Me', alt: 'Ishaan in front of a white temple complex', width: 960, height: 1280 },
  { file: 'img7', section: 'Me', alt: 'Ishaan standing on a path in front of a historic tower building', width: 1600, height: 2134 },
  { file: 'img8', section: 'Me', alt: 'A historic tower rising above a tree-lined path', width: 1600, height: 2134 },
  { file: 'img9', section: 'Me', alt: 'A footballer mid-air in a bicycle kick on a grass field', width: 1600, height: 3448 },
  { file: 'img6', section: 'Me', alt: 'Bread and a flower bouquet in a bakery counter, seen in a mirror', width: 1600, height: 2846 },
]
