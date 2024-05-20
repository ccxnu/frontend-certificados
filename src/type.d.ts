export interface User {
  id: number;
  nombre: string;
  apellido: string;
  saldo: number;
  qrCode?: string;
}

export type QRCode = {
  data: string;
};

export type PDF = {
  data: string;
};
