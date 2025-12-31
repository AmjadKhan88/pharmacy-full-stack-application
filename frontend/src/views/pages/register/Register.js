import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../../context/GlobalContext'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import toast from 'react-hot-toast'

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)
  const { setUser } = useGlobalContext()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setMessage('Passwords do not match')
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.append('image', file)
    formData.append('username', form.username)
    formData.append('email', form.email)
    formData.append('password', form.password)

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // ✅ Save JWT token (assumes backend sends token)
      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      toast.success('Registration successful')
      navigate('/dashboard') // 🚀 redirect same like login
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>

                  <div className="upload-container">
                    <label htmlFor="file-input" className="upload-label">
                      <input id="file-input" type="file" onChange={handleFileChange} hidden />
                      <div className="image-wrapper">
                        <img
                          src={file ? URL.createObjectURL(file) : '/profile.png'}
                          alt="Profile"
                          className="profile-preview"
                        />
                        <div className="overlay">
                          <span>Change Photo</span>
                        </div>
                      </div>
                    </label>
                  </div>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="username"
                      placeholder="Username"
                      value={form.username}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="confirm"
                      placeholder="Repeat password"
                      value={form.confirm}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton disabled={loading} type="submit" color="success">
                      {loading ? 'Creating' : 'Create Account'}
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
