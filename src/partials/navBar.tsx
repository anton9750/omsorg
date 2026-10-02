import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { CloseIcon, MenuIcon, NetflixIcon, UserIcon } from '../components/Icons.tsx'

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 2px 14px rgba(18, 48, 107, 0.08);
`

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
`

const Logo = styled(Link)`
  display: flex;
  flex-direction: column;
  line-height: 1;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.navy};

  span {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: 0.2rem;
    color: ${({ theme }) => theme.colors.green};
  }
`

const Links = styled.nav<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  @media (max-width: 1060px) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    padding: 1rem 1.5rem 1.5rem;
    background: #fff;
    box-shadow: 0 12px 20px rgba(18, 48, 107, 0.12);
  }
`

const StyledNavLink = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.8rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.navy};

  &:hover {
    background: #eef4fc;
  }
  &.active {
    background: #dde9f8;
  }
`

const LoginButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.3rem 0.8rem 0.3rem 0.3rem;
  border: none;
  background: transparent;
  font: inherit;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.navy};
  cursor: pointer;
`

const LoginCircle = styled.span`
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #d5e4f7;
`

const MenuToggle = styled.button`
  display: none;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.navy};
  border-radius: 12px;
  background: #fff;
  font: inherit;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.navy};
  cursor: pointer;

  @media (max-width: 1060px) {
    display: inline-flex;
  }
`

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const navItems = [
  { to: '/', label: 'Hjem', end: true },
  { to: '/eboks-mitid', label: 'Hjælp med e-Boks & MitID' },
  { to: '/sjov-og-ballade', label: 'Sjov & Ballade', netflix: true },
  { to: '/gamle-klassikere', label: 'Gamle Klassikere' },
  { to: '/helpdesk', label: 'Helpdesk' },
  { to: '/filer-og-dokumenter', label: 'Filer & Dokumenter' },
]

function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <Header>
      <Bar>
        <Logo to="/" onClick={closeMenu} aria-label="ÆldreSagen Hjælp – gå til forsiden">
          ÆldreSagen
          <span>Hjælp ♥</span>
        </Logo>

        <Links $open={isOpen} aria-label="Hovedmenu">
          {navItems.map((item) => (
            <StyledNavLink key={item.to} to={item.to} end={item.end} onClick={closeMenu}>
              {item.label}
              {item.netflix && <NetflixIcon size={20} />}
            </StyledNavLink>
          ))}
        </Links>

        <RightSide>
          <LoginButton type="button">
            <LoginCircle>
              <UserIcon size={26} color="#12306b" />
            </LoginCircle>
            Log ind
          </LoginButton>
          <MenuToggle type="button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
            {isOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
            Menu
          </MenuToggle>
        </RightSide>
      </Bar>
    </Header>
  )
}

export default NavBar
