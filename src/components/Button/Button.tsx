import { ButtonHTMLAttributes, FC } from 'react';
import './button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    view?: 'brand' | 'secondary',
    inner: React.ReactNode | string,
    className?: string,
}

export const Button: FC<ButtonProps> = ({ view = "brand", inner = '', className = '', ...props }) => {
    return (
        <button className={`AppButton AppButton--${view} ${className}`} {...props}>
            {inner}
        </button>
    )
}