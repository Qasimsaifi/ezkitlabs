const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const login = async (email, password) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = await res.json();
  return data.user;
};

export const register = async (email, password, name) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  const data = await res.json();
  return data.user;
};

export const logout = async () => {
  const res = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }

  console.log("Logged out successfully");
};

export const getProfile = async (cookie = null) => {
  try {
    const headers = {};

    if (cookie) {
      headers.Cookie = `token=${cookie}`;
    }

    const res = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "GET",
      credentials: "include",
      headers,
    });

    if (!res.ok) {
      console.error("Failed to fetch profile:", res.status, res.statusText);
      const errorData = await res.json();
      console.error("Error details:", errorData);
      throw new Error("Failed to fetch profile");
    }

    const data = await res.json();
    console.log("Profile data:", data);
    return data;
  } catch (error) {
    console.error("Error in getProfile:", error);
    throw error;
  }
};

export const isAuthenticated = async () => {
  try {
    await getProfile();
    return true;
  } catch {
    return false;
  }
};
