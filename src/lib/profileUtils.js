// lib/profileUtils.js

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

// Reusing the fetchWithAuth function from your existing code
async function fetchWithAuth(endpoint, options = {}) {
  const fetchOptions = {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, fetchOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

export const profileApi = {
  updateProfile: (userData) => {
    return fetchWithAuth("/users/profile", {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },

  deleteAccount: () => {
    return fetchWithAuth("/users/delete", {
      method: "DELETE",
    });
  },

  uploadProfilePicture: async (file) => {
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const response = await fetch(`${API_BASE_URL}/users/profile/picture`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload profile picture");
      }

      return data;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  },
};

// Validation functions
export const validateProfile = (profileData) => {
  const errors = {};

  // Name validation
  if (profileData.name && profileData.name.trim().length < 2) {
    errors.name = "Name should be at least 2 characters";
  }

  // Phone number validation (basic pattern for Indian numbers)
  if (
    profileData.phoneNumber &&
    !/^[6-9]\d{9}$/.test(profileData.phoneNumber)
  ) {
    errors.phoneNumber = "Please enter a valid 10-digit phone number";
  }

  // Date of birth validation
  if (profileData.dateOfBirth) {
    const dob = new Date(profileData.dateOfBirth);
    const now = new Date();
    const age = now.getFullYear() - dob.getFullYear();

    if (isNaN(dob.getTime())) {
      errors.dateOfBirth = "Please enter a valid date";
    } else if (age < 13) {
      errors.dateOfBirth = "You must be at least 13 years old";
    } else if (dob > now) {
      errors.dateOfBirth = "Date of birth cannot be in the future";
    }
  }

  // Password validation (if provided)
  if (profileData.password) {
    if (profileData.password.length < 8) {
      errors.password = "Password should be at least 8 characters";
    } else if (!/[A-Z]/.test(profileData.password)) {
      errors.password = "Password should contain at least one uppercase letter";
    } else if (!/[a-z]/.test(profileData.password)) {
      errors.password = "Password should contain at least one lowercase letter";
    } else if (!/[0-9]/.test(profileData.password)) {
      errors.password = "Password should contain at least one number";
    }
  }

  // Password confirmation validation
  if (
    profileData.password &&
    profileData.confirmPassword &&
    profileData.password !== profileData.confirmPassword
  ) {
    errors.confirmPassword = "Passwords do not match";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Gender options
export const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
  { label: "Prefer not to say", value: "not_specified" },
];

// Preferences options (sample - customize as needed)
export const preferenceOptions = {
  notifications: [
    { label: "Email Notifications", value: "emailNotifications" },
    { label: "SMS Notifications", value: "smsNotifications" },
    { label: "Push Notifications", value: "pushNotifications" },
  ],
  marketing: [
    { label: "Promotional Emails", value: "promotionalEmails" },
    { label: "Newsletter", value: "newsletter" },
  ],
  theme: [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "System Default", value: "system" },
  ],
};

// Helper function to format date for input fields
export const formatDateForInput = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  return date.toISOString().split("T")[0];
};
