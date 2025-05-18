// components/ui/card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Card container with consistent height and vertical layout
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col justify-between rounded-lg border bg-card text-card-foreground shadow-sm min-h-[250px]", // consistent size
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

// Header
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// Title with tooltip on hover
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { title?: string }
>(({ className, children, title, ...props }, ref) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <h3
        ref={ref}
        className={cn(
          "text-2xl font-semibold leading-tight tracking-tight line-clamp-2 cursor-default",
          className
        )}
        {...props}
      >
        {children}
      </h3>
    </TooltipTrigger>
    <TooltipContent>
      <p className="text-sm max-w-xs">{title || children}</p>
    </TooltipContent>
  </Tooltip>
));
CardTitle.displayName = "CardTitle";

// Description
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// Scrollable content section
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0 overflow-y-auto flex-1", className)} // scrolls if content overflows
    {...props}
  />
));
CardContent.displayName = "CardContent";

// Footer
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Export all
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
};
