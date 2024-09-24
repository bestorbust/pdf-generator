import React, { useState } from 'react';
import jsPDF from 'jspdf';
import logo from './image/LOGO.jpg'; 
import signature from './image/image.jpg'; 
import paid from './image/paid.png';
import 'jspdf-autotable'; 

const ResidentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    roomNumber: '',
    modeOfPayment: '',
    depositAmount: '',
    dateOfPayment: '',
    //overstandingDues: '',
    sharing: '',
    rentMonth: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generatePDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');

    doc.addImage(logo, 'PNG', 180, 50, 250, 100); 
    doc.setFontSize(24);
    doc.text('SAHANA PG (PAYMENT RECEIPT)', 100, 170);

    const tableData = [
      ['Resident Name', formData.name],
      ['Room No', formData.roomNumber],
      ['Mode of Payment', formData.modeOfPayment],
      ['Rent Amount', formData.rentAmount],
      ['Date of Payment', formData.dateOfPayment],
      ['Overstanding Dues', formData.overstandingDues],
      ['Sharing', formData.sharing],
      ['Rent Month', formData.rentMonth],
    ];

    doc.autoTable({
      head: [['Field', 'Details']],
      body: tableData,
      startY: 200, 
      styles: {
        fontSize: 20,
        halign: 'center',
        valign: 'middle',
      },
    });

    doc.addImage(signature, 'PNG', 300, doc.autoTable.previous.finalY + 50, 280, 70);
    doc.setFontSize(16);
    doc.text('MANAGEMENT SIGNATURE', 350, doc.autoTable.previous.finalY + 130);

    doc.addImage(paid, 'PNG', 90, 530, 190, 150); 
    doc.save(`${formData.name}_${formData.dateOfPayment}_RentReceipt.pdf`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Generate Rent Details PDF</h2>
      <form onSubmit={(e) => { e.preventDefault(); generatePDF(); }} style={styles.form}>
        <label style={styles.label}>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={styles.input} />
        </label>
        <label style={styles.label}>
          Room Number:
          <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange} required style={styles.input} />
        </label>
        <label style={styles.label}>
          Mode of Payment:
          <input type="text" name="modeOfPayment" value={formData.modeOfPayment} onChange={handleChange} required style={styles.input} />
        </label>
        <label style={styles.label}>
          Rent Amount:
          <input type="text" name="rentAmount" value={formData.rentAmount} onChange={handleChange} required style={styles.input} />
        </label>
        <label style={styles.label}>
          Date of Payment:
          <input type="date" name="dateOfPayment" value={formData.dateOfPayment} onChange={handleChange} required style={styles.input} />
        </label>
        <label style={styles.label}>
          Sharing:
          <input type="text" name="sharing" value={formData.sharing} onChange={handleChange} required style={styles.input} />
        </label>
        <label style={styles.label}>
          Rent Month:
          <input type="text" name="rentMonth" value={formData.rentMonth} onChange={handleChange} required style={styles.input} />
        </label>
        <button type="submit" style={styles.button}>Generate PDF</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
   
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
    fontFamily: 'Arial, sans-serif',
    color: '#555',
    fontSize: '16px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center',
  },
};

export default ResidentForm;
