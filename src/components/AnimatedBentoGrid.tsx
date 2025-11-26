import React from "react";
import { cn } from "../lib/utils";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

const problemStatementsByDomain: Record<string, Array<{
  title: string;
  description: string;
  className: string;
  image?: string;
}>> = {
  webdev: [
    // Row 1: 2 + 1 = 3
    {
      title: "Invoice & Quotation Generation System",
      description: "Automate invoice and quotation creation with correct totals, taxes, and branding. Store documents centrally, track payments, and send reminders automatically. Reduces manual effort, removes errors, and makes the entire billing workflow professional and fast.",
      className: "md:col-span-2",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop",
    },
    {
      title: "Location-Based Sports Portal With Team-Up & Wallet System",
      description: "Find teammates nearby, join games instantly, and auto-split booking costs with an in-app wallet system. Creates a clean, real-time system for finding teammates, forming groups, and handling payments without any hassle.",
      className: "md:col-span-1",
    },
    // Row 2: 1 + 2 = 3
    {
      title: "AI-Based Personalized Learning System",
      description: "Resume-driven chatbot that identifies skill gaps and generates personalized learning plans that adapt to your pace. The AI adjusts the plan automatically to match learning speed, creating a smart and adaptive experience.",
      className: "md:col-span-1",
    },
    {
      title: "AI Avatar Royalty-Based Portal",
      description: "Upload AI avatars, images, and voice clones. Earn royalties automatically when others download or use your creations. Every download or usage triggers a per-use royalty that goes straight into the creator's wallet.",
      className: "md:col-span-2",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop",
    },
    // Row 3: 1 + 1 + 1 = 3
    {
      title: "Field Marketing Reimbursement & Submission Portal",
      description: "Structured expense submission with image uploads. Managers review and approve claims with real-time tracking. Creates a clean, transparent, and fraud-resistant reimbursement workflow for on-field employees.",
      className: "md:col-span-1",
    },
    {
      title: "Digital Healthcare Management",
      description: "Create a digital solution that supports smoother interaction between doctors and patients, makes treatment-related information easier to follow, and enhances clarity and confidence throughout the care process—while maintaining privacy and ease of use.",
      className: "md:col-span-1",
    },
    {
      title: "Civic Issues Reporting Portal",
      description: "Report civic issues with images and location tagging. Track complaint status and bring transparency to problem solving. Users upload images, tag exact locations, choose departments, and track their complaints in real time.",
      className: "md:col-span-1",
    },
  ],
  uiux: [
    // Row 1: 2 + 1 = 3
    {
      title: "In-house Campus Navigator",
      description: "Design an app that helps students navigate the campus, find rooms, explore events, and receive instant updates from departments. Students often struggle to find classrooms, labs, event venues, or department offices.",
      className: "md:col-span-2",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Health on a Budget",
      description: "Create a simple health app that helps students maintain nutrition, track meals, and find affordable food options. Build a wellness app that provides affordable meal suggestions, basic nutrition tracking, and quick routines.",
      className: "md:col-span-1",
    },
    // Row 2: 1 + 2 = 3
    {
      title: "Transport Buddy for College",
      description: "Design a system that provides real-time bus tracking, late notifications, and organized route information for students. Create an app that gives students real-time bus tracking, route updates, and reliable notifications.",
      className: "md:col-span-1",
    },
    {
      title: "Mental Wellbeing for Students",
      description: "Create a calm and student-friendly mental wellness app with journaling, anonymous support, and positive nudges. Build a gentle app that offers journaling, daily emotional check-ins, anonymous support, and simple relaxation tools.",
      className: "md:col-span-2",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
    },
    // Row 3: 2 + 1 = 3
    {
      title: "Placement Prep Simplified",
      description: "Develop an app that offers curated study materials, mock interviews, progress tracking, and personalized placement guidance. Design an app that offers curated resources, mock interview practice, skill tracking, and personalized preparation plans.",
      className: "md:col-span-2",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Event Genie – College Event Manager",
      description: "Build an app that manages event registrations, updates, schedules, and ensures smooth coordination during college events. Create an event management app that centralizes schedules, team info, updates, and registrations.",
      className: "md:col-span-1",
    },
    // Row 4: 1 + 1 + 1 = 3
    {
      title: "Smart Canteen Ordering System",
      description: "Design a pre-order and live availability app for the canteen to reduce queues and improve clarity on food availability. Build a canteen app that lets students view live menu availability, pre-order food, and receive estimated pickup times.",
      className: "md:col-span-1",
    },
    {
      title: "AI-Powered Learning Assistant",
      description: "Design an AI-powered, voice-enabled mobile assistant that helps learners plan schedules, solve doubts, and stay motivated. Build an intuitive, motivational experience with human-like interactions that adapts daily to user needs.",
      className: "md:col-span-1",
    },
    {
      title: "Digital Queue System for Govt Offices",
      description: "Design a mobile + kiosk experience for government offices (passport, RTO, municipality) that gives token + live waiting time, guides users to the right counter, and works for non-tech-savvy users with multiple languages.",
      className: "md:col-span-1",
    },
    // Row 5: 2 + 1 = 3
    {
      title: "Reel Sync App",
      description: "Design an app that lets users pick any short video, swap in their own face or avatar, optionally change styling (outfit, vibe, filters, expressions), and post it as their own version of that reel without needing editing skills.",
      className: "md:col-span-2",
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Emotion Credit – A Future Social Economy",
      description: "Design an Emotion Credit Wallet where people earn emotional credit by acts like listening, helping, mediating conflicts. Certain experiences are unlocked via this score. Users can see how their daily interactions impact their emotional balance.",
      className: "md:col-span-1",
    },
    // Row 6: 1 + 2 = 3
    {
      title: "Hostel / PG Leftover Exchange Board",
      description: "Design a hyper-local leftover sharing interface for hostels and PGs. Users can post extra food in 2 taps, others can claim anonymously with minimal friction. Think about safety, hygiene, and social awkwardness with smart filters.",
      className: "md:col-span-1",
    },
    {
      title: "Transparent Bill & Distance for Food Delivery",
      description: "Design a transparent experience for food delivery apps. Show distance calculation, base charges, platform fees, and surge in a way users actually understand. Build UX that prevents feelings of being cheated with simple dispute options.",
      className: "md:col-span-2",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&auto=format&fit=crop&q=80",
    },
    // Row 7: 2 + 1 = 3
    {
      title: "Speaker Discovery & Shortlisting for Event Organizers",
      description: "Design an interface that helps event organizers find and shortlist speakers. Start from goal & audience, get a curated small shortlist, compare speakers quickly (topics, style, past events, ratings), and share shortlists with the team easily.",
      className: "md:col-span-2",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Making Friends in a New City",
      description: "Design a safe, low-awkwardness social app that helps people in a new city discover people nearby with similar interests, join or create small casual hangouts (3–6 people, public places), with verification and clear boundaries.",
      className: "md:col-span-1",
    },
  ],
  vibe: [
    // Row 1: 2 + 1 = 3
    {
      title: "Universal Digital Credentials Verifier",
      description: "Build a platform to combat credential fraud and lengthy verification processes. Students face widespread certificate forgery, time-consuming manual verification, and fragmented systems. Create a unified digital infrastructure with blockchain-based proof, QR codes, and real-time verification for academic certificates, internships, and skill certifications.",
      className: "md:col-span-2",
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Code-to-Production Fast Lane",
      description: "Create a one-click deployment platform for students and hackathon participants. Eliminate complex DevOps processes, high hosting costs, and security vulnerabilities. Enable students to deploy projects instantly with automated testing, security scanning, and portfolio-ready output without technical barriers.",
      className: "md:col-span-1",
    },
    // Row 2: 1 + 2 = 3
    {
      title: "Smart Prescription & Medicine Reminder",
      description: "Develop a system for patients managing chronic illnesses and elderly individuals. Address complex medication schedules, missed doses, and confusion over medicine names. Integrate prescription scanning, refill alerts, caregiver notifications, and dose history tracking with voice-based reminders for elderly users.",
      className: "md:col-span-1",
    },
    {
      title: "AI-Powered Real-Time Interview Feedback",
      description: "Build an AI platform providing personalized feedback on coding skills and communication abilities. Analyze code in real-time, assess confidence and body language, simulate interview pressure, and offer industry-specific scenarios. Track progress across multiple sessions with customized learning paths.",
      className: "md:col-span-2",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    },
  ],
  ai: [
    // Row 1: 2 + 1 = 3
    {
      title: "Greenwashing Risk Auditor for Corporate Sustainability Reports",
      description: "Develop an AI system that evaluates ESG and sustainability reports to identify misleading claims, missing metrics, and unverifiable statements. Analyzes contradictions, historical data, and emissions compliance to provide a credibility score that helps investors and regulators detect potential greenwashing.",
      className: "md:col-span-2",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Carbon Credit Fraud Detection System",
      description: "Develop an AI that validates carbon credit claims using satellite data, emissions history, local energy usage, and anomaly detection. It flags inconsistencies and recommends verification steps for authorities.",
      className: "md:col-span-1",
    },
    // Row 2: 1 + 2 = 3
    {
      title: "Autonomous Circular Economy Marketplace",
      description: "Build an AI marketplace that predicts resale value of recyclable materials, negotiates prices, and matches sellers with recyclers. It evaluates material quality, demand, transport feasibility, and price trends.",
      className: "md:col-span-1",
    },
    {
      title: "Personalized Early-Risk Detector for Chronic Diseases",
      description: "Develop an AI that analyzes lifestyle habits, food choices, climate exposure, and medical history to detect early risk for chronic diseases. It generates personalized prevention and lifestyle recommendations.",
      className: "md:col-span-2",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    },
    // Row 3: 2 + 1 = 3
    {
      title: "Hospital Resource Forecasting Agent for Emergency Preparedness",
      description: "Create an AI that predicts future hospital resource demand — ICU beds, oxygen, medicines — using environmental patterns, outbreaks, and seasonal diseases. It helps hospitals reduce shortages and optimize capacity.",
      className: "md:col-span-2",
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Job Readiness Evaluator for Green & Digital Skills",
      description: "Build an AI that analyzes student skills, projects, and market trends to evaluate readiness for green-tech and digital-tech careers. It recommends personalized learning paths and predicts job fit.",
      className: "md:col-span-1",
    },
  ],
};

interface AnimatedBentoGridProps {
  domain?: string;
}

export function AnimatedBentoGrid({ domain = 'webdev' }: AnimatedBentoGridProps) {
  const items = problemStatementsByDomain[domain] || problemStatementsByDomain.webdev;

  return (
    <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={
            item.image ? (
              <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-70 group-hover/bento:opacity-80 transition-opacity duration-300 brightness-110"
                />
              </div>
            ) : undefined
          }
          className={cn(item.className, "bg-black border-white/20 hover:border-purple-500/50")}
        />
      ))}
    </BentoGrid>
  );
}
