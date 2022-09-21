import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Signup from './pages/Signup';
import PlayerMenu from './components/PlayerMenu'
import { AuthProvider } from './contexts/AuthContext';
import { PlayerColorProvider } from './contexts/PlayerColorContext';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import SelectProfileImage from './pages/SelectProfileImage';
import { ImageProvider } from './contexts/ImageContext';
import Test from './pages/Test'

function App() {

  return (
    <ImageProvider>
      <AuthProvider>
        <PlayerColorProvider>
          <Router>
            <Routes>
              <Route exact path="/" element={
                <PrivateRoute>
                  <PlayerMenu />
                </PrivateRoute>
              } />
              <Route path="/imageselect" element={
                <PrivateRoute>
                  <SelectProfileImage />
                </PrivateRoute>
              } />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          </Router>
        </PlayerColorProvider>
      </AuthProvider>
    </ImageProvider>
  );
}

export default App;
