import { useQuery } from '@tanstack/react-query'
import './App.scss'
import { Main } from './pages/Main'
import { getProfile } from './api/User'


function App() {

  const data = useQuery({
    queryKey: ['profile'], queryFn: getProfile, retry: 0
  })
  return (
    <Main data={data} />
  )
}

export default App
