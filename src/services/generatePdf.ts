import { base64ToArrayBuffer } from "./base64toArrayBuffer";

export const generatePdf = async (userId: string, pdf: string) => {
  // Crear un Blob a partir del PDF en base64
  const blob = new Blob([base64ToArrayBuffer(pdf)], {
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
