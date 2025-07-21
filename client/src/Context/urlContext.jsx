import { createContext, useContext, useState } from "react";

const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <UrlContext.Provider
      value={{
        shortUrl,
        setShortUrl,
        error,
        setError,
        user,
        setUser,
        isAuth,
        setIsAuth,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};

export const useUrl = () => useContext(UrlContext);
