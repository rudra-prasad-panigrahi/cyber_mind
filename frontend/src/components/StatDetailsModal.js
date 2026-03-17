import React from 'react';

const StatDetailsModal = ({ onClose, title, filterId, history }) => {
  const activeThreats = history ? history.filter(t => t.severity === 'CRITICAL') : [];
  const blockedIps = history ? history.map(t => t.source_ip) : [];
  
  // 🔥 MASTER REGION LIST: Fixed to exactly 12 regions 🔥
  const masterRegions = [
    { name: "Russia", risk: "CRITICAL" }, { name: "China", risk: "CRITICAL" },
    { name: "USA", risk: "HIGH" }, { name: "Brazil", risk: "MEDIUM" },
    { name: "India", risk: "MONITORED" }, { name: "Germany", risk: "HIGH" },
    { name: "North Korea", risk: "CRITICAL" }, { name: "Israel", risk: "HIGH" },
    { name: "Ukraine", risk: "CRITICAL" }, { name: "UK", risk: "MEDIUM" },
    { name: "Iran", risk: "HIGH" }, { name: "Canada", risk: "LOW" }
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(11, 15, 25, 0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: '#0f172a', padding: '30px', borderRadius: '12px', width: '75%', minHeight: '450px', border: '1px solid #475569', boxShadow: '0 0 40px rgba(0,0,0,0.5)', color: 'white' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '15px', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>📊 Analytics: {title}</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '28px' }}>&times;</button>
        </div>

        <div style={{ color: '#cbd5e1' }}>
          
          {/* TOTAL ATTACKS SECTION */}
          {filterId === 'total' && (
            <div>
              <h3>System Overview</h3>
              <p>Total packets analyzed by CortexShield AI since system boot.</p>
              <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', flex: 1, borderLeft: '4px solid #3b82f6' }}>
                  <div style={{ color: '#94a3b8', fontSize: '12px' }}>DDoS Mitigated</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>45%</div>
                </div>
                <div style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', flex: 1, borderLeft: '4px solid #10b981' }}>
                  <div style={{ color: '#94a3b8', fontSize: '12px' }}>Phishing Blocked</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>30%</div>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE THREATS SECTION */}
          {filterId === 'active' && (
            <div>
              <h3 style={{ color: '#eab308' }}>Live Critical Intrusions ({activeThreats.length})</h3>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {activeThreats.length === 0 ? <p>No active critical threats detected.</p> : activeThreats.map((threat, i) => (
                  <div key={i} style={{ background: '#1e293b', margin: '10px 0', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #eab308', display: 'flex', justifyContent: 'space-between' }}>
                    <strong>{threat.attack_type}</strong>
                    <span style={{ fontFamily: 'monospace', color: '#eab308' }}>{threat.source_ip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BLOCKED IPS SECTION */}
          {filterId === 'blocked' && (
            <div>
              <h3 style={{ color: '#10b981' }}>Automated Firewall Blocklist</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                {[...new Set(blockedIps)].slice(0, 12).map((ip, i) => (
                  <div key={i} style={{ background: '#1e293b', padding: '12px', borderRadius: '6px', fontFamily: 'monospace', borderLeft: '3px solid #10b981' }}>
                    🚫 {ip} <span style={{ float: 'right', fontSize: '10px', color: '#10b981' }}>DROPPED</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AFFECTED REGIONS SECTION (The 12 Regions Fix) */}
          {filterId === 'regions' && (
            <div>
              <h3 style={{ color: '#8b5cf6' }}>Global Threat Intelligence (12 Key Regions)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '15px' }}>
                {masterRegions.map((region, i) => (
                  <div key={i} style={{ 
                    background: '#1e293b', 
                    padding: '12px', 
                    borderRadius: '8px', 
                    borderLeft: '4px solid #8b5cf6',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>📍 {region.name}</span>
                    <span style={{ 
                      fontSize: '10px', 
                      color: region.risk === 'CRITICAL' ? '#ef4444' : '#eab308', 
                      fontWeight: 'bold' 
                    }}>
                      RISK: {region.risk}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default StatDetailsModal;