"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
  file: z.string(),
});

interface CreateProjectFormProps {
  userID: string;
}

export function CreateProjectForm({ userID }: CreateProjectFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      file: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, description, file } = values;

    try {
      const supabase = createClient();
      const nameFile = file.split("\\").pop();
      const { error } = await supabase.from("projects").insert({
        title,
        description,
        file: nameFile,
        user_id: userID,
      });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create project",
          duration: 5000,
          variant: "destructive",
        });
      }

      toast({
        title: "Success",
        description: "Project created successfully",
        duration: 5000,
        variant: "default",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project",
        duration: 5000,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Create Project
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="title"
                      {...field}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </FormControl>
                  <FormDescription>
                    This is the title of the project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description of the project"
                      className="resize-none mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the description of the project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="file">File</FormLabel>
                  <FormControl>
                    <Input
                      id="file"
                      placeholder="File"
                      {...field}
                      type="file"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </FormControl>
                  <FormDescription>You can upload file here</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-green-700 text-white rounded-md px-4 py-2 mt-6 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
