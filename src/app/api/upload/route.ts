import { NextRequest } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { sendBadRequest, sendCreated, sendServerError } from '@/src/utils/httpResponse';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const titulo = formData.get('titulo') as string;
    const modulo = formData.get('modulo') as string;

    if (!file) {
      return sendBadRequest('No se proporcionó ningún archivo');
    }

    if (!titulo) {
      return sendBadRequest('Se requiere un título para el archivo');
    }

    // Validar tipo de archivo
    const ALLOWED_TYPES = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!ALLOWED_TYPES.includes(file.type)) {
      return sendBadRequest('Tipo de archivo no permitido');
    }

    // Validar tamaño (30MB)
    const MAX_SIZE = 30 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return sendBadRequest('El archivo es demasiado grande. Máximo 30MB');
    }

    // Crear nombre seguro para el archivo
    const safeTitulo = titulo
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50);

    const timestamp = Date.now();
    const fileExtension = path.extname(file.name) || '.bin';
    const fileName = `${safeTitulo}-${timestamp}${fileExtension}`;

    // Crear estructura de directorios
    const uploadDir = path.join(process.cwd(), 'public', modulo, safeTitulo);
    
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    // Ruta pública para acceder al archivo
    const publicPath = `/${modulo}/${safeTitulo}/${fileName}`;

    return sendCreated({
      Data: {
        filePath: publicPath,
        fileName: fileName,
        originalName: file.name,
        size: file.size,
        type: file.type
      }
    }, 'Archivo subido exitosamente');

  } catch (error) {
    console.error('Error uploading file:', error);
    return sendServerError('Error al subir el archivo', error);
  }
}