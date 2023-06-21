import { useState } from "react";
import { useMemo } from "react";
import { createContext, useContext } from "react";

const CustomNumpadContext = createContext();

export const CustomNumpadProvider = ({children}) => {
  const [showNumpad, setShowNumpad] = useState(true);
  
  const handleShowNumpad = () => {
    setShowNumpad(true);
  };
  
  const handleCloseNumpad = () => {
    setShowNumpad(false);
  }

  const value = useMemo(() => ({
    showNumpad,
    handleShowNumpad,
    handleCloseNumpad
  }),[showNumpad]);

  return <CustomNumpadContext.Provider value={value}>
      {children}
    </CustomNumpadContext.Provider>
};

export const useCustomNumpad = () => {
  return useContext(CustomNumpadContext);
};
