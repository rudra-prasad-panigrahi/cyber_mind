import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const ThreatDatabase = ({ onClose }) => {
  const database = [
    { type: 'DDoS', ip: '45.22.11.9', origin: 'Russia', prevention: 'Rate limiting & Cloudflare proxy filtering.' },
    { type: 'Ransomware', ip: '192.168.1.105', origin: 'Unknown', prevention: 'Air-gapped backups & strict macro blocking.' },
    { type: 'Phishing', ip: '114.55.20.1', origin: 'China', prevention: 'DMARC email validation & employee training.' },
    { type: 'Port Scan', ip: '8.8.8.8', origin: 'USA', prevention: 'Configure firewall to drop unsolicited ICMP/TCP SYN.' },
    { type: 'Botnet', ip: '203.0.113.5', origin: 'Brazil', prevention: 'Identify C2 server IPs and null-route traffic.' }
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(11, 15, 25, 0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: '#1a1f2e', padding: '30px', borderRadius: '12px', width: '80%', border: '1px solid #334155' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: '#00ff9d' }}>Global Threat Intelligence Database</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444' }}><X /></button>
        </div>
        
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', color: 'white' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
              <th style={{ padding: '10px' }}>Attack Type</th>
              <th style={{ padding: '10px' }}>Origin IP</th>
              <th style={{ padding: '10px' }}>Location</th>
              <th style={{ padding: '10px' }}>Automated Prevention Strategy</th>
            </tr>
          </thead>
          <tbody>
            {database.map((threat, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '15px 10px', color: '#ef4444', fontWeight: 'bold' }}>{threat.type}</td>
                <td style={{ padding: '15px 10px' }}>{threat.ip}</td>
                <td style={{ padding: '15px 10px' }}>{threat.origin}</td>
                <td style={{ padding: '15px 10px', color: '#cbd5e1' }}>{threat.prevention}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default ThreatDatabase;