import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const AttackChart = () => {
  const data = {
    labels: ['DDoS', 'Phishing', 'Malware', 'Port Scan'],
    datasets: [{
      data: [45, 25, 20, 10],
      backgroundColor: ['#ef4444', '#f97316', '#eab308', '#3b82f6'],
      borderColor: '#1a1f2e',
      borderWidth: 2,
    }]
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h3 style={{ color: '#00ff9d', marginBottom: '20px' }}>Threat Distribution</h3>
      <div style={{ width: '200px', height: '200px' }}>
        <Doughnut data={data} options={{ plugins: { legend: { position: 'bottom', labels: { color: 'white' } } } }} />
      </div>
    </div>
  );
};

export default AttackChart;