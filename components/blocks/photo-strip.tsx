import Image from 'next/image'
import Link from 'next/link'
import { Icon, type IconName } from '@/components/ui/icon'
import clsx from 'clsx'
import styles from './photo-strip.module.css'

export type StripPhoto = {
  src: string
  width: number
  height: number
  unoptimized?: boolean
  caption: string
  icon: IconName
}

type Props = {
  kicker: string
  title: string
  handle: { label: string; href: string }
  photos: StripPhoto[]
  galleryLabel: string
}

function Tile({ photo, hidden }: { photo: StripPhoto; hidden?: boolean }) {
  return (
    <li
      aria-hidden={hidden || undefined}
      className={clsx(styles.tile, hidden && styles.tileHidden)}
    >
      <Image
        src={photo.src}
        alt={hidden ? '' : photo.caption}
        width={photo.width}
        height={photo.height}
        unoptimized={photo.unoptimized}
        sizes="280px"
        className={styles.image}
      />
      <span className={styles.caption}>
        <Icon name={photo.icon} className={styles.captionIcon} />
        {photo.caption}
      </span>
    </li>
  )
}

// Bande photo « From our table » : titre + compte, puis défilement lent des photos (CSS seul, en pause au survol).
// Sans animation (préférence système), la bande devient un défilement horizontal manuel sans doublons.
export function PhotoStrip({ kicker, title, handle, photos, galleryLabel }: Props) {
  return (
    <section data-section="photos" className={styles.root}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>{kicker}</p>
            <h2 className={styles.title}>{title}</h2>
          </div>
          <Link href={handle.href} className={styles.handle}>
            <Icon name="instagram" className={styles.handleIcon} />
            {handle.label}
          </Link>
        </header>
        <div tabIndex={0} aria-label={galleryLabel} className={styles.strip}>
          <ul className={styles.track}>
            {photos.map((p) => (
              <Tile key={p.src} photo={p} />
            ))}
            {photos.map((p) => (
              <Tile key={'d' + p.src} photo={p} hidden />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
