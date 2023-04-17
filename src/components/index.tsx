import React from 'react';

import { Photo } from './types';
import { TransitionPhoto } from './TransitionPhoto';

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
  const nextPhoto = photos[indexActivePhoto + 1];

  return (
    <div className={style.appGallery}>
      <div className={style.appGalleryContainer}>
        <TransitionPhoto photos={photos} indexActivePhoto={indexActivePhoto} />
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
        setNewPhoto={setIndexActivePhoto}
        className={style.appGalleryPreviewList}
      />
    </div>
  );
};
