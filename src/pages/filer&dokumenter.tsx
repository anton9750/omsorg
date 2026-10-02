import { useRef, useState } from 'react'
import type { ChangeEvent, DragEvent } from 'react'
import styled from 'styled-components'
import { Button } from '../components/Button.tsx'
import { FolderIcon, ShieldCheckIcon, UploadIcon } from '../components/Icons.tsx'
import { Container, Section } from '../components/Layout.tsx'
import { PageHeader } from '../components/PageHeader.tsx'
import { Panel } from '../components/Panel.tsx'
import { useDocuments } from '../hooks/useDocuments.ts'
import type { StoredDocument } from '../hooks/useDocuments.ts'
import { formatDate, formatFileSize } from '../utils/format.ts'

const DropZone = styled.div<{ $dragging: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2.5rem 1.5rem;
  text-align: center;
  border-radius: ${({ theme }) => theme.radius.card};
  border: 3px dashed ${({ theme }) => theme.buttons.blue.bg};
  background: ${({ $dragging }) => ($dragging ? '#dde9f8' : '#f1f6fd')};
  color: ${({ theme }) => theme.colors.navy};
`

const DropText = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
`

const HiddenInput = styled.input`
  display: none;
`

const Safe = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.green};
`

const ErrorBox = styled.p`
  margin-top: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 14px;
  background: #fdecec;
  color: #8a1c1c;
  font-weight: 700;
`

const Heading = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.6rem;
  font-weight: 800;
`

const List = styled.ul`
  list-style: none;
  margin: 1.25rem 0 0;
  padding: 0;
  display: grid;
  gap: 1rem;
`

const Item = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-radius: ${({ theme }) => theme.radius.card};
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.card};
`

const FileInfo = styled.div`
  min-width: 0;
  flex: 1 1 14rem;
`

const FileName = styled.p`
  font-size: 1.2rem;
  font-weight: 800;
  overflow-wrap: anywhere;
`

const FileMeta = styled.p`
  color: ${({ theme }) => theme.colors.muted};
`

const FileActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`

function openDocument(document: StoredDocument) {
  const url = URL.createObjectURL(document.blob)
  window.open(url, '_blank')
  setTimeout(() => URL.revokeObjectURL(url), 60_000)
}

function saveDocumentToPc(document: StoredDocument) {
  const url = URL.createObjectURL(document.blob)
  const link = window.document.createElement('a')
  link.href = url
  link.download = document.name
  link.click()
  URL.revokeObjectURL(url)
}

function FilerOgDokumenter() {
  const { documents, isLoading, error, addFiles, removeDocument } = useDocuments()
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSelect(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    if (files.length > 0) addFiles(files)
    event.target.value = ''
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)
    const files = Array.from(event.dataTransfer.files)
    if (files.length > 0) addFiles(files)
  }

  function handleDelete(document: StoredDocument) {
    if (window.confirm(`Vil du slette "${document.name}"?`)) {
      removeDocument(document.id)
    }
  }

  return (
    <>
      <PageHeader
        title="Filer & Dokumenter"
        lead="Gem dine regninger, breve og vigtige papirer ét sikkert sted. Dine filer bliver på din egen computer."
      />
      <Container>
        <Section>
          <DropZone
            $dragging={isDragging}
            onDragOver={(event) => {
              event.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <UploadIcon size={56} />
            <DropText>Træk dine filer herhen – eller tryk på knappen</DropText>
            <Button onClick={() => inputRef.current?.click()} variant="blue">
              Vælg filer fra computeren
            </Button>
            <HiddenInput ref={inputRef} type="file" multiple onChange={handleSelect} aria-label="Vælg filer" />
            <Safe>
              <ShieldCheckIcon size={26} />
              Kun for dig – filerne forlader aldrig din computer.
            </Safe>
          </DropZone>

          {error && <ErrorBox role="alert">{error}</ErrorBox>}
        </Section>

        <Section>
          <Heading>
            <FolderIcon size={34} color="#12306b" /> Dine gemte filer
          </Heading>

          {isLoading && <p style={{ marginTop: '1rem' }}>Henter dine filer …</p>}

          {!isLoading && documents.length === 0 && (
            <Panel $tone="cream" style={{ marginTop: '1.25rem' }}>
              <p style={{ fontSize: '1.15rem' }}>Du har ikke gemt nogen filer endnu. Upload din første fil ovenfor.</p>
            </Panel>
          )}

          <List>
            {documents.map((document) => (
              <Item key={document.id}>
                <FileInfo>
                  <FileName>{document.name}</FileName>
                  <FileMeta>
                    {formatFileSize(document.size)} · gemt {formatDate(document.addedAt)}
                  </FileMeta>
                </FileInfo>
                <FileActions>
                  <Button onClick={() => openDocument(document)} variant="blue">
                    Åbn
                  </Button>
                  <Button onClick={() => saveDocumentToPc(document)} variant="outline">
                    Gem på PC
                  </Button>
                  <Button onClick={() => handleDelete(document)} variant="danger">
                    Slet
                  </Button>
                </FileActions>
              </Item>
            ))}
          </List>
        </Section>
      </Container>
    </>
  )
}

export default FilerOgDokumenter
