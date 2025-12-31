import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CHeader,
  CContainer,
  CHeaderToggler,
  CHeaderNav,
  CNavItem,
  CNavLink,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu, cilSun, cilMoon } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

// Local avatar
import avatarImg from '../assets/images/avatars/ibrahim.jpeg'
import { useGlobalContext } from '../context/GlobalContext'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const headerRef = useRef()
  const navigate = useNavigate()
  const { user, setUser } = useGlobalContext()
  const [theme, setTheme] = useState('light') // local theme state

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
    // Apply initial theme
    document.body.setAttribute('data-theme', theme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.body.setAttribute('data-theme', newTheme)
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token')
      setUser(null)
      navigate('/login')
    }
  }

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer fluid className="px-4 d-flex justify-content-between align-items-center">
        {/* Sidebar toggle */}
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        {/* Navigation links */}
        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink href="#">Home</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
        </CHeaderNav>

        {/* Right: Theme + Account */}
        <CHeaderNav className="d-flex align-items-center gap-2">
          <CButton color="secondary" size="sm" onClick={toggleTheme}>
            <CIcon icon={theme === 'light' ? cilMoon : cilSun} />
          </CButton>

          <CDropdown alignment="end">
            <CDropdownToggle color="light" variant="outline" className="d-flex align-items-center">
              <CAvatar
                src={`http://localhost:5000${user?.image}` || '/profile-icon.png'}
                size="md"
                className="me-2 avatar-custom"
              />
              {user?.username || 'Guest'}
            </CDropdownToggle>
            <CDropdownMenu>
              {!user ? (
                <>
                  <CDropdownItem onClick={() => navigate('/login')}>Login</CDropdownItem>
                  <CDropdownItem onClick={() => navigate('/register')}>Register</CDropdownItem>
                </>
              ) : (
                <>
                  <CDropdownItem onClick={() => navigate('/profile')}>Profile</CDropdownItem>
                  <CDropdownItem onClick={() => navigate('/settings')}>Settings</CDropdownItem>
                  <CDropdownItem divider />
                  <CDropdownItem onClick={handleLogout}>Logout</CDropdownItem>
                </>
              )}
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
