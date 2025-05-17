import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Bell,
  Calendar,
  MessageSquare,
  Settings,
  User,
  Users,
  Folder,
  CalendarDays,
  LogOut,
  PlusCircle,
  UserPlus,
  ChevronRight,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface NavItem {
  name: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const mainNavItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: Folder },
  { name: "Projects", href: "/projects", icon: Folder },
  { name: "Tasks", href: "/tasks", icon: Folder },
  { name: "Sprints", href: "/sprints", icon: CalendarDays },
  { name: "Teams", href: "/teams", icon: Users },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Calendar", href: "/calendar", icon: Calendar },
];

const secondaryNavItems: NavItem[] = [
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function MainSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  // Manage sidebar state locally instead of using useSidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [workspaceDialogOpen, setWorkspaceDialogOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [newWorkspace, setNewWorkspace] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [selectedWorkspace, setSelectedWorkspace] = useState("Personal Workspace");

  // Mock workspaces data - replace with your actual data fetching
  const workspaces = [
    { id: "1", name: "Personal Workspace" },
    { id: "2", name: "Team Alpha" },
    { id: "3", name: "Project X" },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Optional: Redirect to login if no user is found, to prevent flicker
      // navigate("/login"); 
    }

    // Set sidebar to open by default when component mounts
    setIsSidebarOpen(true);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // Clear user state
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleCreateWorkspace = () => {
    if (!newWorkspace.trim()) {
      toast.error("Workspace name is required");
      return;
    }
    // Add actual workspace creation logic here
    toast.success(`Workspace "${newWorkspace}" created`);
    // Potentially update the workspaces list and select the new one
    // workspaces.push({ id: String(workspaces.length + 1), name: newWorkspace });
    // setSelectedWorkspace(newWorkspace);
    setNewWorkspace("");
    setWorkspaceDialogOpen(false);
  };

  const handleInviteUser = () => {
    if (!inviteEmail.trim()) {
      toast.error("Email is required");
      return;
    }
    // Add actual invite logic here
    toast.success(`Invitation sent to ${inviteEmail} for ${selectedWorkspace}`);
    setInviteEmail("");
    setInviteDialogOpen(false);
  };

  if (!user) {
    return null; // Or a loading spinner, or redirect
  }

  return (
    <div className="flex bg-background text-foreground">
      {/* Workspace Bar (Far Left) */}
      <aside className="w-16 bg-slate-800 flex flex-col items-center shrink-0 py-4 space-y-3 border-r border-slate-700">
        {workspaces.map((workspace) => (
          <button
            key={workspace.id}
            onClick={() => setSelectedWorkspace(workspace.name)}
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-semibold transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400",
              selectedWorkspace === workspace.name
                ? 'bg-indigo-500 ring-2 ring-white ring-offset-2 ring-offset-slate-800'
                : 'bg-slate-700 hover:bg-slate-600'
            )}
            title={workspace.name}
          >
            {workspace.name.length > 0 ? workspace.name[0].toUpperCase() : '?'}
          </button>
        ))}
        <div className="mt-2 border-t border-slate-700 w-8/12"></div> {/* Separator */}
        <button
          onClick={() => setWorkspaceDialogOpen(true)}
          className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center hover:bg-slate-600 text-slate-400 hover:text-white transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400"
          title="Add New Workspace"
        >
          <PlusCircle className="w-5 h-5" />
        </button>
      </aside>

      {/* Main Collapsible Sidebar Content */}
      {isSidebarOpen ? (
        <div className="border-r flex-grow">
          <div className="flex h-14 items-center justify-between border-b px-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <span
                className="font-semibold text-md sm:text-lg truncate inline-block w-[120px] sm:w-[180px]"
                title={selectedWorkspace}
              >
                {selectedWorkspace || "Workspace"}
              </span>
              {selectedWorkspace && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8" title="Workspace actions">
                      <Settings className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>{selectedWorkspace}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setInviteDialogOpen(true)}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Invite members</span>
                    </DropdownMenuItem>
                    {/* Add more workspace-specific actions here, e.g., Workspace Settings */}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsSidebarOpen(false)}
              title="Collapse Sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="pb-2">
            <div className="flex flex-col items-center py-4">
              <Avatar className="h-16 w-16 mb-2">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
              </Avatar>
              <div className="text-sm font-medium text-center">{user.name}</div>
              <div className="text-xs text-muted-foreground">Product Manager</div> {/* Consider making this dynamic */}
            </div>

            <div className="px-3 py-2">
              <div className="mb-1 px-4 text-xs font-medium text-muted-foreground">Main</div>
              <nav>
                <ul className="space-y-1">
                  {mainNavItems.map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.href)}
                        className={cn(
                          "w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                          location.pathname === item.href
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="px-3 py-2">
              <div className="mb-1 px-4 text-xs font-medium text-muted-foreground">Account</div>
              <nav>
                <ul className="space-y-1">
                  {secondaryNavItems.map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.href)}
                        className={cn(
                          "w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                          location.pathname === item.href
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <div className="border-t p-4 mt-auto">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start gap-2 text-sm hover:bg-destructive hover:text-destructive-foreground"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="fixed left-16 top-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            className="bg-slate-100 dark:bg-slate-800 shadow-md rounded-full w-8 h-8"
            onClick={() => setIsSidebarOpen(true)}
            title="Expand Sidebar"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Create Workspace Dialog */}
      <Dialog open={workspaceDialogOpen} onOpenChange={setWorkspaceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Workspace</DialogTitle>
            <DialogDescription>
              Add a new workspace to organize your projects and teams.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="workspace-name">Workspace Name</Label>
              <Input
                id="workspace-name"
                placeholder="Enter workspace name"
                value={newWorkspace}
                onChange={(e) => setNewWorkspace(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWorkspaceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateWorkspace}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invite Members Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Members</DialogTitle>
            <DialogDescription>
              Invite new members to join the "{selectedWorkspace}" workspace.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="invite-email">Email Address</Label>
              <Input
                id="invite-email"
                type="email"
                placeholder="Enter email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteUser}>
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MainSidebar;