// src/app/(admin)/admin/noticias/[id]/edit/page.tsx
import { NoticiaFormPage } from "@/src/features/noticias/components/NoticiaFormPage"

export default async function EditNoticiaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <NoticiaFormPage mode="edit" noticiaId={Number(id)} />
}
