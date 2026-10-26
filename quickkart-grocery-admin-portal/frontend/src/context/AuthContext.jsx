import React,{createContext,useContext,useEffect,useState} from "react";
const AuthContext=createContext(null);
// This provider shares login state with every component in the application.
export function AuthProvider({children}){const [user,setUser]=useState(()=>{const x=localStorage.getItem("quickkart_user");return x?JSON.parse(x):null});useEffect(()=>{user?localStorage.setItem("quickkart_user",JSON.stringify(user)):localStorage.removeItem("quickkart_user")},[user]);
// Mock login is used now; later replace it with axios.post('/api/auth/login').
const login=async(email,password)=>{if(!email||!password)throw Error("Email and password are required.");const u={id:1,name:"QuickKart Admin",email,role:"Admin",department:"Operations"};setUser(u);return u};
// Mock registration is used now; later replace it with the Express API.
const register=async(data)=>{const u={id:Date.now(),...data};setUser(u);return u}; const logout=()=>setUser(null); return <AuthContext.Provider value={{user,login,register,logout}}>{children}</AuthContext.Provider>}
export const useAuth=()=>useContext(AuthContext);
