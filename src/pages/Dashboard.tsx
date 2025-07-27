import React from 'react';
import { Layout } from '../layout/Layout';
import { StatsCard } from '../components/dashboard/StatCard';
import { TicketCard } from '../components/ticket/TicketCard';
import type {Ticket} from '../components/ticket/TicketCard';
import { Button } from '../components/ui/button';
import { 
  Bug, 
  CheckCircle, 
  Clock, 
  Users, 
  Plus,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '../components/ui/input';

// Mock data
const stats = [
  {
    title: 'Total Tickets',
    value: 156,
    change: '+12% from last month',
    changeType: 'positive' as const,
    icon: Bug,
    iconColor: 'text-primary'
  },
  {
    title: 'Open Tickets',
    value: 42,
    change: '+5% from last week',
    changeType: 'neutral' as const,
    icon: Clock,
    iconColor: 'text-warning'
  },
  {
    title: 'Resolved',
    value: 98,
    change: '+18% from last month',
    changeType: 'positive' as const,
    icon: CheckCircle,
    iconColor: 'text-success'
  },
  {
    title: 'Team Members',
    value: 12,
    change: '2 new this month',
    changeType: 'positive' as const,
    icon: Users,
    iconColor: 'text-info'
  }
];

const recentTickets: Ticket[] = [
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
  }
];

export const Dashboard = () => {
  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your projects.</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Recent Tickets */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Recent Tickets</h2>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search tickets..." 
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentTickets.map((ticket) => (
              <TicketCard 
                key={ticket.id} 
                ticket={ticket}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};