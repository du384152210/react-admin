import React from 'react';
import LayoutVertical from './LayoutVertical';
import LayoutClassic from './LayoutClassic';
import LayoutTransverse from './LayoutTransverse';
import LayoutColumns from './LayoutColumns';
import ThemeDrawer from './components/ThemeDrawer';
import { useSelector } from 'react-redux';

const component = {
  vertical: () => {return <LayoutVertical/> },
  classic: () => {return (<LayoutClassic/>)},
  transverse: () => {return (<LayoutTransverse />)},
  columns: () => {return (<LayoutColumns/>)}
}

export default function Layouts() {

  const layout = useSelector((state) => state.global.layout)

  
  return (
    <>
      {component[layout]()}
      <ThemeDrawer />
    </>
    
    
  )
}
