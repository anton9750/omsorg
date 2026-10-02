import type { ReactNode } from 'react'
import styled from 'styled-components'
import type { ButtonVariant, Tone } from '../styles/theme.ts'
import { Button } from './Button.tsx'
import { ShieldCheckIcon } from './Icons.tsx'

const Card = styled.article<{ $tone: Tone }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme, $tone }) => theme.tones[$tone].bg};
  border: 1px solid ${({ theme, $tone }) => theme.tones[$tone].border};
  box-shadow: ${({ theme }) => theme.shadow.card};
`

const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const IconCircle = styled.div<{ $tone: Tone }>`
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme, $tone }) => theme.tones[$tone].iconBg};
  color: ${({ theme }) => theme.colors.navy};
`

const Title = styled.h2`
  font-size: 1.35rem;
  font-weight: 800;
`

const Text = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.text};
`

const Note = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.green};
`

const Action = styled.div`
  margin-top: auto;
`

interface FeatureCardProps {
  title: string
  text: string
  cta: string
  to: string
  icon: ReactNode
  tone?: Tone
  variant?: ButtonVariant
  note?: string
}

export function FeatureCard({ title, text, cta, to, icon, tone = 'blue', variant = 'blue', note }: FeatureCardProps) {
  return (
    <Card $tone={tone}>
      <Top>
        <IconCircle $tone={tone}>{icon}</IconCircle>
        <Title>{title}</Title>
      </Top>
      <Text>{text}</Text>
      {note && (
        <Note>
          <ShieldCheckIcon size={22} />
          {note}
        </Note>
      )}
      <Action>
        <Button to={to} variant={variant} arrow full>
          {cta}
        </Button>
      </Action>
    </Card>
  )
}
