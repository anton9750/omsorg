import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import EboksMitid from './pages/eboks-mitid.tsx'
import FilerOgDokumenter from './pages/filer&dokumenter.tsx'
import GamleKlassikere from './pages/gamle-klassikere.tsx'
import Helpdesk from './pages/helpdesk.tsx'
import Home from './pages/home.tsx'
import SjovOgBallade from './pages/sjov&ballade.tsx'
import Footer from './partials/Footer.tsx'
import NavBar from './partials/navBar.tsx'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled.main`
  flex: 1;
`

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <Page>
      <ScrollToTop />
      <NavBar />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eboks-mitid" element={<EboksMitid />} />
          <Route path="/sjov-og-ballade" element={<SjovOgBallade />} />
          <Route path="/gamle-klassikere" element={<GamleKlassikere />} />
          <Route path="/helpdesk" element={<Helpdesk />} />
          <Route path="/filer-og-dokumenter" element={<FilerOgDokumenter />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Main>
      <Footer />
    </Page>
  )
}

export default App
