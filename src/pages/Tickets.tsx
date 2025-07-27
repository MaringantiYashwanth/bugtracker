import React, { useState } from 'react';

import { Layout } from '../layout/Layout';
import { TicketCard } from '../components/ticket/TicketCard';
import type { Ticket } from '../components/ticket/TicketCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  SortAsc,
  MoreVertical
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

// Mock data
const tickets: Ticket[] = [
  {
    id: 'BUG-001',
    title: 'Login page not responsive on mobile devices',
    description: 'The login form overflows on smaller screens and buttons are not properly aligned.',
    status: 'Open',
   
    reporter: {
      name: 'Mike Chen',
    },
    createdAt: '2024-01-15',
    project: 'Web App'
  },
  {
    id: 'BUG-002',
    title: 'Database connection timeout in production',
    description: 'Users experiencing slow page loads and occasional 504 errors during peak hours.',
    status: 'In Progress',
      
    reporter: {
      name: 'Emily Davis',
    },
    createdAt: '2024-01-14',
    project: 'Backend API'
  },
  {
    id: 'BUG-003',
    title: 'Email notifications not being sent',
    description: 'Password reset and verification emails are not reaching users inbox.',
    status: 'Resolved',
   
    reporter: {
      name: 'Lisa Brown',
    },
    createdAt: '2024-01-13',
    project: 'Email Service'
  },
  {
    id: 'BUG-004',
    title: 'File upload fails for large files',
    description: 'Users cannot upload files larger than 10MB, getting timeout errors.',
    status: 'Open',
    reporter: {
      name: 'John Smith',
    },
    createdAt: '2024-01-12',
    project: 'File Manager'
  },
  {
    id: 'BUG-005',
    title: 'Search functionality returns incorrect results',
    description: 'Search queries with special characters return no results or wrong data.',
    status: 'Closed',
    reporter: {
      name: 'Robert Lee',
    },
    createdAt: '2024-01-10',
    project: 'Search Engine'
  }
];

const statusFilters = ['all', 'open', 'in-progress', 'resolved', 'closed'];
const priorityFilters = ['all', 'low', 'medium', 'high', 'critical'];

export const Tickets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all';
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tickets</h1>
            <p className="text-muted-foreground">Manage and track all bug reports and issues</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search tickets..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Status: {statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {statusFilters.map((status) => (
                  <DropdownMenuItem 
                    key={status}
                    onClick={() => setStatusFilter(status)}
                  >
                    {status === 'all' ? 'All Status' : status.replace('-', ' ')}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Priority: {priorityFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {priorityFilters.map((priority) => (
                  <DropdownMenuItem 
                    key={priority}
                    onClick={() => setPriorityFilter(priority)}
                  >
                    {priority === 'all' ? 'All Priority' : priority}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <SortAsc className="h-4 w-4 mr-2" />
              Sort by Date
            </Button>
            <Button variant="outline" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-sm">
          <Badge variant="outline" className="px-3 py-1">
            Total: {filteredTickets.length}
          </Badge>
          <Badge variant="outline" className="px-3 py-1 text-info">
            Open: {filteredTickets.filter(t => t.status === 'Open').length}
          </Badge>
          <Badge variant="outline" className="px-3 py-1 text-warning">
            In Progress: {filteredTickets.filter(t => t.status === 'In Progress').length}
          </Badge>
          <Badge variant="outline" className="px-3 py-1 text-success">
            Resolved: {filteredTickets.filter(t => t.status === 'Resolved').length}
          </Badge>
        </div>

        {/* Tickets Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTickets.map((ticket) => (
            <TicketCard 
              key={ticket.id} 
              ticket={ticket}
              
            />
          ))}
        </div>

        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tickets found matching your criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};