import AuthButton from "@/components/AuthButton";
import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import type { Database } from "../types/database";
import ClientDashboard from "@/components/ClientDashboard";
import PMDashboard from "@/components/PMDashboard";
import DesignerDashboard from "@/components/DesignerDashboard";

export default async function ProtectedPage() {
  const supabase = createClient();

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

  if (role === "projectm") {
    return (
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="w-full">
          <PMDashboard />
        </div>
      </div>
    );
  }

  if (role === "designer") {
    return (
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="w-full">
          <DesignerDashboard role={role} userID={user.id} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <ClientDashboard id={user.id} />
      </div>
    </div>
  );
}
