import { cn } from "../lib/utils";

type Props = {
	children?: React.ReactNode;
	className?: string;
};

export const Container = ({ children, className }: Props) => {
	return <div className={cn('container mx-auto z-10 relative', className)}>{children}</div>;
};
