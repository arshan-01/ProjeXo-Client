
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UpcomingTasks from "@/components/dashboard/UpcomingTasks";
import Notifications from "@/components/dashboard/Notifications";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </div>
        </div>

        <DashboardStats />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <UpcomingTasks />
          </div>
          <div>
            <Notifications />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <RecentActivity />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Project Highlights</h2>
            <div className="grid gap-4">
              {/* Project card */}
              <div className="task-card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Website Redesign</h3>
                    <p className="text-sm text-muted-foreground mt-1">5/12 tasks completed</p>
                  </div>
                  <span className="status-badge status-in-progress">In Progress</span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>42%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: "42%" }}></div>
                  </div>
                </div>
              </div>
              
              {/* Project card */}
              <div className="task-card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Mobile App Development</h3>
                    <p className="text-sm text-muted-foreground mt-1">8/20 tasks completed</p>
                  </div>
                  <span className="status-badge status-in-progress">In Progress</span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>40%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
