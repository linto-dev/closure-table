import { createClient } from "@/lib/supabase/server";

export const getArticle = async (articleId: number) => {
  const supabase = await createClient();

  return supabase.from("articles").select("*").eq("id", articleId).single();
};

export const getComments = async (articleId: number) => {
  const supabase = await createClient();

  return supabase
    .from("comments")
    .select("*")
    .eq("article_id", articleId)
    .order("created_at", { ascending: true })
    .order("id", { ascending: true });
};
