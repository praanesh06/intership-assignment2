import React from 'react';
import { getColor } from '../data/initialData';

function Avatar({ name, size = 32, ring = false, ringColor = '#e1306c' }) {
  const initials = name.split('_')[0].slice(0, 2).toUpperCase();
  const bg = getColor(name);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 600,
        fontSize: size * 0.35,
        flexShrink: 0,
        outline: ring ? `2px solid ${ringColor}` : 'none',
        outlineOffset: ring ? '2px' : '0',
      }}
    >
      {initials}
    </div>
  );
}

export default Avatar;
