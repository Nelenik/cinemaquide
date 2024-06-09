import { Main } from './pages/Main';
import { GenresPage } from './pages/GenresPage';
import { Layout } from './pages/Layout';
import { AGenrePage } from './pages/AGenrePage';
import { MoviePage } from './pages/MoviePage';
import { Profile } from './pages/Profile';
import { FavoritesPage } from './pages/FavoritesPage';
import { SettingsPage } from './pages/SettingsPage';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

export const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />} errorElement={<p>Page not found!!</p>}>
    <Route index element={<Main />} />
    <Route path='/genres' element={<GenresPage />} />
    <Route path='/genres/:genreName' element={<AGenrePage />} />
    <Route path='/movie/:movieId' element={<MoviePage />} />
    <Route path='/profile/:userName' element={<Profile />}>
      <Route path='favorites' element={<FavoritesPage />} />
      <Route path='settings' element={<SettingsPage />} />
    </Route>
  </Route>
))