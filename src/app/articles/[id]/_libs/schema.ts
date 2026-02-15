import { z } from "zod";

export const commentFormSchema = z.object({
  author_name: z
    .string()
    .min(1, { message: "名前を入力してください" })
    .max(50, { message: "名前は50文字以内で入力してください" }),
  body: z
    .string()
    .min(1, { message: "コメントを入力してください" })
    .max(200, { message: "コメントは200文字以内で入力してください" }),
});

export type CommentFormValues = z.infer<typeof commentFormSchema>;
