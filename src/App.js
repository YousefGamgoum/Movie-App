// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // تأكد من أن هذا المسار صحيح
import { BrowserRouter } from 'react-router-dom';
import MovieDetails from './Pages/MovieDetails'; // تصحيح مسار الاستيراد

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <MovieDetails movieId={400} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;