
import { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarInset, SidebarProvider, SidebarRail } from "@/components/ui/sidebar";
import MainSidebar from "./MainSidebar";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <MainSidebar />
        <SidebarRail />
        <SidebarInset>
          <header className="flex justify-between items-center p-4 border-b">
            <h1 className="text-lg font-semibold">Workspace</h1>
            <ThemeToggle />
          </header>

          {/* Make main scrollable if content overflows */}
          <main className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;
