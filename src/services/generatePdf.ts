import { base64ToArrayBuffer } from "./base64toArrayBuffer";
import type { PDF } from "../type";

export const generatePdf = async (userId: string, pdf: PDF) => {
  // Crear un Blob a partir del PDF en base64
  const pdfData = pdf.data;
  const blob = new Blob([base64ToArrayBuffer(pdfData)], {
    type: "application/pdf",
  });

  // Crear una URL de objeto
  const url = URL.createObjectURL(blob);

  // Crear un enlace temporal y simular clic para descargar el archivo
  const a = document.createElement("a");
  a.href = url;
  a.download = `certificado_${userId}.pdf`;
  a.click();

  // Liberar la URL del objeto después de la descarga
  URL.revokeObjectURL(url);
};
