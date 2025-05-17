import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Check, Clock, MoreHorizontal, Plus, Search, Users as UsersIcon } from "lucide-react"; // Added UsersIcon
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem, // Added
  DropdownMenuLabel // Added
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Sample data for users
const users = [
  { id: "user-1", name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&h=128&auto=format&fit=crop" },
  { id: "user-2", name: "Sam Wilson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&auto=format&fit=crop" },
  { id: "user-3", name: "Emma Davis", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&auto=format&fit=crop" },
  { id: "user-4", name: "Michael Brown", avatar: "" },
  { id: "user-5", name: "Olivia Garcia", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&auto=format&fit=crop" }
];

type TaskAssignee = {
  id: string;
  name: string;
  avatar: string;
};

type TaskType = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  assignees: TaskAssignee[]; // Changed from assignee to assignees (array)
  tags: string[];
  project: string;
};

const initialTasks: TaskType[] = [
  { id: "task-1", title: "Design new dashboard wireframes", description: "Create wireframes for the new analytics dashboard", status: "todo", priority: "high", dueDate: "2025-05-25", assignees: [users[0]], tags: ["design", "ui/ux"], project: "Website Redesign" },
  { id: "task-2", title: "Implement user authentication", description: "Add JWT authentication to the backend API", status: "in-progress", priority: "high", dueDate: "2025-05-20", assignees: [users[1], users[4]], tags: ["backend", "security"], project: "Mobile App Development" },
  { id: "task-3", title: "Create component documentation", description: "Document all reusable UI components", status: "in-progress", priority: "medium", dueDate: "2025-05-22", assignees: [users[2]], tags: ["documentation", "ui"], project: "Website Redesign" },
  { id: "task-4", title: "Write API integration tests", description: "Create comprehensive tests for all API endpoints", status: "todo", priority: "medium", dueDate: "2025-05-27", assignees: [users[1], users[3]], tags: ["testing", "backend"], project: "Mobile App Development" },
  { id: "task-5", title: "Fix responsive layout issues", description: "Address responsive design issues on mobile devices", status: "completed", priority: "high", dueDate: "2025-05-15", assignees: [users[0], users[2], users[4]], tags: ["bug", "frontend"], project: "Website Redesign" },
  { id: "task-6", title: "Optimize database queries", description: "Improve performance of slow database queries", status: "completed", priority: "high", dueDate: "2025-05-12", assignees: [users[3]], tags: ["performance", "database"], project: "Mobile App Development" }
];

const statusColors: Record<string, string> = {
  "todo": "bg-gray-100 text-gray-800 hover:bg-gray-200",
  "in-progress": "bg-blue-100 text-blue-800 hover:bg-blue-200",
  "completed": "bg-green-100 text-green-800 hover:bg-green-200",
};
const priorityColors: Record<string, string> = {
  "low": "bg-gray-100 text-gray-800 hover:bg-gray-200",
  "medium": "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  "high": "bg-red-100 text-red-800 hover:bg-red-200",
};
const statusOptions = [ { value: "todo", label: "To Do" }, { value: "in-progress", label: "In Progress" }, { value: "completed", label: "Completed" }];
const priorityOptions = [ { value: "low", label: "Low" }, { value: "medium", label: "Medium" }, { value: "high", label: "High" }];
const projects = ["Website Redesign", "Mobile App Development"];

const getInitials = (name?: string): string => {
  if (!name) return "?";
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + (parts[parts.length - 1][0] || '')).toUpperCase();
};

export default function TasksPage() {
  const [view, setView] = useState<"list" | "board">("list");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState<TaskType[]>(initialTasks);
  const [taskDialog, setTaskDialog] = useState({ open: false, mode: "view", taskId: "" });
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState({ open: false, taskId: "" });

  const [editTask, setEditTask] = useState<{
    id: string; title: string; description: string; status: string; priority: string; dueDate: string;
    assigneeIds: string[]; // Changed from assigneeId to assigneeIds (array)
    tags: string; project: string;
  }>({ id: "", title: "", description: "", status: "todo", priority: "medium", dueDate: "", assigneeIds: [], tags: "", project: "" });

  const filteredTasks = tasks.filter(task => {
    if (filter !== "all" && task.status !== filter) return false;
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Invalid Date';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  };

  const openTaskDialog = (mode: "create" | "edit" | "view", taskId: string = "") => {
    if (mode === "create") {
      setEditTask({
        id: `task-${Date.now()}`, title: "", description: "", status: "todo", priority: "medium",
        dueDate: new Date().toISOString().split('T')[0],
        assigneeIds: users.length > 0 ? [users[0].id] : [], // Default to first user or empty
        tags: "", project: projects.length > 0 ? projects[0] : ""
      });
    } else {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        setEditTask({
          id: task.id, title: task.title, description: task.description, status: task.status,
          priority: task.priority, dueDate: task.dueDate,
          assigneeIds: task.assignees.map(a => a.id), // Map assignees to IDs
          tags: task.tags.join(", "), project: task.project
        });
      }
    }
    setTaskDialog({ open: true, mode, taskId });
  };

  const saveTask = () => {
    if (!editTask.title.trim()) {
      toast.error("Task title is required");
      return;
    }
    const selectedAssignees = users.filter(u => editTask.assigneeIds.includes(u.id));
    if (selectedAssignees.length === 0 && users.length > 0) { // Fallback if no one selected but users exist
        // Optionally, assign a default or leave empty based on requirements
        // For this example, we'll allow tasks with no assignees if explicitly chosen.
    }

    const updatedTaskData: TaskType = {
      id: editTask.id, title: editTask.title, description: editTask.description, status: editTask.status,
      priority: editTask.priority, dueDate: editTask.dueDate,
      assignees: selectedAssignees, // Use the array of assignee objects
      tags: editTask.tags.split(',').map(tag => tag.trim()).filter(tag => tag), project: editTask.project
    };

    if (taskDialog.mode === "create") {
      setTasks([...tasks, updatedTaskData]);
      toast.success("Task created successfully");
    } else {
      setTasks(tasks.map(task => task.id === editTask.id ? updatedTaskData : task));
      toast.success("Task updated successfully");
    }
    setTaskDialog({ open: false, mode: "view", taskId: "" });
  };

  const deleteTask = () => {
    setTasks(tasks.filter(task => task.id !== deleteConfirmDialog.taskId));
    setDeleteConfirmDialog({ open: false, taskId: "" });
    toast.success("Task deleted successfully");
  };

  // --- Inline Editing Handlers ---
  const handleAssigneeToggle = (taskId: string, assigneeIdToToggle: string) => {
    const taskToUpdate = tasks.find(t => t.id === taskId);
    if (!taskToUpdate) return;

    const isAlreadyAssigned = taskToUpdate.assignees.some(a => a.id === assigneeIdToToggle);
    let newAssignees: TaskAssignee[];

    if (isAlreadyAssigned) {
      newAssignees = taskToUpdate.assignees.filter(a => a.id !== assigneeIdToToggle);
    } else {
      const assigneeToAdd = users.find(u => u.id === assigneeIdToToggle);
      if (assigneeToAdd) {
        newAssignees = [...taskToUpdate.assignees, assigneeToAdd];
      } else {
        return; // Assignee not found, should not happen
      }
    }
    
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, assignees: newAssignees } : task
      )
    );
    const userToggled = users.find(u=>u.id === assigneeIdToToggle)?.name || "User";
    toast.success(`${userToggled} ${isAlreadyAssigned ? 'unassigned from' : 'assigned to'} task "${taskToUpdate.title}"`);
  };

  const handleStatusChange = (taskId: string, newStatus: string) => {
    const taskToUpdate = tasks.find(t => t.id === taskId);
    if (!taskToUpdate) return;
    setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
    toast.success(`Status changed to ${statusOptions.find(s => s.value === newStatus)?.label} for task "${taskToUpdate.title}"`);
  };

  const handlePriorityChange = (taskId: string, newPriority: string) => {
    const taskToUpdate = tasks.find(t => t.id === taskId);
    if (!taskToUpdate) return;
    setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? { ...task, priority: newPriority } : task));
    toast.success(`Priority changed to ${priorityOptions.find(p => p.value === newPriority)?.label} for task "${taskToUpdate.title}"`);
  };

  // Component to render stacked avatars
  const StackedAvatars = ({ assignees, maxShow = 3 }: { assignees: TaskAssignee[], maxShow?: number }) => (
    <div className="flex -space-x-2">
      {assignees.slice(0, maxShow).map((assignee) => (
        <Avatar key={assignee.id} className="h-8 w-8 border-2 border-background">
          <AvatarImage src={assignee.avatar} alt={assignee.name} />
          <AvatarFallback>{getInitials(assignee.name)}</AvatarFallback>
        </Avatar>
      ))}
      {assignees.length > maxShow && (
        <Avatar className="h-8 w-8 border-2 border-background bg-muted text-muted-foreground">
          <AvatarFallback>+{assignees.length - maxShow}</AvatarFallback>
        </Avatar>
      )}
      {assignees.length === 0 && (
         <Avatar className="h-8 w-8 border-2 border-background bg-muted text-muted-foreground">
          <AvatarFallback><UsersIcon className="h-4 w-4"/></AvatarFallback>
        </Avatar>
      )}
    </div>
  );


  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Tasks</h1>
            <p className="text-sm text-muted-foreground">Manage and track your team's tasks</p>
          </div>
          <Button onClick={() => openTaskDialog("create")}><Plus className="mr-2 h-4 w-4" /> Create New Task</Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search tasks..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              {statusOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="flex rounded-md border">
            <Button variant={view === "list" ? "default" : "ghost"} className="rounded-none rounded-l-md" onClick={() => setView("list")}>List</Button>
            <Button variant={view === "board" ? "default" : "ghost"} className="rounded-none rounded-r-md" onClick={() => setView("board")}>Board</Button>
          </div>
        </div>

        {/* List View */}
        {view === "list" && (
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-2 p-4 font-medium text-sm bg-muted">
              <div className="col-span-4">Task</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Priority</div>
              <div className="col-span-2">Assignees</div> {/* Pluralized */}
              <div className="col-span-2">Due Date</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
            {filteredTasks.map((task) => (
              <div key={task.id} className="grid grid-cols-12 gap-2 p-4 border-t items-center">
                <div className="col-span-4"><div className="font-medium">{task.title}</div><div className="text-sm text-muted-foreground">{task.project}</div></div>
                <div className="col-span-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Badge variant="secondary" className={`${statusColors[task.status]} capitalize cursor-pointer`}>{statusOptions.find(s => s.value === task.status)?.label || task.status}</Badge></DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {statusOptions.map(opt => <DropdownMenuItem key={opt.value} onClick={() => handleStatusChange(task.id, opt.value)} className="flex items-center justify-between">{opt.label}{task.status === opt.value && <Check className="ml-2 h-4 w-4" />}</DropdownMenuItem>)}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="col-span-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Badge variant="secondary" className={`${priorityColors[task.priority]} capitalize cursor-pointer`}>{priorityOptions.find(p => p.value === task.priority)?.label || task.priority}</Badge></DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {priorityOptions.map(opt => <DropdownMenuItem key={opt.value} onClick={() => handlePriorityChange(task.id, opt.value)} className="flex items-center justify-between">{opt.label}{task.priority === opt.value && <Check className="ml-2 h-4 w-4" />}</DropdownMenuItem>)}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="col-span-2 flex items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full">
                        <StackedAvatars assignees={task.assignees} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      <DropdownMenuLabel>Assign Users</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {users.map(user => (
                        <DropdownMenuCheckboxItem
                          key={user.id}
                          checked={task.assignees.some(a => a.id === user.id)}
                          onCheckedChange={() => handleAssigneeToggle(task.id, user.id)}
                        >
                          <Avatar className="h-5 w-5 mr-2">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          {user.name}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="col-span-2 flex items-center"><Calendar className="mr-2 h-4 w-4 text-muted-foreground" /><span className="text-sm">{formatDate(task.dueDate)}</span></div>
                <div className="col-span-1 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /><span className="sr-only">Actions</span></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openTaskDialog("view", task.id)}>View details</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openTaskDialog("edit", task.id)}>Edit task</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => setDeleteConfirmDialog({ open: true, taskId: task.id })}>Delete task</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
            {filteredTasks.length === 0 && (<div className="p-8 text-center text-muted-foreground">No tasks found.</div>)}
          </div>
        )}

        {/* Board View */}
        {view === "board" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["todo", "in-progress", "completed"].map(statusKey => (
              <div key={statusKey} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-muted-foreground">{statusOptions.find(s => s.value === statusKey)?.label || statusKey}</h3>
                  <Badge variant="outline">{filteredTasks.filter(t => t.status === statusKey).length}</Badge>
                </div>
                {filteredTasks.filter(task => task.status === statusKey).map(task => (
                  <Card key={task.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className={`${priorityColors[task.priority]} capitalize`}>{priorityOptions.find(p => p.value === task.priority)?.label || task.priority}</Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openTaskDialog("view", task.id)}>View</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openTaskDialog("edit", task.id)}>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => setDeleteConfirmDialog({ open: true, taskId: task.id })}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardTitle className="text-base">{task.title}</CardTitle>
                      <CardDescription className="text-sm line-clamp-2">{task.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2"><div className="flex flex-wrap gap-1 mb-2">{task.tags.map(tag => (<Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>))}</div></CardContent>
                    <CardFooter className="pt-0 flex items-center justify-between">
                      <div className="flex items-center text-xs text-muted-foreground"><Clock className="mr-1 h-3 w-3" />{formatDate(task.dueDate)}</div>
                      <div className="flex items-center"> <StackedAvatars assignees={task.assignees} maxShow={2} /> </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Task Dialog */}
        <Dialog open={taskDialog.open} onOpenChange={(open) => setTaskDialog({ ...taskDialog, open })}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{taskDialog.mode === "create" ? "Create Task" : taskDialog.mode === "edit" ? "Edit Task" : "Task Details"}</DialogTitle>
              <DialogDescription>{taskDialog.mode === "create" ? "Add a new task" : taskDialog.mode === "edit" ? "Edit details" : "View details"}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              {taskDialog.mode === "view" ? (
                <div className="space-y-4">
                  <div><h3 className="text-lg font-medium">{editTask.title}</h3><p className="text-sm text-muted-foreground">{editTask.project}</p></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-sm font-medium">Status</p><Badge className={`${statusColors[editTask.status]} capitalize`}>{statusOptions.find(s => s.value === editTask.status)?.label}</Badge></div>
                    <div><p className="text-sm font-medium">Priority</p><Badge className={`${priorityColors[editTask.priority]} capitalize`}>{priorityOptions.find(p => p.value === editTask.priority)?.label}</Badge></div>
                  </div>
                  <div><p className="text-sm font-medium">Description</p><p className="text-sm whitespace-pre-wrap">{editTask.description || "N/A"}</p></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-sm font-medium">Due Date</p><p className="text-sm">{formatDate(editTask.dueDate)}</p></div>
                    <div>
                      <p className="text-sm font-medium">Assignees</p>
                      {users.filter(u => editTask.assigneeIds.includes(u.id)).length > 0 ? (
                        users.filter(u => editTask.assigneeIds.includes(u.id)).map(assignee => (
                          <div key={assignee.id} className="flex items-center gap-2 mt-1">
                            <Avatar className="h-6 w-6"><AvatarImage src={assignee.avatar} /><AvatarFallback>{getInitials(assignee.name)}</AvatarFallback></Avatar>
                            <span className="text-sm">{assignee.name}</span>
                          </div>
                        ))
                      ) : <p className="text-sm text-muted-foreground">Unassigned</p>}
                    </div>
                  </div>
                  <div><p className="text-sm font-medium">Tags</p><div className="flex flex-wrap gap-1 mt-1">{editTask.tags.split(',').map(t=>t.trim()).filter(t=>t).map(tag=><Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>)}</div></div>
                </div>
              ) : ( /* Create/Edit Mode */
                <div className="space-y-4">
                  <div className="space-y-2"><Label htmlFor="title">Title</Label><Input id="title" value={editTask.title} onChange={e => setEditTask({...editTask, title: e.target.value})} /></div>
                  <div className="space-y-2"><Label htmlFor="description">Description</Label><Textarea id="description" value={editTask.description} onChange={e => setEditTask({...editTask, description: e.target.value})} rows={3}/></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label htmlFor="status">Status</Label><Select value={editTask.status} onValueChange={v => setEditTask({...editTask, status: v})}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{statusOptions.map(o=><SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent></Select></div>
                    <div className="space-y-2"><Label htmlFor="priority">Priority</Label><Select value={editTask.priority} onValueChange={v => setEditTask({...editTask, priority: v})}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{priorityOptions.map(o=><SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent></Select></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label htmlFor="dueDate">Due Date</Label><Input id="dueDate" type="date" value={editTask.dueDate} onChange={e => setEditTask({...editTask, dueDate: e.target.value})} /></div>
                    <div className="space-y-2">
                      <Label htmlFor="assignees">Assignees</Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            {editTask.assigneeIds.length > 0 ? `${editTask.assigneeIds.length} user(s) selected` : "Select assignees"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full sm:w-[calc(theme( muchísimo.sm.max-w-[600px])/2-theme(spacing.8))]"> {/* Adjust width */}
                          <DropdownMenuLabel>Assign Users</DropdownMenuLabel><DropdownMenuSeparator />
                          {users.map(user => (
                            <DropdownMenuCheckboxItem key={user.id} checked={editTask.assigneeIds.includes(user.id)}
                              onCheckedChange={checked => {
                                setEditTask(prev => ({...prev, assigneeIds: checked ? [...prev.assigneeIds, user.id] : prev.assigneeIds.filter(id => id !== user.id)}));
                              }}>
                              <Avatar className="h-5 w-5 mr-2"><AvatarImage src={user.avatar} /><AvatarFallback>{getInitials(user.name)}</AvatarFallback></Avatar>
                              {user.name}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label htmlFor="tags">Tags (comma-separated)</Label><Input id="tags" value={editTask.tags} onChange={e => setEditTask({...editTask, tags: e.target.value})} /></div>
                    <div className="space-y-2"><Label htmlFor="project">Project</Label><Select value={editTask.project} onValueChange={v => setEditTask({...editTask, project: v})}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{projects.map(p=><SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent></Select></div>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setTaskDialog({open:false, mode:"view", taskId:""})}>{taskDialog.mode === "view" ? "Close" : "Cancel"}</Button>
              {taskDialog.mode === "view" ? <Button onClick={() => setTaskDialog({open:true, mode:"edit", taskId:taskDialog.taskId})}>Edit</Button> : <Button onClick={saveTask}>{taskDialog.mode === "create" ? "Create" : "Save"}</Button>}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={deleteConfirmDialog.open} onOpenChange={open => setDeleteConfirmDialog({...deleteConfirmDialog, open})}>
          <DialogContent><DialogHeader><DialogTitle>Confirm Deletion</DialogTitle><DialogDescription>Delete this task permanently?</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={()=>setDeleteConfirmDialog({open:false,taskId:""})}>Cancel</Button><Button variant="destructive" onClick={deleteTask}>Delete</Button></DialogFooter></DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}