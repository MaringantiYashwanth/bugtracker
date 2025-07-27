import React, { useState } from 'react';
import { Layout } from '../layout/Layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { 
  Plus, 
  Search, 
  Mail,
  Phone,
  Calendar,
  Settings,
  MoreVertical
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'developer' | 'qa' | 'manager';
  avatar?: string;
  initials: string;
  status: 'active' | 'inactive';
  joinDate: string;
  ticketsAssigned: number;
  ticketsResolved: number;
}

const users: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'admin',
    initials: 'SJ',
    status: 'active',
    joinDate: '2023-01-15',
    ticketsAssigned: 12,
    ticketsResolved: 8
  },
  {
    id: '2',
    name: 'David Wilson',
    email: 'david@example.com',
    role: 'developer',
    initials: 'DW',
    status: 'active',
    joinDate: '2023-03-20',
    ticketsAssigned: 18,
    ticketsResolved: 15
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'qa',
    initials: 'ED',
    status: 'active',
    joinDate: '2023-02-10',
    ticketsAssigned: 6,
    ticketsResolved: 4
  },
  {
    id: '4',
    name: 'Alex Thompson',
    email: 'alex@example.com',
    role: 'developer',
    initials: 'AT',
    status: 'inactive',
    joinDate: '2022-11-05',
    ticketsAssigned: 3,
    ticketsResolved: 10
  }
];

const roleColors = {
  admin: 'bg-destructive text-destructive-foreground',
  developer: 'bg-info text-info-foreground',
  qa: 'bg-warning text-warning-foreground',
  manager: 'bg-success text-success-foreground'
};

export const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Team Members</h1>
            <p className="text-muted-foreground">Manage your team and user permissions</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Invite User
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Total: {filteredUsers.length} users</span>
            <span>•</span>
            <span>Active: {filteredUsers.filter(u => u.status === 'active').length}</span>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-lg font-semibold">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{user.name}</h3>
                      <Badge className={`text-xs ${roleColors[user.role]}`}>
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Settings className="h-4 w-4 mr-2" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Remove User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    {user.email}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Joined {user.joinDate}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-foreground">
                      {user.ticketsAssigned}
                    </div>
                    <div className="text-xs text-muted-foreground">Assigned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-success">
                      {user.ticketsResolved}
                    </div>
                    <div className="text-xs text-muted-foreground">Resolved</div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex justify-center">
                  <Badge 
                    variant={user.status === 'active' ? 'default' : 'secondary'}
                    className={user.status === 'active' ? 'bg-success text-success-foreground' : ''}
                  >
                    {user.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No users found matching your search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};