import { getTranslations } from 'next-intl/server'
import { Contact } from '@/components/blocks/contact'
import type { ProposalField } from '@/components/blocks/proposal-form'
import { site } from '@/lib/site'

// Coordonnées : celles de lib/site (provisoires tant que la marque n'est pas décidée) ; textes dans messages/contact.
export async function ContactSection() {
  const t = await getTranslations('contact')
  return (
    <Contact
      kicker={t('kicker')}
      title={t('title')}
      highlight={t('highlight')}
      description={t('description')}
      address={site.address}
      phone={{ label: site.phone, href: site.phoneHref }}
      email={site.email}
      followTitle={t('followTitle')}
      social={site.social}
      socialLabel={t('socialLabel')}
      fields={t.raw('fields') as ProposalField[]}
      note={t('note')}
      submit={t('submit')}
      messages={t.raw('messages') as React.ComponentProps<typeof Contact>['messages']}
    />
  )
}
