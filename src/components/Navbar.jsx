import React from 'react';
import Avatar from './Avatar';

function Navbar({ activeTab, setActiveTab, onNewPost }) {
  const navBtn = (icon, tab) => (
    <button
      onClick={() => setActiveTab(tab)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px 12px',
        borderRadius: 8,
        color: activeTab === tab ? '#262626' : '#8e8e8e',
        transition: 'all 0.15s',
      }}
    >
      <i className={`ti ti-${icon}`} style={{ fontSize: 24 }} />
    </button>
  );

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        borderTop: '1px solid #dbdbdb',
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 470,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-around',
          padding: '4px 0',
        }}
      >
        {navBtn('home', 'home')}
        {navBtn('search', 'search')}
        <button
          onClick={onNewPost}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 12px',
            color: '#262626',
          }}
        >
          <i className="ti ti-square-plus" style={{ fontSize: 24 }} />
        </button>
        {navBtn('bookmark', 'saved')}
        <button
          onClick={() => setActiveTab('profile')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 8px',
            borderRadius: 8,
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              outline: activeTab === 'profile' ? '2px solid #262626' : 'none',
              outlineOffset: 2,
            }}
          >
            <Avatar name="praanesh_dev" size={26} />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
