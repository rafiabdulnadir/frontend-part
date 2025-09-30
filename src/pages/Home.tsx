import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SkillCard } from '@/components/SkillCard';
import { Navbar } from '@/components/Navbar';

const mockSkills = [
  {
    id: '1',
    title: 'Web Development',
    provider: 'Sarah Johnson',
    category: 'Technology',
    rating: 4.8,
    reviews: 127,
    location: 'New York, NY',
    price: '$50/hr',
    description: 'Full-stack web development with React, Node.js, and modern frameworks',
  },
  {
    id: '2',
    title: 'Graphic Design',
    provider: 'Mike Chen',
    category: 'Design',
    rating: 4.9,
    reviews: 89,
    location: 'San Francisco, CA',
    price: '$45/hr',
    description: 'Creative design solutions for branding, UI/UX, and marketing materials',
  },
  {
    id: '3',
    title: 'Digital Marketing',
    provider: 'Emma Wilson',
    category: 'Marketing',
    rating: 4.7,
    reviews: 156,
    location: 'Austin, TX',
    price: '$60/hr',
    description: 'SEO, social media marketing, and content strategy for businesses',
  },
  {
    id: '4',
    title: 'Photography',
    provider: 'David Brown',
    category: 'Creative',
    rating: 5.0,
    reviews: 203,
    location: 'Los Angeles, CA',
    price: '$80/hr',
    description: 'Professional photography for events, portraits, and commercial projects',
  },
  {
    id: '5',
    title: 'Language Tutoring',
    provider: 'Maria Garcia',
    category: 'Education',
    rating: 4.9,
    reviews: 94,
    location: 'Miami, FL',
    price: '$35/hr',
    description: 'Spanish and English tutoring for all levels with personalized approach',
  },
  {
    id: '6',
    title: 'Music Lessons',
    provider: 'James Taylor',
    category: 'Arts',
    rating: 4.6,
    reviews: 71,
    location: 'Nashville, TN',
    price: '$40/hr',
    description: 'Guitar and piano lessons for beginners to advanced students',
  },
];

const categories = ['All', 'Technology', 'Design', 'Marketing', 'Creative', 'Education', 'Arts'];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredSkills = mockSkills.filter((skill) => {
    const matchesSearch =
      skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-hero py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
              Discover <span className="text-gradient">Skills</span> Near You
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Connect with talented professionals and share your expertise
            </p>

            {/* Search Bar */}
            <div className="relative mx-auto max-w-2xl mb-4">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for skills, services, or people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 pr-4 text-lg"
              />
            </div>

            <p className="text-sm text-muted-foreground">
              👉 <Link to="/login" className="text-primary hover:underline font-medium">Try demo login</Link> to explore all features
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {filteredSkills.length} Skills Available
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SkillCard {...skill} />
              </motion.div>
            ))}
          </motion.div>

          {filteredSkills.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-xl text-muted-foreground">
                No skills found matching your criteria
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
