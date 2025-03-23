import React, { useEffect, useState } from 'react';
import JournalInput from './components/JournalInput';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from the Express backend
    fetch('/api')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <JournalInput></JournalInput>
      <p>{message}</p>
    </div>
  );
}

export default App;
