import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    github: "",
    subject: "",
    urgency: "Normal",
    feedbackType: "General",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const feedbackOptions = ["General", "Bug Report", "Feature Request", "Other"];
  const urgencyOptions = ["Low", "Normal", "High", "Critical"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/sendFeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send feedback");

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        role: "",
        github: "",
        subject: "",
        urgency: "Normal",
        feedbackType: "General",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-slate-900 text-white">
      <Navbar />

      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-blue-500">
          Feedback & Suggestions
        </h1>
        <p className="text-gray-300 text-center mb-12">
          Help us improve SkillNet! Share your thoughts, report issues, suggest features, or let us know your experience.
        </p>

        <form onSubmit={handleSubmit} className="bg-slate-800 p-10 rounded-3xl border border-slate-700 space-y-6 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              name="company"
              placeholder="Company / Organization"
              value={formData.company}
              onChange={handleChange}
            />
            <Input
              name="role"
              placeholder="Your Role / Position"
              value={formData.role}
              onChange={handleChange}
            />
            <Input
              name="github"
              placeholder="GitHub / Portfolio URL"
              value={formData.github}
              onChange={handleChange}
            />
            <Input
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <div>
              <label className="block mb-2 text-gray-400">Urgency</label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {urgencyOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-gray-400">Feedback Type</label>
            <select
              name="feedbackType"
              value={formData.feedbackType}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {feedbackOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <Textarea
              name="message"
              placeholder="Your feedback..."
              value={formData.message}
              onChange={handleChange}
              rows={6}
              required
              className="bg-slate-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-4 py-3 w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send Feedback"}
          </Button>

          {status === "success" && <p className="text-green-400 text-center mt-4">Feedback sent successfully! Thank you.</p>}
          {status === "error" && <p className="text-red-400 text-center mt-4">Something went wrong. Try again later.</p>}
        </form>
      </section>
    </div>
  );
};

export default FeedbackPage;
