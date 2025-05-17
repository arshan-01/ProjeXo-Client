import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Search, Info, Paperclip, Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "online" | "offline" | "away";
  lastSeen?: string;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: {
    content: string;
    timestamp: string;
    senderId: string;
  };
  unreadCount: number;
}

// Sample users
const users: User[] = [
  {
    id: "user-1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&h=128&auto=format&fit=crop",
    status: "online"
  },
  {
    id: "user-2",
    name: "Sam Wilson",
    email: "sam@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&auto=format&fit=crop",
    status: "online"
  },
  {
    id: "user-3",
    name: "Emma Davis",
    email: "emma@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&auto=format&fit=crop",
    status: "away",
    lastSeen: "20 minutes ago"
  },
  {
    id: "user-4",
    name: "Michael Brown",
    email: "michael@example.com",
    avatar: "",
    status: "offline",
    lastSeen: "Yesterday"
  },
  {
    id: "user-5",
    name: "Sarah Miller",
    email: "sarah@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&auto=format&fit=crop",
    status: "offline",
    lastSeen: "2 days ago"
  }
];

// Current user (you)
const currentUser: User = {
  id: "current-user",
  name: "You",
  email: "you@example.com",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&auto=format&fit=crop",
  status: "online"
};

// Sample conversations
const initialConversations: Conversation[] = [
  {
    id: "conv-1",
    participants: [users[0], currentUser],
    lastMessage: {
      content: "Can you send me those design files?",
      timestamp: "10:32 AM",
      senderId: "user-1"
    },
    unreadCount: 1
  },
  {
    id: "conv-2",
    participants: [users[1], currentUser],
    lastMessage: {
      content: "I've updated the PR with the requested changes",
      timestamp: "Yesterday",
      senderId: "user-2"
    },
    unreadCount: 0
  },
  {
    id: "conv-3",
    participants: [users[2], currentUser],
    lastMessage: {
      content: "Let's discuss the project timeline tomorrow",
      timestamp: "2 days ago",
      senderId: "current-user"
    },
    unreadCount: 0
  },
  {
    id: "conv-4",
    participants: [users[3], currentUser],
    lastMessage: {
      content: "The report has been submitted",
      timestamp: "1 week ago",
      senderId: "user-4"
    },
    unreadCount: 0
  }
];

