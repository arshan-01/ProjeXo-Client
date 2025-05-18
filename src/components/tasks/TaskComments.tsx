import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Smile, 
  AtSign,
  Send 
} from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Comment {
  id: string;
  taskId: string;
  userId: string;
  user: User;
  content: string;
  createdAt: string;
  mentions: string[];
}

interface TaskCommentsProps {
  taskId: string;
  users: User[];
  initialComments?: Comment[];
  onCommentsChange?: (taskId: string, comments: Comment[]) => void;
}

export function TaskComments({ taskId, users, initialComments = [], onCommentsChange }: TaskCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [showMentionPopover, setShowMentionPopover] = useState(false);
  const [mentionSearchText, setMentionSearchText] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  
  // Current mock user (would usually come from auth context)
  const currentUser = users[0];
  
  // Function to detect and track @ mentions
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setNewComment(text);
    
    // Get cursor position
    setCursorPosition(e.target.selectionStart || 0);
    
    // Look for @ symbol before cursor
    const textBeforeCursor = text.slice(0, e.target.selectionStart);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    
    if (lastAtIndex !== -1) {
      const hasSpaceBetween = textBeforeCursor.slice(lastAtIndex).includes(' ');
      
      if (!hasSpaceBetween) {
        setShowMentionPopover(true);
        setMentionSearchText(textBeforeCursor.slice(lastAtIndex + 1));
        return;
      }
    }
    
    setShowMentionPopover(false);
  };

  // Function to add a mention to the comment
  const addMention = (user: User) => {
    const beforeMention = newComment.slice(0, cursorPosition).lastIndexOf('@');
    
    if (beforeMention !== -1) {
      // Replace the @searchtext with @username
      const before = newComment.slice(0, beforeMention);
      const after = newComment.slice(cursorPosition);
      
      setNewComment(`${before}@${user.name} ${after}`);
    }
    
    setShowMentionPopover(false);
  };
  
  // Function to add comment
  const addComment = () => {
    if (!newComment.trim()) return;
    
    // Extract mentions from comment
    const mentionRegex = /@(\w+)/g;
    const mentions = Array.from(newComment.matchAll(mentionRegex))
      .map(match => match[1]);
    
    const newCommentObj: Comment = {
      id: `comment-${Date.now()}`,
      taskId,
      userId: currentUser.id,
      user: currentUser,
      content: newComment,
      createdAt: new Date().toISOString(),
      mentions: mentions
    };
    
    const updatedComments = [...comments, newCommentObj];
    setComments(updatedComments);
    setNewComment("");
    
    // Notify parent component about the comment update
    if (onCommentsChange) {
      onCommentsChange(taskId, updatedComments);
    }
    
    toast.success("Comment added successfully");
  };
  
  // Filter users for mention popover
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(mentionSearchText.toLowerCase())
  );
  
  // Format comment content to highlight mentions
  const formatCommentContent = (content: string) => {
    const parts = content.split(/(@\w+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        return <span key={index} className="text-blue-500 font-semibold">{part}</span>;
      }
      return part;
    });
  };
  
  // Format date to be readable
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric' 
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <MessageSquare className="mr-2 h-5 w-5 text-muted-foreground" />
        <h3 className="text-sm font-medium">Comments</h3>
      </div>
      
      {/* Comments list */}
      <div className="space-y-4 max-h-[300px] overflow-y-auto">
        {comments.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-4">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="flex space-x-3 text-sm">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{comment.user.name}</span>
                  <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="mt-1">{formatCommentContent(comment.content)}</p>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* New comment input */}
      <div className="flex items-start space-x-3 pt-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 relative">
          <Textarea
            value={newComment}
            onChange={handleCommentChange}
            className="min-h-[80px]"
            placeholder="Write a comment... Use @ to mention someone"
          />
          <div className="flex justify-between mt-2">
            <div className="flex space-x-2">
              <Popover open={false}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Smile className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent></PopoverContent>
              </Popover>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <AtSign className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
            <Button size="sm" onClick={addComment} className="h-8">
              <Send className="h-4 w-4 mr-1" /> Send
            </Button>
          </div>
          
          {/* Mentions popover */}
          {showMentionPopover && (
            <div className="absolute z-10 mt-1 bg-background border rounded-md shadow-md w-56">
              {filteredUsers.length > 0 ? (
                <div className="p-1 max-h-[200px] overflow-y-auto">
                  {filteredUsers.map(user => (
                    <div 
                      key={user.id}
                      className="flex items-center p-2 hover:bg-muted cursor-pointer rounded-sm"
                      onClick={() => addMention(user)}
                    >
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{user.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-2 text-sm text-muted-foreground text-center">
                  No users found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskComments;