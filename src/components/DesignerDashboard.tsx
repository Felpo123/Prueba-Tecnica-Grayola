import { createClient } from "@/utils/supabase/client";
import ProjectList from "./ProjectList";
import { type Database } from "@/app/types/database";

interface DesignerDashboardProps {
  userID: string;
  role: Database["public"]["Enums"]["roles"];
}
async function DesignerDashboard({ userID, role }: DesignerDashboardProps) {
  const supabase = createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select()
    .eq("designer_id", userID);

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="mt-8 flex flex-col items-start justify-between gap-4  pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">
          Your assigned projects
        </h1>
      </div>

      <ProjectList role={role} projects={projects} />
    </div>
  );
}

export default DesignerDashboard;
