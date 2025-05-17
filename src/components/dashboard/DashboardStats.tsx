
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function DashboardStats() {
  const stats = [
    { 
      title: "Active Projects", 
      value: 12, 
      description: "3 added this month", 
      progress: 65 
    },
    { 
      title: "Completed Tasks", 
      value: 243, 
      description: "24 completed this week", 
      progress: 80 
    },
    { 
      title: "Team Members", 
      value: 8, 
      description: "Active collaborators", 
      progress: 100 
    },
    { 
      title: "Sprint Progress", 
      value: "75%", 
      description: "Current sprint ends in 5 days", 
      progress: 75 
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              {stat.value}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground mb-1">
              {stat.description}
            </div>
            <Progress value={stat.progress} className="h-1" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default DashboardStats;
