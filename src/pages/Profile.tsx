import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Mail, Phone, Edit } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl"
        >
          {/* Profile Header */}
          <Card className="mb-6 overflow-hidden">
            <div className="h-32 bg-gradient-primary" />
            <div className="relative px-6 pb-6">
              <div className="absolute -top-16 flex h-32 w-32 items-center justify-center rounded-full border-4 border-card bg-gradient-card text-4xl font-bold">
                {user?.name[0]}
              </div>
              <div className="ml-40 pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">{user?.name}</h1>
                    <p className="text-muted-foreground">{user?.email}</p>
                    {user?.location && (
                      <div className="mt-2 flex items-center text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>{user.location.address}</span>
                      </div>
                    )}
                  </div>
                  <Button variant="default">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>

                {/* Rating */}
                <div className="mt-4 flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(user?.rating || 0)
                            ? 'fill-primary text-primary'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{user?.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">(42 reviews)</span>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <Card className="p-6">
                <h2 className="mb-6 text-2xl font-bold">My Skills</h2>
                {user?.skills.length ? (
                  <div className="space-y-4">
                    {user.skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-lg border border-border p-4 hover:bg-secondary-hover"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{skill}</h3>
                            <p className="text-sm text-muted-foreground">
                              Expert Level • 5+ years
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="mb-4 text-muted-foreground">No skills added yet</p>
                    <Button variant="default">Add Your First Skill</Button>
                  </div>
                )}
              </Card>

              {/* Reviews */}
              <Card className="mt-6 p-6">
                <h2 className="mb-6 text-2xl font-bold">Recent Reviews</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="border-b border-border pb-4 last:border-0">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold">
                            J
                          </div>
                          <div>
                            <p className="font-semibold">John Smith</p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-3 w-3 fill-primary text-primary"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">2 days ago</span>
                      </div>
                      <p className="text-muted-foreground">
                        Excellent service! Very professional and knowledgeable.
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Contact Info */}
              <Card className="p-6">
                <h3 className="mb-4 font-bold">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                </div>
              </Card>

              {/* Stats */}
              <Card className="p-6">
                <h3 className="mb-4 font-bold">Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profile Views</span>
                    <span className="font-semibold">234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Projects</span>
                    <span className="font-semibold">42</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Rate</span>
                    <span className="font-semibold">98%</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
