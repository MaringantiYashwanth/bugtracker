import React, { useState, useEffect } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import {TicketCard } from './TicketCard';
import type { Ticket } from './TicketCard';
import { Badge } from '../../components/ui/badge';
import { Search, Filter } from 'lucide-react';

const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Login Bug',
    description: 'User unable to log in with correct credentials.',
    status: 'Open',
    reporter: { name: 'Alice Smith' },
    createdAt: '2025-07-25T10:00:00Z',
    project: 'Bug Tracker Web',
  },
  {
    id: '2',
    title: 'Profile Picture Not Uploading',
    description: 'Upload spinner spins forever.',
    status: 'In Progress',
    reporter: { name: 'Bob Patel' },
    createdAt: '2025-07-24T14:20:00Z',
    project: 'Bug Tracker Web',
  },
];

export const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate fetching from backend
    setTickets(mockTickets);
  }, []);

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Input
          placeholder="Search tickets"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {filteredTickets.length > 0 ? (
        <div className="grid gap-4">
          {filteredTickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <p className="text-zinc-500">No tickets found.</p>
      )}
    </div>
  );
};
