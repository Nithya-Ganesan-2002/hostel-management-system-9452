import React, { useState, useEffect } from 'react';
import { getRooms, getPayments } from '../services/api';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Reports.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Reports() {
  const [roomData, setRoomData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const [roomsRes, paymentsRes] = await Promise.all([
          getRooms(),
          getPayments(),
        ]);

        // Process room data
        const rooms = roomsRes.data;
        const occupancy = {
          available: rooms.filter(r => r.status === 'available').length,
          occupied: rooms.filter(r => r.status === 'occupied').length,
          maintenance: rooms.filter(r => r.status === 'maintenance').length,
        };
        setRoomData({
          labels: ['Available', 'Occupied', 'Under Maintenance'],
          datasets: [{
            label: 'Room Status',
            data: [occupancy.available, occupancy.occupied, occupancy.maintenance],
            backgroundColor: ['#2ecc71', '#e74c3c', '#f39c12'],
          }],
        });

        // Process payment data
        const payments = paymentsRes.data;
        const paymentStatus = {
          paid: payments.filter(p => p.status === 'paid').length,
          pending: payments.filter(p => p.status === 'pending').length,
        };
        setPaymentData({
          labels: ['Paid', 'Pending'],
          datasets: [{
            data: [paymentStatus.paid, paymentStatus.pending],
            backgroundColor: ['#3498db', '#e67e22'],
          }],
        });

      } catch (error) {
        console.error('Failed to fetch report data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  if (loading) {
    return <div>Loading reports...</div>;
  }

  return (
    <div className="reports-page">
      <h1 className="page-title">System Reports</h1>
      <div className="charts-container">
        <div className="chart-wrapper">
          <h2 className="chart-title">Room Occupancy</h2>
          {roomData && <Bar data={roomData} options={{ responsive: true }} />}
        </div>
        <div className="chart-wrapper">
          <h2 className="chart-title">Payment Status</h2>
          {paymentData && <Pie data={paymentData} options={{ responsive: true }} />}
        </div>
      </div>
    </div>
  );
}

export default Reports;
