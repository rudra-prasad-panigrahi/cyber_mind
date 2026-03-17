import React from 'react';
import { motion } from 'framer-motion';

const Timeline = ({ history }) => {
  if (!history || history.length === 0) return <p style={{ color: '#64748b' }}>Listening for events...</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {history.map((item, index) => {
        const timeString = new Date(item.timestamp * 1000).toLocaleTimeString();
        const isAttack = item.attack_type !== 'Normal';
        const color = isAttack ? (item.severity === 'CRITICAL' ? '#ef4444' : '#eab308') : '#00ff9d';

        return (
          <motion.div key={`${item.timestamp}-${index}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}` }}></div>
            <div style={{ background: '#0b0f19', padding: '10px', borderRadius: '6px', flex: 1, display: 'flex', justifyContent: 'space-between', borderLeft: `2px solid ${color}` }}>
              <span style={{ color: 'white', fontSize: '14px' }}>{isAttack ? `${item.attack_type} from ${item.source_ip}` : 'Normal traffic routed'}</span>
              <span style={{ color: '#64748b', fontSize: '12px' }}>{timeString}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Timeline;