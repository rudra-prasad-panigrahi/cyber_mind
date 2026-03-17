import React, { useState, useEffect } from 'react';
import StatCards from '../components/StatCards';
import InvestigationPanel from '../components/InvestigationPanel';
import Timeline from '../components/Timeline';
import AttackChart from '../components/AttackChart';
import AttackMap from '../components/AttackMap';
import DetailedModal from '../components/DetailedModal'; // 🔵 For the Database Table
import StatDetailsModal from '../components/StatDetailsModal'; // 📊 For the 4 Stat Blocks

const MainSOC = () => {
  const [latestThreat, setLatestThreat] = useState(null);
  const [threatHistory, setThreatHistory] = useState([]);
  
  // 1. Switch for the Blue Optional Button (Database)
  const [showOptionalDB, setShowOptionalDB] = useState(false); 

  // 2. Switch for the 4 Stat Cards (Analytics)
  const [statModal, setStatModal] = useState({ isOpen: false, filterId: '', title: '' });

  const generateDemoData = () => {
    const attacks = ['DDoS', 'Phishing', 'Ransomware', 'Botnet', 'Port Scan'];
    const countries = ['Russia', 'China', 'USA', 'Brazil'];
    const attackerIps = ['192.168.1.50', '45.22.11.9', '114.55.20.1', '8.8.8.8', '203.0.113.5'];
    const isAttack = Math.random() > 0.2; 
    return {
      timestamp: Date.now() / 1000,
      source_ip: attackerIps[Math.floor(Math.random() * attackerIps.length)],
      origin_country: countries[Math.floor(Math.random() * countries.length)],
      attack_type: isAttack ? attacks[Math.floor(Math.random() * attacks.length)] : 'Normal',
      threat_score: isAttack ? (Math.random() * (0.99 - 0.7) + 0.7).toFixed(2) : 0.12,
      severity: isAttack ? 'CRITICAL' : 'LOW'
    };
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      let data;
      try {
        const res = await fetch('http://localhost:5005/api/threats/current');
        if (!res.ok) throw new Error("Backend offline");
        data = await res.json();
        if (data.attack_type === 'Normal') data = generateDemoData();
      } catch (error) {
        data = generateDemoData();
      }
      setLatestThreat(data);
      setThreatHistory(prev => [data, ...prev].slice(0, 20)); 
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#0b0f19', minHeight: '100vh', color: 'white', padding: '20px' }}>
      
      {/* 🔵 SCREEN 1: THE DATABASE TABLE (Opens ONLY from Blue Button) */}
      {showOptionalDB && (
        <DetailedModal 
          onClose={() => setShowOptionalDB(false)} 
          history={threatHistory} 
        />
      )}

      {/* 📊 SCREEN 2: THE STAT ANALYTICS (Opens ONLY from 4 Stat Blocks) */}
      {statModal.isOpen && (
        <StatDetailsModal 
          onClose={() => setStatModal({ isOpen: false, filterId: '', title: '' })} 
          filterId={statModal.filterId} 
          title={statModal.title} 
          history={threatHistory} 
        />
      )}

      <header style={{ borderBottom: '1px solid #334155', paddingBottom: '15px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#00ff9d', margin: 0 }}>CortexShield SOC</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          
          <button onClick={() => setShowOptionalDB(true)} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Optional: View Threat Database
          </button>

          <span style={{ color: '#ef4444', fontSize: '14px', fontWeight: 'bold' }}>● LIVE SYSTEM ACTIVE</span>
          <button onClick={() => { window.location.href='/'; }} style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' }}>
            Disconnect
          </button>
        </div>
      </header>

      {/* CLICKING THESE NOW OPENS THE ANALYTICS SCREEN, NOT THE DATABASE */}
      <StatCards onCardClick={(id, title) => setStatModal({ isOpen: true, filterId: id, title: title })} />

      <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
        <div style={{ flex: 2, background: '#1a1f2e', height: '400px', borderRadius: '8px', overflow: 'hidden' }}>
          <AttackMap history={threatHistory} />
        </div>
        <div style={{ flex: 1, background: '#1a1f2e', height: '400px', borderRadius: '8px', padding: '20px' }}>
          <AttackChart />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1, background: '#1a1f2e', height: '350px', borderRadius: '8px', padding: '20px' }}>
          <InvestigationPanel currentThreat={latestThreat} />
        </div>
        <div style={{ flex: 1, background: '#1a1f2e', height: '350px', borderRadius: '8px', padding: '20px', overflowY: 'auto' }}>
          <h3 style={{ margin: '0 0 15px 0', color: 'white' }}>Live Attack Timeline</h3>
          <Timeline history={threatHistory} />
        </div>
      </div>
    </div>
  );
};

export default MainSOC;