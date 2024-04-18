import illustraImg from "../assets/images/illustration.svg"
import { useLocale } from "../hooks/useLocale"

function AsideQA() {
  const { t } = useLocale()

  return (
    <aside>
      <img src={illustraImg} alt={t('Aside image')} />
      <strong>{t('Aside title')}</strong>
      <p>{t('Aside subtitle')}</p>
    </aside>
  )
}

export { AsideQA }