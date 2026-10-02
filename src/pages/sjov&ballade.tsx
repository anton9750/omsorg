import styled from 'styled-components'
import { Button } from '../components/Button.tsx'
import { NetflixIcon } from '../components/Icons.tsx'
import { Container, Section } from '../components/Layout.tsx'
import { PageHeader } from '../components/PageHeader.tsx'
import { Panel } from '../components/Panel.tsx'
import { StepList } from '../components/StepList.tsx'
import { NETFLIX_URL } from '../config.ts'

const Hero = styled(Panel)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
`

const Heading = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.7rem;
  font-weight: 800;
`

const Text = styled.p`
  margin-top: 0.5rem;
  font-size: 1.15rem;
`

const Tips = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (max-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: 1fr;
  }
`

const TipList = styled.ul`
  margin: 1rem 0 0;
  padding-left: 1.3rem;
  display: grid;
  gap: 0.6rem;
  font-size: 1.1rem;
`

const watchSteps = [
  'Tryk på den store knap "Åbn Netflix".',
  'Log ind med din e-mail og din adgangskode.',
  'Vælg din profil.',
  'Skriv i søgefeltet, hvad du har lyst til at se.',
  'Tryk på billedet og derefter på "Afspil".',
]

function SjovOgBallade() {
  return (
    <>
      <PageHeader
        title="Sjov & Ballade"
        lead="Slå dig ned i den gode stol og find en film eller serie, der får dig til at smile."
      />
      <Container>
        <Section>
          <Hero $tone="green">
            <div>
              <Heading>
                <NetflixIcon size={40} /> Netflix
              </Heading>
              <Text>Tryk på knappen, så åbner Netflix i et nyt vindue.</Text>
            </div>
            <Button href={NETFLIX_URL} variant="green" arrow>
              Åbn Netflix
            </Button>
          </Hero>

          <Tips>
            <Panel $tone="cream">
              <Heading>Sådan ser du en film</Heading>
              <StepList steps={watchSteps} />
            </Panel>
            <Panel $tone="cream">
              <Heading>Gode ting at søge efter</Heading>
              <TipList>
                <li>"Dansk komedie" – hyggelige film med et grin</li>
                <li>"Krimi" – til når du vil have spænding</li>
                <li>"Dokumentar" – om natur, rejser og historie</li>
                <li>"Musical" – sang og dans for hele familien</li>
              </TipList>
              <Text>Går noget galt? Vores helpdesk hjælper dig gerne.</Text>
              <div style={{ marginTop: '1rem' }}>
                <Button to="/helpdesk" variant="outline" arrow>
                  Få hjælp
                </Button>
              </div>
            </Panel>
          </Tips>
        </Section>
      </Container>
    </>
  )
}

export default SjovOgBallade
