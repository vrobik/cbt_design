/**
 * Textele fixe ale interfeței (meniu, subsol, butoane) în cele două limbi.
 * Conținutul paginilor NU e aici — se editează din CMS.
 *
 * ⚠ Textele rusești de mai jos sunt un punct de plecare și trebuie verificate
 * de un vorbitor nativ din CBT înainte ca versiunea rusă să fie marcată „tradus”.
 */

export type Lang = 'ro' | 'ru';

export const ui = {
  ro: {
    'nav.acasa': 'Acasă',
    'nav.despre': 'Cine suntem',
    'nav.proiecte': 'Proiecte',
    'nav.evenimente': 'Evenimente',
    'nav.noutati': 'Noutăți',
    'nav.contact': 'Contact',
    'nav.meniu': 'Meniu',
    'nav.principal': 'Navigație principală',
    'cta.scurt': 'Înscrie-te',
    'cta.lung': 'Înscrie-te în comunitate',
    'cta.scrie': 'Scrie-ne',
    'skip': 'Sari la conținut',
    'lang.eticheta': 'Limba',
    'footer.navigatie': 'Navigație',
    'footer.legal': 'Legal',
    'footer.social': 'Urmărește-ne',
    'footer.inscriere': 'Înscriere',
    'footer.confidentialitate': 'Politica de confidențialitate',
    'footer.cookie': 'Politica de cookie-uri',
    'footer.acord': 'Acord utilizare imagine',
    'footer.setariCookie': 'Setări cookie-uri',
    'footer.presa': 'Noutăți & presă',
    'ru.inPregatire': 'Версия на русском языке готовится. Пока содержание отображается на румынском. · Versiunea în limba rusă este în pregătire.',
  },
  ru: {
    'nav.acasa': 'Главная',
    'nav.despre': 'О нас',
    'nav.proiecte': 'Проекты',
    'nav.evenimente': 'События',
    'nav.noutati': 'Новости',
    'nav.contact': 'Контакты',
    'nav.meniu': 'Меню',
    'nav.principal': 'Главное меню',
    'cta.scurt': 'Вступить',
    'cta.lung': 'Вступить в сообщество',
    'cta.scrie': 'Написать нам',
    'skip': 'Перейти к содержанию',
    'lang.eticheta': 'Язык',
    'footer.navigatie': 'Навигация',
    'footer.legal': 'Правовая информация',
    'footer.social': 'Мы в соцсетях',
    'footer.inscriere': 'Вступить',
    'footer.confidentialitate': 'Политика конфиденциальности',
    'footer.cookie': 'Политика cookie',
    'footer.acord': 'Согласие на использование изображения',
    'footer.setariCookie': 'Настройки cookie',
    'footer.presa': 'Новости и пресса',
    'ru.inPregatire': 'Версия на русском языке готовится. Пока содержание отображается на румынском. · Versiunea în limba rusă este în pregătire.',
  },
} as const;

export type UiKey = keyof (typeof ui)['ro'];

export function t(lang: Lang) {
  return (key: UiKey) => ui[lang][key] ?? ui.ro[key];
}

/** Paginile care au (sau vor avea) versiune rusă. Restul trimit spre română. */
export const pereche: Record<string, string> = {
  '/': '/ru/',
  '/despre/': '/ru/despre/',
};
