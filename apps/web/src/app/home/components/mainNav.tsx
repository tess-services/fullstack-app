import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: Readonly<React.HTMLAttributes<HTMLElement>>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <NavLink
        to="overview"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </NavLink>
      <NavLink
        to="customers"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Customers
      </NavLink>
      <NavLink
        to="projects"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Projects
      </NavLink>
    </nav>
  );
}
