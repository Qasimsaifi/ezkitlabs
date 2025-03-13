const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

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

export const userApi = {
  getProfile: () => {
    return fetchWithAuth("/users/profile", {
      method: "GET",
    });
  },

  updateProfile: (userData) => {
    return fetchWithAuth("/users/profile", {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },

  deleteAccount: (userId) => {
    return fetchWithAuth(`/users/${userId}`, {
      method: "DELETE",
    });
  },

  getAllUsers: () => {
    return fetchWithAuth("/users", {
      method: "GET",
    });
  },
};

export const addressApi = {
  getAllAddresses: () => {
    return fetchWithAuth("/users/addresses", {
      method: "GET",
    });
  },

  getAddressById: (addressId) => {
    return fetchWithAuth(`/users/addresses/${addressId}`, {
      method: "GET",
    });
  },

  addAddress: (addressData) => {
    return fetchWithAuth("/users/addresses", {
      method: "POST",
      body: JSON.stringify(addressData),
    });
  },

  updateAddress: (addressId, addressData) => {
    return fetchWithAuth(`/users/addresses/${addressId}`, {
      method: "PUT",
      body: JSON.stringify(addressData),
    });
  },

  deleteAddress: (addressId) => {
    return fetchWithAuth(`/users/addresses/${addressId}`, {
      method: "DELETE",
    });
  },

  setDefaultAddress: (addressId) => {
    return fetchWithAuth(`/users/addresses/${addressId}/default`, {
      method: "PATCH",
    });
  },
};

export const authApi = {
  login: (credentials) => {
    return fetchWithAuth("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  register: (userData) => {
    return fetchWithAuth("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  logout: () => {
    return fetchWithAuth("/auth/logout", {
      method: "POST",
    });
  },

  checkAuth: () => {
    return fetchWithAuth("/auth/check", {
      method: "GET",
    }).catch(() => null);
  },
};

export const validateAddress = (address) => {
  const errors = {};

  if (!address.addressLine1) errors.addressLine1 = "Address line 1 is required";
  if (!address.city) errors.city = "City is required";
  if (!address.state) errors.state = "State is required";

  if (!address.pincode) {
    errors.pincode = "Pincode is required";
  } else if (!/^[1-9][0-9]{5}$/.test(address.pincode)) {
    errors.pincode = "Please enter a valid 6-digit pincode";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];
