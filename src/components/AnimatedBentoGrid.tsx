import React from "react";
import { cn } from "../lib/utils";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

const items = [
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
  {
    title: "Field Marketing Reimbursement & Submission Portal",
    description: "Structured expense submission with image uploads. Managers review and approve claims with real-time tracking. Creates a clean, transparent, and fraud-resistant reimbursement workflow for on-field employees.",
    className: "md:col-span-1",
  },
  {
    title: "Civic Issues Reporting Portal",
    description: "Report civic issues with images and location tagging. Track complaint status and bring transparency to problem solving. Users upload images, tag exact locations, choose departments, and track their complaints in real time.",
    className: "md:col-span-2",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&auto=format&fit=crop",
  },
];

export function AnimatedBentoGrid() {
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
