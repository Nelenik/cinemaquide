import { Button } from '@/components/Button';
import './main.scss';
import Like from 'assets/img/like-svg.svg?react'

export const Main = () => {
    return (
        <>
            <div className="container">

                <div>Main page</div>
                <Button inner={<Like className='BtnSvg' stroke='#fff' />} view='secondary' />
            </div>

        </>
    )
}