
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus, X } from "lucide-react";
import { toast } from "sonner";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: "active" | "inactive";
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  createdAt: string;
}

const DUMMY_TEAMS: Team[] = [
  {
    id: "team-1",
    name: "Development Team",
    description: "Frontend and backend developers",
    members: [
      {
        id: "user-1",
        name: "Alex Johnson",
        email: "alex@example.com",
        role: "Team Lead",
        avatar: "",
        status: "active"
      },
      {
        id: "user-2",
        name: "Sarah Miller",
        email: "sarah@example.com",
        role: "Frontend Developer",
        avatar: "",
        status: "active"
      },
      {
        id: "user-3",
        name: "Mike Brown",
        email: "mike@example.com",
        role: "Backend Developer",
        avatar: "",
        status: "active"
      }
    ],
    createdAt: "2024-04-15"
  },
  {
    id: "team-2",
    name: "Design Team",
    description: "UI/UX designers and graphic artists",
    members: [
      {
        id: "user-4",
        name: "Emma Wilson",
        email: "emma@example.com",
        role: "Design Lead",
        avatar: "",
        status: "active"
      },
      {
        id: "user-5",
        name: "James Taylor",
        email: "james@example.com",
        role: "UI/UX Designer",
        avatar: "",
        status: "inactive"
      }
    ],
    createdAt: "2024-04-16"
  }
];

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>(DUMMY_TEAMS);
  const [activeTab, setActiveTab] = useState("all-teams");
  const [newTeamDialogOpen, setNewTeamDialogOpen] = useState(false);
  const [inviteMemberDialogOpen, setInviteMemberDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [newTeam, setNewTeam] = useState({
    name: "",
    description: ""
  });
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("");

  const handleCreateTeam = () => {
    if (!newTeam.name.trim()) {
      toast.error("Team name is required");
      return;
    }

    const team: Team = {
      id: `team-${Date.now()}`,
      name: newTeam.name,
      description: newTeam.description,
      members: [],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTeams([...teams, team]);
    setNewTeam({ name: "", description: "" });
    setNewTeamDialogOpen(false);
    toast.success("Team created successfully");
  };

  const handleInviteMember = () => {
    if (!selectedTeam) return;
    
    if (!inviteEmail.trim() || !inviteRole.trim()) {
      toast.error("Email and role are required");
      return;
    }

    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail("");
    setInviteRole("");
    setInviteMemberDialogOpen(false);
  };

  const handleOpenInviteDialog = (team: Team) => {
    setSelectedTeam(team);
    setInviteMemberDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Teams</h1>
            <p className="text-sm text-muted-foreground">
              Manage your teams and team members
            </p>
          </div>
          <Button onClick={() => setNewTeamDialogOpen(true)}>
            <Users className="h-4 w-4 mr-2" />
            Create Team
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all-teams">All Teams</TabsTrigger>
            <TabsTrigger value="my-teams">My Teams</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-teams" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teams.map((team) => (
                <Card key={team.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{team.name}</CardTitle>
                      <Button
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleOpenInviteDialog(team)}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Invite
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{team.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">Members:</span>
                        <span className="text-sm">{team.members.length}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {team.members.map((member) => (
                          <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <div className="pt-2">
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => setSelectedTeam(team)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-teams" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teams.slice(0, 1).map((team) => (
                <Card key={team.id}>
                  <CardHeader className="pb-2">
                    <CardTitle>{team.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{team.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">Members:</span>
                        <span className="text-sm">{team.members.length}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {team.members.map((member) => (
                          <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <div className="pt-2">
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => setSelectedTeam(team)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {selectedTeam && (
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{selectedTeam.name} - Team Members</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleOpenInviteDialog(selectedTeam)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedTeam.members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {member.name}
                        </div>
                      </TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>
                        <Badge variant={member.status === "active" ? "default" : "secondary"}>
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Team Dialog */}
      <Dialog open={newTeamDialogOpen} onOpenChange={setNewTeamDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
            <DialogDescription>
              Add a new team to collaborate with your colleagues
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="team-name">Team Name</Label>
              <Input 
                id="team-name" 
                placeholder="Enter team name"
                value={newTeam.name}
                onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="team-description">Description</Label>
              <Input 
                id="team-description" 
                placeholder="Enter team description"
                value={newTeam.description}
                onChange={(e) => setNewTeam({...newTeam, description: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewTeamDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateTeam}>Create Team</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invite Member Dialog */}
      <Dialog open={inviteMemberDialogOpen} onOpenChange={setInviteMemberDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Send an invitation to join the team
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="member-email">Email Address</Label>
              <Input 
                id="member-email" 
                type="email"
                placeholder="Enter email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="member-role">Role</Label>
              <Input 
                id="member-role"
                placeholder="Enter role"
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteMemberDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleInviteMember}>Send Invitation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
