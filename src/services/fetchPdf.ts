import axios from "axios";
import { type User } from "../type";
type SetPdfFunction = (url: string) => void;

export const fetchPdf = async (
  user: User | null,
  qrCode: string,
  setPdf: SetPdfFunction,
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/pdf`,
      {
        nombre: user?.nombre,
        apellido: user?.apellido,
        saldo: user?.saldo,
        qrcode: qrCode,
      },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      },
    );

    setPdf(response.data);
  } catch (error) {
    console.error("Error generating certificate:", error);
  }
};
