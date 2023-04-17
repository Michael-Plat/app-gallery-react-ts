import React from 'react';
import cl from 'classnames';

import { CommonClassProps, Photo } from '../types';

import style from './transitionPhoto.module.scss';

interface TransitionPhotoProps extends CommonClassProps {
  photos: Photo[];
  indexActivePhoto: number;
}

type Ref = React.MutableRefObject<HTMLDivElement | null>;
const getPhotoByRef = (ref: Ref, index: number): HTMLElement | null =>
  ref.current!.querySelector(`img:nth-of-type(${index + 1})`);

const hidePhoto = (element: HTMLElement | null) => {
  if (!element) {
    return;
  }

  element.dataset.active = 'false';

  if (element.previousSibling) {
    //@ts-ignore
    element.previousSibling.dataset.active = 'false';
  }

  if (element.nextSibling) {
    //@ts-ignore
    element.nextSibling.dataset.active = 'false';
  }
};

const showePhoto = (element: HTMLElement | null) => {
  if (!element) {
    return;
  }

  element.dataset.active = 'true';

  if (element.previousSibling) {
    //@ts-ignore
    element.previousSibling.dataset.active = 'prepared';
  }

  if (element.nextSibling) {
    //@ts-ignore
    element.nextSibling.dataset.active = 'prepared';
  }
};

export const TransitionPhoto: React.FC<TransitionPhotoProps> = ({
  photos,
  indexActivePhoto,
  className,
}) => {
  const [prevActiveIndexPhoto, setPrevActivePhoto] = React.useState(indexActivePhoto);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const activePhoto = getPhotoByRef(containerRef, prevActiveIndexPhoto);

    const nextActivePhoto = getPhotoByRef(containerRef, indexActivePhoto);

    if (prevActiveIndexPhoto !== indexActivePhoto) {
      hidePhoto(activePhoto);
      showePhoto(nextActivePhoto);
    } else {
      showePhoto(activePhoto);
    }

    setPrevActivePhoto(indexActivePhoto);
  }, [indexActivePhoto]);

  return React.useMemo(
    () => (
      <div className={cl(className, style.transitionPhoto)} ref={containerRef}>
        {photos.map((photo, id) => (
          <img
            className={style.transitionPhotoImage}
            key={id}
            data-active={id === prevActiveIndexPhoto}
            src={photo.src}
            alt={photo.description}
            loading="lazy"
          />
        ))}
      </div>
    ),
    [],
  );
};
