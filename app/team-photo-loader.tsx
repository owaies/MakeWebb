'use client';

import { useEffect } from 'react';

export default function TeamPhotoLoader() {
  useEffect(() => {
    document.querySelectorAll<HTMLImageElement>('.person-image').forEach((image) => {
      if (image.alt === 'Mohammed Owaies') image.src = '/team/owaies.jpg';
      if (image.alt === 'Mohammed Afaf Hassan') image.src = '/team/afaf.jpg';
    });
  }, []);

  return null;
}
