import { i18n } from "i18next";
import { TFunction } from "i18next/typescript/t";
import { createContext, ReactNode } from "react"
import { useTranslation } from 'react-i18next';
import { Language } from "../components/Language";
import { CSSTransition, SwitchTransition } from "react-transition-group";


type LocaleContextType = {
  t: TFunction<"translation", undefined>
  i18n: i18n
}

export const LocaleContext = createContext({} as LocaleContextType)


type LocaleContextProviderProps = {
  children: ReactNode;
}

export function LocaleContextProvider({ children }: LocaleContextProviderProps) {
  const { t, i18n } = useTranslation();

  return (
    <LocaleContext.Provider value={{ t, i18n }}>
      <Language />
      <SwitchTransition mode="out-in">
        <CSSTransition
          classNames="fade"
          addEndListener={(node: { addEventListener: (arg0: string, arg1: any, arg2: boolean) => void; }, done: any) => {
            node.addEventListener("transitionend", done, false);
          }}
          key={i18n.language}
        >
          {children}
        </CSSTransition>
      </SwitchTransition>
      
    </LocaleContext.Provider>
  )
}