
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Lock, Shield, X } from "lucide-react";

export function SecuritySettings() {
  // Password change state
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // 2FA state
  const [twoFactorDialogOpen, setTwoFactorDialogOpen] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  // Sessions state
  const [sessionsDialogOpen, setSessionsDialogOpen] = useState(false);
  const [sessions, setSessions] = useState([
    {
      id: "session-1",
      device: "Chrome on Windows",
      location: "New York, USA",
      lastActive: "Just now",
      ip: "192.168.1.1",
      current: true
    },
    {
      id: "session-2",
      device: "Safari on macOS",
      location: "San Francisco, USA",
      lastActive: "Yesterday",
      ip: "192.168.1.2",
      current: false
    },
    {
      id: "session-3",
      device: "Mobile App on iPhone",
      location: "Boston, USA",
      lastActive: "3 days ago",
      ip: "192.168.1.3",
      current: false
    }
  ]);

  // Password change handler
  const handlePasswordChange = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    // Here you would handle the actual password change
    toast.success("Password changed successfully");
    setPasswordDialogOpen(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  // 2FA toggle handler
  const handleToggle2FA = () => {
    if (!twoFactorEnabled) {
      // Would normally show QR code here
      setTwoFactorDialogOpen(true);
    } else {
      // Disable 2FA directly
      setTwoFactorEnabled(false);
      toast.success("Two-factor authentication disabled");
    }
  };

  // Verify 2FA code
  const verifyAndEnable2FA = () => {
    if (!verificationCode) {
      toast.error("Please enter the verification code");
      return;
    }

    if (verificationCode.length !== 6) {
      toast.error("Verification code must be 6 digits");
      return;
    }

    // Here you would verify the code
    setTwoFactorEnabled(true);
    setTwoFactorDialogOpen(false);
    setVerificationCode("");
    toast.success("Two-factor authentication enabled");
  };

  // Revoke session
  const revokeSession = (sessionId: string) => {
    setSessions(sessions.filter(session => session.id !== sessionId));
    toast.success("Session revoked successfully");
  };

  // Revoke all other sessions
  const revokeAllOtherSessions = () => {
    setSessions(sessions.filter(session => session.current));
    toast.success("All other sessions revoked successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your account security</p>
      </div>

      <div className="space-y-5">
        {/* Password Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Password</CardTitle>
              </div>
            </div>
            <CardDescription>Change your password</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Your password was last changed 30 days ago
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => setPasswordDialogOpen(true)}
            >
              Change Password
            </Button>
          </CardFooter>
        </Card>

        {/* Two-Factor Authentication */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Two-Factor Authentication</CardTitle>
              </div>
              <Badge variant={twoFactorEnabled ? "default" : "outline"}>
                {twoFactorEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <CardDescription>Add an extra layer of security to your account</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline"
              className="w-full"
              onClick={handleToggle2FA}
            >
              {twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
            </Button>
          </CardFooter>
        </Card>

        {/* Active Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription>Manage your active sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-3">
              {sessions.slice(0, 2).map((session) => (
                <div key={session.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{session.device}</div>
                    <div className="text-muted-foreground">{session.location} • {session.lastActive}</div>
                  </div>
                  {session.current && (
                    <Badge>Current</Badge>
                  )}
                </div>
              ))}
              {sessions.length > 2 && (
                <div className="text-muted-foreground">
                  And {sessions.length - 2} more active {sessions.length - 2 === 1 ? 'session' : 'sessions'}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => setSessionsDialogOpen(true)}
            >
              View Sessions
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Update your password to keep your account secure
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input 
                id="current-password" 
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input 
                id="new-password" 
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input 
                id="confirm-password" 
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPasswordDialogOpen(false)}>Cancel</Button>
            <Button onClick={handlePasswordChange}>Update Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2FA Dialog */}
      <Dialog open={twoFactorDialogOpen} onOpenChange={setTwoFactorDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Set up two-factor authentication to add an extra layer of security
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border p-4 rounded-md bg-muted/50 flex items-center justify-center">
              <div className="text-center">
                <p className="font-medium mb-4">Scan QR Code</p>
                <div className="h-40 w-40 bg-muted border mx-auto"></div>
                <p className="text-xs mt-2 text-muted-foreground">Use your authenticator app to scan this QR code</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="verification-code">Verification Code</Label>
              <Input 
                id="verification-code" 
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, '').substring(0, 6))}
                maxLength={6}
              />
              <p className="text-xs text-muted-foreground">
                Enter the verification code from your authenticator app
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTwoFactorDialogOpen(false)}>Cancel</Button>
            <Button onClick={verifyAndEnable2FA}>Verify and Enable</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sessions Dialog */}
      <Dialog open={sessionsDialogOpen} onOpenChange={setSessionsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Active Sessions</DialogTitle>
            <DialogDescription>
              Review and manage your active sessions across devices
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div>
                        {session.device}
                        {session.current && (
                          <Badge variant="outline" className="ml-2">Current</Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">IP: {session.ip}</div>
                    </TableCell>
                    <TableCell>{session.location}</TableCell>
                    <TableCell>{session.lastActive}</TableCell>
                    <TableCell className="text-right">
                      {!session.current && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => revokeSession(session.id)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Revoke</span>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSessionsDialogOpen(false)}>Close</Button>
            <Button 
              variant="destructive"
              onClick={revokeAllOtherSessions}
              disabled={sessions.length <= 1}
            >
              Revoke All Other Sessions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SecuritySettings;
