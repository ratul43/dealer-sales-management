import Sidebar from "@/components/Sidebar";


export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="min-w-0 md:ml-60">
        {children}
      </main>
    </div>
  );
}
