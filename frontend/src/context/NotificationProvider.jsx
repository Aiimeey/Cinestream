import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

let timeoutId;
export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState("");
  const [classes, setClasses] = useState("");

  const updateNotification = (type, value) => {
    if (timeoutId) clearTimeout(timeoutId);

    switch (type) {
      case "error":
        setClasses("bg-red-500");
        break;
      case "success":
        setClasses("bg-green-400");
        break;
      case "warning":
        setClasses("bg-orange-300");
        break;
      default:
        setClasses("bg-red-500");
    }
    setNotification(value);

    timeoutId = setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {notification && (
        <div className="fixed left-0 right-0 flex justify-center top-24 ">
          <div className=" shadow-md shadow-gray-400 rounded">
            <p className={classes + " text-off-white px-4 py-2 font-semibold"}>
              {notification}
            </p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
