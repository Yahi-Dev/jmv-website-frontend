// src/app/actividades/[slug]/page.tsx
import { ActividadDetail } from "@/src/features/actividades/components/ActividadDetail"

export default async function ActividadDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <ActividadDetail slug={slug} />
}
