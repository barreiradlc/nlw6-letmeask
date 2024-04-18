import { useContext } from "react";
import { LocaleContext } from "../contexts/LocaleContext";

function useLocale() {
  const context = useContext(LocaleContext)

  return context
}


export { useLocale }