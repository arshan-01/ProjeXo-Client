
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return <LandingPage />;
};

export default Index;
