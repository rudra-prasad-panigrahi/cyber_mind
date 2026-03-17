import React from 'react';

const DetailedModal = ({ onClose, history }) => {
  // Matches the attack type to the response strategy
  const getPrevention = (type) => {
    const strategies = {
      'DDoS': 'Rate limiting & Cloudflare proxy filtering.',
      'Ransomware': 'Air-gapped backups & macro blocking.',
      'Phishing': 'DMARC validation & employee training.',
      'Port Scan': 'Configure firewall to drop TCP SYN.',
      'Botnet': 'Null-route C2 server IPs.',
      'Zero-Day Exploit': 'Heuristic analysis & quarantine.'
    };
    return strategies[type] || 'Standard firewall rules applied.';
  };

  // Only show real attacks (Filter out "Normal" traffic)
  const threatLogs = history ? history.filter(item => item.attack_type !== 'Normal') : [];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(11, 15, 25, 0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: '#1a1f2e', padding: '30px', borderRadius: '12px', width: '90%', maxHeight: '80vh', overflowY: 'auto', border: '1px solid #3b82f6' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '15px' }}>
          <h2 style={{ margin: 0, color: '#00ff9d' }}>Global Threat Intelligence Database</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '24px' }}>&times;</button>
        </div>
        
        {threatLogs.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '20px' }}>Searching database... (Awaiting incoming threat telemetry)</p>
        ) : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', color: 'white', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#0b0f19', color: '#94a3b8' }}>
                <th style={{ padding: '12px' }}>Time</th>
                <th style={{ padding: '12px' }}>Attack Type</th>
                <th style={{ padding: '12px' }}>Attacker IP</th>
                <th style={{ padding: '12px' }}>Location</th>
                <th style={{ padding: '12px' }}>AI Score</th>
                <th style={{ padding: '12px' }}>Prevention Strategy</th>
              </tr>
            </thead>
            <tbody>
              {threatLogs.map((threat, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '15px 12px' }}>{new Date(threat.timestamp * 1000).toLocaleTimeString()}</td>
                  <td style={{ padding: '15px 12px', color: '#ef4444', fontWeight: 'bold' }}>{threat.attack_type}</td>
                  <td style={{ padding: '15px 12px', fontFamily: 'monospace' }}>{threat.source_ip}</td>
                  <td style={{ padding: '15px 12px' }}>{threat.origin_country}</td>
                  <td style={{ padding: '15px 12px', color: '#eab308' }}>{threat.threat_score}</td>
                  <td style={{ padding: '15px 12px', color: '#00ff9d' }}>{getPrevention(threat.attack_type)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DetailedModal;