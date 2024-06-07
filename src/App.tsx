import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import './App.scss'
import { Main } from './pages/Main';
import { GenresPage } from './pages/GenresPage';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Main />}>
    <Route path='/genres' element={<GenresPage />} />
  </Route>
))

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
