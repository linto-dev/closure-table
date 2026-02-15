import { createClient } from "@/lib/supabase/server";

export const createComment = async (params: {
  article_id: number;
  parent_id: number | null;
  author_name: string;
  body: string;
}) => {
  const supabase = await createClient();

  return supabase.from("comments").insert(params).select().single();
};

export const deleteComment = async (commentId: number) => {
  const supabase = await createClient();

  return supabase
    .from("comments")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", commentId)
    .select()
    .single();
};
