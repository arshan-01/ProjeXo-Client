import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CalendarClock, Edit2, LucideIcon, Mail, MapPin, Phone, Save, X } from "lucide-react";

// Sample user data
const initialUser = {
  id: "user-1",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=256&h=256&auto=format&fit=crop",
  role: "Product Manager",
  department: "Product",
  location: "San Francisco, CA",
  phone: "+1 (555) 123-4567",
  bio: "Product manager with 5+ years of experience in SaaS products. Passionate about creating user-centered solutions and driving product innovation.",
  joinDate: "January 2023",
  skills: ["Product Management", "User Research", "Agile", "Product Strategy", "Wireframing", "Data Analysis", "User Testing"]
};

// Sample activity data
const activities = [
  {
    id: "activity-1",
    type: "task-completed",
    content: "Completed task: 'Fix responsive layout issues'",
    date: "Today, 2:30 PM"
  },
  {
    id: "activity-2",
    type: "comment-added",
    content: "Commented on 'Design new dashboard wireframes'",
    date: "Today, 10:15 AM"
  },
  {
    id: "activity-3",
    type: "task-assigned",
    content: "Was assigned task: 'Create user profile mockups'",
    date: "Yesterday, 3:45 PM"
  },
  {
    id: "activity-4",
    type: "project-joined",
    content: "Joined project: 'Mobile App Development'",
    date: "2 days ago"
  },
  {
    id: "activity-5",
    type: "task-updated",
    content: "Updated task: 'Conduct user interviews'",
    date: "3 days ago"
  }
];

// Sample projects data
const projects = [
  {
    id: "project-1",
    name: "Website Redesign",
    role: "Project Manager",
    progress: 60,
    status: "In Progress",
    tasks: 12,
    completedTasks: 7,
    dueDate: "June 15, 2025"
  },
  {
    id: "project-2",
    name: "Mobile App Development",
    role: "Product Owner",
    progress: 45,
    status: "In Progress",
    tasks: 18,
    completedTasks: 8,
    dueDate: "July 20, 2025"
  },
  {
    id: "project-3",
    name: "User Research Study",
    role: "Contributor",
    progress: 100,
    status: "Completed",
    tasks: 8,
    completedTasks: 8,
    dueDate: "May 5, 2025"
  }
];

