import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Activity, Ban, Globe } from 'lucide-react';

const StatCards = ({ onCardClick }) => {
  const stats = [
    { id: 'total', title: "Total Attacks", value: "1,432", icon: <ShieldAlert color="#ef4444" />, color: "#ef4444" },
    { id: 'active', title: "Active Threats", value: "8", icon: <Activity color="#eab308" />, color: "#eab308" },
    { id: 'blocked', title: "Blocked IPs", value: "245", icon: <Ban color="#00ff9d" />, color: "#00ff9d" },
    { id: 'regions', title: "Affected Regions", value: "12", icon: <Globe color="#3b82f6" />, color: "#3b82f6" }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.02, cursor: 'pointer', boxShadow: `0 0 15px ${stat.color}40` }}
          onClick={() => onCardClick(stat.id, stat.title)}
          style={{ background: '#1a1f2e', padding: '20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '15px', borderLeft: `4px solid ${stat.color}` }}
        >
          <div style={{ background: '#0b0f19', padding: '10px', borderRadius: '8px' }}>
            {stat.icon}
          </div>
          <div>
            <h4 style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>{stat.title}</h4>
            <h2 style={{ margin: 0, color: 'white', fontSize: '24px' }}>{stat.value}</h2>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatCards;