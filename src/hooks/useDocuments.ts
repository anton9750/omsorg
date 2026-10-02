import { useEffect, useState } from 'react'

export interface StoredDocument {
  id: string
  name: string
  type: string
  size: number
  addedAt: number
  blob: Blob
}

const DB_NAME = 'aeldresagen-filer'
const STORE = 'dokumenter'

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE, { keyPath: 'id' })
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function withStore<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await openDb()
  return new Promise<T>((resolve, reject) => {
    const transaction = db.transaction(STORE, mode)
    const request = action(transaction.objectStore(STORE))
    transaction.oncomplete = () => {
      db.close()
      resolve(request.result)
    }
    transaction.onerror = () => {
      db.close()
      reject(transaction.error)
    }
  })
}

function sortNewestFirst(documents: StoredDocument[]): StoredDocument[] {
  return [...documents].sort((a, b) => b.addedAt - a.addedAt)
}

export function useDocuments() {
  const [documents, setDocuments] = useState<StoredDocument[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    withStore<StoredDocument[]>('readonly', (store) => store.getAll())
      .then((stored) => {
        if (cancelled) return
        setDocuments(sortNewestFirst(stored))
        setIsLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setError('Vi kunne ikke åbne dine gemte filer. Prøv at genindlæse siden.')
        setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  async function addFiles(files: File[]) {
    setError(null)
    try {
      const added: StoredDocument[] = []
      for (const file of files) {
        const document: StoredDocument = {
          id: crypto.randomUUID(),
          name: file.name,
          type: file.type,
          size: file.size,
          addedAt: Date.now(),
          blob: file,
        }
        await withStore('readwrite', (store) => store.put(document))
        added.push(document)
      }
      setDocuments((current) => sortNewestFirst([...added, ...current]))
      // Bed browseren om ikke selv at rydde filerne væk
      await navigator.storage?.persist?.()
    } catch {
      setError('Filen kunne ikke gemmes. Måske er der ikke plads på computeren.')
    }
  }

  async function removeDocument(id: string) {
    setError(null)
    try {
      await withStore('readwrite', (store) => store.delete(id))
      setDocuments((current) => current.filter((document) => document.id !== id))
    } catch {
      setError('Filen kunne ikke slettes. Prøv igen.')
    }
  }

  return { documents, isLoading, error, addFiles, removeDocument }
}
