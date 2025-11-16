/*
  Warnings:

  - The values [CoordinaraNacional,SecretariaNacional,TesoreraNacional,VocalDeLiturgiaYmariana,VocalDeComunicacionYEnlaceNacional,AsesoraNacional] on the enum `miembros_consejo_cargo` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `miembros_consejo` MODIFY `cargo` ENUM('CoordinadorNacional', 'SecretarioNacional', 'TesoreroNacional', 'VocalDeFormacion', 'VocalDeMisionYCaridad', 'VocalLiturgiaYMariana', 'VocalDeExpansion', 'VocalDePrejuveniles', 'VocalDeCulturaYRecreacion') NOT NULL;
