import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { User, QRCode, PDF } from "../type";
import { generatePdf } from "../services/generatePdf";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const client = axios.create({ baseURL: API_URL });

export default function CertificadoPage() {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [qrCode, setQrCodeUrl] = useState<QRCode>();
  const [pdf, setPdf] = useState<PDF>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData(userId: string) {
      try {
        setLoading(true);

        const [userResponse, qrResponse] = await Promise.all([
          client.get<User>(`/user/${userId}`),
          client.get<QRCode>(`/user/${userId}/qr`),
        ]);
        const userData = userResponse.data;
        const qrData = qrResponse.data;

        setUser(userData);
        setQrCodeUrl(qrData);

        const pdfResponse = await client.post("/user/pdf", {
          nombre: userData.nombre,
          apellido: userData.apellido,
          saldo: userData.saldo,
          qrcode: qrData.data,
        });

        setPdf(pdfResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      console.log("Fetching user data...");
      fetchUserData(userId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (userId && pdf) {
      generatePdf(userId, pdf);
    }
  }, [pdf, userId]);

  if (loading) {
    return (
      <main className="flex flex-col justify-center text-center mt-40 max-w-3xl mx-auto">
        <div className="text-xl text-gray-900">Loading...</div>
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-center text-center mt-40 max-w-3xl mx-auto">
      <article className="max-w-sm text-left mx-auto bg-white border border-gray-200 rounded-lg shadow ">
        <div className="m-5">
          <h4 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900">
            Certificado
          </h4>
          <h5 className="mb-2 text-xl text-left text-gray-900">
            Información Personal
          </h5>
          {user ? (
            <>
              <p className="mb-3 font-normal text-gray-700 ">
                Nombre: {user.nombre}
              </p>

              <p className="mb-3 font-normal text-gray-700 ">
                Apellido: {user.apellido}
              </p>

              <p className="mb-3 font-normal text-gray-700 ">
                Saldo: $ {user.saldo}
              </p>
            </>
          ) : (
            <p className="mb-3 font-normal text-gray-700">
              User data not available
            </p>
          )}

          {qrCode ? (
            <img
              src={qrCode.data}
              className="rounded-t-lg mx-auto"
              alt="Certificado de validación"
            />
          ) : (
            <p className="mb-3 font-normal text-gray-700">
              QR Code not available
            </p>
          )}
        </div>
      </article>
    </main>
  );
}
