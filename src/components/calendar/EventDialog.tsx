
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (eventData: EventData) => void;
  selectedDate?: Date;
}

export interface EventData {
  id?: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
}

export function EventDialog({ open, onOpenChange, onSave, selectedDate }: EventDialogProps) {
  const formattedDate = selectedDate ? 
    selectedDate.toISOString().split('T')[0] : 
    new Date().toISOString().split('T')[0];
    
  const [eventData, setEventData] = useState<EventData>({
    title: "",
    description: "",
    date: formattedDate,
    startTime: "09:00",
    endTime: "10:00",
    type: "meeting"
  });

  const handleSave = () => {
    if (!eventData.title.trim()) {
      toast.error("Event title is required");
      return;
    }

    if (!eventData.date) {
      toast.error("Date is required");
      return;
    }

    if (!eventData.startTime || !eventData.endTime) {
      toast.error("Start and end time are required");
      return;
    }

    // Validate that end time is after start time
    if (eventData.startTime >= eventData.endTime) {
      toast.error("End time must be after start time");
      return;
    }

    onSave({
      ...eventData,
      id: crypto.randomUUID()
    });
    
    // Reset form
    setEventData({
      title: "",
      description: "",
      date: formattedDate,
      startTime: "09:00",
      endTime: "10:00",
      type: "meeting"
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Add a new event to your calendar
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input 
              id="title" 
              placeholder="Enter event title"
              value={eventData.title}
              onChange={(e) => setEventData({...eventData, title: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Enter event description"
              value={eventData.description}
              onChange={(e) => setEventData({...eventData, description: e.target.value})}
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date" 
                type="date"
                value={eventData.date}
                onChange={(e) => setEventData({...eventData, date: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Event Type</Label>
              <Select 
                value={eventData.type}
                onValueChange={(value) => setEventData({...eventData, type: value})}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                  <SelectItem value="out-of-office">Out of Office</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input 
                id="startTime" 
                type="time"
                value={eventData.startTime}
                onChange={(e) => setEventData({...eventData, startTime: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input 
                id="endTime" 
                type="time"
                value={eventData.endTime}
                onChange={(e) => setEventData({...eventData, endTime: e.target.value})}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Create Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EventDialog;
