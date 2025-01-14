import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChartLine, Github, Heart, Home } from "lucide-react";
import { Link, useLocation } from "react-router";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Favorites",
    url: "/favorites",
    icon: Heart,
  },
  {
    title: "Statistics",
    url: "/statistics",
    icon: ChartLine,
  },
];

export function AppSidebar() {
  const location = useLocation(); // Get the current location

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Zest Github Fetcher</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={
                      location.pathname === item.url
                        ? "bg-zinc-700 text-white transition hover:bg-zinc-700 hover:text-white"
                        : "hover:bg-zinc-300 transition"
                    }
                  >
                    <Link to={item.url}>
                      <item.icon className="bg-red" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <a
          href="https://github.com/OptimaLPro"
          target="_blank"
          rel="noreferrer"
        >
          <div className="flex items-center justify-center gap-2">
            <Github />
            Nati
          </div>
        </a>
      </SidebarFooter>
    </Sidebar>
  );
}
