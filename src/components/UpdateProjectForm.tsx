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
import { type Database } from "@/app/types/database";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
  file: z.string(),
  designer: z.string(),
});

interface UpdateProjectFormProps {
  project: Database["public"]["Tables"]["projects"]["Row"];
  role: Database["public"]["Enums"]["roles"];
}

export function UpdateProjectForm({ project, role }: UpdateProjectFormProps) {
  const [designer, setDesigner] = useState<
    Database["public"]["Tables"]["users"]["Row"] | null
  >(null);
  const [allDesigners, setAllDesigners] = useState<
    Database["public"]["Tables"]["users"]["Row"][] | null
  >(null);
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase
        .from("users")
        .select()
        .eq("id", project.designer_id);
      setDesigner(data?.[0]);

      const { data: allDesigners } = await supabase
        .from("users")
        .select()
        .eq("role", "designer");

      setAllDesigners(allDesigners);
    };
    getData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: project.title || "",
      description: project.description || "",
      file: "",
      designer: designer?.name || "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, description, file, designer } = values;
    console.log(values);
    try {
      const nameFile = file.split("\\").pop();
      const { error } = await supabase
        .from("projects")
        .update({
          title,
          description: description ? description : project.description,
          file: nameFile ? nameFile : project.file,
          designer_id: designer ? designer : project.designer_id,
        })
        .match({ id: project.id });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update project",
          duration: 5000,
          variant: "destructive",
        });
      }

      toast({
        title: "Success",
        description: "Project updated successfully",
        duration: 5000,
        variant: "default",
      });

      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project",
        duration: 5000,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          {project.title}
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
                      disabled={role === "designer"}
                      {...field}
                      value={field.value}
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
                      disabled={role === "designer"}
                      className="resize-none mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the description of the project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {role === "projectm" && (
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
                        value={field.value}
                        type="file"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      />
                    </FormControl>
                    <FormDescription>
                      Current file: {project.file}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {role === "projectm" && (
              <FormField
                control={form.control}
                name="designer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designer</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Change the designer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {allDesigners?.map((designer) => (
                          <SelectItem key={designer.id} value={designer.id}>
                            {designer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Current designer:{" "}
                      {designer?.name || "No designer assigned"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {role === "designer" && (
              <div className="bg-green-50 p-4 rounded-lg shadow-inner">
                <h3 className="text-lg font-semibold text-green-700">
                  Project Details
                </h3>
                <p className="mt-2 text-gray-700">
                  <strong>File:</strong> {project.file || "No file uploaded"}
                </p>
                <p className="mt-1 text-gray-700">
                  <strong>Designer:</strong>{" "}
                  {designer?.name || "No designer assigned"}
                </p>
              </div>
            )}

            {role !== "designer" && (
              <Button
                type="submit"
                className="w-full bg-green-700 text-white rounded-md px-4 py-2 mt-6 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
              >
                {form.formState.isSubmitting ? "Updating..." : "Update"}
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
