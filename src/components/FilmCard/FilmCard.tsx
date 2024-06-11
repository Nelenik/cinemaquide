import { Link } from 'react-router-dom';
import './filmcard.scss';
import { FC } from 'react';
import { Movie } from '@/api/Movies';


interface FilmCardProps {
    movie: Movie,
    isTop?: boolean,
    orderNum?: number,
    className?: string,
}
export const FilmCard: FC<FilmCardProps> = ({ movie, isTop = false, orderNum, className = '' }) => {
    return (
        <div className={`FilmCard ${className}`}>
            {isTop && <span className='FilmCard__Num'>{orderNum}</span>}
            <Link to={`movie/${movie.id}`} className='FilmCard__Link'>
                <img src={`${movie.posterUrl}`} alt={`Обложка фильма ${movie.title}`} />
            </Link>
        </div>
    )
}