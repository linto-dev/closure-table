import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Tables } from "@/types/supabase";
import type { CommentNode } from "../_libs/comment-tree";
import { CommentForm } from "./comment-form";
import { CommentThread } from "./comment-thread";

type CommentSectionProps = {
  comments: Tables<"comments">[];
  tree: CommentNode[];
  articleId: string;
};

export function CommentSection({
  comments,
  tree,
  articleId,
}: CommentSectionProps) {
  const activeCount = comments.filter((c) => c.deleted_at === null).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">コメント</h2>
        <Badge variant="secondary">{activeCount}</Badge>
      </div>

      <CommentForm articleId={articleId} />

      <Separator />

      <div className="space-y-6">
        {tree.map((rootNode) => (
          <CommentThread
            key={rootNode.id}
            node={rootNode}
            articleId={articleId}
          />
        ))}
      </div>
    </div>
  );
}
