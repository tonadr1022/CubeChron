import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  children: string | JSX.Element | JSX.Element[];
  onClick?: () => void;
};
const Button = ({ children, className, ...props }: Props) => {
  return (
    <button
      className={twMerge(
        "bg-midnight transition hover:bg-tahiti rounded-md p-1",
        className
      )}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
