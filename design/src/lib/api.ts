// API base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Helper function to get auth headers
const getAuthHeaders = () => {
  if (typeof window === 'undefined') return {};
  
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Auth API
export const authApi = {
  login: async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_URL}/api/auth/me`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },
};

// Stories API
export const storiesApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/api/stories`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch stories');
    const data = await response.json();
    return data.stories;
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/api/stories/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch story');
    const data = await response.json();
    return data.story;
  },

  getMyStories: async () => {
    const response = await fetch(`${API_URL}/api/stories/my-stories`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch my stories');
    const data = await response.json();
    return data.stories;
  },

  createStory: async (storyData: any) => {
    const response = await fetch(`${API_URL}/api/stories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(storyData),
    });
    if (!response.ok) throw new Error('Failed to create story');
    const data = await response.json();
    return data.story;
  },

  createEpisode: async (storyId: string, episodeData: any) => {
    const response = await fetch(`${API_URL}/api/stories/${storyId}/episodes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(episodeData),
    });
    if (!response.ok) throw new Error('Failed to create episode');
    const data = await response.json();
    return data.episode;
  },
};

// Admin API
export const adminApi = {
  getUsers: async () => {
    const response = await fetch(`${API_URL}/api/admin/users`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    const data = await response.json();
    return data.users;
  },

  createUser: async (userData: any) => {
    const response = await fetch(`${API_URL}/api/admin/users`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },

  updateUser: async (id: number, userData: any) => {
    const response = await fetch(`${API_URL}/api/admin/users/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  },

  deleteUser: async (id: number) => {
    const response = await fetch(`${API_URL}/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return response.json();
  },
};

// User profile API
export const profileApi = {
  updateProfile: async (userId: number, data: any) => {
    const response = await fetch(`${API_URL}/api/admin/users/${userId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  },
};

// Interactions API
export const interactionsApi = {
  addReaction: async (storyId: number, reactionType: string) => {
    const response = await fetch(`${API_URL}/api/interactions/reactions`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ story_id: storyId, reaction_type: reactionType }),
    });
    if (!response.ok) throw new Error('Failed to add reaction');
    return response.json();
  },

  getUserReaction: async (storyId: number) => {
    const response = await fetch(`${API_URL}/api/interactions/reactions/${storyId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch user reaction');
    const data = await response.json();
    return data.reactions;
  },

  toggleBookmark: async (storyId: number) => {
    const response = await fetch(`${API_URL}/api/interactions/bookmarks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ story_id: storyId }),
    });
    if (!response.ok) throw new Error('Failed to toggle bookmark');
    return response.json();
  },

  getBookmarks: async () => {
    const response = await fetch(`${API_URL}/api/interactions/bookmarks`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch bookmarks');
    const data = await response.json();
    return data.stories;
  },

  isBookmarked: async (storyId: number) => {
    const response = await fetch(`${API_URL}/api/interactions/bookmarks/${storyId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to check bookmark');
    const data = await response.json();
    return data.bookmarked;
  },
};

// Audio API
export const audioApi = {
  saveProgress: async (storyId: number, audioPosition: number) => {
    const response = await fetch(`${API_URL}/api/audio/progress`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ story_id: storyId, audio_position: audioPosition }),
    });
    if (!response.ok) throw new Error('Failed to save audio progress');
    return response.json();
  },

  getProgress: async (storyId: number) => {
    const response = await fetch(`${API_URL}/api/audio/progress/${storyId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch audio progress');
    const data = await response.json();
    return data;
  },
};
