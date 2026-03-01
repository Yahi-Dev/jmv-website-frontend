// src/app/centros/[slug]/page.tsx
import { CentroDetail } from "@/src/features/centros/components/CentroDetail"

export default async function CentroDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <CentroDetail slug={slug} />
}
