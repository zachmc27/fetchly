import React, { createContext, useContext, useState } from "react";
import { AdoptionCard } from "../types/CardTypes";

type AdoptionPostContextType = {
  isAdoptionPostOpen: boolean;
  setIsAdoptionPostOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeAdoptionPost: AdoptionCard | null;
  setActiveAdoptionPost: React.Dispatch<React.SetStateAction<AdoptionCard | null>>;
};

const AdoptionPostContext = createContext<AdoptionPostContextType | undefined>(undefined);

export const useAdoptionPost = () => {
  const context = useContext(AdoptionPostContext);
  if (!context) throw new Error("useAdoptionPost must be used within AdoptionPostProvider");
  return context;
};

export const AdoptionPostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdoptionPostOpen, setIsAdoptionPostOpen] = useState(false);
  const [activeAdoptionPost, setActiveAdoptionPost] = useState<AdoptionCard | null>(null);

  return (
    <AdoptionPostContext.Provider value={{
      isAdoptionPostOpen,
      setIsAdoptionPostOpen,
      activeAdoptionPost,
      setActiveAdoptionPost
    }}>
      {children}
    </AdoptionPostContext.Provider>
  );
};