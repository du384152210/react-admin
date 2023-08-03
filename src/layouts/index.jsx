import React, {lazy, Suspense} from 'react';
// import LayoutVertical from './LayoutVertical';
// import LayoutClassic from './LayoutClassic';
// import LayoutTransverse from './LayoutTransverse';
// import LayoutColumns from './LayoutColumns';
// import ThemeDrawer from './components/ThemeDrawer';
import { useSelector } from 'react-redux';
import Loading from '@/components/Loading';

const LayoutVertical = lazy(() => import('./LayoutVertical'));
const LayoutClassic = lazy(() => import('./LayoutClassic'));
const LayoutTransverse = lazy(() => import('./LayoutTransverse'));
const LayoutColumns = lazy(() => import('./LayoutColumns'));

const component = {
  vertical: () => {return <LayoutVertical/> },
  classic: () => {return (<LayoutClassic/>)},
  transverse: () => {return (<LayoutTransverse />)},
  columns: () => {return (<LayoutColumns/>)}
}

export default function Layouts() {

  const layout = useSelector((state) => state.global.layout)

  
  return (
    <Suspense  fallback={<div style={{ width: '100%', height: '100vh'}}>
      <Loading />
      </div>
    }>
      {component[layout]()}
      {/* <ThemeDrawer /> */}
    </Suspense>
  )
}
