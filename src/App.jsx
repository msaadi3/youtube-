import { Navbar, Feed } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Feed />} />
        {/* <Route path='/video/:id' element={<YouTubeVideoPlayer />} />
        <Route path='/channel/:id' element={<Channel />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
