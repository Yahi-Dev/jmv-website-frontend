import { NoticiaDetail } from "@/src/features/noticias/components/NoticiaDetail"

export default async function NoticiaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <NoticiaDetail slug={slug} />
}
