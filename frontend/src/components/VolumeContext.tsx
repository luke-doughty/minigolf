import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Define the context shape
type VolumeContextType = {
    volume: number;
    setVolume: React.Dispatch<React.SetStateAction<number>>;
};

// 2. Create the context with a default (undefined so we can enforce provider usage)
const VolumeContext = createContext<VolumeContextType | undefined>(undefined);

// 3. Make a provider component
export function VolumeProvider({ children }: { children: ReactNode }) {
    const [volume, setVolume] = useState<number>(0); // your original state

    return (
        <VolumeContext.Provider value={{ volume, setVolume }}>
            {children}
        </VolumeContext.Provider>
    );
}

// 4. Custom hook for consuming the context safely
export function useVolume() {
    const context = useContext(VolumeContext);
    if (!context) {
        throw new Error("useVolume must be used within a VolumeProvider");
    }
    return context;
}
