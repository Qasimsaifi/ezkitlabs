import { ToastContainer, toast } from "react-toastify";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Add item to cart
export async function addToCart(productId, quantity = 1) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add item to cart");
    }

    const data = await response.json();
    console.log(data);
    toast("Item added to cart successfully!"); // Optional feedback
    return data; // Return updated cart or success data
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    throw error;
  }
}

// Optional: Get current cart (for reference or validation)
export async function getCart() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cart`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch cart");
    }

    const cart = await response.json();
    console.log(cart);
    return cart;
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    throw error;
  }
}

// Optional: Update cart item quantity
export async function updateCartItem(productId, quantity) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cart/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update cart item");
    }

    const data = await response.json();
    toast("Cart updated successfully!");
    return data;
  } catch (error) {
    console.error("Error updating cart:", error.message);
    // toast.error(error.message);
    throw error;
  }
}

// Optional: Remove item from cart
export async function removeFromCart(productId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/cart/remove/${productId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to remove item from cart");
    }

    const data = await response.json();
    toast.success("Item removed from cart!");
    return data;
  } catch (error) {
    console.error("Error removing from cart:", error.message);

    throw error;
  }
}

// Increase item quantity by 1
export async function increaseItemQuantity(productId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cart/increase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to increase item quantity");
    }

    const data = await response.json();
    toast("Quantity increased!");
    return data;
  } catch (error) {
    console.error("Error increasing quantity:", error.message);

    throw error;
  }
}

// Decrease item quantity by 1
export async function decreaseItemQuantity(productId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cart/decrease`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to decrease item quantity");
    }

    const data = await response.json();
    toast("Quantity decreased!");
    return data;
  } catch (error) {
    console.error("Error decreasing quantity:", error.message);

    throw error;
  }
}
