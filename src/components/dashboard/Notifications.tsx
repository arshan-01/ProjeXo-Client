
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, User, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "mention" | "reminder" | "assignment" | "message";
  content: string;
  time: string;
  read: boolean;
}

export function Notifications() {
  const notifications: Notification[] = [
    {
      id: "1",
      type: "mention",
      content: "Jane Smith mentioned you in a comment on 'API Documentation'",
      time: "10 minutes ago",
      read: false
    },
    {
      id: "2",
      type: "reminder",
      content: "Sprint planning meeting in 30 minutes",
      time: "25 minutes ago",
      read: false
    },
    {
      id: "3",
      type: "assignment",
      content: "You've been assigned to 'Fix navigation bar on mobile' task",
      time: "2 hours ago",
      read: true
    },
    {
      id: "4",
      type: "message",
      content: "New message from Mike Johnson about the design review",
      time: "5 hours ago",
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "mention":
        return <User className="h-4 w-4 text-blue-500" />;
      case "reminder":
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case "assignment":
        return <Bell className="h-4 w-4 text-red-500" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Notifications</span>
          <span className="text-xs bg-primary text-white rounded-full px-2 py-0.5">
            {notifications.filter(n => !n.read).length} new
          </span>
        </CardTitle>
        <CardDescription>
          Recent notifications and alerts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={cn(
              "p-3 rounded-md border flex items-start gap-3",
              !notification.read ? "bg-primary/5 border-primary/20" : ""
            )}
          >
            <span className="mt-0.5">{getIcon(notification.type)}</span>
            <div className="space-y-1">
              <p className={cn("text-sm", !notification.read ? "font-medium" : "")}>
                {notification.content}
              </p>
              <p className="text-xs text-muted-foreground">{notification.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default Notifications;
