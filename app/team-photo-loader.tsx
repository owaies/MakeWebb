'use client';

import { useEffect } from 'react';

const OWAIES_PHOTO = '/team/owaies.jpg';
const AFAF_PHOTO = '/team/file_000000001c20821185b00fb24f8c0312.png';

export default function TeamPhotoLoader() {
  useEffect(() => {
    document.querySelectorAll<HTMLImageElement>('.person-image').forEach((image) => {
      if (image.alt === 'Mohammed Owaies') image.src = OWAIES_PHOTO;
      if (image.alt === 'Mohammed Afaf Hassan') image.src = AFAF_PHOTO;
    });
  }, []);

  return null;
}
