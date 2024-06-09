import { Link, NavLink, Outlet } from 'react-router-dom';
import './layout.scss';
import CinemaLogo from 'assets/cinema-logo.svg?react';
import { useAuth } from '@/hooks/useAuth';

export const Layout = () => {
  const { isAuthorized, profile } = useAuth()

  return (
    <>
      <header className='Header'>
        <div className="container Header__Container">
          <Link to={'/'} className='Header__Logo'>
            <CinemaLogo />
          </Link>
          <nav className="Header__Nav">
            <NavLink to={'/'}>Главная</NavLink>
            <NavLink to={'/genres'}>Жанры</NavLink>
            <div className="Header__Search">Searh field</div>
            {isAuthorized ?
              <NavLink to={`/profile/${profile?.name}`}>{profile?.name}</NavLink>
              : <button className='btn-reset LoginBtn'>Войти</button>}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}