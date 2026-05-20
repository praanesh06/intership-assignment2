import React, { useState, useRef } from 'react';
import Avatar from './Avatar';

function PostCard({ post, onLike, onSave, onComment, onDelete }) {
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [imgLoaded, setImgLoaded] = useState(false);
  const inputRef = useRef(null);
  const isOwn = post.user === 'praanesh_dev';

  const handleComment = () => {
    if (!commentInput.trim()) return;
    onComment(post.id, commentInput.trim());
    setCommentInput('');
  };

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #dbdbdb',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar name={post.user} size={32} ring />
          <div>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{post.user}</span>
            <p style={{ fontSize: 11, color: '#8e8e8e' }}>{post.time}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {isOwn && (
            <button
              onClick={() => onDelete(post.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#ed4956',
                padding: 4,
              }}
              title="Delete post"
            >
              <i className="ti ti-trash" style={{ fontSize: 18 }} />
            </button>
          )}
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#262626',
              padding: 4,
            }}
          >
            <i className="ti ti-dots" style={{ fontSize: 18 }} />
          </button>
        </div>
      </div>

      {/* Image */}
      <div style={{ position: 'relative', background: '#efefef', minHeight: 200 }}>
        {!imgLoaded && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <i className="ti ti-photo" style={{ fontSize: 32, color: '#dbdbdb' }} />
          </div>
        )}
        <img
          src={post.image}
          alt="post"
          style={{
            width: '100%',
            display: imgLoaded ? 'block' : 'none',
            maxHeight: 520,
            objectFit: 'cover',
          }}
          onLoad={() => setImgLoaded(true)}
          onDoubleClick={() => onLike(post.id)}
        />
      </div>

      {/* Actions & Caption */}
      <div style={{ padding: '8px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <button
              onClick={() => onLike(post.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: post.liked ? '#ed4956' : '#262626',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <i
                className={post.liked ? 'ti ti-heart-filled' : 'ti ti-heart'}
                style={{ fontSize: 24, color: post.liked ? '#ed4956' : '#262626' }}
              />
            </button>
            <button
              onClick={() => {
                setShowComments(!showComments);
                setTimeout(() => inputRef.current?.focus(), 100);
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                color: '#262626',
              }}
            >
              <i className="ti ti-message-circle" style={{ fontSize: 24 }} />
            </button>
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                color: '#262626',
              }}
            >
              <i className="ti ti-send" style={{ fontSize: 22 }} />
            </button>
          </div>
          <button
            onClick={() => onSave(post.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              color: '#262626',
            }}
          >
            <i
              className={post.saved ? 'ti ti-bookmark-filled' : 'ti ti-bookmark'}
              style={{ fontSize: 24 }}
            />
          </button>
        </div>

        <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
          {post.likes.toLocaleString()} likes
        </p>
        <p style={{ fontSize: 14, marginBottom: 4 }}>
          <span style={{ fontWeight: 600 }}>{post.user}</span> {post.caption}
        </p>

        {post.comments.length > 0 && (
          <button
            onClick={() => setShowComments(!showComments)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#8e8e8e',
              fontSize: 14,
              padding: 0,
              marginBottom: 4,
            }}
          >
            {showComments
              ? 'Hide comments'
              : `View all ${post.comments.length} comments`}
          </button>
        )}

        {showComments &&
          post.comments.map((c, i) => (
            <p key={i} style={{ fontSize: 14, marginBottom: 4 }}>
              <span style={{ fontWeight: 600 }}>{c.user}</span> {c.text}
            </p>
          ))}

        {/* Comment Input */}
        <div
          style={{
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            borderTop: '1px solid #efefef',
            marginTop: 8,
            paddingTop: 8,
            paddingBottom: 8,
          }}
        >
          <Avatar name="praanesh_dev" size={24} />
          <input
            ref={inputRef}
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleComment()}
            placeholder="Add a comment…"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: 14,
              background: 'transparent',
              color: '#262626',
            }}
          />
          {commentInput && (
            <button
              onClick={handleComment}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#0095f6',
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
