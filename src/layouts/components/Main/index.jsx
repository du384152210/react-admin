import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import './index.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '@/assets/css/transition.scss';

export default function Main() {
  const location = useLocation();
  const currentOutlet = useOutlet();
  return (
    <div className='contentStyle'>
      <TransitionGroup>
        <CSSTransition timeout={500} classNames="layout-main-page" unmountOnExit key={location.key}>
          {currentOutlet}
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}
