import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap'
import axios from 'axios'

export default function ClinicianList() {
  const [clinicians, setClinicians] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    status: 'Active',
  })
  const [editingId, setEditingId] = useState(null)
  const [errors, setErrors] = useState({})

  // ✅ Fetch all clinicians
  const fetchClinicians = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/clinician-list')
      setClinicians(res.data)
    } catch (err) {
      console.error('❌ Fetch error:', err)
    }
  }

  useEffect(() => {
    fetchClinicians()
  }, [])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleAdd = () => {
    setFormData({ name: '', code: '', status: 'Active' })
    setEditingId(null)
    setErrors({})
    setShowModal(true)
  }

  const handleEdit = (clinician) => {
    setFormData({
      name: clinician.name,
      code: clinician.code,
      status: clinician.status,
    })
    setEditingId(clinician.id)
    setErrors({})
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return
    try {
      await axios.delete(`http://localhost:5000/api/clinician-list/${id}`)
      fetchClinicians()
    } catch (err) {
      console.error('❌ Delete error:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    try {
      if (editingId) {
        // ✅ Update existing
        await axios.put(`http://localhost:5000/api/clinician-list/${editingId}`, formData)
      } else {
        // ✅ Add new
        await axios.post('http://localhost:5000/api/clinician-list', formData)
      }
      setShowModal(false)
      fetchClinicians()
    } catch (err) {
      console.error('❌ Submit error:', err)
      if (err.response?.data?.errors) setErrors({ code: err.response.data.errors[0] })
    }
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Clinician List</h2>
        <Button variant="primary" onClick={handleAdd}>
          + Add Clinician
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>id</th>
            <th>name</th>
            <th>code</th>
            <th>status</th>
            <th style={{ width: '180px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clinicians.length > 0 ? (
            clinicians.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.code}</td>
                <td>{c.status}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(c.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No clinicians found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Edit Clinician' : 'Add Clinician'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>code</Form.Label>
              <Form.Control
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
              />
              {errors.code && (
                <Alert variant="danger" className="mt-1">
                  {errors.code}
                </Alert>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>status</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange} required>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingId ? 'Update' : 'Save'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}
