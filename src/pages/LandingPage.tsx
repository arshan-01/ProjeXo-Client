
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 flex items-center justify-between border-b sticky top-0 bg-background z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">TaskMaster</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/login")}>
            Log in
          </Button>
          <Button onClick={() => navigate("/register")}>
            Sign up
          </Button>
        </div>
      </header>

      {/* Hero section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 py-12 md:py-24 max-w-7xl mx-auto">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Project Management Reimagined
          </h1>
          <p className="text-xl mb-8 text-muted-foreground">
            TaskMaster helps teams plan, track, and manage projects with an intuitive, feature-rich platform designed for modern workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="font-semibold" onClick={() => navigate("/register")}>
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
              View Demo
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="bg-muted rounded-xl p-4 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="TaskMaster Dashboard"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 px-6 bg-muted">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to manage projects
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Task Management</h3>
              <p className="text-muted-foreground">
                Create, assign, and track tasks with customizable workflows that adapt to your team's needs.
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
              <p className="text-muted-foreground">
                Foster teamwork with real-time updates, comments, and shared workspaces for seamless communication.
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sprint Planning</h3>
              <p className="text-muted-foreground">
                Plan and manage sprints with intuitive tools designed for agile development and project tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trusted by teams worldwide
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-sm border">
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&auto=format&fit=crop" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Jane Doe</p>
                  <p className="text-sm text-muted-foreground">Product Manager, Tech Co.</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "TaskMaster has transformed how our team collaborates. The intuitive interface and powerful features have increased our productivity by 30%."
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm border">
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&auto=format&fit=crop" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">John Smith</p>
                  <p className="text-sm text-muted-foreground">CTO, StartupX</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "We've tried many project management tools, but TaskMaster stands out with its seamless integration between projects, tasks, and communication."
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm border">
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&h=128&auto=format&fit=crop" />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Alice Kim</p>
                  <p className="text-sm text-muted-foreground">Team Lead, Enterprise Inc.</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The sprint planning feature has revolutionized our agile development process. Our teams are more aligned and productive than ever."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section className="py-16 px-6 bg-muted">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-center mb-12 text-muted-foreground">
            Choose the plan that's right for your team
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 border shadow-sm flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <p className="text-muted-foreground mb-4">For individuals and small teams</p>
              <div className="mb-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Up to 5 team members</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Basic project management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Simple task tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>1 GB storage</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </div>

            <div className="bg-background rounded-xl p-6 border border-primary shadow-md flex flex-col relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional</h3>
              <p className="text-muted-foreground mb-4">For growing teams</p>
              <div className="mb-4">
                <span className="text-4xl font-bold">$12</span>
                <span className="text-muted-foreground">/month per user</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Unlimited team members</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Advanced project management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Sprint planning</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>10 GB storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Button className="w-full">
                Start 14-day trial
              </Button>
            </div>

            <div className="bg-background rounded-xl p-6 border shadow-sm flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-muted-foreground mb-4">For large organizations</p>
              <div className="mb-4">
                <span className="text-4xl font-bold">Custom</span>
                <span className="text-muted-foreground"></span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Everything in Professional</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Advanced security</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Custom training</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform how your team works?</h2>
          <p className="text-xl mb-8 text-muted-foreground">
            Join thousands of teams already using TaskMaster to deliver projects on time and within budget.
          </p>
          <Button size="lg" className="font-semibold" onClick={() => navigate("/register")}>
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-lg font-semibold">TaskMaster</span>
            <p className="text-sm text-muted-foreground">© 2025. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