export default function ProfilePage() {
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(initialUser);

  // Start editing profile
  const handleEditProfile = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  // Save profile changes
  const handleSaveProfile = () => {
    setUser(editedUser);
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  // Add skill
  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      const newSkill = e.currentTarget.value.trim();
      if (!editedUser.skills.includes(newSkill)) {
        setEditedUser(prev => ({
          ...prev,
          skills: [...prev.skills, newSkill]
        }));
      }
      e.currentTarget.value = '';
    }
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove: string) => {
    setEditedUser(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="text-sm text-muted-foreground">View and manage your profile information</p>
          </div>
          {!isEditing ? (
            <Button onClick={handleEditProfile}>
              <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Your personal and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="space-y-1">
                      {isEditing ? (
                        <>
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              name="name"
                              value={editedUser.name}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                            <Label htmlFor="avatar">Profile Picture URL</Label>
                            <Input
                              id="avatar"
                              name="avatar"
                              value={editedUser.avatar}
                              onChange={handleInputChange}
                              placeholder="https://example.com/avatar.jpg"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="text-xl font-semibold">{user.name}</h3>
                          <p className="text-muted-foreground">{user.role} • {user.department}</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Detailed Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Email</Label>
                      {isEditing ? (
                        <Input
                          name="email"
                          value={editedUser.email}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      ) : (
                        <div className="flex items-center mt-1">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label>Phone</Label>
                      {isEditing ? (
                        <Input
                          name="phone"
                          value={editedUser.phone}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      ) : (
                        <div className="flex items-center mt-1">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label>Location</Label>
                      {isEditing ? (
                        <Input
                          name="location"
                          value={editedUser.location}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      ) : (
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{user.location}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label>Join Date</Label>
                      <div className="flex items-center mt-1">
                        <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{user.joinDate}</span>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <Label>Department / Role</Label>
                      {isEditing ? (
                        <div className="grid grid-cols-2 gap-4 mt-1">
                          <Select
                            value={editedUser.department}
                            onValueChange={(value) => handleSelectChange('department', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Product">Product</SelectItem>
                              <SelectItem value="Engineering">Engineering</SelectItem>
                              <SelectItem value="Design">Design</SelectItem>
                              <SelectItem value="Marketing">Marketing</SelectItem>
                              <SelectItem value="Sales">Sales</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select
                            value={editedUser.role}
                            onValueChange={(value) => handleSelectChange('role', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Product Manager">Product Manager</SelectItem>
                              <SelectItem value="Senior Developer">Senior Developer</SelectItem>
                              <SelectItem value="UX Designer">UX Designer</SelectItem>
                              <SelectItem value="Marketing Specialist">Marketing Specialist</SelectItem>
                              <SelectItem value="Sales Manager">Sales Manager</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        <p className="mt-1">{user.department} • {user.role}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <Label>About Me</Label>
                      {isEditing ? (
                        <Textarea
                          name="bio"
                          value={editedUser.bio}
                          onChange={handleInputChange}
                          className="mt-1"
                          rows={4}
                        />
                      ) : (
                        <p className="mt-1 text-muted-foreground">{user.bio}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <Label className="mb-2 block">Skills</Label>
                  {isEditing ? (
                    <>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {editedUser.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="flex gap-1 items-center">
                            {skill}
                            <button 
                              onClick={() => handleRemoveSkill(skill)}
                              className="ml-1 h-4 w-4 rounded-full hover:bg-muted-foreground/20"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <Input
                        placeholder="Add skill (press Enter)"
                        className="max-w-sm"
                        onKeyDown={handleAddSkill}
                      />
                    </>
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {user.skills.map(skill => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity and Projects */}
          <div className="space-y-6">
            {/* Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="divide-y">
                  {activities.map(activity => (
                    <div key={activity.id} className="py-3 px-6">
                      <p className="text-sm">{activity.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" size="sm">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>

            {/* Projects */}
            <Card>
              <CardHeader>
                <CardTitle>My Projects</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="divide-y">
                  {projects.map(project => (
                    <div key={project.id} className="py-3 px-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{project.name}</h4>
                          <p className="text-xs text-muted-foreground">Role: {project.role}</p>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            project.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div
                            className="bg-primary h-1.5 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {project.completedTasks} of {project.tasks} tasks completed • Due {project.dueDate}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" size="sm">
                  View All Projects
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Additional Settings Tabs */}
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Account Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notification Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="p-4 border rounded-md mt-2">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Settings</h3>
              <p className="text-sm text-muted-foreground">
                Manage your account settings and preferences
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Language</h4>
                    <p className="text-sm text-muted-foreground">Change the language of your account</p>
                  </div>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Time Zone</h4>
                    <p className="text-sm text-muted-foreground">Set your local time zone</p>
                  </div>
                  <Select defaultValue="pst">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                      <SelectItem value="est">Eastern Time (EST)</SelectItem>
                      <SelectItem value="utc">Universal Time (UTC)</SelectItem>
                      <SelectItem value="cet">Central European Time (CET)</SelectItem>
                      <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="notifications" className="p-4 border rounded-md mt-2">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Preferences</h3>
              <p className="text-sm text-muted-foreground">
                Control how you want to be notified
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Button variant="outline">Configure Email</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications in browser
                    </p>
                  </div>
                  <Button variant="outline">Configure Push</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Notification Types</h4>
                    <p className="text-sm text-muted-foreground">
                      Select which activities will trigger notifications
                    </p>
                  </div>
                  <Button variant="outline">Configure Types</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="security" className="p-4 border rounded-md mt-2">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Security</h3>
              <p className="text-sm text-muted-foreground">
                Manage your account security settings
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Change Password</h4>
                    <p className="text-sm text-muted-foreground">
                      Update your account password
                    </p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Login Sessions</h4>
                    <p className="text-sm text-muted-foreground">
                      Manage your active login sessions
                    </p>
                  </div>
                  <Button variant="outline">View Sessions</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
