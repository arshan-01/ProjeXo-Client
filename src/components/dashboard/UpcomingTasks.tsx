
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: "todo" | "in-progress" | "review" | "done";
  priority: "low" | "medium" | "high";
  assignee: {
    name: string;
    avatar: string;
  };
}

export function UpcomingTasks() {
  const tasks: Task[] = [
    {
      id: "1",
      title: "Implement user authentication",
      dueDate: "Today",
      status: "in-progress",
      priority: "high",
      assignee: {
        name: "John Doe",
        avatar: "https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff",
      },
    },
    {
      id: "2",
      title: "Create dashboard wireframes",
      dueDate: "Tomorrow",
      status: "todo",
      priority: "medium",
      assignee: {
        name: "Jane Smith",
        avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=a855f7&color=fff",
      },
    },
    {
      id: "3",
      title: "API documentation review",
      dueDate: "May 23",
      status: "review",
      priority: "low",
      assignee: {
        name: "Mike Johnson",
        avatar: "https://ui-avatars.com/api/?name=Mike+Johnson&background=ec4899&color=fff",
      },
    },
    {
      id: "4",
      title: "Fix mobile navigation issues",
      dueDate: "May 24",
      status: "todo",
      priority: "high",
      assignee: {
        name: "Sarah Lee",
        avatar: "https://ui-avatars.com/api/?name=Sarah+Lee&background=14b8a6&color=fff",
      },
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "todo":
        return <Badge variant="outline" className="status-todo">To Do</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="status-in-progress">In Progress</Badge>;
      case "review":
        return <Badge variant="outline" className="status-review">Review</Badge>;
      case "done":
        return <Badge variant="outline" className="status-done">Done</Badge>;
      default:
        return null;
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "low":
        return "priority-low";
      case "medium":
        return "priority-medium";
      case "high":
        return "priority-high";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Tasks</CardTitle>
        <CardDescription>
          Tasks due soon for you and your team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 rounded-md border"
            >
              <div className="flex items-center gap-3 flex-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                  <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
                    <span className={cn("text-xs font-medium", getPriorityClass(task.priority))}>
                      • {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} priority
                    </span>
                  </div>
                </div>
              </div>
              <div>{getStatusBadge(task.status)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default UpcomingTasks;
