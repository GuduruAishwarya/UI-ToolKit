'use client';
import {createContext, PropsWithChildren, useState} from 'react';

import {defaultGlobalContext, GlobalBaseComponentsContext, GlobalBaseComponentsContextProp} from '.';

export const GlobalBaseComponentsContexts = createContext({} as GlobalBaseComponentsContextProp);

export default function GlobalBaseComponentContextWrapper({children}: PropsWithChildren) {
  const [globalBaseComponentContext, setGlobalBaseComponentContext] = useState<GlobalBaseComponentsContext>(defaultGlobalContext);
  return (
    <GlobalBaseComponentsContexts.Provider value={{globalBaseComponentContext, setGlobalBaseComponentContext}}>
      {children}
    </GlobalBaseComponentsContexts.Provider>
  );
}
