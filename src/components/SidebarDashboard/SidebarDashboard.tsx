import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";

export default function SidebarDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
          <SidebarTrigger />
          {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
