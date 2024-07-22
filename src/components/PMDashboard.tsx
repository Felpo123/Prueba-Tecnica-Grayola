import { createClient } from "@/utils/supabase/server";
import { Ghost, Link, MessageSquare, Plus, Trash } from "lucide-react";
import { format } from "date-fns";
import React from "react";
import { Button } from "./ui/button";
import ProjectList from "./ProjectList";

async function PMDashboard() {
  const supabase = createClient();

  const { data: projects } = await supabase.from("projects").select();

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="mt-8 flex flex-col items-start justify-between gap-4  pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">Projects</h1>
      </div>

      <ProjectList projects={projects} />
    </div>
  );
}

export default PMDashboard;
