// src/app/(admin)/admin/centros/[id]/page.tsx
import { CentroAdminDetail } from "@/src/features/centros/components/CentroAdminDetail"

export default async function CentroAdminDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <CentroAdminDetail centroId={Number(id)} />
}
