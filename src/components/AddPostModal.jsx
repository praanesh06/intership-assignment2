import React, { useState, useEffect } from 'react';

function AddPostModal({ onClose, onAdd }) {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (imageUrl.trim()) setPreview(imageUrl.trim());
    }, 600);
    return () => clearTimeout(timer);
  }, [imageUrl]);

  const validate = () => {
    if (!caption.trim()) {
      setError('Caption cannot be empty.');
      return false;
    }
    if (caption.trim().length < 5) {
      setError('Caption must be at least 5 characters.');
      return false;
    }
    if (caption.trim().length > 200) {
      setError('Caption must be under 200 characters.');
      return false;
    }
    setError('');
    return true;
  };

  const handleAdd = () => {
    if (!validate()) return;
    onAdd({
      user: 'praanesh_dev',
      image: imageUrl.trim() || `https://picsum.photos/seed/${Date.now()}/600/600`,
      caption: caption.trim(),
    });
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          width: 420,
          maxWidth: '95vw',
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 16px',
            borderBottom: '1px solid #dbdbdb',
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#262626',
            }}
          >
            <i className="ti ti-x" style={{ fontSize: 22 }} />
          </button>
          <span style={{ fontWeight: 600, fontSize: 15 }}>Create new post</span>
          <button
            onClick={handleAdd}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#0095f6',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Share
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: 20 }}>
          {/* Image Preview */}
          <div
            style={{
              background: '#fafafa',
              borderRadius: 8,
              border: '1px dashed #dbdbdb',
              marginBottom: 16,
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={() => setPreview('')}
              />
            ) : (
              <div style={{ textAlign: 'center', color: '#8e8e8e' }}>
                <i
                  className="ti ti-photo"
                  style={{ fontSize: 40, display: 'block', marginBottom: 8 }}
                />
                <span style={{ fontSize: 13 }}>Image preview</span>
              </div>
            )}
          </div>

          {/* Image URL Input */}
          <div style={{ marginBottom: 12 }}>
            <label
              style={{ fontSize: 12, color: '#8e8e8e', display: 'block', marginBottom: 4 }}
            >
              Image URL (optional)
            </label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              style={{
                width: '100%',
                border: '1px solid #dbdbdb',
                borderRadius: 6,
                padding: '8px 10px',
                fontSize: 14,
                outline: 'none',
                color: '#262626',
                background: '#fff',
              }}
            />
          </div>

          {/* Caption Input */}
          <div style={{ marginBottom: 4 }}>
            <label
              style={{ fontSize: 12, color: '#8e8e8e', display: 'block', marginBottom: 4 }}
            >
              Caption <span style={{ color: '#ed4956' }}>*</span>
            </label>
            <textarea
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
                setError('');
              }}
              placeholder="Write a caption…"
              rows={3}
              style={{
                width: '100%',
                border: `1px solid ${error ? '#ed4956' : '#dbdbdb'}`,
                borderRadius: 6,
                padding: '8px 10px',
                fontSize: 14,
                outline: 'none',
                resize: 'none',
                color: '#262626',
                background: '#fff',
                fontFamily: 'inherit',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              {error ? (
                <span style={{ fontSize: 12, color: '#ed4956' }}>{error}</span>
              ) : (
                <span />
              )}
              <span
                style={{
                  fontSize: 12,
                  color: caption.length > 180 ? '#ed4956' : '#8e8e8e',
                }}
              >
                {caption.length}/200
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPostModal;
