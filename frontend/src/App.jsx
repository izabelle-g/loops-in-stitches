import React, { useState } from 'react';
import JournalInput from './components/JournalInput';
import DesignArea from './components/DesignArea';

function App() {
  const [screen, setScreen] = useState('toHome');
  const [palettes, setPalettes] = useState(null);
  const changeScreen = (page) => { setScreen(page) };
  const getPalettes = (p) => { setPalettes(p) };
  
  if(screen == 'toHome') return <JournalInput update={ changeScreen } palettes={ getPalettes }/>;
  else if(screen == 'toCanvas') return <DesignArea update={ changeScreen } palettes={ palettes }/>;
  //else if(screen == 'toExport') return ;
}

export default App;