import React, { useState } from 'react';
import JournalInput from './components/JournalInput';
import DesignArea from './components/DesignArea';

function App() {
  const [screen, setScreen] = useState('toHome');
  const changeScreen = (page) => { setScreen(page) };
 
  if(screen == 'toHome') return <JournalInput update={ changeScreen }/>;
  else if(screen == 'toCanvas') return <DesignArea update={ changeScreen }/>;
  //else if(screen == 'toExport') return ;
}

export default App;

/*
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from the Express backend
    fetch('/api')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error(error));
  }, []);

  // TODO: switch pages
  return (
    <div>
      <p>{message}</p>
    </div>
  );*/