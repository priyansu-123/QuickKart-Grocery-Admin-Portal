import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

// Read the saved user safely.
// Invalid JSON should not crash the entire React application.
function getSavedUser() {
  try {
    const savedUser = localStorage.getItem("quickkart_user");

    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    localStorage.removeItem("quickkart_user");
    return null;
  }
}

// Share authentication state across the application.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser);

  // Keep local storage synchronized with React state.
  useEffect(() => {
    if (user) {
      localStorage.setItem("quickkart_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("quickkart_user");
    }
  }, [user]);

  // TEMPORARY MOCK LOGIN.
  // This does not verify credentials against the backend.
  const login = async (email, password) => {
    const cleanEmail = email?.trim().toLowerCase();

    if (!cleanEmail || !password) {
      throw new Error("Please enter your email and password.");
    }

    const loggedInUser = {
      id: 1,
      name: "QuickKart Admin",
      email: cleanEmail,
      role: "Admin",
      department: "Operations",
    };

    setUser(loggedInUser);

    return loggedInUser;
  };

  // TEMPORARY MOCK REGISTRATION.
  // This does not create an account in PostgreSQL.
  const register = async (data) => {
    const cleanEmail = data.email?.trim().toLowerCase();

    if (!data.name?.trim()) {
      throw new Error("Please enter your full name.");
    }

    if (!cleanEmail) {
      throw new Error("Please enter a valid email.");
    }

    if (!data.password || data.password.length < 6) {
      throw new Error("Password must contain at least 6 characters.");
    }

    const registeredUser = {
      id: Date.now(),
      name: data.name.trim(),
      email: cleanEmail,
      role: data.role || "Manager",
      department: data.department || "Operations",
    };

    setUser(registeredUser);

    return registeredUser;
  };

  // Update profile details throughout the application.
  const updateUser = (updatedDetails) => {
    setUser((currentUser) => {
      if (!currentUser) {
        return null;
      }

      return {
        ...currentUser,
        ...updatedDetails,
      };
    });
  };

  // Sign out by updating shared React state.
  // The useEffect above removes the saved user from local storage.
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for accessing authentication state.
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider."
    );
  }

  return context;
}