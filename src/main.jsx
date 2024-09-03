import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { Feed, Channel, YouTubeVideoPlayer } from './components/index.js';
import { CheckedProvider } from './CheckedContext.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Feed />} />
      <Route path='/search/:searchTerm' element={<Feed />} />
      <Route path='/watch/:videoId' element={<YouTubeVideoPlayer />} />
      <Route path='/channel/:channelId/videos' element={<Channel />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <CheckedProvider>
    <RouterProvider router={router} />
  </CheckedProvider>
);
