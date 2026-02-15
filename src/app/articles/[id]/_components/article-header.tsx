import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Tables } from "@/types/supabase";

type ArticleHeaderProps = {
  article: Tables<"articles">;
};

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const formattedDate = new Date(article.created_at).toLocaleDateString(
    "ja-JP",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <Card>
      <CardHeader>
        <CardDescription>{formattedDate}</CardDescription>
        <CardTitle className="text-2xl">{article.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{article.body}</p>
      </CardContent>
    </Card>
  );
}
