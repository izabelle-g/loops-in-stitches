import React, { useState } from 'react';
import JournalInput from './components/JournalInput';
import DesignArea from './components/DesignArea';

// for testing
const test = [
  ['#6f1dec', '#103466', '#f10dc3', '#916d1f', '#7e517a', '#b0fc26', '#36ae35', '#271e1a'],
  ['#6fbccc', '#10eef6', '#f12303', '#91ddff', '#7adbff', '#b99112', '#36ad35', '#2811ef'],
  ['#6f1dec', '#103466', '#f10dc3', '#916d1f', '#7e517a', '#b0fc26', '#36ae35', '#271e1a']
];

function App() {
  const [screen, setScreen] = useState('toHome');
  const [palettes, setPalettes] = useState(null);
  const changeScreen = (page) => { setScreen(page) };
  const getPalettes = (p) => { setPalettes(p) };
  
  if(screen == 'toHome') return <JournalInput update={ changeScreen } analysis={ getPalettes }/>;
  else if(screen == 'toCanvas') return <DesignArea update={ changeScreen } palettes={ test }/>;
  //else if(screen == 'toExport') return ;
}

export default App;