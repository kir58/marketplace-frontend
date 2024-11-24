import Link from 'next/link';
import { Button, ButtonProps } from '@mui/material';

type Props = { href: string } & ButtonProps;
export const NavigationButton = ({ href, children, ...restProps }: Props) => {
  return (
    <Link href={href}>
      <Button {...restProps}> {children} </Button>{' '}
    </Link>
  );
};
