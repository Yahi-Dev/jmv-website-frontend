// src/seed/users.ts

import { auth } from "@/src/lib/auth";
import { PrismaClient } from "@prisma/client";

export async function seedUsers(prisma: PrismaClient) {
  const testEmail = "test@jmv.com";
  const testPassword = "password123";

  console.log("👤 Creando usuario de prueba para JMV...");

  try {
    // 1) Crear usuario con Better Auth usando solo los campos soportados
    const userRes = await auth.api.signUpEmail({
      body: {
        email: testEmail,
        password: testPassword,
        name: "Test User JMV", // Este es el campo 'name' requerido por Better Auth
        // Los otros campos (isActive, createdDate) se setean automáticamente
      },
    }).catch(async (error) => {
      console.log("⚠️ Usuario ya existe, obteniendo datos...");
      // Si ya existe, intenta sign-in para obtener el userId
      const signInRes = await auth.api.signInEmail({
        body: { 
          email: testEmail, 
          password: testPassword 
        },
      });
      return { user: signInRes.user };
    });

    console.log("✅ Usuario de Better Auth creado/obtenido:", userRes.user.id);

    // 2) Crear la estructura de datos relacionada necesaria para JMV
    console.log("🏗️ Creando estructura de datos JMV...");

    // Crear estatus por defecto si no existe
    const estatusActivo = await prisma.estatus.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nombre: 'Activo',
        createdById: userRes.user.id,
      },
    });

    // Crear tipo de vocalía por defecto
    const tipoVocalia = await prisma.tipo.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nombre: 'General',
        createdById: userRes.user.id,
      },
    });

    // Crear vocalía por defecto
    const vocaliaGeneral = await prisma.vocalia.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nombre: 'General',
        id_Tipovocalia: tipoVocalia.id,
        createdById: userRes.user.id,
      },
    });

    // Crear centro por defecto
    const centroPrincipal = await prisma.centro.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nombre: 'Centro Principal JMV',
        direccion: 'Santo Domingo, República Dominicana',
        estatusId: estatusActivo.id,
        createdById: userRes.user.id,
      },
    });

    // Crear comunidad por defecto
    const comunidadPrincipal = await prisma.comunidad.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nombre: 'Comunidad Principal',
        integrantes: 1,
        idEtapa: 1,
        centroId: centroPrincipal.id,
        estatusId: estatusActivo.id,
        createdById: userRes.user.id,
      },
    });

    // 3) Crear registro en la tabla Usuarios (relación con el modelo JMV)
    const usuarioJMV = await prisma.usuarios.upsert({
      where: { id: 1 },
      update: {
        // Actualizar con el ID del usuario de Better Auth
        createdById: userRes.user.id,
        modifiedDate: new Date(),
        modifiedById: userRes.user.id,
      },
      create: {
        nombre: 'Test',
        apellido: 'User',
        telefono: '809-123-4567',
        idComunidad: comunidadPrincipal.id,
        idCentro: centroPrincipal.id,
        idVocalia: vocaliaGeneral.id,
        idEstatus: estatusActivo.id,
        createdById: userRes.user.id,
      },
    });

    console.log("✅ Usuario JMV creado en tabla usuarios:", usuarioJMV.id);

    // 4) Crear algunos valores y vocalías de ejemplo
    const valorEjemplo = await prisma.valor.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nombre: 'Solidaridad',
        createdById: userRes.user.id,
      },
    });

    const vocalEjemplo = await prisma.vocal.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Vocal de Test',
        img: '',
        idCentro: centroPrincipal.id,
        idVocalia: vocaliaGeneral.id,
        createdById: userRes.user.id,
      },
    });

    // 5) Relacionar vocal con valor
    await prisma.vocalValor.upsert({
      where: { id: 1 },
      update: {},
      create: {
        vocalId: vocalEjemplo.id,
        valorId: valorEjemplo.id,
      },
    });

    console.log("✅ Estructura JMV completada");

    console.log("\n🎉 SEED COMPLETADO EXITOSAMENTE");
    console.log("=================================");
    console.log("📋 CREDENCIALES DE PRUEBA:");
    console.log("   Email: " + testEmail);
    console.log("   Contraseña: " + testPassword);
    console.log("   Username: testuser");
    console.log("\n🏠 Estructura creada:");
    console.log("   - Centro: Centro Principal JMV");
    console.log("   - Comunidad: Comunidad Principal");
    console.log("   - Vocalía: General");
    console.log("   - Estatus: Activo");

  } catch (error) {
    console.error("❌ Error en seed de usuarios:", error);
    throw error;
  }
}