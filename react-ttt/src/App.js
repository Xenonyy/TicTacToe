import React from 'react';
import { Chat } from './components/Chat/Chat';
import Grid from './components/Grid/Grid';
import './css/Main.scss';

function App() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
      fetch("/api")
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);

  return ([
	<div id = "backend-test">{!data ? "Loading..." : data}</div>,
	<Grid />,
  <Chat />
  ]);
}

export default App;
