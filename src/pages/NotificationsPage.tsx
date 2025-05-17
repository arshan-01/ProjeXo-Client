
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, User, Calendar, Bell, Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import NotificationPreferences from "@/components/settings/NotificationPreferences";

interface Notification {
  id: string;
  type: "mention" | "reminder" | "assignment" | "message" | "system";
  content: string;
  time: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState<Notification[]>([
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
    },
    {
      id: "5",
      type: "system",
      content: "System maintenance scheduled for this weekend",
      time: "1 day ago",
      read: true
    },
    {
      id: "6",
      type: "mention",
      content: "Alex Chen mentioned you in the 'Project Roadmap' document",
      time: "1 day ago",
      read: false
    },
    {
      id: "7",
      type: "assignment",
      content: "David Thompson assigned you to review the PR: 'Feature/user-profile'",
      time: "2 days ago",
      read: true
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case "mention":
        return <User className="h-5 w-5 text-blue-500" />;
      case "reminder":
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case "assignment":
        return <Bell className="h-5 w-5 text-red-500" />;
      case "message":
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    return notification.type === activeTab;
  });

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    toast.success("Notification marked as read");
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast.success("All notifications marked as read");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Notifications</h1>
            <p className="text-sm text-muted-foreground">Stay updated with your team's activity</p>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                <CheckCheck className="mr-2 h-4 w-4" /> Mark all as read
              </Button>
            )}
            <Button variant="outline" onClick={() => setActiveTab("preferences")}>
              Settings
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 mb-4">
            <TabsTrigger value="all" className="relative">
              All
              {unreadCount > 0 && (
                <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="mention">Mentions</TabsTrigger>
            <TabsTrigger value="assignment">Assignments</TabsTrigger>
            <TabsTrigger value="message">Messages</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          {/* Notification lists */}
          {['all', 'unread', 'mention', 'assignment', 'message', 'reminder'].includes(activeTab) && (
            <TabsContent value={activeTab} className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No notifications to display
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 rounded-md border flex items-start gap-4",
                      !notification.read ? "bg-primary/5 border-primary/20" : ""
                    )}
                  >
                    <span className="mt-0.5">{getIcon(notification.type)}</span>
                    <div className="flex-1">
                      <div className="space-y-1">
                        <p className={cn("text-sm", !notification.read ? "font-medium" : "")}>
                          {notification.content}
                        </p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                    {!notification.read && (
                      <Button size="sm" variant="ghost" onClick={() => markAsRead(notification.id)}>
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Mark as read</span>
                      </Button>
                    )}
                  </div>
                ))
              )}
            </TabsContent>
          )}

          {/* Preferences tab */}
          <TabsContent value="preferences">
            <NotificationPreferences />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
