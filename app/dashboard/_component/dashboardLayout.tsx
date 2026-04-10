
"use client";


import { SideBar, Topbar } from "@/app/component/layout";
import { useState } from "react";

type Props = Readonly<{
   children: React.ReactNode;
}>

export function DashboardLayoutClient({ children }: Props) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
       <div className="w-full h-screen flex overflow-hidden bg-background">
         {/* Mobile Overlay */}
         {isSidebarOpen && (
            <div 
               className="fixed inset-0 bg-overlay/50 backdrop-blur-sm z-30 lg:hidden"
               onClick={() => setIsSidebarOpen(false)}
            />
         )}

         {/* Sidebar */}
         <aside className={`
            fixed lg:static inset-y-0 left-0 z-40
            w-63.25 lg:w-63.25 h-full overflow-y-auto no-scrollbar
            transition-transform duration-300 ease-in-out
            lg:translate-x-0
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
         `}>
            <SideBar 
               isSidebarOpen={isSidebarOpen}
               setIsSidebarOpen={setIsSidebarOpen}
            />
         </aside>

         {/* Main Content */}
         <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
            <Topbar 
               onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
               showMenuButton={true}
            />

            <main className="flex-1 overflow-y-auto">
               <div className="dashboard-container py-2 sm:py-6 lg:py-8">
                  {children}
               </div>
            </main>
         </div>
      </div>
    )
}