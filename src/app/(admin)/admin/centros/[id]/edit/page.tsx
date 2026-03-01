// src/app/(admin)/admin/centros/[id]/edit/page.tsx
import { CentroFormPage } from "@/src/features/centros/components/CentroFormPage"

export default async function CentroEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <CentroFormPage mode="edit" centroId={Number(id)} />
}
