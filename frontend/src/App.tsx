import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';

// Layout components
import Layout from './components/layout/Layout';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Main pages
import Dashboard from './pages/Dashboard';
import Bands from './pages/bands/Bands';
import BandDetails from './pages/bands/BandDetails';
import CreateBand from './pages/bands/CreateBand';
import Rehearsals from './pages/rehearsals/Rehearsals';
import RehearsalDetails from './pages/rehearsals/RehearsalDetails';
import CreateRehearsal from './pages/rehearsals/CreateRehearsal';
import Venues from './pages/venues/Venues';
import VenueDetails from './pages/venues/VenueDetails';
import CreateVenue from './pages/venues/CreateVenue';
import Songs from './pages/songs/Songs';
import SongDetails from './pages/songs/SongDetails';
import CreateSong from './pages/songs/CreateSong';
import Setlists from './pages/setlists/Setlists';
import SetlistDetails from './pages/setlists/SetlistDetails';
import CreateSetlist from './pages/setlists/CreateSetlist';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Route guard
import ProtectedRoute from './components/auth/ProtectedRoute';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected routes */}
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              
              {/* Band routes */}
              <Route path="bands" element={<Bands />} />
              <Route path="bands/create" element={<CreateBand />} />
              <Route path="bands/:bandId" element={<BandDetails />} />
              
              {/* Rehearsal routes */}
              <Route path="rehearsals" element={<Rehearsals />} />
              <Route path="rehearsals/create" element={<CreateRehearsal />} />
              <Route path="rehearsals/:rehearsalId" element={<RehearsalDetails />} />
              
              {/* Venue routes */}
              <Route path="venues" element={<Venues />} />
              <Route path="venues/create" element={<CreateVenue />} />
              <Route path="venues/:venueId" element={<VenueDetails />} />
              
              {/* Song routes */}
              <Route path="songs" element={<Songs />} />
              <Route path="songs/create" element={<CreateSong />} />
              <Route path="songs/:songId" element={<SongDetails />} />
              
              {/* Setlist routes */}
              <Route path="setlists" element={<Setlists />} />
              <Route path="setlists/create" element={<CreateSetlist />} />
              <Route path="setlists/:setlistId" element={<SetlistDetails />} />
              
              {/* User profile */}
              <Route path="profile" element={<Profile />} />
            </Route>
            
            {/* 404 and redirects */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;