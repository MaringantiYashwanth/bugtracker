import React from 'react';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Calendar, MessageSquare, User } from 'lucide-react';
import { cn } from '../lib/utils';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee?: {
    name: string;
    avatar?: string;
    initials: string;
  };
  reporter: {
    name: string;
    avatar?: string;
    initials: string;
  };
  createdAt: string;
  commentsCount: number;
  project: string;
}

interface TicketCardProps {
  ticket: Ticket;
  onClick?: () => void;
}

const statusColors = {
  open: 'bg-info text-info-foreground',
  'in-progress': 'bg-warning text-warning-foreground',
  resolved: 'bg-success text-success-foreground',
  closed: 'bg-muted text-muted-foreground'
};

const priorityColors = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-warning text-warning-foreground',
  high: 'bg-destructive text-destructive-foreground',
  critical: 'bg-destructive text-destructive-foreground'
};

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, onClick }) => {
  return (
    <div 
      className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {ticket.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">#{ticket.id}</p>
        </div>
        <div className="flex items-center space-x-2 ml-3">
          <Badge className={cn('text-xs', statusColors[ticket.status])}>
            {ticket.status.replace('-', ' ')}
          </Badge>
          <Badge variant="outline" className={cn('text-xs', priorityColors[ticket.priority])}>
            {ticket.priority}
          </Badge>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {ticket.description}
      </p>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3" />
            <span>{ticket.reporter.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{ticket.createdAt}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageSquare className="h-3 w-3" />
            <span>{ticket.commentsCount}</span>
          </div>
        </div>
        
        {ticket.assignee && (
          <div className="flex items-center space-x-1">
            <Avatar className="h-5 w-5">
              <AvatarImage src={ticket.assignee.avatar} />
              <AvatarFallback className="text-xs">{ticket.assignee.initials}</AvatarFallback>
            </Avatar>
            <span className="text-xs">{ticket.assignee.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};