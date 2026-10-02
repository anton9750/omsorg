import styled from 'styled-components'
import { HELPDESK_HOURS, HELPDESK_PHONE_HREF, HELPDESK_URL } from '../config.ts'
import { Button } from './Button.tsx'
import { HeadsetIcon, PhoneIcon } from './Icons.tsx'

const Banner = styled.section`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  border-radius: ${({ theme }) => theme.radius.card};
  background: #eef4fc;
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: auto 1fr;
  }
  @media (max-width: ${({ theme }) => theme.bp.sm}) {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }
`

const Heading = styled.h2`
  font-size: 1.4rem;
  font-weight: 800;
`

const Text = styled.p`
  margin-top: 0.25rem;
  font-size: 1.05rem;
`

const IconWrap = styled.div`
  color: ${({ theme }) => theme.colors.navy};
`

const CallCircle = styled.a`
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #d5e4f7;
  color: ${({ theme }) => theme.colors.navy};
  text-decoration: none;
`

const ButtonWrap = styled.div`
  @media (max-width: ${({ theme }) => theme.bp.md}) {
    grid-column: 1 / -1;
  }
`

const Hours = styled.span`
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
`

export function HelpdeskBanner() {
  return (
    <Banner aria-labelledby="helpdesk-banner-title">
      <IconWrap>
        <HeadsetIcon size={64} />
      </IconWrap>
      <div>
        <Heading id="helpdesk-banner-title">Helpdesk – vi er her for dig</Heading>
        <Text>Har du brug for personlig hjælp? Vores helpdesk sidder klar til at støtte dig over telefon eller video.</Text>
      </div>
      <ButtonWrap>
        <Button href={HELPDESK_URL} variant="navy" newTab={false}>
          <span>
            Kontakt Helpdesk nu
            <Hours>Direkte support – {HELPDESK_HOURS}</Hours>
          </span>
        </Button>
      </ButtonWrap>
      <CallCircle href={HELPDESK_PHONE_HREF} aria-label="Ring til helpdesk">
        <PhoneIcon size={34} />
      </CallCircle>
    </Banner>
  )
}
