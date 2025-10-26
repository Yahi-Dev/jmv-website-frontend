// src/seed/users.ts
import { auth } from "@/src/lib/auth";
import { PrismaClient } from "@prisma/client";

export async function seedUsers(prisma: PrismaClient) {
  const testEmail = "yahinnieltheking01@gmail.com";
  const testPassword = "password123";

  console.log("👤 Creando usuario de prueba para JMV...");

  try {
    // 1) Crear usuario usando la API de Better Auth (esto usará scrypt automáticamente)
    const userRes = await auth.api.signUpEmail({
      body: {
        email: testEmail,
        password: testPassword,
        name: "Test User JMV",
        userName: "testuser",
        firstName: "Test",
        lastName: "User",
      },
    }).catch(async (error) => {
      console.log("⚠️ Usuario ya existe, intentando eliminar y recrear...");
      
      // Eliminar usuario existente problemático
      await prisma.account.deleteMany({
        where: { 
          user: { email: testEmail },
          providerId: "credential" 
        }
      });
      await prisma.user.deleteMany({
        where: { email: testEmail }
      });

      // Crear nuevo usuario
      const newUser = await auth.api.signUpEmail({
        body: {
          email: testEmail,
          password: testPassword,
          name: "Test User JMV",
          userName: "testuser",
          firstName: "Test",
          lastName: "User",
        },
      });
      return newUser;
    });

    console.log("✅ Usuario creado con Better Auth:", userRes.user.id);

    // 2) Crear estructura JMV
    console.log("🏗️ Creando estructura de datos JMV...");

    const estatusActivo = await prisma.estatus.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nombre: 'Activo',
        createdById: userRes.user.id,
      },
    });

    const tipoVocalia = await prisma.tipo.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nombre: 'General',
        createdById: userRes.user.id,
      },
    });

    const vocaliaGeneral = await prisma.vocalia.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nombre: 'General',
        id_Tipovocalia: tipoVocalia.id,
        createdById: userRes.user.id,
      },
    });

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

    // 3) Crear usuario en tabla Usuarios
    await prisma.usuarios.upsert({
      where: { id: 1 },
      update: {
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

    console.log("🎉 SEED COMPLETADO EXITOSAMENTE");
    console.log("📋 CREDENCIALES: test@jmv.com / password123");

  } catch (error) {
    console.error("❌ Error en seed:", error);
    throw error;
  }
}