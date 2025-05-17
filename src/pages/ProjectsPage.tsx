
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold";
  progress: number;
  members: {
    name: string;
    avatar: string;
  }[];
  tasks: {
    total: number;
    completed: number;
  };
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Website Redesign",
      description: "Complete overhaul of the company website with new branding",
      status: "active",
      progress: 65,
      members: [
        { name: "John Doe", avatar: "https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff" },
        { name: "Jane Smith", avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=a855f7&color=fff" },
        { name: "Mike Johnson", avatar: "https://ui-avatars.com/api/?name=Mike+Johnson&background=ec4899&color=fff" },
      ],
      tasks: {
        total: 24,
        completed: 16,
      },
      createdAt: "2025-05-01",
    },
    {
      id: "2",
      name: "Mobile App Development",
      description: "Create a mobile app version of our platform for iOS and Android",
      status: "active",
      progress: 40,
      members: [
        { name: "Sarah Lee", avatar: "https://ui-avatars.com/api/?name=Sarah+Lee&background=14b8a6&color=fff" },
        { name: "Alex Chen", avatar: "https://ui-avatars.com/api/?name=Alex+Chen&background=f59e0b&color=fff" },
      ],
      tasks: {
        total: 18,
        completed: 7,
      },
      createdAt: "2025-05-05",
    },
    {
      id: "3",
      name: "Marketing Campaign",
      description: "Q2 marketing campaign for product launch",
      status: "on-hold",
      progress: 30,
      members: [
        { name: "Emma Wilson", avatar: "https://ui-avatars.com/api/?name=Emma+Wilson&background=ec4899&color=fff" },
        { name: "David Miller", avatar: "https://ui-avatars.com/api/?name=David+Miller&background=6366f1&color=fff" },
      ],
      tasks: {
        total: 12,
        completed: 4,
      },
      createdAt: "2025-04-15",
    },
    {
      id: "4",
      name: "CRM Integration",
      description: "Integrate our platform with the new CRM system",
      status: "completed",
      progress: 100,
      members: [
        { name: "John Doe", avatar: "https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff" },
        { name: "Alex Chen", avatar: "https://ui-avatars.com/api/?name=Alex+Chen&background=f59e0b&color=fff" },
      ],
      tasks: {
        total: 15,
        completed: 15,
      },
      createdAt: "2025-04-01",
    },
  ]);

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
  });
  const [open, setOpen] = useState(false);

  const handleCreateProject = () => {
    if (!newProject.name.trim()) {
      toast.error("Project name is required");
      return;
    }

    const project: Project = {
      id: `${projects.length + 1}`,
      name: newProject.name,
      description: newProject.description,
      status: "active",
      progress: 0,
      members: [],
      tasks: {
        total: 0,
        completed: 0,
      },
      createdAt: new Date().toISOString().split("T")[0],
    };

    setProjects([project, ...projects]);
    setNewProject({ name: "", description: "" });
    setOpen(false);
    toast.success("Project created successfully!");
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "on-hold":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Create Project</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new project.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter project name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Enter project description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateProject}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="on-hold">On Hold</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusClass(project.status)}`}>
                        {project.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </div>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div
                            className="bg-primary h-1.5 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-2">Team</div>
                        <div className="flex -space-x-2">
                          {project.members.map((member, idx) => (
                            <Avatar key={idx} className="h-7 w-7 border-2 border-background">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-1 flex justify-between text-xs text-muted-foreground">
                    <span>Tasks: {project.tasks.completed}/{project.tasks.total}</span>
                    <span>Created: {project.createdAt}</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects
                .filter((project) => project.status === "active")
                .map((project) => (
                  <Card key={project.id}>
                    {/* Same card content as above */}
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusClass(project.status)}`}>
                          {project.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </div>
                      <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div
                              className="bg-primary h-1.5 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-2">Team</div>
                          <div className="flex -space-x-2">
                            {project.members.map((member, idx) => (
                              <Avatar key={idx} className="h-7 w-7 border-2 border-background">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-1 flex justify-between text-xs text-muted-foreground">
                      <span>Tasks: {project.tasks.completed}/{project.tasks.total}</span>
                      <span>Created: {project.createdAt}</span>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects
                .filter((project) => project.status === "completed")
                .map((project) => (
                  <Card key={project.id}>
                    {/* Same card content as above */}
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusClass(project.status)}`}>
                          {project.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </div>
                      <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div
                              className="bg-primary h-1.5 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-2">Team</div>
                          <div className="flex -space-x-2">
                            {project.members.map((member, idx) => (
                              <Avatar key={idx} className="h-7 w-7 border-2 border-background">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-1 flex justify-between text-xs text-muted-foreground">
                      <span>Tasks: {project.tasks.completed}/{project.tasks.total}</span>
                      <span>Created: {project.createdAt}</span>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="on-hold" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects
                .filter((project) => project.status === "on-hold")
                .map((project) => (
                  <Card key={project.id}>
                    {/* Same card content as above */}
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusClass(project.status)}`}>
                          {project.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </div>
                      <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div
                              className="bg-primary h-1.5 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-2">Team</div>
                          <div className="flex -space-x-2">
                            {project.members.map((member, idx) => (
                              <Avatar key={idx} className="h-7 w-7 border-2 border-background">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-1 flex justify-between text-xs text-muted-foreground">
                      <span>Tasks: {project.tasks.completed}/{project.tasks.total}</span>
                      <span>Created: {project.createdAt}</span>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
