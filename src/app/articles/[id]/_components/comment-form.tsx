"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type CommentFormValues, commentFormSchema } from "../_libs/schema";
import { addCommentAction } from "../action";

type CommentFormProps = {
  articleId: string;
  parentId?: number | null;
  onSuccess?: () => void;
};

export function CommentForm({
  articleId,
  parentId,
  onSuccess,
}: CommentFormProps) {
  const [state, formAction, pending] = useActionState(addCommentAction, {
    success: false,
    error: null,
  });

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      author_name: "",
      body: "",
    },
  });

  useEffect(() => {
    if (state.success) {
      form.reset();
      onSuccess?.();
    }
  }, [state.success, onSuccess, form]);

  const handleSubmit = form.handleSubmit((data) => {
    const fd = new FormData();
    fd.set("article_id", articleId);
    if (parentId != null) fd.set("parent_id", String(parentId));
    fd.set("author_name", data.author_name);
    fd.set("body", data.body);
    startTransition(() => {
      formAction(fd);
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <FormField
          control={form.control}
          name="author_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="名前" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="コメントを入力..." rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {state.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? "投稿中..." : "投稿"}
        </Button>
      </form>
    </Form>
  );
}
