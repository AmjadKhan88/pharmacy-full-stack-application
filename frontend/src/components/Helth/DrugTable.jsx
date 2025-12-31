import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Dropdown } from 'react-bootstrap'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/drugs' // backend endpoint

const DrugTable = () => {
  const [show, setShow] = useState(false)
  const [editingDrug, setEditingDrug] = useState(null)
  const [drugs, setDrugs] = useState([])
  const [formData, setFormData] = useState({
    ndcCode: '',
    haCode: '',
    tradeName: '',
    manufacturer: '',
    localAgent: '',
    dosageForm: '',
    granularUnit: '',
    unitType: '',
    activeIngredients: '',
    strengths: '',
    startDate: '',
    endDate: '',
    packageType: '',
    packageSize: '',
    dispensedQuantity: '',
    daysOfSupply: '',
    instructions: '',
  })

  useEffect(() => {
    fetchDrugs()
  }, [])

  const fetchDrugs = async () => {
    try {
      const res = await axios.get(API_URL)
      setDrugs(res.data)
    } catch (err) {
      console.error('Error fetching drugs:', err)
    }
  }

  const handleClose = () => {
    setShow(false)
    setEditingDrug(null)
    resetForm()
  }

  const handleShow = (drug = null) => {
    if (drug) {
      setEditingDrug(drug)
      setFormData(drug)
    }
    setShow(true)
  }

  const resetForm = () => {
    setFormData({
      ndcCode: '',
      haCode: '',
      tradeName: '',
      manufacturer: '',
      localAgent: '',
      dosageForm: '',
      granularUnit: '',
      unitType: '',
      activeIngredients: '',
      strengths: '',
      startDate: '',
      endDate: '',
      packageType: '',
      packageSize: '',
      dispensedQuantity: '',
      daysOfSupply: '',
      instructions: '',
    })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingDrug) {
        await axios.put(`${API_URL}/${editingDrug.id}`, formData)
      } else {
        await axios.post(API_URL, formData)
      }
      fetchDrugs()
      handleClose()
    } catch (err) {
      console.error('Error saving drug:', err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      fetchDrugs()
    } catch (err) {
      console.error('Error deleting drug:', err)
    }
  }

  // labels clean: remove _ or - and make lowercase words with space
  const formatLabel = (field) => field.replace(/[_-]/g, ' ').toLowerCase()

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>drug lists</h3>
        <Button variant="primary" onClick={() => handleShow()}>
          + add drug
        </Button>
      </div>

      <Table bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ndcCode</th>
            <th>haCode</th>
            <th>tradeName</th>
            <th>manufacturer</th>
            <th>localAgent</th>
            <th>dosageForm</th>
            <th>granularUnit</th>
            <th>unitType</th>
            <th>activeIngredients</th>
            <th>strengths</th>
            <th>startDate</th>
            <th>endDate</th>
            <th>packageType</th>
            <th>packageSize</th>
            <th>dispensedQuantity</th>
            <th>daysOfSupply</th>
            <th>instructions</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {drugs.length > 0 ? (
            drugs.map((d) => (
              <tr key={d.id}>
                <td>{d.ndc_code}</td>
                <td>{d.ha_code}</td>
                <td>{d.trade_name}</td>
                <td>{d.manufacturer}</td>
                <td>{d.local_agent}</td>
                <td>{d.dosage_form}</td>
                <td>{d.granular_unit}</td>
                <td>{d.unit_type}</td>
                <td>{d.active_ingredients}</td>
                <td>{d.strengths}</td>
                <td>{d.start_date?.slice(0, 10)}</td>
                <td>{d.end_date?.slice(0, 10)}</td>
                <td>{d.package_type}</td>
                <td>{d.package_size}</td>
                <td>{d.dispensed_quantity}</td>
                <td>{d.days_of_supply}</td>
                <td>{d.instructions}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle size="sm" variant="secondary">
                      ...
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleShow(d)}>edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(d.id)}>delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="18" className="text-center">
                no drugs found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal Form */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingDrug ? 'edit drug' : 'add drug'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              {Object.keys(formData).map((field, index) => (
                <div className="col-md-4 mb-3" key={index}>
                  <Form.Label>{formatLabel(field)}</Form.Label>
                  <Form.Control
                    type={field.includes('date') ? 'date' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-end mt-3">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                close
              </Button>
              <Button variant="primary" type="submit">
                {editingDrug ? 'update' : 'add drug'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DrugTable
