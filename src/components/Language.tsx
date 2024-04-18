import { useState } from "react"
import enFlagImg from "../assets/images/flags/en-flag.png"
import ptFlagImg from "../assets/images/flags/pt-flag.png"
import { useLocale } from "../hooks/useLocale"
import "../styles/language.scss"
import i18next from "i18next"

type LanguageInterface = 'pt-BR' | 'en-US'

function Language() {
  const { i18n } = useLocale()
  const resolvedLanguage = i18n.language as LanguageInterface

  function handleChangeLanguage(language: string) {
    i18next.changeLanguage(language, (err, _) => {
      if (err) return console.log('something went wrong loading', err);
    });
  }

  function handleSetBR() {
    handleChangeLanguage('pt-BR')
  }
  function handleSetEN() {
    handleChangeLanguage('en-US')
  }

  console.log(i18n)

  return (
    <div className="language-container">
      <button className={`language-button ${resolvedLanguage === 'en-US' ? 'active' : ''}`} onClick={handleSetEN}>
        <img src={enFlagImg} alt="Set en language" />
      </button>
      <button className={`language-button ${resolvedLanguage === 'pt-BR' ? 'active' : ''}`} onClick={handleSetBR}>
        <img src={ptFlagImg} alt="Set pt language" />
      </button>
    </div>
  )
}


export { Language }