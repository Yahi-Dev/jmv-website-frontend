import { EventoDetail } from "@/src/features/eventos/components/EventoDetail"

export default async function EventoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <EventoDetail slug={slug} />
}
