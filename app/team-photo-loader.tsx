'use client';

import { useEffect } from 'react';

const OWAIES_PHOTO = 'https://raw.githubusercontent.com/owaies/MakeWebb/main/app/file_000000002d308211b0a2203107625baf.png';
const AFAF_PHOTO = 'https://raw.githubusercontent.com/owaies/MakeWebb/main/app/IMG-20260905-WA0013.jpg';

export default function TeamPhotoLoader() {
  useEffect(() => {
    document.querySelectorAll<HTMLImageElement>('.person-image').forEach((image) => {
      if (image.alt === 'Mohammed Owaies') image.src = OWAIES_PHOTO;
      if (image.alt === 'Mohammed Afaf Hassan') image.src = AFAF_PHOTO;
    });
  }, []);

  return null;
}
