import { useState } from "react";
import { Navbar } from '@/components/Navbar';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Calendar, TrendingUp, Users, Award, BookOpen, Globe, Target, Lightbulb, Heart, Zap, ChevronDown } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Abdul Rafi",
    role: "Founder & CEO",
    description: "Visionary behind SkillNet, committed to connecting global learners and professionals.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300"
  },
  {
    id: 2,
    name: "Sania Khan",
    role: "Co-Founder & CTO",
    description: "Leading technology innovation and development for SkillNet's growing platform.",
    image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300&h=300"
  },
  {
    id: 3,
    name: "Rahul Mehta",
    role: "Director of Community",
    description: "Guiding mentorship programs and building an engaging learning community.",
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300"
  },
  {
    id: 4,
    name: "Maya Patel",
    role: "Head of Marketing",
    description: "Driving brand awareness and creating meaningful connections with our community.",
    image: "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=300&h=300"
  },
];

const fullYearData = {
  "2024": [
    { month: "Jan", users: 50, mentors: 10, courses: 15, engagement: 45 },
    { month: "Feb", users: 120, mentors: 18, courses: 25, engagement: 68 },
    { month: "Mar", users: 300, mentors: 35, courses: 48, engagement: 82 },
    { month: "Apr", users: 500, mentors: 55, courses: 72, engagement: 90 },
    { month: "May", users: 800, mentors: 85, courses: 105, engagement: 95 },
    { month: "Jun", users: 1100, mentors: 120, courses: 145, engagement: 98 },
    { month: "Jul", users: 1350, mentors: 145, courses: 178, engagement: 96 },
    { month: "Aug", users: 1520, mentors: 168, courses: 205, engagement: 94 },
    { month: "Sep", users: 1680, mentors: 185, courses: 230, engagement: 97 },
    { month: "Oct", users: 1850, mentors: 200, courses: 255, engagement: 99 },
    { month: "Nov", users: 2020, mentors: 215, courses: 280, engagement: 98 },
    { month: "Dec", users: 2200, mentors: 230, courses: 310, engagement: 100 },
  ],
  "2023": [
    { month: "Jan", users: 10, mentors: 3, courses: 5, engagement: 30 },
    { month: "Feb", users: 15, mentors: 4, courses: 7, engagement: 35 },
    { month: "Mar", users: 22, mentors: 5, courses: 10, engagement: 40 },
    { month: "Apr", users: 28, mentors: 6, courses: 12, engagement: 42 },
    { month: "May", users: 35, mentors: 7, courses: 14, engagement: 45 },
    { month: "Jun", users: 40, mentors: 8, courses: 16, engagement: 48 },
    { month: "Jul", users: 45, mentors: 9, courses: 18, engagement: 50 },
    { month: "Aug", users: 50, mentors: 10, courses: 20, engagement: 52 },
    { month: "Sep", users: 55, mentors: 11, courses: 22, engagement: 55 },
    { month: "Oct", users: 60, mentors: 12, courses: 24, engagement: 58 },
    { month: "Nov", users: 65, mentors: 13, courses: 26, engagement: 60 },
    { month: "Dec", users: 70, mentors: 14, courses: 28, engagement: 62 },
  ],
};

const dateRanges = {
  "Last 3 Months": 3,
  "Last 6 Months": 6,
  "Last Year": 12,
  "All Time": 24,
};

const milestones = [
  { year: "2023", title: "SkillNet Launched", description: "Started with 10 passionate learners" },
  { year: "2023", title: "First 100 Users", description: "Reached our first major milestone" },
  { year: "2024", title: "1000+ Community", description: "Built a thriving learning ecosystem" },
  { year: "2024", title: "Global Expansion", description: "Welcomed users from 50+ countries" },
];

