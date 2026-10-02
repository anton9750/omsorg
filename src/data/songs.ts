export type Decade = '1950erne' | '1960erne' | '1970erne'

export interface Song {
  id: string
  title: string
  artist: string
  year: number
  decade: Decade
}

export const DECADE_LABELS: Record<Decade, string> = {
  '1950erne': "1950'erne",
  '1960erne': "1960'erne",
  '1970erne': "1970'erne",
}

export const songs: Song[] = [
  { id: 'rock-around', title: 'Rock Around the Clock', artist: 'Bill Haley & His Comets', year: 1955, decade: '1950erne' },
  { id: 'love-me-tender', title: 'Love Me Tender', artist: 'Elvis Presley', year: 1956, decade: '1950erne' },
  { id: 'que-sera', title: 'Que Sera, Sera', artist: 'Doris Day', year: 1956, decade: '1950erne' },
  { id: 'dansevise', title: 'Dansevise', artist: 'Grethe & Jørgen Ingmann', year: 1963, decade: '1960erne' },
  { id: 'summer-holiday', title: 'Summer Holiday', artist: 'Cliff Richard', year: 1963, decade: '1960erne' },
  { id: 'yesterday', title: 'Yesterday', artist: 'The Beatles', year: 1965, decade: '1960erne' },
  { id: 'wonderful-world', title: 'What a Wonderful World', artist: 'Louis Armstrong', year: 1967, decade: '1960erne' },
  { id: 'stakkels-jim', title: 'Stakkels Jim', artist: "Gasolin'", year: 1971, decade: '1970erne' },
  { id: 'rabalderstraede', title: 'Rabalderstræde', artist: "Gasolin'", year: 1973, decade: '1970erne' },
  { id: 'dancing-queen', title: 'Dancing Queen', artist: 'ABBA', year: 1976, decade: '1970erne' },
]

export function youtubeSearchUrl(song: Song): string {
  const query = encodeURIComponent(`${song.artist} ${song.title}`)
  return `https://www.youtube.com/results?search_query=${query}`
}
