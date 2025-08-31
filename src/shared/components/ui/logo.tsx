type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export const Logo = (props: Props) => {
	return <img alt="Logo" src="/media/logos/logo.svg" {...props} />;
};
