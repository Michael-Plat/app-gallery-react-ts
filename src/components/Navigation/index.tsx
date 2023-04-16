import cl from 'classnames';

import { CommonClassProps } from '../types';

import style from './navigation.module.scss';

interface NavigationProps extends CommonClassProps {
  disablePrev: boolean;
  disableNext: boolean;
  onPrevClick: () => void;
  onNextClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  disablePrev,
  disableNext,
  className,
  onPrevClick,
  onNextClick,
}) => (
  <div className={cl(style.navigation, className)}>
    <button
      disabled={disablePrev}
      className={cl(style.navigationBtn, style.navigationBtnLeft)}
      onClick={onPrevClick}>
      Show previous photo
    </button>
    <button
      disabled={disableNext}
      className={cl(style.navigationBtn, style.navigationBtnRight)}
      onClick={onNextClick}>
      Show next photo
    </button>
  </div>
);
