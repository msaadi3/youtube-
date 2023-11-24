import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import {
  Navbar,
  Channel,
  Feed,
  SearchResults,
  VideoPlaying,
} from './components';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import App from './App';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Navbar />}>
//       <Route index element={<Feed />} />
//       <Route path='@/:channel' element={<Channel />} />
//       <Route path='search/:search' element={<SearchResults />} />
//       <Route path='video/:video' element={<VideoPlaying />} />
//     </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    {/* <RouterProvider router={router} /> */}
  </Provider>
);
