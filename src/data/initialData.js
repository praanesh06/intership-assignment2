export const AVATAR_COLORS = [
  '#f09433','#e6683c','#dc2743','#cc2366',
  '#bc1888','#833ab4','#405de6','#5851db'
];

export const getColor = (name) =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

export const INITIAL_POSTS = [
  {
    id: 1,
    user: 'praanesh_dev',
    image: 'https://picsum.photos/seed/code1/600/600',
    caption: 'Late night coding sessions hit different ☕💻',
    likes: 312,
    liked: false,
    comments: [
      { user: 'ananya_k', text: 'Same! What are you building?' },
      { user: 'dev_rishi', text: 'That coffee is keeping me alive too 😂' },
    ],
    time: '2 hours ago',
    saved: false,
  },
  {
    id: 2,
    user: 'itz_ananya',
    image: 'https://picsum.photos/seed/nature7/600/600',
    caption: 'Golden hour never disappoints 🌅 Ooty vibes',
    likes: 891,
    liked: false,
    comments: [
      { user: 'praanesh_dev', text: 'Stunning shot!' },
      { user: 'travel.riya', text: 'Missing ooty now 😭' },
    ],
    time: '5 hours ago',
    saved: false,
  },
  {
    id: 3,
    user: 'cit_campus',
    image: 'https://picsum.photos/seed/campus3/600/600',
    caption: 'Hackathon season is here. Are you ready? 🔥 #CIT #Tech',
    likes: 1420,
    liked: false,
    comments: [
      { user: 'praanesh_dev', text: "Let's go!! 🚀" },
      { user: 'itz_ananya', text: 'Already registered!' },
    ],
    time: '1 day ago',
    saved: false,
  },
];

export const STORIES = [
  { id: 0, user: 'Your story', isYou: true },
  { id: 1, user: 'ananya_k', seen: false },
  { id: 2, user: 'rishi.dev', seen: false },
  { id: 3, user: 'cit_official', seen: true },
  { id: 4, user: 'travel.riya', seen: false },
  { id: 5, user: 'mohan_cs', seen: true },
];
