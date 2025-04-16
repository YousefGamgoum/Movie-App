// import React from "react";
// import ShowTV from "./component/ShowTV/ShowTV";
// import "./App.css";

// function App() {
//   return (
//     <div className="app">
//       <ShowTV />
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import ShowTV from './component/ShowTV/ShowTV';

function App() {
  const [selectedShow, setSelectedShow] = useState(null);

  const handleSelectShow = (show) => {
    setSelectedShow(show);
     
  };

  return (
    <div>
      <ShowTV onSelectShow={handleSelectShow} />
    </div>
  );
}

export default App;


