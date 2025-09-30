import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare, TrendingUp, Users } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Skills', value: user?.skills.length || 0, icon: Star, color: 'text-primary' },
    { label: 'Messages', value: 12, icon: MessageSquare, color: 'text-primary' },
    { label: 'Profile Views', value: 234, icon: TrendingUp, color: 'text-primary' },
    { label: 'Connections', value: 45, icon: Users, color: 'text-primary' },
  ];

  const recentActivity = [
    { type: 'message', text: 'New message from Sarah Johnson', time: '5 min ago' },
    { type: 'rating', text: 'Mike Chen rated your service 5 stars', time: '2 hours ago' },
    { type: 'view', text: 'Your profile was viewed 15 times today', time: '5 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 text-4xl font-bold">
            Welcome back, <span className="text-gradient">{user?.name}</span>!
          </h1>
          <p className="text-muted-foreground">Here's what's happening with your profile</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover-lift">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-10 w-10 ${stat.color}`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <h2 className="mb-6 text-2xl font-bold">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-3 rounded-lg border border-border p-4 hover:bg-secondary-hover"
                  >
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{activity.text}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-6">
              <h2 className="mb-6 text-2xl font-bold">Quick Actions</h2>
              <div className="space-y-3">
                <Button variant="default" className="w-full justify-start">
                  Add New Skill
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View Messages
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Browse Skills
                </Button>
              </div>
            </Card>

            {/* Profile Completion */}
            <Card className="mt-6 p-6">
              <h3 className="mb-4 font-bold">Profile Completion</h3>
              <div className="mb-2 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-3/4 bg-gradient-primary" />
              </div>
              <p className="text-sm text-muted-foreground">75% Complete</p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
