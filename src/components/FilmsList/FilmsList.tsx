import { FC } from 'react';
import './filmslist.scss';
import { MoviesList } from '@/api/Movies';
import { FilmCard } from '../FilmCard';

interface FilmListProps {
    moviesList: MoviesList,
    isTop?: boolean
}

export const FilmsList: FC<FilmListProps> = ({ moviesList, isTop = false }) => {
    return (
        <ul className="Films">
            {moviesList.map((movie, index) => (
                <li key={movie.id} className='Films__Item'>
                    <FilmCard movie={movie} isTop={isTop} {...isTop && { orderNum: index }} />
                </li>
            ))}
        </ul>
    )
}