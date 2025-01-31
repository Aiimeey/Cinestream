import { useContext } from "react";
import { NotificationContext } from "../context/NotificationProvider";
import { AuthContext } from "../context/AuthProvider";

export const useNotification = () => useContext(NotificationContext);
export const useAuth = () => useContext(AuthContext);
