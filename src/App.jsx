import Dashboard from "./components/Dashboard";
import AdminLogin from "./components/AdminLogin";
import { useState } from "react";



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

if(!isLoggedIn){

  return (
< AdminLogin  onLoginSuccess={() => setIsLoggedIn(true)}/>








)
}

 return <Dashboard /> 
  


}

export default App