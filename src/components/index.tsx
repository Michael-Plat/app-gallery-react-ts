import React from 'react';

import { Photo } from './types';
import { MainPhoto } from './MainPhoto';

import style from './index.module.scss';
import { PreviewGallery } from './PreviewGallery';
import { Navigation } from './Navigation';

interface AppGalleryTSProps {
  photos: Photo[];
}

export const AppGalleryTS: React.FC<AppGalleryTSProps> = ({ photos }) => {
  if (!photos.length) {
    return null;
  }

  const [indexActivePhoto, setIndexActivePhoto] = React.useState(0);
  const prevPhoto = photos[indexActivePhoto - 1];
  const activePhoto = photos[indexActivePhoto];
  const nextPhoto = photos[indexActivePhoto + 1];

  return (
    <div className={style.appGallery}>
      <div className={style.appGalleryContainer}>
        <MainPhoto prevPhoto={prevPhoto} activePhoto={activePhoto} nextPhoto={nextPhoto} />
        <Navigation
          disablePrev={!prevPhoto}
          disableNext={!nextPhoto}
          onPrevClick={() => {
            setIndexActivePhoto(indexActivePhoto - 1);
          }}
          onNextClick={() => {
            setIndexActivePhoto(indexActivePhoto + 1);
          }}
          className={style.appGalleryNavigation}
        />
      </div>
      <PreviewGallery
        activePhotoIndex={indexActivePhoto}
        photos={photos}
        className={style.appGalleryPreviewList}
      />
    </div>
  );
};
