import React, { createContext, useState } from 'react';

const ImgContext = createContext();

export { ImgContext };

export const ImgProvider = ({ children }) => {
  const [img, setImg] = useState(null);

  return (
    <ImgContext.Provider value={{ img, setImg }}>
      {children}
    </ImgContext.Provider>
  );
};
