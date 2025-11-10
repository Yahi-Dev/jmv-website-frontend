export { FormacionSection } from "./components/FormacionSection";
export { useGetAllFormaciones, useFormacionById, useCreateFormacion, useUpdateFormacion, useDeleteFormacion } from "./hook/use-formacion";
export type { FormacionType, FormacionResponse } from "./model/types";
export { formacionCreateSchema, formacionUpdateSchema } from "./schema/validation";