
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Clock, Plus, Tag } from "lucide-react";
import { toast } from "sonner";
import EventDialog, { EventData } from "@/components/calendar/EventDialog";

// Sample event data
const initialEvents = [
  {
    id: "event-1",
    title: "Team Sprint Planning",
    description: "Discuss next sprint goals and tasks",
    date: "2025-05-18",
    startTime: "10:00",
    endTime: "11:30",
    type: "meeting"
  },
  {
    id: "event-2",
    title: "Project Deadline",
    description: "Final submission for the client project",
    date: "2025-05-25",
    startTime: "00:00",
    endTime: "23:59",
    type: "deadline"
  },
  {
    id: "event-3",
    title: "1-on-1 with Manager",
    description: "Monthly progress review",
    date: "2025-05-20",
    startTime: "14:00",
    endTime: "15:00",
    type: "meeting"
  }
];

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [events, setEvents] = useState<EventData[]>(initialEvents);
  const [filter, setFilter] = useState("all");
  const [createEventOpen, setCreateEventOpen] = useState(false);
  
  // Filter events based on date and type
  const filteredEvents = events.filter(event => {
    // Filter by type
    if (filter !== "all" && event.type !== filter) return false;
    
    // Filter by date if date is selected
    if (date) {
      const selectedDate = date.toISOString().split('T')[0];
      return event.date === selectedDate;
    }
    
    return true;
  });
  
  // Handle saving a new event
  const handleSaveEvent = (eventData: EventData) => {
    setEvents([...events, eventData]);
    toast.success("Event created successfully");
  };
  
  // Get the event type color
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800";
      case "deadline":
        return "bg-red-100 text-red-800";
      case "reminder":
        return "bg-yellow-100 text-yellow-800";
      case "out-of-office":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Calendar</h1>
            <p className="text-sm text-muted-foreground">Plan and manage your schedule</p>
          </div>
          <Button onClick={() => setCreateEventOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create Event
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Calendar */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Calendar</CardTitle>
                <div className="flex border rounded-md">
                  <Button 
                    variant={view === "month" ? "default" : "ghost"} 
                    className="rounded-none rounded-l-md"
                    onClick={() => setView("month")}
                  >
                    Month
                  </Button>
                  <Button 
                    variant={view === "week" ? "default" : "ghost"} 
                    className="rounded-none"
                    onClick={() => setView("week")}
                  >
                    Week
                  </Button>
                  <Button 
                    variant={view === "day" ? "default" : "ghost"} 
                    className="rounded-none rounded-r-md"
                    onClick={() => setView("day")}
                  >
                    Day
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Events List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {date ? (
                    <span>Events for {date.toLocaleDateString()}</span>
                  ) : (
                    <span>All Events</span>
                  )}
                </CardTitle>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter events" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="meeting">Meetings</SelectItem>
                    <SelectItem value="deadline">Deadlines</SelectItem>
                    <SelectItem value="reminder">Reminders</SelectItem>
                    <SelectItem value="out-of-office">Out of Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>
                {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-auto">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No events found for this date
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <Card key={event.id}>
                      <CardHeader className="p-3 pb-0">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">{event.title}</CardTitle>
                          <Badge className={getEventTypeColor(event.type)}>
                            {event.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3">
                        <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                        <div className="flex items-center text-sm">
                          <CalendarClock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-sm mt-1">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Create Event Dialog */}
        <EventDialog 
          open={createEventOpen} 
          onOpenChange={setCreateEventOpen} 
          onSave={handleSaveEvent}
          selectedDate={date}
        />
      </div>
    </DashboardLayout>
  );
}
