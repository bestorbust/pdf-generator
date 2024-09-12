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
    overstandingDues: '',
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
      // ['Mobile number',formData.mobile],
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

   
    // doc.setFontSize(14);
    // doc.text('Note: 3k is non-refundable', 50, doc.autoTable.previous.finalY + 50);

   
    doc.addImage(signature, 'PNG', 300, doc.autoTable.previous.finalY + 50, 280, 70);
    doc.setFontSize(16);
    doc.text('MANAGEMENT SIGNATURE',350, doc.autoTable.previous.finalY + 130);

    doc.addImage(paid, 'PNG',90,530,190,150); 

    
    doc.save(`${formData.name}_${formData.dateOfPayment}_RentReceipt.pdf`);
  };

  return (
    <div>
      <h2>Generate Rent Details PDF</h2>
      <form onSubmit={(e) => { e.preventDefault(); generatePDF(); }}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Room Number:
          <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Mode of Payment:
          <input type="text" name="modeOfPayment" value={formData.modeOfPayment} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Rent Amount:
          <input type="text" name="rentAmount" value={formData.rentAmount} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Date of Payment:
          <input type="date" name="dateOfPayment" value={formData.dateOfPayment} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Overstanding Dues:
          <input type="text" name="overstandingDues" value={formData.overstandingDues} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Sharing:
          <input type="text" name="sharing" value={formData.sharing} onChange={handleChange} required />
        </label>
        <br />
        {/* <label>
          Mobile Number:
          <input type="number" name="mobile" value={formData.mobile} onChange={handleChange} required />
        </label>
        <br /> */}
        <label>
          Rent Month:
          <input type="text" name="rentMonth" value={formData.rentMonth} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Generate PDF</button>
      </form>
    </div>
  );
};

export default ResidentForm;