const AboutUs = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedRange, setSelectedRange] = useState("Last Year");
  const [chartType, setChartType] = useState<"line" | "bar" | "area">("area");
  const [metric, setMetric] = useState<"users" | "mentors" | "courses" | "engagement">("users");

  const getFilteredData = () => {
    const monthsToShow = dateRanges[selectedRange as keyof typeof dateRanges];
    const yearData = fullYearData[selectedYear as keyof typeof fullYearData];

    if (monthsToShow === 24) {
      const prevYear = (parseInt(selectedYear) - 1).toString();
      const prevYearData = fullYearData[prevYear as keyof typeof fullYearData] || [];
      return [...prevYearData, ...yearData];
    }

    return yearData.slice(-monthsToShow);
  };

  const filteredData = getFilteredData();

  const metricLabels = {
    users: "Active Users",
    mentors: "Mentors",
    courses: "Courses",
    engagement: "Engagement %"
  };

  const metricColors = {
    users: "#3b82f6",
    mentors: "#10b981",
    courses: "#f59e0b",
    engagement: "#8b5cf6"
  };

  const renderChart = () => {
    const commonProps = {
      data: filteredData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    const dataKey = metric;
    const color = metricColors[metric];

    if (chartType === "line") {
      return (
        <LineChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
            labelStyle={{ color: "#f3f4f6" }}
          />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={3} name={metricLabels[metric]} dot={{ fill: color, r: 4 }} />
        </LineChart>
      );
    }

    if (chartType === "bar") {
      return (
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
            labelStyle={{ color: "#f3f4f6" }}
          />
          <Legend />
          <Bar dataKey={dataKey} fill={color} name={metricLabels[metric]} radius={[8, 8, 0, 0]} />
        </BarChart>
      );
    }

    return (
      <AreaChart {...commonProps}>
        <defs>
          <linearGradient id={`color${metric}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="month" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
          labelStyle={{ color: "#f3f4f6" }}
        />
        <Legend />
        <Area type="monotone" dataKey={dataKey} stroke={color} fillOpacity={1} fill={`url(#color${metric})`} name={metricLabels[metric]} />
      </AreaChart>
    );
  };

  return (
    <div className="min-h-screen bg-background">
          <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* Hero Section */}
     <section className="relative bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#1a1a1a] py-24 text-center px-6 overflow-hidden">

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl"></div>
        </div>
        <div className="relative z-10">
         <h1 className="text-5xl md:text-7xl font-bold mb-6">
  <span className="text-[#0d6efd]">SkillNet</span>
  <span className="text-white">: Empowering Global Talent</span>
</h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Connecting learners and professionals worldwide. Discover, share, and grow your skills in a thriving community built on collaboration and innovation.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg">
              Join Our Community
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 px-8 py-4 rounded-xl font-semibold transition-all border border-slate-600">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-blue-400" />
              <h3 className="text-3xl font-bold">Our Mission</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              To democratize learning by creating a global platform where anyone can access high-quality mentorship,
              share expertise, and build meaningful connections that transcend geographical boundaries.
            </p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8 text-cyan-400" />
              <h3 className="text-3xl font-bold">Our Vision</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              To become the world's most trusted skill-sharing ecosystem, empowering millions to achieve their
              professional goals through collaborative learning and authentic human connections.
            </p>
          </div>
        </div>
      </section>

      {/* Impact & Reach Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Our Impact
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { icon: Users, value: "2.2K+", label: "Active Users", color: "text-blue-400" },
            { icon: Award, value: "230+", label: "Expert Mentors", color: "text-cyan-400" },
            { icon: BookOpen, value: "310+", label: "Skills & Courses", color: "text-emerald-400" },
            { icon: Globe, value: "50+", label: "Countries", color: "text-amber-400" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center group cursor-pointer">
              <div className="bg-slate-800 p-6 rounded-2xl hover:bg-slate-700 transition-all transform hover:scale-105 border border-slate-700 hover:border-slate-600">
                <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advanced Analytics Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-blue-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Growth Analytics
            </h2>
          </div>
          <p className="text-center text-gray-400 mb-12 text-lg">Track our journey and milestones over time</p>

          {/* Filter Controls */}
          <div className="bg-slate-800 rounded-2xl p-6 mb-8 border border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

              {/* Year Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Year
                </label>
                <div className="relative">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                  >
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Date Range Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Date Range</label>
                <div className="relative">
                  <select
                    value={selectedRange}
                    onChange={(e) => setSelectedRange(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                  >
                    {Object.keys(dateRanges).map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Metric Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Metric</label>
                <div className="relative">
                  <select
                    value={metric}
                    onChange={(e) => setMetric(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                  >
                    <option value="users">Active Users</option>
                    <option value="mentors">Mentors</option>
                    <option value="courses">Courses</option>
                    <option value="engagement">Engagement</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Chart Type Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Chart Type</label>
                <div className="flex gap-2">
                  {(["line", "bar", "area"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setChartType(type)}
                      className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all capitalize ${
                        chartType === type
                          ? "bg-blue-600 text-white"
                          : "bg-slate-900 text-gray-400 hover:bg-slate-700"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Chart Display */}
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Stats Below Chart */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {Object.entries(metricLabels).map(([key, label]) => {
              const latestValue = filteredData[filteredData.length - 1]?.[key as keyof typeof filteredData[0]];
              const previousValue = filteredData[filteredData.length - 2]?.[key as keyof typeof filteredData[0]];
              const growth = previousValue ? (((latestValue - previousValue) / previousValue) * 100).toFixed(1) : "0";

              return (
                <div key={key} className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <p className="text-sm text-gray-400 mb-1">{label}</p>
                  <p className="text-2xl font-bold mb-1">{latestValue}</p>
                  <p className={`text-sm ${parseFloat(growth) >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {parseFloat(growth) >= 0 ? "↑" : "↓"} {Math.abs(parseFloat(growth))}%
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-20 px-6 bg-slate-900/50">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Our Journey
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 via-cyan-500 to-blue-600"></div>
            {milestones.map((milestone, idx) => (
              <div key={idx} className={`relative mb-12 ${idx % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                <div className={`md:w-1/2 ${idx % 2 === 0 ? "md:pr-12 ml-auto" : "md:pl-12"}`}>
                  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all">
                    <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span className="text-sm font-semibold text-blue-400">{milestone.year}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-900"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: Heart, title: "Community First", description: "We prioritize building meaningful connections and fostering a supportive environment for all members." },
            { icon: Lightbulb, title: "Innovation", description: "We continuously evolve our platform with cutting-edge features to enhance the learning experience." },
            { icon: Globe, title: "Accessibility", description: "We believe quality education should be accessible to everyone, everywhere, regardless of background." },
          ].map((value, idx) => (
            <div key={idx} className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all group cursor-pointer">
              <value.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
              <p className="text-gray-400 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Meet Our Leadership
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">The passionate team behind SkillNet's success</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {teamMembers.map(member => (
            <div key={member.id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-all group cursor-pointer">
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-blue-400 mb-3 font-medium">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Join SkillNet */}
      <section className="py-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Why Choose SkillNet?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Learn From Experts",
              description: "Access skilled mentors and industry professionals who are passionate about helping you grow and succeed in your career.",
              icon: Award
            },
            {
              title: "Share Your Skills",
              description: "Teach others and build your professional portfolio while making a meaningful impact in the global learning community.",
              icon: BookOpen
            },
            {
              title: "Connect Globally",
              description: "Network with learners and professionals from over 50 countries to expand your horizons and unlock new opportunities.",
              icon: Globe
            },
          ].map((feature, idx) => (
            <div key={idx} className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all group">
              <feature.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 p-12 rounded-3xl shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-blue-50">Join thousands of learners and mentors building their future together</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
              Get Started Free
            </button>
            <button className="bg-blue-800 hover:bg-blue-900 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all border-2 border-blue-400">
              Learn More
            </button>
          </div>
        </div>
      </section>

    </div>
     </div>
  );
};

export default AboutUs;