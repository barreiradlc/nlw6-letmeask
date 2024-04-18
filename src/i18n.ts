import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { english } from "./i18n/en";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: english
  },
  ptBR: {
    translation: {
      "Home title": "Crie salas de Q&A ao vivo",
      "Home subtitle": "Tire as dúvidas da sua audiência em tempo-real",
      "Home image": "Ilustração simbolizando perguntas e respostas",
      "Home google logo": "Logo do google",
      "Home create room-w-google": "Crie sua sala com o Google",
      "Home join room placeholder": "Digite o código da sala",
      "Home join room button": "Entrar na sala",
      "Home or join room": "ou entre em uma sala",
      "Home error join room": "Ops, sala inexistente. Confira o código e tente novamente :/",
      "Home error join finished room": "Sala encerrada!",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;