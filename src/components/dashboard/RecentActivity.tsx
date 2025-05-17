
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  target: string;
  time: string;
}

export function RecentActivity() {
  const activities: Activity[] = [
    {
      id: "1",
      user: {
        name: "John Doe",
        avatar: "https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff",
      },
      action: "created a new task",
      target: "Homepage redesign",
      time: "2 minutes ago",
    },
    {
      id: "2",
      user: {
        name: "Jane Smith",
        avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=a855f7&color=fff",
      },
      action: "completed",
      target: "API integration",
      time: "10 minutes ago",
    },
    {
      id: "3",
      user: {
        name: "Mike Johnson",
        avatar: "https://ui-avatars.com/api/?name=Mike+Johnson&background=ec4899&color=fff",
      },
      action: "commented on",
      target: "User authentication flow",
      time: "25 minutes ago",
    },
    {
      id: "4",
      user: {
        name: "Sarah Lee",
        avatar: "https://ui-avatars.com/api/?name=Sarah+Lee&background=14b8a6&color=fff",
      },
      action: "assigned to sprint",
      target: "Mobile responsive updates",
      time: "1 hour ago",
    },
    {
      id: "5",
      user: {
        name: "Alex Chen",
        avatar: "https://ui-avatars.com/api/?name=Alex+Chen&background=f59e0b&color=fff",
      },
      action: "updated status of",
      target: "Payment gateway integration",
      time: "2 hours ago",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest actions from your team members
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
              <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                <span className="font-semibold">{activity.user.name}</span>{" "}
                {activity.action}{" "}
                <span className="font-semibold">"{activity.target}"</span>
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default RecentActivity;
