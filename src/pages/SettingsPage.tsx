
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotificationPreferences from "@/components/settings/NotificationPreferences";
import SecuritySettings from "@/components/settings/SecuritySettings";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [darkMode, setDarkMode] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const [language, setLanguage] = useState("english");
  const [timeZone, setTimeZone] = useState("utc");
  const [emailSettings, setEmailSettings] = useState({
    dailyDigest: true,
    weeklyReport: true,
    marketing: false
  });
  
  const handleSaveGeneral = () => {
    toast.success("General settings saved successfully");
  };

  const handleSaveAppearance = () => {
    toast.success("Appearance settings saved successfully");
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="general"
                className="rounded-none border-b-2 border-b-transparent px-4 py-3 data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                General
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="rounded-none border-b-2 border-b-transparent px-4 py-3 data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="rounded-none border-b-2 border-b-transparent px-4 py-3 data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Security
              </TabsTrigger>
              <TabsTrigger
                value="appearance"
                className="rounded-none border-b-2 border-b-transparent px-4 py-3 data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Appearance
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Tell us about yourself" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveGeneral}>Save Changes</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Manage your preferences for the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select value={timeZone} onValueChange={setTimeZone}>
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select Time Zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                      <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                      <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="daily-digest">Daily Digest Email</Label>
                    <Switch
                      id="daily-digest"
                      checked={emailSettings.dailyDigest}
                      onCheckedChange={(checked) => 
                        setEmailSettings({...emailSettings, dailyDigest: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weekly-report">Weekly Report Email</Label>
                    <Switch
                      id="weekly-report"
                      checked={emailSettings.weeklyReport}
                      onCheckedChange={(checked) => 
                        setEmailSettings({...emailSettings, weeklyReport: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketing">Marketing Emails</Label>
                    <Switch
                      id="marketing"
                      checked={emailSettings.marketing}
                      onCheckedChange={(checked) => 
                        setEmailSettings({...emailSettings, marketing: checked})
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveGeneral}>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationPreferences />
          </TabsContent>
          
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize the look and feel of the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable dark mode for a better experience at night
                      </p>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact-view">Compact View</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable compact view to fit more content on screen
                      </p>
                    </div>
                    <Switch
                      id="compact-view"
                      checked={compactView}
                      onCheckedChange={setCompactView}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div 
                      className="cursor-pointer border-2 border-primary rounded-md p-4 flex justify-center items-center bg-background"
                      onClick={() => toast.success("Theme selected")}
                    >
                      Default
                    </div>
                    <div 
                      className="cursor-pointer border-2 border-muted rounded-md p-4 flex justify-center items-center bg-blue-50"
                      onClick={() => toast.success("Theme selected")}
                    >
                      Blue
                    </div>
                    <div 
                      className="cursor-pointer border-2 border-muted rounded-md p-4 flex justify-center items-center bg-purple-50"
                      onClick={() => toast.success("Theme selected")}
                    >
                      Purple
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div 
                      className="cursor-pointer border-2 border-muted rounded-md p-4 flex justify-center items-center text-sm"
                      onClick={() => toast.success("Font size selected")}
                    >
                      Small
                    </div>
                    <div 
                      className="cursor-pointer border-2 border-primary rounded-md p-4 flex justify-center items-center"
                      onClick={() => toast.success("Font size selected")}
                    >
                      Medium
                    </div>
                    <div 
                      className="cursor-pointer border-2 border-muted rounded-md p-4 flex justify-center items-center text-lg"
                      onClick={() => toast.success("Font size selected")}
                    >
                      Large
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveAppearance}>Save Appearance Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
