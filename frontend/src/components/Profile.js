/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from '../context/GlobalContext'
import toast from 'react-hot-toast'
const Profile = ({user}) => {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState()
  const [loading, setLoading] = useState(false)
  const [showPasword,setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: user?.username || '',
    password:'',
    confirm_password:''
  })

  const { setUser } = useGlobalContext()

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(formData.password !== formData.confirm_password){
      return toast.error("password and confirm password not matched");
    }
    setLoading(true)
    const data = new FormData()
    if (file) data.append('image', file)
    data.append('username', formData.username)
    data.append('password',formData.password)

    try {
      const res = await axios.put('http://localhost:5000/api/auth/update', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        setUser(res.data.user)
      toast.success('Profile Updated!')
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
  if (user) {
    setFormData({ username: user.username || '' });
  }
}, [user]);
  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* 1. IMAGE UPLOAD SECTION */}
          <div className="image-upload-section">
            <label htmlFor="imageInput" className="image-label">
              <div className="image-wrapper">
                <img src={preview ? preview : (user?.image ? `http://localhost:5000${user.image}` : '/profile.png')} alt="Profile Preview" />
                <div className="image-overlay">
                  <span>Change Photo</span>
                </div>
              </div>
            </label>
            <input
              type="file"
              id="imageInput"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* 2. USERNAME FIELD */}
          <div className="input-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
          </div>
          <div className="input-group">
            <input
              type={showPasword ? 'text' :`password`}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
            />
            
          </div>
          <div className="input-group">
            <input
              type={showPasword ? 'text' :`password`}
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Confirm password"
            />
          </div>
            <label htmlFor="show"><input type="checkbox" checked={showPasword} onChange={()=>setShowPassword(prev=> !prev)} id='show'/> show password</label>
          <button type="submit" disabled={loading} className="save-btn">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  )
}
export default Profile
