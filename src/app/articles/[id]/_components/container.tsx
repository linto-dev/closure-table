import { notFound } from "next/navigation";
import { buildCommentTree } from "../_libs/comment-tree";
import { getArticle, getComments } from "../_libs/queries";
import { ArticleHeader } from "./article-header";
import { CommentSection } from "./comment-section";

type ContainerProps = {
  articleId: string;
};

export async function Container({ articleId }: ContainerProps) {
  const numericId = Number(articleId);
  const [articleResult, commentsResult] = await Promise.all([
    getArticle(numericId),
    getComments(numericId),
  ]);

  if (articleResult.error || !articleResult.data) {
    notFound();
  }

  const comments = commentsResult.data ?? [];
  const tree = buildCommentTree(comments);

  return (
    <>
      <ArticleHeader article={articleResult.data} />
      <CommentSection comments={comments} tree={tree} articleId={articleId} />
    </>
  );
}
