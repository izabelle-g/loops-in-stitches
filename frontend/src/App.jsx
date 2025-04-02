import React, { useState } from 'react';
import JournalInput from './components/JournalInput';
import DesignArea from './components/DesignArea';

function App() {
  const [screen, setScreen] = useState('toHome');
  const [palettes, setPalettes] = useState(null);
  const [emotion, setEmotion] = useState('');
  const changeScreen = (page) => { setScreen(page) };
  const getPalettes = (p) => { setPalettes(p) };
  const getEmotion = (e) => { setEmotion(e) };
  
  
  if(screen == 'toHome') return <JournalInput update={ changeScreen } palettes={ getPalettes } emotion={ getEmotion }/>;
  else if(screen == 'toCanvas') return <DesignArea update={ changeScreen } palettes={ palettes } emotion={ emotion }/>;
  //else if(screen == 'toExport') return ;
}

export default App;