import React from 'react';
import cl from 'classnames';

import { CommonClassProps, Photo } from '../types';

import style from './preview.module.scss';

interface PreviewGalleryProps extends CommonClassProps {
  activePhotoIndex: number;
  photos: Photo[];
}

export const PreviewGallery: React.FC<PreviewGalleryProps> = ({
  activePhotoIndex,
  photos,
  className,
}) => {
  if (!photos.length) {
    return null;
  }

  const previewContainer = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    if (!previewContainer.current) {
      return;
    }

    previewContainer.current.style.transform = `translate3d(-${activePhotoIndex * 164}px, 0, 0)`;
  }, [activePhotoIndex]);

  return (
    <div className={cl(style.previewGallery, className)}>
      {React.useMemo(
        () => (
          <ul className={style.previewGalleryTrack} ref={previewContainer}>
            {photos.map((photo) => (
              <li key={photo.id} className={style.previewGalleryPreview}>
                <img
                  src={photo.preview}
                  alt={photo.description}
                  className={style.previewGalleryImage}
                />
              </li>
            ))}
          </ul>
        ),
        [],
      )}
      <div className={style.previewGalleryCover}>
        {activePhotoIndex + 1} / {photos.length}
      </div>
    </div>
  );
};
