"use server";

import { revalidatePath } from "next/cache";
import { createComment, deleteComment } from "./_libs/mutations";

export type ActionState = {
  success: boolean;
  error: string | null;
};

export async function addCommentAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const articleId = formData.get("article_id");
  const parentId = formData.get("parent_id");
  const authorName = formData.get("author_name");
  const body = formData.get("body");

  if (
    typeof articleId !== "string" ||
    typeof authorName !== "string" ||
    typeof body !== "string" ||
    !authorName.trim() ||
    !body.trim()
  ) {
    return { success: false, error: "名前とコメントを入力してください" };
  }

  const { error } = await createComment({
    article_id: Number(articleId),
    parent_id:
      typeof parentId === "string" && parentId ? Number(parentId) : null,
    author_name: authorName.trim(),
    body: body.trim(),
  });

  if (error) {
    return { success: false, error: "コメントの投稿に失敗しました" };
  }

  revalidatePath(`/articles/${articleId}`);
  return { success: true, error: null };
}

export async function deleteCommentAction(formData: FormData) {
  const commentId = formData.get("comment_id");
  const articleId = formData.get("article_id");

  if (typeof commentId !== "string" || typeof articleId !== "string") {
    return;
  }

  const { error } = await deleteComment(Number(commentId));

  if (error) {
    return;
  }

  revalidatePath(`/articles/${articleId}`);
}
