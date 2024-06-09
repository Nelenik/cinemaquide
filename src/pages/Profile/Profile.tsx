import { Outlet } from 'react-router-dom';
import './profile.scss';

export const Profile = () => {
    return (
        <>
            <div>My account</div>
            <Outlet />
        </>
    )
}