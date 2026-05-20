import React, { useState } from 'react';
import Avatar from './components/Avatar';
import StoryCircle from './components/StoryCircle';
import PostCard from './components/PostCard';
import AddPostModal from './components/AddPostModal';
import Navbar from './components/Navbar';
import { INITIAL_POSTS, STORIES } from './data/initialData';

function App() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState('');

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 2500);
  };

  // --- Handlers ---

  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const handleSave = (id) => {
    const post = posts.find((p) => p.id === id);
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p))
    );
    showNotif(post?.saved ? 'Removed from saved' : 'Post saved');
  };

  const handleComment = (id, text) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, comments: [...p.comments, { user: 'praanesh_dev', text }] }
          : p
      )
    );
  };

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    showNotif('Post deleted');
  };

  const handleAddPost = ({ user, image, caption }) => {
    const newPost = {
      id: Date.now(),
      user,
      image,
      caption,
      likes: 0,
      liked: false,
      comments: [],
      time: 'Just now',
      saved: false,
    };
    setPosts((prev) => [newPost, ...prev]);
    showNotif('Post shared!');
  };

  // --- Derived state ---
  const filteredPosts = posts.filter(
    (p) =>
      p.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const savedPosts = posts.filter((p) => p.saved);
  const myPosts = posts.filter((p) => p.user === 'praanesh_dev');

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fafafa',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Toast Notification */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            bottom: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#262626',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: 8,
            fontSize: 14,
            zIndex: 2000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            whiteSpace: 'nowrap',
          }}
        >
          {notification}
        </div>
      )}

      {/* Add Post Modal */}
      {showModal && (
        <AddPostModal onClose={() => setShowModal(false)} onAdd={handleAddPost} />
      )}

      {/* Top Header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          background: '#fff',
          borderBottom: '1px solid #dbdbdb',
          zIndex: 100,
          padding: '0 16px',
        }}
      >
        <div
          style={{
            maxWidth: 470,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 54,
          }}
        >
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 22,
              letterSpacing: -0.5,
              fontStyle: 'italic',
              background:
                'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Instagram
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            <button
              onClick={() => setShowModal(true)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#262626',
                padding: 8,
              }}
            >
              <i className="ti ti-square-plus" style={{ fontSize: 24 }} />
            </button>
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#262626',
                padding: 8,
              }}
            >
              <i className="ti ti-heart" style={{ fontSize: 24 }} />
            </button>
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#262626',
                padding: 8,
              }}
            >
              <i className="ti ti-send" style={{ fontSize: 24 }} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 470, margin: '0 auto', padding: '0 0 80px' }}>

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <>
            <div
              style={{
                padding: '12px 16px',
                display: 'flex',
                gap: 16,
                overflowX: 'auto',
                borderBottom: '1px solid #efefef',
                scrollbarWidth: 'none',
              }}
            >
              {STORIES.map((s) => (
                <StoryCircle key={s.id} story={s} />
              ))}
            </div>
            <div style={{ padding: '12px 0' }}>
              {filteredPosts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 40, color: '#8e8e8e' }}>
                  <i
                    className="ti ti-photo-off"
                    style={{ fontSize: 48, display: 'block', marginBottom: 12 }}
                  />
                  <p>No posts yet. Share something!</p>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onSave={handleSave}
                    onComment={handleComment}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
          </>
        )}

        {/* SEARCH TAB */}
        {activeTab === 'search' && (
          <div style={{ padding: 16 }}>
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <i
                className="ti ti-search"
                style={{
                  position: 'absolute',
                  left: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#8e8e8e',
                  fontSize: 18,
                }}
              />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts and users…"
                style={{
                  width: '100%',
                  background: '#efefef',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 10px 10px 36px',
                  fontSize: 15,
                  outline: 'none',
                  color: '#262626',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#8e8e8e',
                  }}
                >
                  <i className="ti ti-x" style={{ fontSize: 18 }} />
                </button>
              )}
            </div>
            {searchQuery ? (
              filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onSave={handleSave}
                    onComment={handleComment}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <p style={{ textAlign: 'center', color: '#8e8e8e', marginTop: 40 }}>
                  No results for "{searchQuery}"
                </p>
              )
            ) : (
              <div
                style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}
              >
                {[...Array(12)].map((_, i) => (
                  <img
                    key={i}
                    src={`https://picsum.photos/seed/explore${i}/200/200`}
                    alt=""
                    style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* SAVED TAB */}
        {activeTab === 'saved' && (
          <div style={{ padding: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Saved Posts</h2>
            {savedPosts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, color: '#8e8e8e' }}>
                <i
                  className="ti ti-bookmark"
                  style={{ fontSize: 48, display: 'block', marginBottom: 12 }}
                />
                <p style={{ fontWeight: 600, marginBottom: 6, color: '#262626' }}>
                  Save photos and videos
                </p>
                <p style={{ fontSize: 14 }}>Save posts to see them again.</p>
              </div>
            ) : (
              savedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onSave={handleSave}
                  onComment={handleComment}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div>
            <div
              style={{
                padding: '20px 16px 0',
                display: 'flex',
                gap: 20,
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <Avatar name="praanesh_dev" size={80} ring />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
                  praanesh_dev
                </p>
                <div style={{ display: 'flex', gap: 20 }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: 700 }}>{myPosts.length}</p>
                    <p style={{ fontSize: 12, color: '#8e8e8e' }}>posts</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: 700 }}>842</p>
                    <p style={{ fontSize: 12, color: '#8e8e8e' }}>followers</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: 700 }}>312</p>
                    <p style={{ fontSize: 12, color: '#8e8e8e' }}>following</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding: '0 16px 16px' }}>
              <p style={{ fontWeight: 600, fontSize: 14 }}>Praanesh</p>
              <p style={{ fontSize: 14, color: '#262626' }}>
                B.Tech IT @ CIT 🎓 • Builder 🚀 • Always shipping
              </p>
              <p style={{ fontSize: 14, color: '#0095f6' }}>github.com/praanesh</p>
              <button
                onClick={() => setShowModal(true)}
                style={{
                  width: '100%',
                  marginTop: 12,
                  padding: '8px 0',
                  border: '1px solid #dbdbdb',
                  borderRadius: 8,
                  background: '#fff',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  color: '#262626',
                }}
              >
                + New Post
              </button>
            </div>
            <div style={{ borderTop: '1px solid #dbdbdb' }}>
              {myPosts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 60, color: '#8e8e8e' }}>
                  <i
                    className="ti ti-camera"
                    style={{ fontSize: 48, display: 'block', marginBottom: 12 }}
                  />
                  <p>Share your first photo</p>
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 3,
                  }}
                >
                  {myPosts.map((post) => (
                    <img
                      key={post.id}
                      src={post.image}
                      alt=""
                      style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewPost={() => setShowModal(true)}
      />
    </div>
  );
}

export default App;
