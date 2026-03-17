import React from 'react';
import { Crosshair } from 'lucide-react';

const InvestigationPanel = ({ currentThreat }) => {
  if (!currentThreat) return <p style={{ color: '#64748b' }}>Awaiting network telemetry...</p>;

  return (
    <div style={{ color: '#cbd5e1' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
        <Crosshair color={currentThreat.severity === 'CRITICAL' ? "#ef4444" : "#00ff9d"} />
        <h3 style={{ margin: 0, color: 'white' }}>Active Investigation</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', background: '#0b0f19', padding: '10px', borderRadius: '6px' }}><span style={{ color: '#94a3b8' }}>Source IP</span><span style={{ fontWeight: 'bold', color: 'white' }}>{currentThreat.source_ip}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', background: '#0b0f19', padding: '10px', borderRadius: '6px' }}><span style={{ color: '#94a3b8' }}>Origin</span><span style={{ fontWeight: 'bold', color: 'white' }}>{currentThreat.origin_country}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', background: '#0b0f19', padding: '10px', borderRadius: '6px' }}><span style={{ color: '#94a3b8' }}>Attack Type</span><span style={{ fontWeight: 'bold', color: currentThreat.attack_type === 'Normal' ? '#00ff9d' : '#eab308' }}>{currentThreat.attack_type}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', background: '#0b0f19', padding: '10px', borderRadius: '6px' }}><span style={{ color: '#94a3b8' }}>Threat Score</span><span style={{ fontWeight: 'bold', color: 'white' }}>{currentThreat.threat_score}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', background: '#0b0f19', padding: '10px', borderRadius: '6px' }}><span style={{ color: '#94a3b8' }}>Status</span><span style={{ fontWeight: 'bold', color: currentThreat.severity === 'CRITICAL' ? '#ef4444' : '#00ff9d' }}>{currentThreat.severity === 'CRITICAL' ? 'Blocked' : 'Monitoring'}</span></div>
      </div>
    </div>
  );
};

export default InvestigationPanel;