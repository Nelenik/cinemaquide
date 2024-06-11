import { Link, NavLink, Outlet } from 'react-router-dom';
import './layout.scss';
import CinemaLogo from 'assets/img/cinema-logo.svg?react';
import { useAuth } from '@/hooks/useAuth';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { Loader } from '@/components/Loader';

export const Layout = () => {
  const { isAuthorized, isLoading, profile, mutateLogin } = useAuth()
  const [openModal, setOpenModal] = useState(false)

  const onSubm = (e: any) => {
    e.preventDefault()
    const form = e.currentTarget;
    mutateLogin({ email: form.email.value, password: form.password.value });
    setOpenModal(false)
  }

  const onEnter = () => {
    setOpenModal(true);
  }
  if (isLoading) return <Loader />

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
              <NavLink to={`/profile/${profile?.name}/favorites`}>{profile?.name}</NavLink>
              : <button className='btn-reset LoginBtn' onClick={onEnter}>Войти</button>}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      {openModal && createPortal(<form onSubmit={onSubm}><input type="text" name='email' /><input type="text" name='password' /><button>send</button></form>, document.body)}
    </>
  )
}