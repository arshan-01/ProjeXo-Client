"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MoreHorizontal, Plus, Search, UsersIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import TaskComments from "@/components/tasks/TaskComments"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Types for our data
interface User {
  id: string
  name: string
  avatar: string
}

interface Comment {
  id: string
  taskId: string
  userId: string
  user: User
  content: string
  createdAt: string
  mentions: string[]
}

interface Task {
  id: string
  title: string
  description: string
  status: string
  priority: string
  dueDate: string
  assignee: User
  tags: string[]
  project: string
  comments: Comment[]
}

type TaskAssignee = {
  id: string
  name: string
  avatar: string
}

type TaskType = {
  id: string
  title: string
  description: string
  status: string
  priority: string
  dueDate: string
  assignees: TaskAssignee[] // Changed from assignee to assignees (array)
  tags: string[]
  project: string
}

// Sample data for users
const users = [
  {
    id: "user-1",
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&h=128&auto=format&fit=crop",
  },
  {
    id: "user-2",
    name: "Sam Wilson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&auto=format&fit=crop",
  },
  {
    id: "user-3",
    name: "Emma Davis",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&auto=format&fit=crop",
  },
  { id: "user-4", name: "Michael Brown", avatar: "" },
  {
    id: "user-5",
    name: "Olivia Garcia",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&auto=format&fit=crop",
  },
]

const initialTasks: TaskType[] = [
  {
    id: "task-1",
    title: "Design new dashboard wireframes",
    description: "Create wireframes for the new analytics dashboard",
    status: "todo",
    priority: "high",
    dueDate: "2025-05-25",
    assignees: [users[0]],
    tags: ["design", "ui/ux"],
    project: "Website Redesign",
  },
  {
    id: "task-2",
    title: "Implement user authentication",
    description: "Add JWT authentication to the backend API",
    status: "in-progress",
    priority: "high",
    dueDate: "2025-05-20",
    assignees: [users[1], users[4]],
    tags: ["backend", "security"],
    project: "Mobile App Development",
  },
  {
    id: "task-3",
    title: "Create component documentation",
    description: "Document all reusable UI components",
    status: "in-progress",
    priority: "medium",
    dueDate: "2025-05-22",
    assignees: [users[2]],
    tags: ["documentation", "ui"],
    project: "Website Redesign",
  },
  {
    id: "task-4",
    title: "Write API integration tests",
    description: "Create comprehensive tests for all API endpoints",
    status: "todo",
    priority: "medium",
    dueDate: "2025-05-27",
    assignees: [users[1], users[3]],
    tags: ["testing", "backend"],
    project: "Mobile App Development",
  },
  {
    id: "task-5",
    title: "Fix responsive layout issues",
    description: "Address responsive design issues on mobile devices",
    status: "completed",
    priority: "high",
    dueDate: "2025-05-15",
    assignees: [users[0], users[2], users[4]],
    tags: ["bug", "frontend"],
    project: "Website Redesign",
  },
  {
    id: "task-6",
    title: "Optimize database queries",
    description: "Improve performance of slow database queries",
    status: "completed",
    priority: "high",
    dueDate: "2025-05-12",
    assignees: [users[3]],
    tags: ["performance", "database"],
    project: "Mobile App Development",
  },
]

// Sample data for task comments
const sampleComments = [
  {
    id: "comment-1",
    taskId: "task-1",
    userId: "user-2",
    user: users[1],
    content: "I think we should add more details to the wireframes. @AlexJohnson what do you think?",
    createdAt: "2025-05-15T14:30:00Z",
    mentions: ["AlexJohnson"],
  },
  {
    id: "comment-2",
    taskId: "task-1",
    userId: "user-1",
    user: users[0],
    content: "I agree @SamWilson. Let's discuss this in our next meeting.",
    createdAt: "2025-05-15T15:45:00Z",
    mentions: ["SamWilson"],
  },
  {
    id: "comment-3",
    taskId: "task-2",
    userId: "user-3",
    user: users[2],
    content: "I can help with the authentication implementation if needed.",
    createdAt: "2025-05-16T09:15:00Z",
    mentions: [],
  },
]

// Status and priority options
const statusOptions = [
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
]

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
]

const statusColors: Record<string, string> = {
  todo: "bg-gray-100 text-gray-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
}

const priorityColors: Record<string, string> = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
}

// Projects data
const projects = ["Website Redesign", "Mobile App Development"]

// Helper function to get user initials
const getInitials = (name: string) => {
  if (!name) return "?"
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
}