// Sample messages
const initialMessages: Record<string, Message[]> = {
  "conv-1": [
    {
      id: "msg-1",
      conversationId: "conv-1",
      senderId: "user-1",
      content: "Hi there! How's the progress on the dashboard design?",
      timestamp: "10:30 AM",
      read: true
    },
    {
      id: "msg-2",
      conversationId: "conv-1",
      senderId: "current-user",
      content: "It's going well! I've completed the wireframes.",
      timestamp: "10:31 AM",
      read: true
    },
    {
      id: "msg-3",
      conversationId: "conv-1",
      senderId: "user-1",
      content: "Can you send me those design files?",
      timestamp: "10:32 AM",
      read: false
    }
  ],
  "conv-2": [
    {
      id: "msg-4",
      conversationId: "conv-2",
      senderId: "current-user",
      content: "Hey Sam, I reviewed your PR and have some comments.",
      timestamp: "Yesterday",
      read: true
    },
    {
      id: "msg-5",
      conversationId: "conv-2",
      senderId: "user-2",
      content: "Thanks for the feedback! I'll check it out.",
      timestamp: "Yesterday",
      read: true
    },
    {
      id: "msg-6",
      conversationId: "conv-2",
      senderId: "user-2",
      content: "I've updated the PR with the requested changes",
      timestamp: "Yesterday",
      read: true
    }
  ],
  "conv-3": [
    {
      id: "msg-7",
      conversationId: "conv-3",
      senderId: "user-3",
      content: "Do we have a timeline for the next phase?",
      timestamp: "2 days ago",
      read: true
    },
    {
      id: "msg-8",
      conversationId: "conv-3",
      senderId: "current-user",
      content: "Let's discuss the project timeline tomorrow",
      timestamp: "2 days ago",
      read: true
    }
  ],
  "conv-4": [
    {
      id: "msg-9",
      conversationId: "conv-4",
      senderId: "user-4",
      content: "I've finished the quarterly report",
      timestamp: "1 week ago",
      read: true
    },
    {
      id: "msg-10",
      conversationId: "conv-4",
      senderId: "user-4",
      content: "The report has been submitted",
      timestamp: "1 week ago",
      read: true
    }
  ]
};

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState(initialConversations);
  const [messages, setMessages] = useState(initialMessages);
  const [selectedConversation, setSelectedConversation] = useState<string | null>("conv-1");
  const [newMessage, setNewMessage] = useState("");
  const [newConversationDialog, setNewConversationDialog] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation => {
    const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id);
    if (!otherParticipant) return false;
    
    return otherParticipant.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Get the current conversation messages
  const currentConversationMessages = selectedConversation ? messages[selectedConversation] || [] : [];
  
  // Get the other participant in the conversation
  const getOtherParticipant = (conversation: Conversation) => {
    return conversation.participants.find(p => p.id !== currentUser.id);
  };
  
  // Mark conversation messages as read
  const markConversationAsRead = (conversationId: string) => {
    if (!messages[conversationId]) return;
    
    // Mark messages as read
    const updatedMessages = {
      ...messages,
      [conversationId]: messages[conversationId].map(msg => ({ ...msg, read: true }))
    };
    
    setMessages(updatedMessages);
    
    // Update unread count in conversations
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversationId) {
        return { ...conv, unreadCount: 0 };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
  };
  
  // Send a new message
  const sendMessage = () => {
    if (!selectedConversation || !newMessage.trim()) return;
    
    // Create new message
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversation,
      senderId: currentUser.id,
      content: newMessage.trim(),
      timestamp,
      read: true
    };
    
    // Update messages
    const updatedMessages = {
      ...messages,
      [selectedConversation]: [...(messages[selectedConversation] || []), newMsg]
    };
    
    // Update conversations
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation) {
        return {
          ...conv,
          lastMessage: {
            content: newMessage.trim(),
            timestamp,
            senderId: currentUser.id
          }
        };
      }
      return conv;
    });
    
    setMessages(updatedMessages);
    setConversations(updatedConversations);
    setNewMessage("");
    toast.success("Message sent");
  };
  
  // Start a new conversation
  const startNewConversation = () => {
    if (selectedUsers.length === 0) {
      toast.error("Please select at least one user");
      return;
    }
    
    // Create participants array
    const participants = [
      ...selectedUsers.map(userId => users.find(u => u.id === userId)),
      currentUser
    ].filter(Boolean) as User[];
    
    // Create new conversation
    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      participants,
      unreadCount: 0
    };
    
    setConversations([newConv, ...conversations]);
    setSelectedConversation(newConv.id);
    setNewConversationDialog(false);
    setSelectedUsers([]);
    toast.success("Conversation started");
  };

  // Select a conversation
  const selectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId);
    markConversationAsRead(conversationId);
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-110px)]">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-semibold">Messages</h1>
          <Button onClick={() => setNewConversationDialog(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Message
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0">
          {/* Conversations List */}
          <Card className="md:col-span-1 flex flex-col">
            <CardHeader className="p-4 pb-2">
              <div className="relative mb-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-2 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No conversations found
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredConversations.map(conversation => {
                    const otherParticipant = getOtherParticipant(conversation);
                    if (!otherParticipant) return null;
                    
                    return (
                      <div 
                        key={conversation.id} 
                        className={`flex items-center p-3 rounded-md cursor-pointer hover:bg-muted ${
                          selectedConversation === conversation.id ? 'bg-muted' : ''
                        }`}
                        onClick={() => selectConversation(conversation.id)}
                      >
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={otherParticipant.avatar} />
                            <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                            otherParticipant.status === 'online' ? 'bg-green-500' : 
                            otherParticipant.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`} />
                        </div>
                        
                        <div className="ml-3 flex-1 overflow-hidden">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{otherParticipant.name}</span>
                            <span className="text-xs text-muted-foreground">{conversation.lastMessage?.timestamp}</span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            {conversation.lastMessage ? (
                              <p className="text-xs text-muted-foreground truncate mr-2">
                                {conversation.lastMessage.senderId === currentUser.id ? "You: " : ""}
                                {conversation.lastMessage.content}
                              </p>
                            ) : (
                              <p className="text-xs text-muted-foreground">Start a conversation</p>
                            )}
                            
                            {conversation.unreadCount > 0 && (
                              <Badge className="text-xs h-5 w-5 rounded-full flex items-center justify-center">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Messages Area */}
          <Card className="md:col-span-2 flex flex-col">
            {selectedConversation && conversations.find(c => c.id === selectedConversation) ? (
              <>
                <CardHeader className="p-3 border-b flex items-center">
                  {(() => {
                    const conversation = conversations.find(c => c.id === selectedConversation);
                    if (!conversation) return null;
                    
                    const otherParticipant = getOtherParticipant(conversation);
                    if (!otherParticipant) return null;
                    
                    return (
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={otherParticipant.avatar} />
                            <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="ml-3">
                            <h3 className="font-medium text-sm">{otherParticipant.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {otherParticipant.status === 'online' ? 'Online' : 
                               otherParticipant.status === 'away' ? 'Away' : `Last seen ${otherParticipant.lastSeen}`}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setInfoDialogOpen(true)}>
                          <Info className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })()}
                </CardHeader>
                <ScrollArea className="flex-1 p-4">
                  {currentConversationMessages.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No messages yet. Start the conversation!
                    </div>
                  ) : (
                    <div className="space-y-4 overflow-y-auto h-80">
                      {currentConversationMessages.map(message => {
                        const isCurrentUser = message.senderId === currentUser.id;
                        const sender = isCurrentUser ? 
                          currentUser : 
                          users.find(u => u.id === message.senderId);
                        
                        return (
                          <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                            <div className="flex items-start max-w-[70%]">
                              {!isCurrentUser && (
                                <Avatar className="h-8 w-8 mr-2 mt-1">
                                  <AvatarImage src={sender?.avatar} />
                                  <AvatarFallback>{sender?.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              )}
                              <div>
                                <div className={`rounded-lg p-3 ${
                                  isCurrentUser ? 'bg-primary/10' : 'bg-muted'
                                }`}>
                                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                                </div>
                                <div className="flex items-center mt-1">
                                  <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </ScrollArea>
                <div className="p-3 border-t">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                    />
                    <Button 
                      size="icon" 
                      onClick={sendMessage} 
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">No conversation selected</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Choose a conversation from the list or start a new one
                </p>
                <Button onClick={() => setNewConversationDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" /> New Message
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
      
      {/* New Conversation Dialog */}
      <Dialog open={newConversationDialog} onOpenChange={setNewConversationDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>New Conversation</DialogTitle>
            <DialogDescription>
              Select users to start a conversation with
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <Input
                placeholder="Search users..."
                className="mb-4"
              />
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {users.map(user => (
                <div 
                  key={user.id} 
                  className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer"
                  onClick={() => {
                    if (selectedUsers.includes(user.id)) {
                      setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                    } else {
                      setSelectedUsers([...selectedUsers, user.id]);
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => {}}
                    className="mr-3"
                  />
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewConversationDialog(false)}>Cancel</Button>
            <Button onClick={startNewConversation}>Start Conversation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* User Info Dialog */}
      <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          {(() => {
            if (!selectedConversation) return null;
            
            const conversation = conversations.find(c => c.id === selectedConversation);
            if (!conversation) return null;
            
            const otherParticipant = getOtherParticipant(conversation);
            if (!otherParticipant) return null;
            
            return (
              <>
                <DialogHeader className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-2">
                    <AvatarImage src={otherParticipant.avatar} />
                    <AvatarFallback className="text-2xl">{otherParticipant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <DialogTitle className="text-xl">{otherParticipant.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Email</p>
                    <p className="text-sm">{otherParticipant.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Status</p>
                    <div className="flex items-center">
                      <span className={`h-2.5 w-2.5 rounded-full mr-2 ${
                        otherParticipant.status === 'online' ? 'bg-green-500' : 
                        otherParticipant.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`}></span>
                      <p className="text-sm">
                        {otherParticipant.status === 'online' ? 'Online' : 
                         otherParticipant.status === 'away' ? 'Away' : `Offline (Last seen ${otherParticipant.lastSeen})`}
                      </p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setInfoDialogOpen(false)}>Close</Button>
                </DialogFooter>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
      
    </DashboardLayout>
  );
}
