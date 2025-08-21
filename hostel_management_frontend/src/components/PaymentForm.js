import React, { useState, useEffect } from 'react';
import './Form.css';

function PaymentForm({ onSave, onCancel, user, students }) {
  const [formData, setFormData] = useState({
    amount: '',
    student_id: '',
  });

  useEffect(() => {
    // If user is a student, their ID is set automatically
    if (user && user.role === 'student') {
      setFormData(prev => ({ ...prev, student_id: user.id }));
    }
  }, [user]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form-title">
        {user && user.role === 'admin' ? 'Add Payment' : 'Make Payment'}
      </h2>
      
      {user && user.role === 'admin' && (
        <div className="form-group">
          <label>Student</label>
          <select 
            name="student_id" 
            value={formData.student_id} 
            onChange={handleChange}
            required
          >
            <option value="">Select a student</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="form-group">
        <label>Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          placeholder="Enter amount"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          {user && user.role === 'admin' ? 'Save Payment' : 'Pay Now'}
        </button>
      </div>
    </form>
  );
}

export default PaymentForm;
