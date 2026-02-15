"use client";

import { MessageSquare, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Tables } from "@/types/supabase";
import { deleteCommentAction } from "../action";
import { CommentForm } from "./comment-form";

type CommentItemProps = {
  comment: Tables<"comments">;
  articleId: string;
};

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 30) {
    return date.toLocaleDateString("ja-JP");
  }
  if (diffDays > 0) {
    return `${diffDays}日前`;
  }
  if (diffHours > 0) {
    return `${diffHours}時間前`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes}分前`;
  }
  return "たった今";
}

export function CommentItem({ comment, articleId }: CommentItemProps) {
  const isDeleted = comment.deleted_at !== null;
  const [replyOpen, setReplyOpen] = useState(false);

  const handleReplySuccess = useCallback(() => {
    setReplyOpen(false);
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2">
        {isDeleted ? (
          <span className="text-sm text-muted-foreground">匿名</span>
        ) : (
          <span className="text-sm font-medium">{comment.author_name}</span>
        )}
        <span className="text-xs text-muted-foreground">
          {formatRelativeTime(comment.created_at)}
        </span>
      </div>

      {isDeleted ? (
        <p className="mt-1 text-sm text-muted-foreground italic">
          このコメントは削除されました
        </p>
      ) : (
        <p className="mt-1 text-sm">{comment.body}</p>
      )}

      {!isDeleted && (
        <Collapsible open={replyOpen} onOpenChange={setReplyOpen}>
          <div className="mt-2 flex gap-1">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                <MessageSquare className="mr-1 h-3 w-3" />
                {replyOpen ? "キャンセル" : "返信"}
              </Button>
            </CollapsibleTrigger>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="mr-1 h-3 w-3" />
                  削除
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>コメントを削除しますか？</AlertDialogTitle>
                  <AlertDialogDescription>
                    このコメントは「削除されました」と表示されますが、返信はそのまま残ります。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                  <form action={deleteCommentAction}>
                    <input type="hidden" name="comment_id" value={comment.id} />
                    <input type="hidden" name="article_id" value={articleId} />
                    <AlertDialogAction type="submit">
                      削除する
                    </AlertDialogAction>
                  </form>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <CollapsibleContent className="mt-3">
            <CommentForm
              articleId={articleId}
              parentId={comment.id}
              onSuccess={handleReplySuccess}
            />
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
