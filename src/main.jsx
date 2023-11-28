import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import App from './App';

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import {
  Feed,
  Channel,
  YouTubeVideoPlayer,
  ChannelAbout,
} from './components/index.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Feed />} />
      <Route path=':customUrl/videos' element={<Channel />} />
      <Route path=':customUrl/about' element={<ChannelAbout />} />
      <Route path='watch/:videoId' element={<YouTubeVideoPlayer />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
