import {
  RouterProvider
} from 'react-router-dom';
import './App.scss'
import { router } from './router';
import { AuthProvider } from './hoc/AuthProvider';

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
