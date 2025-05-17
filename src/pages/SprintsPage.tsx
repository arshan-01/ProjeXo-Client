
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Progress
} from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { CalendarClock, Plus, Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample data
const sprints = [
  {
    id: "sprint-1",
    name: "Sprint 1",
    status: "completed",
    startDate: "2025-05-01",
    endDate: "2025-05-14",
    project: "Website Redesign",
    progress: 100,
    totalTasks: 15,
    completedTasks: 15,
    description: "Initial sprint focusing on wireframes and design concepts"
  },
  {
    id: "sprint-2",
    name: "Sprint 2",
    status: "active",
    startDate: "2025-05-15",
    endDate: "2025-05-28",
    project: "Website Redesign",
    progress: 60,
    totalTasks: 12,
    completedTasks: 7,
    description: "Implementation of core UI components and navigation"
  },
  {
    id: "sprint-3",
    name: "Sprint 3",
    status: "upcoming",
    startDate: "2025-05-29",
    endDate: "2025-06-11",
    project: "Website Redesign",
    progress: 0,
    totalTasks: 14,
    completedTasks: 0,
    description: "Backend integration and API implementation"
  },
  {
    id: "sprint-4",
    name: "Sprint 1",
    status: "active",
    startDate: "2025-05-08",
    endDate: "2025-05-21",
    project: "Mobile App Development",
    progress: 45,
    totalTasks: 18,
    completedTasks: 8,
    description: "User authentication and core screens development"
  },
  {
    id: "sprint-5",
    name: "Sprint 2",
    status: "upcoming",
    startDate: "2025-05-22",
    endDate: "2025-06-04",
    project: "Mobile App Development",
    progress: 0,
    totalTasks: 16,
    completedTasks: 0,
    description: "Implementing push notifications and offline mode"
  }
];

const statusColors: Record<string, string> = {
  "upcoming": "bg-gray-100 text-gray-800",
  "active": "bg-blue-100 text-blue-800",
  "completed": "bg-green-100 text-green-800",
};

export default function SprintsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showDetails, setShowDetails] = useState(false);
  const [selectedSprint, setSelectedSprint] = useState<typeof sprints[0] | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newSprint, setNewSprint] = useState({
    name: "",
    project: "",
    startDate: "",
    endDate: "",
    description: ""
  });

  // Filter sprints based on search query and selected project
  const filteredSprints = sprints.filter(sprint => {
    if (selectedProject !== "all" && sprint.project !== selectedProject) return false;
    if (searchQuery && !sprint.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Get unique project names for the filter
  const projectNames = Array.from(new Set(sprints.map(sprint => sprint.project)));

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  };

  // Group sprints by project for the tabs view
  const sprintsByProject: Record<string, typeof sprints> = {};
  projectNames.forEach(project => {
    sprintsByProject[project] = sprints.filter(sprint => sprint.project === project);
  });

  const handleViewDetails = (sprint: typeof sprints[0]) => {
    setSelectedSprint(sprint);
    setShowDetails(true);
  };

  const handleCreateSprint = () => {
    if (!newSprint.name || !newSprint.project) {
      toast.error("Sprint name and project are required");
      return;
    }
    
    toast.success("Sprint created successfully!");
    setShowCreateDialog(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Sprints</h1>
            <p className="text-sm text-muted-foreground">Plan and manage your project sprints</p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create Sprint
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sprints..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projectNames.map(project => (
                <SelectItem key={project} value={project}>
                  {project}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Calendar and Sprints View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Sprint Calendar</CardTitle>
              <CardDescription>View and plan your sprint schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                  <span>Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                  <span>Upcoming</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  <span>Completed</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* Active Sprints */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Active Sprints</h2>
            <div className="space-y-4">
              {filteredSprints
                .filter(sprint => sprint.status === "active")
                .map(sprint => (
                  <Card key={sprint.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge className={statusColors[sprint.status]}>
                          {sprint.status}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          <CalendarClock className="inline-block mr-1 h-4 w-4" />
                          {formatDateRange(sprint.startDate, sprint.endDate)}
                        </div>
                      </div>
                      <CardTitle>{sprint.name}</CardTitle>
                      <CardDescription className="text-sm">{sprint.project}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{sprint.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{sprint.progress}%</span>
                        </div>
                        <Progress value={sprint.progress} />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm">
                        {sprint.completedTasks} of {sprint.totalTasks} tasks completed
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleViewDetails(sprint)}>View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              {filteredSprints.filter(sprint => sprint.status === "active").length === 0 && (
                <div className="text-center p-4 border rounded-md bg-muted/50">
                  No active sprints found.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sprints by Project */}
        <div>
          <h2 className="text-lg font-semibold mb-4">All Sprints by Project</h2>
          <Tabs defaultValue={projectNames[0]}>
            <TabsList className="mb-4">
              {projectNames.map(project => (
                <TabsTrigger key={project} value={project}>
                  {project}
                </TabsTrigger>
              ))}
            </TabsList>
            {projectNames.map(project => (
              <TabsContent key={project} value={project}>
                <div className="space-y-4">
                  {sprintsByProject[project].map(sprint => (
                    <Card key={sprint.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge className={statusColors[sprint.status]}>
                            {sprint.status}
                          </Badge>
                          <div className="text-sm text-muted-foreground">
                            {formatDateRange(sprint.startDate, sprint.endDate)}
                          </div>
                        </div>
                        <CardTitle>{sprint.name}</CardTitle>
                        <CardDescription>{sprint.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{sprint.progress}%</span>
                          </div>
                          <Progress value={sprint.progress} />
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="text-sm">
                          {sprint.completedTasks} of {sprint.totalTasks} tasks completed
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleViewDetails(sprint)}>View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Sprint Details Dialog */}
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Sprint Details</DialogTitle>
              <DialogDescription>
                Detailed information about this sprint
              </DialogDescription>
            </DialogHeader>
            {selectedSprint && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">{selectedSprint.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedSprint.project}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <Badge className={statusColors[selectedSprint.status]}>
                      {selectedSprint.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Date Range</p>
                    <p className="text-sm">{formatDateRange(selectedSprint.startDate, selectedSprint.endDate)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-sm">{selectedSprint.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Progress</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{selectedSprint.completedTasks} of {selectedSprint.totalTasks} tasks completed</span>
                      <span>{selectedSprint.progress}%</span>
                    </div>
                    <Progress value={selectedSprint.progress} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Team Members</p>
                  <div className="flex -space-x-2 mt-1">
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage src="https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage src="https://ui-avatars.com/api/?name=Jane+Smith&background=a855f7&color=fff" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage src="https://ui-avatars.com/api/?name=Mike+Johnson&background=ec4899&color=fff" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDetails(false)}>Close</Button>
              <Button>Edit Sprint</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Sprint Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Sprint</DialogTitle>
              <DialogDescription>
                Set up a new sprint for your project
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input 
                    placeholder="Sprint name" 
                    value={newSprint.name}
                    onChange={(e) => setNewSprint({...newSprint, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project</label>
                  <Select 
                    value={newSprint.project} 
                    onValueChange={(value) => setNewSprint({...newSprint, project: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectNames.map(project => (
                        <SelectItem key={project} value={project}>
                          {project}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Input 
                    type="date" 
                    value={newSprint.startDate}
                    onChange={(e) => setNewSprint({...newSprint, startDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Input 
                    type="date" 
                    value={newSprint.endDate}
                    onChange={(e) => setNewSprint({...newSprint, endDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input 
                  placeholder="Sprint description" 
                  value={newSprint.description}
                  onChange={(e) => setNewSprint({...newSprint, description: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              <Button onClick={handleCreateSprint}>Create Sprint</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
