import {twMerge} from 'tailwind-merge';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: ButtonVariants;
  className?: string;
  disabled?: boolean;
}
export type ButtonVariants = 'primary' | 'secondary' | 'danger' | 'none';

const Button: React.FC<ButtonProps> = ({variant = 'primary', children, className, onClick, disabled, ...rest}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        `rounded-lg px-4 py-2.5 font-bold text-lg cursor-pointer  disabled:cursor-not-allowed disabled:opacity-50 
       ${
         variant === 'primary'
           ? 'bg-primary text-base-color border-none hover:enabled:bg-primary disabled:bg-base-700'
           : variant === 'secondary'
             ? 'bg-transparent border-base-300 text-secondary border hover:enabled:bg-base-100'
             : variant === 'danger'
               ? 'bg-red-high-contrast text-white border-transparent'
               : 'bg-transparent border-transparent rounded-none hover:enabled:bg-base-100'
       }`,
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      {...rest}>
      {children}
    </button>
  );
};

export default Button;
