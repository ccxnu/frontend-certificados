import axios from "axios";
import { type User } from "../type";

type SetUserFunction = (user: User | null) => void;
type SetQrCodeUrlFunction = (url: string) => void;
const API_URL = import.meta.env.VITE_API_URL;

export const fetchUserData = async (
  userId: string,
  setUser: SetUserFunction,
  setQrCodeUrl: SetQrCodeUrlFunction,
) => {
  try {
    const userResponse = await axios
      .get<User>(`${API_URL}/user/${userId}`)
      .then((response) => response.data);
    const qrResponse = await axios
      .get<string>(`${API_URL}/user/${userId}/qr`)
      .then((response) => response.data);

    setUser(userResponse);
    setQrCodeUrl(qrResponse);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
