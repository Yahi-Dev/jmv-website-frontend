// src/seed/users.ts
import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";

export async function seedUsers(prisma: PrismaClient) {
  const testEmail = "yahinnieltheking01@gmail.com";
  const testPassword = "password123";

  console.log("👤 Creando usuario de prueba para JMV...");

  try {
    // 1) Crear usuario directamente en la tabla User
    const testUser = await prisma.user.upsert({
      where: { email: testEmail },
      update: {},
      create: {
        email: testEmail,
        name: "Test User JMV",
        userName: "testuser",
        firstName: "Test",
        lastName: "User", 
        isActive: true,
      },
    });

    console.log("✅ Usuario creado:", testUser.id);

    // 2) Crear account para este usuario (necesario para Better Auth)
    const userAccount = await prisma.account.upsert({
      where: {
        userId_providerId_accountId: {
          userId: testUser.id,
          providerId: "credential",
          accountId: testUser.id,
        }
      },
      update: {},
      create: {
        userId: testUser.id,
        accountId: testUser.id,
        providerId: "credential",
        password: hashSync(testPassword, 12),
      },
    });

    console.log("✅ Account creado para usuario");

    // 3) Crear la estructura de datos JMV
    console.log("🏗️ Creando estructura de datos JMV...");

    // Crear estatus por defecto
    const estatusActivo = await prisma.estatus.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nombre: 'Activo',
        createdById: testUser.id,
      },
    });

    // Crear tipo de vocalía
    const tipoVocalia = await prisma.tipo.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nombre: 'General',
        createdById: testUser.id,
      },
    });

    // Crear vocalía
    const vocaliaGeneral = await prisma.vocalia.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nombre: 'General',
        id_Tipovocalia: tipoVocalia.id,
        createdById: testUser.id,
      },
    });

    // Crear centro
    const centroPrincipal = await prisma.centro.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nombre: 'Centro Principal JMV',
        direccion: 'Santo Domingo, República Dominicana',
        estatusId: estatusActivo.id,
        createdById: testUser.id,
      },
    });

    // Crear comunidad
    const comunidadPrincipal = await prisma.comunidad.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nombre: 'Comunidad Principal',
        integrantes: 1,
        idEtapa: 1,
        centroId: centroPrincipal.id,
        estatusId: estatusActivo.id,
        createdById: testUser.id,
      },
    });

    // 4) Crear registro en la tabla Usuarios
    const usuarioJMV = await prisma.usuarios.upsert({
      where: { id: 1 },
      update: {
        createdById: testUser.id,
        modifiedDate: new Date(),
        modifiedById: testUser.id,
      },
      create: {
        nombre: 'Test',
        apellido: 'User',
        telefono: '809-123-4567',
        idComunidad: comunidadPrincipal.id,
        idCentro: centroPrincipal.id,
        idVocalia: vocaliaGeneral.id,
        idEstatus: estatusActivo.id,
        createdById: testUser.id,
      },
    });

    console.log("✅ Usuario JMV creado en tabla usuarios:", usuarioJMV.id);

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