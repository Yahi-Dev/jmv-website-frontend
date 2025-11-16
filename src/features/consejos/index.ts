// src/features/consejos/index.ts
export { ConsejoNacionalSection } from "./components/ConsejoNacionalSection"
export { ConsejoManagement } from "./components/ConsejoManagement"
export { ConsejoFormDialog } from "./components/ConsejoFormDialog"
export { MiembroFormDialog } from "./components/MiembroFormDialog"
export { useConsejoActual, useConsejosHistoricos } from "./hook/use-consejos"
export { useConsejoForm, useMiembroForm } from "./hook/use-consejo-form"
export type { ConsejoNacional, MiembroConsejo, ConsejoFormData, MiembroFormData } from "./model/types"