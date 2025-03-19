import {Link} from "react-router-dom";
import { cn } from "@/lib/utils";

export function MainNav({ className, ...props }) {
  const navLinks = [
    { href: "/examples/dashboard", label: "Overview", isActive: true },
    { href: "/examples/customers", label: "Customers", isActive: false },
    { href: "/examples/products", label: "Products", isActive: false },
    { href: "/examples/settings", label: "Settings", isActive: false },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {navLinks.map(({ href, label, isActive }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            !isActive && "text-muted-foreground"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
