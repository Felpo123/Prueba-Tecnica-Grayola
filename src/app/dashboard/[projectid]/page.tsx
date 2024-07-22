import { type Database } from "@/app/types/database";
import { UpdateProjectForm } from "@/components/UpdateProjectForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

interface ProjectProfileProps {
  params: {
    projectid: string;
  };
}

async function ProjectProfile({ params }: ProjectProfileProps) {
  const supabase = createClient();
  const { projectid } = params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: publicUser } = await supabase
    .from("users")
    .select()
    .eq("id", user.id);

  let role = "client" as Database["public"]["Enums"]["roles"];
  if (publicUser) {
    role = publicUser[0].role;
  }

  const { data: project } = await supabase
    .from("projects")
    .select()
    .eq("id", projectid);

  if (!project) {
    return <div>Project not found</div>;
  }

  const projectData = project[0];

  return (
    <div>
      <UpdateProjectForm role={role} project={projectData} />
    </div>
  );
}

export default ProjectProfile;
