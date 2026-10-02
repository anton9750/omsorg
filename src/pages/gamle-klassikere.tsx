import { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../components/Button.tsx'
import { PlayIcon } from '../components/Icons.tsx'
import { Container, Section } from '../components/Layout.tsx'
import { PageHeader } from '../components/PageHeader.tsx'
import { DECADE_LABELS, songs, youtubeSearchUrl } from '../data/songs.ts'
import type { Decade } from '../data/songs.ts'

type Filter = Decade | 'alle'

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`

const FilterButton = styled.button<{ $active: boolean }>`
  min-height: 52px;
  padding: 0.6rem 1.3rem;
  border-radius: 999px;
  border: 2px solid ${({ theme }) => theme.colors.navy};
  background: ${({ theme, $active }) => ($active ? theme.colors.navy : '#fff')};
  color: ${({ theme, $active }) => ($active ? '#fff' : theme.colors.navy)};
  font: inherit;
  font-weight: 700;
  cursor: pointer;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
`

const SongCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme }) => theme.tones.green.bg};
  border: 1px solid ${({ theme }) => theme.tones.green.border};
  box-shadow: ${({ theme }) => theme.shadow.card};
`

const SongTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 800;
`

const Meta = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.muted};
`

const Action = styled.div`
  margin-top: auto;
  padding-top: 0.5rem;
`

const filters: Filter[] = ['alle', '1950erne', '1960erne', '1970erne']

function GamleKlassikere() {
  const [filter, setFilter] = useState<Filter>('alle')

  const visibleSongs = filter === 'alle' ? songs : songs.filter((song) => song.decade === filter)

  return (
    <>
      <PageHeader
        title="Gamle Klassikere"
        lead="Sange fra vores ungdom – musik der vækker gode minder. Tryk på en sang for at lytte med."
      />
      <Container>
        <Section>
          <Filters role="group" aria-label="Vælg årti">
            {filters.map((item) => (
              <FilterButton key={item} type="button" $active={filter === item} aria-pressed={filter === item} onClick={() => setFilter(item)}>
                {item === 'alle' ? 'Alle sange' : DECADE_LABELS[item]}
              </FilterButton>
            ))}
          </Filters>

          <Grid>
            {visibleSongs.map((song) => (
              <SongCard key={song.id}>
                <SongTitle>{song.title}</SongTitle>
                <Meta>
                  {song.artist} · {song.year}
                </Meta>
                <Action>
                  <Button href={youtubeSearchUrl(song)} variant="green" full>
                    <PlayIcon size={22} /> Lyt til sangen
                  </Button>
                </Action>
              </SongCard>
            ))}
          </Grid>
        </Section>
      </Container>
    </>
  )
}

export default GamleKlassikere
