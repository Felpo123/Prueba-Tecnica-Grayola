import type { Database } from "@/app/types/database";
import React from "react";
import { CreateProjectForm } from "./CreateProjectForm";

interface DashboardProps {
  id: string;
}

function ClientDashboard({ id }: DashboardProps) {
  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <CreateProjectForm userID={id} />
    </div>
  );
}

export default ClientDashboard;
