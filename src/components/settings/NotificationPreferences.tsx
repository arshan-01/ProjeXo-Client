
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, Mail, Bell, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export function NotificationPreferences() {
  const [emailPreferences, setEmailPreferences] = useState({
    dailySummary: true,
    taskAssignments: true,
    mentions: true,
    teamUpdates: false
  });

  const [pushPreferences, setPushPreferences] = useState({
    taskAssignments: true,
    mentions: true,
    directMessages: true,
    reminders: true
  });

  const [notificationTypes, setNotificationTypes] = useState({
    tasks: true,
    messages: true,
    teamChanges: true,
    systemUpdates: false
  });

  // Modal states
  const [emailConfigOpen, setEmailConfigOpen] = useState(false);
  const [pushConfigOpen, setPushConfigOpen] = useState(false);
  const [typesConfigOpen, setTypesConfigOpen] = useState(false);

  // Email preferences
  const [tempEmailPrefs, setTempEmailPrefs] = useState({ ...emailPreferences });
  // Push preferences
  const [tempPushPrefs, setTempPushPrefs] = useState({ ...pushPreferences });
  // Types preferences
  const [tempTypesPrefs, setTempTypesPrefs] = useState({ ...notificationTypes });

  // Save functions
  const saveEmailPreferences = () => {
    setEmailPreferences(tempEmailPrefs);
    setEmailConfigOpen(false);
    toast.success("Email preferences saved successfully");
  };

  const savePushPreferences = () => {
    setPushPreferences(tempPushPrefs);
    setPushConfigOpen(false);
    toast.success("Push notification preferences saved successfully");
  };

  const saveNotificationTypes = () => {
    setNotificationTypes(tempTypesPrefs);
    setTypesConfigOpen(false);
    toast.success("Notification types updated successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notification Preferences</h3>
        <p className="text-sm text-muted-foreground">Manage how you receive notifications</p>
      </div>

      <Tabs defaultValue="delivery" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="delivery">Delivery Methods</TabsTrigger>
          <TabsTrigger value="types">Notification Types</TabsTrigger>
        </TabsList>
        <TabsContent value="delivery" className="space-y-4 mt-4">
          {/* Email Notifications */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <CardTitle>Email Notifications</CardTitle>
                </div>
                {Object.values(emailPreferences).some(v => v) ? (
                  <div className="flex items-center text-sm text-green-600">
                    <Check className="mr-1 h-4 w-4" />
                    Enabled
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">Disabled</div>
                )}
              </div>
              <CardDescription>Get notifications delivered to your email inbox</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Daily summary</span>
                  <span>{emailPreferences.dailySummary ? "Enabled" : "Disabled"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Task assignments</span>
                  <span>{emailPreferences.taskAssignments ? "Enabled" : "Disabled"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Mentions</span>
                  <span>{emailPreferences.mentions ? "Enabled" : "Disabled"}</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => {
                  setTempEmailPrefs({...emailPreferences});
                  setEmailConfigOpen(true);
                }}
              >
                Configure
              </Button>
            </CardFooter>
          </Card>

          {/* Push Notifications */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <CardTitle>Push Notifications</CardTitle>
                </div>
                {Object.values(pushPreferences).some(v => v) ? (
                  <div className="flex items-center text-sm text-green-600">
                    <Check className="mr-1 h-4 w-4" />
                    Enabled
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">Disabled</div>
                )}
              </div>
              <CardDescription>Get notifications on your desktop or mobile device</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Task assignments</span>
                  <span>{pushPreferences.taskAssignments ? "Enabled" : "Disabled"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Mentions</span>
                  <span>{pushPreferences.mentions ? "Enabled" : "Disabled"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Direct messages</span>
                  <span>{pushPreferences.directMessages ? "Enabled" : "Disabled"}</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => {
                  setTempPushPrefs({...pushPreferences});
                  setPushConfigOpen(true);
                }}
              >
                Configure
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="types" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Notification Types</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setTempTypesPrefs({...notificationTypes});
                    setTypesConfigOpen(true);
                  }}
                >
                  Configure
                </Button>
              </div>
              <CardDescription>Choose which types of notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Task notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Assignments, deadlines, status updates
                    </p>
                  </div>
                  <Switch checked={notificationTypes.tasks} disabled />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Message notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Direct messages and mentions
                    </p>
                  </div>
                  <Switch checked={notificationTypes.messages} disabled />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Team changes</Label>
                    <p className="text-sm text-muted-foreground">
                      New members, role changes, departures
                    </p>
                  </div>
                  <Switch checked={notificationTypes.teamChanges} disabled />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Maintenance updates and new features
                    </p>
                  </div>
                  <Switch checked={notificationTypes.systemUpdates} disabled />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Email Preferences Dialog */}
      <Dialog open={emailConfigOpen} onOpenChange={setEmailConfigOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Email Notification Settings</DialogTitle>
            <DialogDescription>
              Configure which emails you want to receive
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="daily-summary" className="flex-1">
                Daily task summary
              </Label>
              <Switch 
                id="daily-summary" 
                checked={tempEmailPrefs.dailySummary}
                onCheckedChange={(checked) => setTempEmailPrefs({...tempEmailPrefs, dailySummary: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="task-assignments" className="flex-1">
                Task assignments and changes
              </Label>
              <Switch 
                id="task-assignments" 
                checked={tempEmailPrefs.taskAssignments}
                onCheckedChange={(checked) => setTempEmailPrefs({...tempEmailPrefs, taskAssignments: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="mentions" className="flex-1">
                Mentions in comments and tasks
              </Label>
              <Switch 
                id="mentions" 
                checked={tempEmailPrefs.mentions}
                onCheckedChange={(checked) => setTempEmailPrefs({...tempEmailPrefs, mentions: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="team-updates" className="flex-1">
                Team status updates
              </Label>
              <Switch 
                id="team-updates" 
                checked={tempEmailPrefs.teamUpdates}
                onCheckedChange={(checked) => setTempEmailPrefs({...tempEmailPrefs, teamUpdates: checked})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailConfigOpen(false)}>Cancel</Button>
            <Button onClick={saveEmailPreferences}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Push Preferences Dialog */}
      <Dialog open={pushConfigOpen} onOpenChange={setPushConfigOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Push Notification Settings</DialogTitle>
            <DialogDescription>
              Configure your desktop and mobile push notifications
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="push-assignments" className="flex-1">
                Task assignments
              </Label>
              <Switch 
                id="push-assignments" 
                checked={tempPushPrefs.taskAssignments}
                onCheckedChange={(checked) => setTempPushPrefs({...tempPushPrefs, taskAssignments: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-mentions" className="flex-1">
                Mentions
              </Label>
              <Switch 
                id="push-mentions" 
                checked={tempPushPrefs.mentions}
                onCheckedChange={(checked) => setTempPushPrefs({...tempPushPrefs, mentions: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-messages" className="flex-1">
                Direct messages
              </Label>
              <Switch 
                id="push-messages" 
                checked={tempPushPrefs.directMessages}
                onCheckedChange={(checked) => setTempPushPrefs({...tempPushPrefs, directMessages: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-reminders" className="flex-1">
                Task reminders
              </Label>
              <Switch 
                id="push-reminders" 
                checked={tempPushPrefs.reminders}
                onCheckedChange={(checked) => setTempPushPrefs({...tempPushPrefs, reminders: checked})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPushConfigOpen(false)}>Cancel</Button>
            <Button onClick={savePushPreferences}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notification Types Dialog */}
      <Dialog open={typesConfigOpen} onOpenChange={setTypesConfigOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Notification Types</DialogTitle>
            <DialogDescription>
              Choose which types of activities should generate notifications
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="types-tasks" className="flex-1">
                Task notifications
              </Label>
              <Switch 
                id="types-tasks" 
                checked={tempTypesPrefs.tasks}
                onCheckedChange={(checked) => setTempTypesPrefs({...tempTypesPrefs, tasks: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="types-messages" className="flex-1">
                Message notifications
              </Label>
              <Switch 
                id="types-messages" 
                checked={tempTypesPrefs.messages}
                onCheckedChange={(checked) => setTempTypesPrefs({...tempTypesPrefs, messages: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="types-team" className="flex-1">
                Team changes
              </Label>
              <Switch 
                id="types-team" 
                checked={tempTypesPrefs.teamChanges}
                onCheckedChange={(checked) => setTempTypesPrefs({...tempTypesPrefs, teamChanges: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="types-system" className="flex-1">
                System updates
              </Label>
              <Switch 
                id="types-system" 
                checked={tempTypesPrefs.systemUpdates}
                onCheckedChange={(checked) => setTempTypesPrefs({...tempTypesPrefs, systemUpdates: checked})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTypesConfigOpen(false)}>Cancel</Button>
            <Button onClick={saveNotificationTypes}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NotificationPreferences;
