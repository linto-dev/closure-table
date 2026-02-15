import { Container } from "./_components/container";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <Container articleId={id} />
    </main>
  );
}
