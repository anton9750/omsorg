import styled from 'styled-components'
import { FeatureCard } from '../components/FeatureCard.tsx'
import { HelpdeskBanner } from '../components/HelpdeskBanner.tsx'
import { HeroIllustration } from '../components/HeroIllustration.tsx'
import { FolderIcon, LockDocIcon, MusicIcon, NetflixIcon } from '../components/Icons.tsx'
import { Container, Section } from '../components/Layout.tsx'

const Hero = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: 2rem;
  padding: 3rem 0 1rem;

  @media (max-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: 1fr;
  }
`

const Title = styled.h1`
  font-size: clamp(2.8rem, 7vw, 4.6rem);
  font-weight: 800;
`

const Tagline = styled.p`
  margin-top: 1.25rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.green};
`

const Intro = styled.p`
  margin-top: 1rem;
  max-width: 28rem;
  font-size: 1.2rem;
`

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.bp.sm}) {
    grid-template-columns: 1fr;
  }
`

function Home() {
  return (
    <Container>
      <Hero>
        <div>
          <Title>Velkommen til ÆldreSagen Hjælp</Title>
          <Tagline>Nem digital hjælp – trygt, overskueligt og for alle.</Tagline>
          <Intro>Vi hjælper dig med digitale ting i hverdagen – med tålmodighed, venlighed og masser af tid.</Intro>
        </div>
        <HeroIllustration />
      </Hero>

      <Section>
        <Cards>
          <FeatureCard
            title="Hjælp med e-Boks & MitID"
            text="Få rolig hjælp til at logge ind, sende beskeder og finde dine dokumenter."
            cta="Få hjælp til e-Boks & MitID"
            to="/eboks-mitid"
            icon={<LockDocIcon size={34} />}
            tone="blue"
          />
          <FeatureCard
            title="Sjov & Ballade (Netflix)"
            text="Film, serier og underholdning – nemt og hyggeligt."
            cta="Se Netflix og hygge dig"
            to="/sjov-og-ballade"
            icon={<NetflixIcon size={34} />}
            tone="green"
            variant="green"
          />
          <FeatureCard
            title="Gamle Klassikere"
            text="Sange fra vores tid – musik der vækker gode minder."
            cta="Lyt til klassikerne"
            to="/gamle-klassikere"
            icon={<MusicIcon size={34} />}
            tone="green"
            variant="green"
          />
          <FeatureCard
            title="Filer & Dokumenter"
            text="Upload og gem trygt regninger, breve og vigtige papirer."
            note="Kun for dig – gemmes på din egen computer."
            cta="Upload dokumenter sikkert"
            to="/filer-og-dokumenter"
            icon={<FolderIcon size={34} />}
            tone="blue"
          />
        </Cards>
      </Section>

      <Section>
        <HelpdeskBanner />
      </Section>
    </Container>
  )
}

export default Home