export default function TasksPage() {
  const [view, setView] = useState<"list" | "board">("list")
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [tasks, setTasks] = useState<any[]>(initialTasks)
  const [activeTaskTab, setActiveTaskTab] = useState("details")

  // Dialog states
  const [taskDialog, setTaskDialog] = useState({ open: false, mode: "view", taskId: "" })
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState({ open: false, taskId: "" })

  // New/Edit task state
  const [editTask, setEditTask] = useState<{
    id: string
    title: string
    description: string
    status: string
    priority: string
    dueDate: string
    assigneeId: string | string[]
    tags: string
    project: string
  }>({
    id: "",
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
    assigneeId: "",
    tags: "",
    project: "",
  })

  // Filter tasks based on filter and search query
  const filteredTasks = tasks.filter((task) => {
    if (filter !== "all" && task.status !== filter) return false
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Invalid Date"
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return "Invalid Date"
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date)
  }

  // Open task dialog
  const openTaskDialog = (mode: "create" | "edit" | "view", taskId = "") => {
    if (mode === "create") {
      setEditTask({
        id: `task-${tasks.length + 1}`,
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        dueDate: new Date().toISOString().split("T")[0],
        assigneeId: [], // Changed from "" to []
        tags: "",
        project: projects[0],
      })
      setActiveTaskTab("details")
    } else {
      const task = tasks.find((t) => t.id === taskId)
      if (task) {
        setEditTask({
          id: task.id,
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate,
          assigneeId: task.assignees.map((a) => a.id), // Changed to map assignees to an array of IDs
          tags: task.tags.join(", "),
          project: task.project,
        })
      }
    }

    setTaskDialog({ open: true, mode, taskId })
  }

  // Save task
  const saveTask = () => {
    if (!editTask.title.trim()) {
      toast.error("Task title is required")
      return
    }

    // Get all selected assignees
    const assignees = Array.isArray(editTask.assigneeId)
      ? editTask.assigneeId.map((id) => users.find((u) => u.id === id)).filter(Boolean)
      : editTask.assigneeId
        ? [users.find((u) => u.id === editTask.assigneeId)].filter(Boolean)
        : []

    const updatedTask = {
      id: editTask.id,
      title: editTask.title,
      description: editTask.description,
      status: editTask.status,
      priority: editTask.priority,
      dueDate: editTask.dueDate,
      assignees: assignees, // Use the array of assignee objects
      tags: editTask.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      project: editTask.project,
      comments: [] as Comment[],
    }

    if (taskDialog.mode === "create") {
      setTasks([...tasks, updatedTask])
      toast.success("Task created successfully")
    } else {
      // Preserve existing comments when updating a task
      const existingTask = tasks.find((t) => t.id === editTask.id)
      if (existingTask) {
        updatedTask.comments = existingTask.comments
      }

      setTasks(tasks.map((task) => (task.id === editTask.id ? updatedTask : task)))
      toast.success("Task updated successfully")
    }

    setTaskDialog({ open: false, mode: "view", taskId: "" })
  }

  // Delete task
  const deleteTask = () => {
    setTasks(tasks.filter((task) => task.id !== deleteConfirmDialog.taskId))
    setDeleteConfirmDialog({ open: false, taskId: "" })
    toast.success("Task deleted successfully")
  }

  // Find current task for comments
  const currentTask = tasks.find((task) => task.id === taskDialog.taskId)

  // Save comment to task
  const updateTaskComments = (taskId: string, comments: Comment[]) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, comments } : task)))
  }

  // --- Inline Editing Handlers ---
  const handleAssigneeToggle = (taskId: string, assigneeIdToToggle: string) => {
    const taskToUpdate = tasks.find((t) => t.id === taskId)
    if (!taskToUpdate) return

    const isAlreadyAssigned = taskToUpdate.assignees.some((a) => a.id === assigneeIdToToggle)
    let newAssignees: TaskAssignee[]

    if (isAlreadyAssigned) {
      newAssignees = taskToUpdate.assignees.filter((a) => a.id !== assigneeIdToToggle)
    } else {
      const assigneeToAdd = users.find((u) => u.id === assigneeIdToToggle)
      if (assigneeToAdd) {
        newAssignees = [...taskToUpdate.assignees, assigneeToAdd]
      } else {
        return // Assignee not found, should not happen
      }
    }

    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, assignees: newAssignees } : task)))
    const userToggled = users.find((u) => u.id === assigneeIdToToggle)?.name || "User"
    toast.success(
      `${userToggled} ${isAlreadyAssigned ? "unassigned from" : "assigned to"} task "${taskToUpdate.title}"`,
    )
  }

  // Component to render stacked avatars
  const StackedAvatars = ({ assignees, maxShow = 3 }: { assignees: TaskAssignee[]; maxShow?: number }) => (
    <div className="flex -space-x-2">
      {assignees?.slice(0, maxShow).map((assignee) => (
        <Avatar key={assignee.id} className="h-8 w-8 border-2 border-background">
          <AvatarImage src={assignee.avatar || "/placeholder.svg"} alt={assignee.name} />
          <AvatarFallback>{getInitials(assignee.name)}</AvatarFallback>
        </Avatar>
      ))}
      {assignees?.length > maxShow && (
        <Avatar className="h-8 w-8 border-2 border-background bg-muted text-muted-foreground">
          <AvatarFallback>+{assignees.length - maxShow}</AvatarFallback>
        </Avatar>
      )}
      {assignees?.length === 0 && (
        <Avatar className="h-8 w-8 border-2 border-background bg-muted text-muted-foreground">
          <AvatarFallback>
            <UsersIcon className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )

  // Handle status change in dropdowns
  const handleStatusChange = (taskId: string, newStatus: string) => {
    const taskToUpdate = tasks.find((t) => t.id === taskId)
    if (!taskToUpdate) return

    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))

    const statusLabel = statusOptions.find((s) => s.value === newStatus)?.label || newStatus
    toast.success(`Status changed to ${statusLabel} for task "${taskToUpdate.title}"`)
  }

  // Handle priority change in dropdowns
  const handlePriorityChange = (taskId: string, newPriority: string) => {
    const taskToUpdate = tasks.find((t) => t.id === taskId)
    if (!taskToUpdate) return

    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, priority: newPriority } : task)))

    const priorityLabel = priorityOptions.find((p) => p.value === newPriority)?.label || newPriority
    toast.success(`Priority changed to ${priorityLabel} for task "${taskToUpdate.title}"`)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Tasks</h1>
            <p className="text-sm text-muted-foreground">Manage and track your team's tasks</p>
          </div>
          <Button onClick={() => openTaskDialog("create")}>
            <Plus className="mr-2 h-4 w-4" /> Create New Task
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex rounded-md border">
            <Button
              variant={view === "list" ? "default" : "ghost"}
              className="rounded-none rounded-l-md"
              onClick={() => setView("list")}
            >
              List
            </Button>
            <Button
              variant={view === "board" ? "default" : "ghost"}
              className="rounded-none rounded-r-md"
              onClick={() => setView("board")}
            >
              Board
            </Button>
          </div>
        </div>

        {/* List View */}
        {view === "list" && (
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-2 p-4 font-medium text-sm bg-muted">
              <div className="col-span-3">Task</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Priority</div>
              <div className="col-span-2">Assignees</div>
              <div className="col-span-2">Due Date</div>
              <div className="col-span-1">Actions</div>
            </div>
            {filteredTasks.map((task) => (
              <div key={task.id} className="grid grid-cols-12 gap-2 p-4 border-t items-center">
                <div className="col-span-3">
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-muted-foreground">{task.project}</div>
                  {task.comments && task.comments.length > 0 && (
                    <div className="mt-1 text-xs text-blue-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {task.comments.length} comment{task.comments.length > 1 ? "s" : ""}
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 px-2 -ml-2">
                        <Badge variant="secondary" className={statusColors[task.status]}>
                          {task.status.replace("-", " ")}
                        </Badge>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                      {statusOptions.map((option) => (
                        <DropdownMenuCheckboxItem
                          key={option.value}
                          checked={task.status === option.value}
                          onCheckedChange={() => handleStatusChange(task.id, option.value)}
                        >
                          {option.label}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="col-span-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 px-2 -ml-2">
                        <Badge variant="secondary" className={priorityColors[task.priority]}>
                          {task.priority}
                        </Badge>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuLabel>Change Priority</DropdownMenuLabel>
                      {priorityOptions.map((option) => (
                        <DropdownMenuCheckboxItem
                          key={option.value}
                          checked={task.priority === option.value}
                          onCheckedChange={() => handlePriorityChange(task.id, option.value)}
                        >
                          {option.label}
                        </DropdownMenuCheckboxItem>
                      ))}
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
                      {users?.map((user) => (
                        <DropdownMenuCheckboxItem
                          key={user.id}
                          checked={task.assignees?.some((a) => a.id === user.id)}
                          onCheckedChange={() => handleAssigneeToggle(task.id, user.id)}
                        >
                          <Avatar className="h-5 w-5 mr-2">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          {user.name}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="col-span-2 flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formatDate(task.dueDate)}</span>
                </div>
                <div className="col-span-1 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openTaskDialog("view", task.id)}>View details</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openTaskDialog("edit", task.id)}>Edit task</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeleteConfirmDialog({ open: true, taskId: task.id })}
                      >
                        Delete task
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
            {filteredTasks.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">No tasks found matching your criteria.</div>
            )}
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
                  <Card key={task.id} className="min-h-[250px] max-h-[400px] overflow-y-auto">
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
              <DialogTitle>
                {taskDialog.mode === "create"
                  ? "Create New Task"
                  : taskDialog.mode === "edit"
                    ? "Edit Task"
                    : "Task Details"}
              </DialogTitle>
              <DialogDescription>
                {taskDialog.mode === "create"
                  ? "Add a new task to your project"
                  : taskDialog.mode === "edit"
                    ? "Edit the task details"
                    : "View task details"}
              </DialogDescription>
            </DialogHeader>

            {taskDialog.mode === "view" && (
              <Tabs value={activeTaskTab} onValueChange={setActiveTaskTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 pt-4">
                  <div>
                    <h3 className="text-lg font-medium">{editTask.title}</h3>
                    <p className="text-sm text-muted-foreground">{editTask.project}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <Badge className={statusColors[editTask.status]}>{editTask.status.replace("-", " ")}</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Priority</p>
                      <Badge className={priorityColors[editTask.priority]}>{editTask.priority}</Badge>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Description</p>
                    <p className="text-sm">{editTask.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Due Date</p>
                      <p className="text-sm">{formatDate(editTask.dueDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Assignee</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={users.find((u) => u.id === editTask.assigneeId)?.avatar || "/placeholder.svg"}
                            alt={users.find((u) => u.id === editTask.assigneeId)?.name || ""}
                          />
                          <AvatarFallback>
                            {getInitials(users.find((u) => u.id === editTask.assigneeId)?.name || "")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          {users.find((u) => u.id === editTask.assigneeId)?.name || "Unassigned"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Tags</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {editTask.tags
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter((tag) => tag)
                        .map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="comments" className="pt-4">
                  {currentTask && (
                    <TaskComments taskId={currentTask.id} users={users} initialComments={currentTask.comments} />
                  )}
                </TabsContent>
              </Tabs>
            )}

            {(taskDialog.mode === "create" || taskDialog.mode === "edit") && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editTask.title}
                    onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                    placeholder="Task title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editTask.description}
                    onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                    placeholder="Task description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={editTask.status}
                      onValueChange={(value) => setEditTask({ ...editTask, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={editTask.priority}
                      onValueChange={(value) => setEditTask({ ...editTask, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={editTask.dueDate}
                      onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assignees">Assignees</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          {Array.isArray(editTask.assigneeId)
                            ? editTask.assigneeId.filter((id) => id).length > 0
                              ? `${editTask.assigneeId.filter((id) => id).length} user(s) selected`
                              : "Select assignees"
                            : editTask.assigneeId
                              ? "1 user selected"
                              : "Select assignees"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full sm:w-[calc(theme( muchísimo.sm.max-w-[600px])/2-theme(spacing.8))]">
                        {" "}
                        {/* Adjust width */}
                        <DropdownMenuLabel>Assign Users</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {users.map((user) => (
                          <DropdownMenuCheckboxItem
                            key={user.id}
                            checked={editTask.assigneeId.includes(user.id)}
                            onCheckedChange={(checked) => {
                              setEditTask((prev) => ({
                                ...prev,
                                assigneeId: checked
                                  ? [
                                    ...(Array.isArray(prev.assigneeId) ? prev.assigneeId : [prev.assigneeId]).filter(
                                      (id) => id,
                                    ),
                                    user.id,
                                  ]
                                  : (Array.isArray(prev.assigneeId) ? prev.assigneeId : [prev.assigneeId]).filter(
                                    (id) => id && id !== user.id,
                                  ),
                              }))
                            }}
                          >
                            <Avatar className="h-5 w-5 mr-2">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            {user.name}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      value={editTask.tags}
                      onChange={(e) => setEditTask({ ...editTask, tags: e.target.value })}
                      placeholder="Comma separated tags"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project">Project</Label>
                    <Select
                      value={editTask.project}
                      onValueChange={(value) => setEditTask({ ...editTask, project: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map((project) => (
                          <SelectItem key={project} value={project}>
                            {project}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setTaskDialog({ open: false, mode: "view", taskId: "" })}>
                {taskDialog.mode === "view" ? "Close" : "Cancel"}
              </Button>
              {taskDialog.mode === "view" ? (
                <Button onClick={() => setTaskDialog({ open: true, mode: "edit", taskId: taskDialog.taskId })}>
                  Edit Task
                </Button>
              ) : (
                <Button onClick={saveTask}>{taskDialog.mode === "create" ? "Create Task" : "Save Changes"}</Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteConfirmDialog.open}
          onOpenChange={(open) => setDeleteConfirmDialog({ ...deleteConfirmDialog, open })}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this task? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteConfirmDialog({ open: false, taskId: "" })}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={deleteTask}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
