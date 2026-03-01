// src/app/(admin)/admin/actividades/[id]/edit/page.tsx
import { ActividadFormPage } from "@/src/features/actividades/components/ActividadFormPage"

export default async function EditActividadPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ActividadFormPage mode="edit" actividadId={Number(id)} />
}
