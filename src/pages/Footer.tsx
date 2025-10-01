import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

export const Footer = () => {
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <footer className="bg-[#0d0d0d] text-white py-12 relative z-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Branding & Tagline */}
        <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
          <h1 className="text-3xl font-bold text-gradient mb-2">SkillNet</h1>
          <p className="text-gray-300 text-lg">
            Connect the skills you <span className="text-primary font-semibold">desire</span> &amp; grow your potential 🚀
          </p>
          <p className="text-gray-400 mt-2 text-sm">
            Made with <span className="text-red-500">♥</span> by{" "}
            <a
              href="https://rafiabdul143.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Abdul Rafi
            </a>
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start space-y-1">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <Link to="/" className="text-gray-300 hover:text-primary">Home</Link>
          <Link to="#explore" className="text-gray-300 hover:text-primary">Explore</Link>
        </div>

        {/* About Us */}
        <div className="flex flex-col items-center md:items-start space-y-1">
          <h3 className="text-lg font-semibold mb-2">About Us</h3>
          <p className="text-gray-300 text-sm max-w-xs text-center md:text-left">
            SkillNet is a platform that connects learners and professionals to share and enhance skills, grow careers, and build meaningful connections.
          </p>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-gray-300 text-sm">Email: <a href="mailto:info@skillnet.com" className="text-primary hover:underline">info@skillnet.com</a></p>
          <p className="text-gray-300 text-sm">Phone: <a href="tel:+1234567890" className="text-primary hover:underline">+1 234 567 890</a></p>

          {/* Feedback & FAQs Buttons */}
          <div className="flex flex-col space-y-2 mt-2 w-full md:w-auto">
            <Link to="/feedback">
              <Button variant="default" className="w-full md:w-auto">
                Feedback
              </Button>
            </Link>

            <Dialog open={faqOpen} onOpenChange={setFaqOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">FAQs</Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1a1a1a] text-white max-w-lg">
                <DialogHeader>
                  <DialogTitle>Frequently Asked Questions</DialogTitle>
                </DialogHeader>
                <div className="mt-2 text-gray-300 space-y-3">
                  <p><strong>Q:</strong> How do I search for skills?</p>
                  <p><strong>A:</strong> Use the search bar on the homepage to find skills and services.</p>
                  <p><strong>Q:</strong> How do I connect with a mentor?</p>
                  <p><strong>A:</strong> Click on a skill card and contact the provider directly.</p>
                  <p><strong>Q:</strong> Can I add my own skill?</p>
                  <p><strong>A:</strong> Yes! Sign up and navigate to your dashboard to add skills.</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} SkillNet. All rights reserved.
      </div>
    </footer>
  );
};
