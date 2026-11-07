import Image from 'next/image'
import styles from './stacked-photos.module.css'

type Props = { photos: { src: string; width: number; height: number; unoptimized?: boolean }[] }

// Pile de petits portraits qui se chevauchent (widget « stacked-photos »), décoratifs : le texte voisin porte l'information.
export function StackedPhotos({ photos }: Props) {
  return (
    <div className={styles.root}>
      {photos.map((p, i) => (
        <Image
          key={p.src + i}
          src={p.src}
          alt=""
          width={p.width}
          height={p.height}
          unoptimized={p.unoptimized}
          sizes="30px"
          className={styles.photo}
        />
      ))}
    </div>
  )
}
