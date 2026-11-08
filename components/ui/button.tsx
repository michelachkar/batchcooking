import Link from 'next/link'
import clsx from 'clsx'
import styles from './button.module.css'

// Deux familles de boutons : le bouton du header (pilule verte, 16/600) et ceux du bandeau du footer (15/700).
type Props = React.ComponentProps<typeof Link> & {
  variant?: 'primary' | 'light' | 'outline' | null
}

export function ButtonLink({ variant, className, ...props }: Props) {
  return (
    <Link className={clsx(styles.button, styles[variant ?? 'primary'], className)} {...props} />
  )
}
