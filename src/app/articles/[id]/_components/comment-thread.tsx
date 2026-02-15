import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { CommentNode } from "../_libs/comment-tree";
import { CommentItem } from "./comment-item";

type CommentThreadProps = {
  node: CommentNode;
  articleId: string;
};

export function CommentThread({ node, articleId }: CommentThreadProps) {
  const isDeleted = node.deleted_at !== null;
  const hasChildren = node.children.length > 0;
  const initial = node.author_name.charAt(0);

  return (
    <div>
      {/* Comment row: avatar + content */}
      <div className="flex gap-3">
        <div className="relative w-8 shrink-0">
          <Avatar className="h-8 w-8">
            <AvatarFallback className={isDeleted ? "opacity-50" : ""}>
              {isDeleted ? "?" : initial}
            </AvatarFallback>
          </Avatar>
          {hasChildren && (
            <div className="absolute left-4 top-9 bottom-0 border-l border-border" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <CommentItem comment={node} articleId={articleId} />
        </div>
      </div>

      {/* Replies with threadline connectors */}
      {hasChildren && (
        <div>
          {node.children.map((child, index) => {
            const isLast = index === node.children.length - 1;
            return (
              <div key={child.id} className="flex">
                {/* Connector column — aligned with parent avatar center (16px) */}
                <div className="relative w-[44px] shrink-0">
                  {/* Vertical line: full height for ├, stops at connector for └ */}
                  <div
                    className={cn(
                      "absolute left-4 border-l border-border",
                      isLast ? "top-0 h-7" : "inset-y-0",
                    )}
                  />
                  {/* Horizontal connector to child */}
                  <div className="absolute left-4 top-7 w-7 border-t border-border" />
                </div>
                {/* Child thread (recursive) */}
                <div className="flex-1 min-w-0 pt-3">
                  <CommentThread node={child} articleId={articleId} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
