import styled from 'styled-components'
import { Button } from '../components/Button.tsx'
import { ShieldCheckIcon } from '../components/Icons.tsx'
import { Container, Section } from '../components/Layout.tsx'
import { PageHeader } from '../components/PageHeader.tsx'
import { Panel } from '../components/Panel.tsx'
import { StepList } from '../components/StepList.tsx'
import { EBOKS_URL, MITID_URL } from '../config.ts'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: 1fr;
  }
`

const Heading = styled.h2`
  font-size: 1.6rem;
  font-weight: 800;
`

const Actions = styled.div`
  margin-top: 1.5rem;
`

const Warning = styled(Panel)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 1.5rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.green};
`

const eboksSteps = [
  'Tryk på knappen herunder for at åbne e-Boks.',
  'Tryk på "Log ind".',
  'Vælg MitID som log ind-metode.',
  'Skriv dit bruger-ID og tryk på "Fortsæt".',
  'Godkend i din MitID-app på telefonen. Så er du inde.',
]

const mitidSteps = [
  'Hav din telefon eller tablet ved hånden.',
  'Åbn MitID-appen, når en hjemmeside beder dig om det.',
  'Tryk på "Godkend" – eller skriv din kode, hvis appen beder om det.',
  'Har du glemt din kode? Tryk på "Hjælp" i MitID-appen, eller ring til os.',
]

function EboksMitid() {
  return (
    <>
      <PageHeader
        title="Hjælp med e-Boks & MitID"
        lead="Tag det helt roligt. Her kan du følge en trin-for-trin guide, og hvis du kører fast, er vores helpdesk klar til at hjælpe."
      />
      <Container>
        <Section>
          <Grid>
            <Panel $tone="blue">
              <Heading>Sådan logger du ind på e-Boks</Heading>
              <StepList steps={eboksSteps} />
              <Actions>
                <Button href={EBOKS_URL} arrow>
                  Åbn e-Boks
                </Button>
              </Actions>
            </Panel>
            <Panel $tone="blue">
              <Heading>Sådan bruger du MitID</Heading>
              <StepList steps={mitidSteps} />
              <Actions>
                <Button href={MITID_URL} arrow>
                  Gå til MitID
                </Button>
              </Actions>
            </Panel>
          </Grid>

          <Warning $tone="green">
            <ShieldCheckIcon size={36} />
            <p>
              <strong>Husk:</strong> Giv aldrig din MitID-kode til andre – heller ikke hvis nogen ringer og siger, at de
              er fra banken eller politiet. Vi ringer aldrig og beder om din kode.
            </p>
          </Warning>

          <Actions>
            <Button to="/helpdesk" variant="outline" arrow>
              Jeg har brug for personlig hjælp
            </Button>
          </Actions>
        </Section>
      </Container>
    </>
  )
}

export default EboksMitid
