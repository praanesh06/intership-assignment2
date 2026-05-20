import React, { useState } from 'react';
import Avatar from './Avatar';

function StoryCircle({ story }) {
  const [seen, setSeen] = useState(story.seen);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        cursor: 'pointer',
        flexShrink: 0,
      }}
      onClick={() => setSeen(true)}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: seen
            ? '#dbdbdb'
            : 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ background: '#fafafa', borderRadius: '50%', padding: 2 }}>
          {story.isYou ? (
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#efefef',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <i className="ti ti-plus" style={{ fontSize: 22, color: '#0095f6' }} />
            </div>
          ) : (
            <Avatar name={story.user} size={56} />
          )}
        </div>
      </div>
      <span
        style={{
          fontSize: 11,
          color: '#262626',
          maxWidth: 64,
          textAlign: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {story.user}
      </span>
    </div>
  );
}

export default StoryCircle;
