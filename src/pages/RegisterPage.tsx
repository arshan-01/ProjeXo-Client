
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary">TaskMaster</h1>
        <p className="text-muted-foreground">Project Management Simplified</p>
      </div>
      <RegisterForm />
    </div>
  );
}
