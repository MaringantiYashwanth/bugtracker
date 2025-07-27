import React from 'react';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { cn } from '../../lib/utils';

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  reporter: {
    name: string;
    avatarUrl?: string;
  };
  createdAt: string;
  project: string;
};

interface TicketCardProps {
  ticket: Ticket;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{ticket.title}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical className="w-4 h-4 cursor-pointer text-zinc-600" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onEdit?.(ticket.id)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete?.(ticket.id)} className="text-red-600">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-sm text-zinc-500 mt-2">{ticket.description}</p>

      <div className="flex items-center justify-between mt-4">
        <Badge variant="outline">{ticket.status}</Badge>
        <div className="flex items-center gap-2">
          <Avatar>
            {ticket.reporter.avatarUrl ? (
              <AvatarImage src={ticket.reporter.avatarUrl} alt={ticket.reporter.name} />
            ) : (
              <AvatarFallback>{ticket.reporter.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            )}
          </Avatar>
          <span className="text-sm text-zinc-700 dark:text-zinc-300">{ticket.reporter.name}</span>
        </div>
      </div>

      <div className="mt-2 text-xs text-zinc-400">
        {new Date(ticket.createdAt).toLocaleDateString()} • {ticket.project}
      </div>
    </div>
  );
};
