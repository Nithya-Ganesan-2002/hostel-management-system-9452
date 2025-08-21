import React from 'react';
import './ItemList.css';

function PaymentList({ payments, user }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="item-list">
      <table>
        <thead>
          <tr>
            {user && user.role === 'admin' && <th>Student</th>}
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map(payment => (
              <tr key={payment.id}>
                {user && user.role === 'admin' && <td>{payment.student?.name || 'N/A'}</td>}
                <td>${payment.amount}</td>
                <td>{formatDate(payment.payment_date)}</td>
                <td>{payment.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={user && user.role === 'admin' ? 4 : 3} style={{ textAlign: 'center' }}>
                No payments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentList;
