"use client";

import { Database } from "@/app/types/database";
import { format } from "date-fns";
import { Ghost, MessageSquare, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "./ui/use-toast";

interface ProjectListProps {
  projects: Database["public"]["Tables"]["projects"]["Row"][] | null;
  role?: Database["public"]["Enums"]["roles"];
}

function ProjectList({ projects, role }: ProjectListProps) {
  const { toast } = useToast();
  const supabase = createClient();

  const deleteProject = async (id: number) => {
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Project deleted successfully",
        duration: 5000,
      });

      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        duration: 5000,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {projects && projects.length > 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {projects
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((project) => (
              <li
                key={project.id}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
              >
                <Link
                  href={`/dashboard/${project.id}`}
                  className="flex flex-col gap-2"
                >
                  <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-green-700 to-green-500" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-lg font-medium text-zinc-900">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {format(new Date(project.created_at), "MMM yyyy")}
                  </div>

                  {role === "projectm" && (
                    <div>
                      <Button
                        onClick={() => deleteProject(project.id)}
                        size="sm"
                        className="w-full hover:bg-green-700"
                        variant="ghost"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Ghost className="h-8 w-8 text-zinc-800" />
          <h3 className="font-semibold text-xl">No projects found.</h3>
        </div>
      )}
    </>
  );
}

export default ProjectList;
