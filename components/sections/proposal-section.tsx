import { getTranslations } from '@/lib/i18n'
import { Proposal } from '@/components/blocks/proposal'
import { mediaOf, type Landing } from '@/lib/media'

// « Demander un devis » : même bloc sur l'accueil et sur la page équipe (messages home.proposal).
export async function ProposalSection({ ns = 'home' }: { ns?: Landing }) {
  const m = mediaOf(ns)
  const pr = await getTranslations(`${ns}.proposal`)
  return (
    <Proposal
      background={m.proposal}
      kicker={pr('kicker')}
      title={pr('title')}
      text={pr('text')}
      points={pr.raw('points') as React.ComponentProps<typeof Proposal>['points']}
      formTitle={pr('formTitle')}
      formIntro={pr('formIntro')}
      fields={pr.raw('fields') as React.ComponentProps<typeof Proposal>['fields']}
      note={pr('note')}
      submit={pr('submit')}
      messages={pr.raw('messages') as React.ComponentProps<typeof Proposal>['messages']}
    />
  )
}
