import { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../components/Button.tsx'
import { HeadsetIcon } from '../components/Icons.tsx'
import { Container, Section } from '../components/Layout.tsx'
import { PageHeader } from '../components/PageHeader.tsx'
import { Panel } from '../components/Panel.tsx'
import { HELPDESK_HOURS, HELPDESK_PHONE_DISPLAY, HELPDESK_PHONE_HREF, HELPDESK_URL } from '../config.ts'

const Contact = styled(Panel)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem;
`

const Info = styled.div`
  flex: 1 1 18rem;
  display: grid;
  gap: 0.5rem;
  font-size: 1.15rem;
`

const Heading = styled.h2`
  font-size: 1.6rem;
  font-weight: 800;
`

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

const FaqWrap = styled.div`
  display: grid;
  gap: 0.75rem;
  margin-top: 1.25rem;
`

const FaqButton = styled.button<{ $open: boolean }>`
  width: 100%;
  min-height: 60px;
  padding: 1rem 1.25rem;
  text-align: left;
  font: inherit;
  font-size: 1.15rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.navy};
  background: ${({ $open }) => ($open ? '#dde9f8' : '#fff')};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  cursor: pointer;
`

const FaqAnswer = styled.p`
  padding: 0.25rem 1.25rem 1rem;
  font-size: 1.1rem;
`

const faqs = [
  {
    question: 'Jeg kan ikke huske min adgangskode',
    answer: 'Det er helt almindeligt. Tryk på "Glemt adgangskode" på hjemmesiden, eller ring til os, så guider vi dig igennem.',
  },
  {
    question: 'Min computer er blevet langsom',
    answer: 'Prøv at lukke alle vinduer og starte computeren forfra. Hjælper det ikke, kan vores helpdesk se med over video.',
  },
  {
    question: 'Jeg har fået en mærkelig besked eller e-mail',
    answer: 'Klik ikke på links, og giv ikke koder til nogen. Ring til os, så kigger vi på beskeden sammen.',
  },
  {
    question: 'Jeg ved ikke, hvordan jeg gemmer et billede eller et brev',
    answer: 'Brug siden "Filer & Dokumenter" – her kan du uploade og finde dine filer igen med ét tryk.',
  },
]

function Helpdesk() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <PageHeader
        title="Helpdesk – vi er her for dig"
        lead="Har du svært ved noget? Så er der ingen grund til at sidde alene med det. Vi hjælper dig gerne."
      />
      <Container>
        <Section>
          <Contact $tone="blue">
            <HeadsetIcon size={80} />
            <Info>
              <Heading>Tal med en rigtig person</Heading>
              <p>Åbent {HELPDESK_HOURS}.</p>
              <p>
                Ring på <strong>{HELPDESK_PHONE_DISPLAY}</strong> eller tryk på knappen for at komme direkte til vores helpdesk.
              </p>
            </Info>
            <Buttons>
              <Button href={HELPDESK_URL} variant="navy" arrow newTab={false}>
                Kontakt Helpdesk nu
              </Button>
              <Button href={HELPDESK_PHONE_HREF} variant="outline">
                Ring {HELPDESK_PHONE_DISPLAY}
              </Button>
            </Buttons>
          </Contact>
        </Section>

        <Section>
          <Heading>Det spørger andre om</Heading>
          <FaqWrap>
            {faqs.map((faq, index) => (
              <div key={faq.question}>
                <FaqButton type="button" $open={openIndex === index} aria-expanded={openIndex === index} onClick={() => toggle(index)}>
                  {faq.question}
                </FaqButton>
                {openIndex === index && <FaqAnswer>{faq.answer}</FaqAnswer>}
              </div>
            ))}
          </FaqWrap>
        </Section>
      </Container>
    </>
  )
}

export default Helpdesk
