import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8">
      <Card className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Log in to your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <SubmitButton
                formAction={signIn}
                className="w-full bg-green-700 text-white rounded-md px-4 py-2 mt-6 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                pendingText="Signing In..."
              >
                Sign In
              </SubmitButton>
            </div>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-red-100 text-red-700 text-center rounded-md">
                {searchParams.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
