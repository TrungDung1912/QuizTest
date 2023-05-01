import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
    // i18next-http-backend
    // loads translations from your server
    // https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    homepage: {
                        title1: "There's a better way to ask",
                        title2: "You don't want to make a boring form. And your audience won't answer one. Create a typeform instead and make everyone happy.",
                        title3: {
                            login: `Get's started. It's free`,
                            doquiz: `Doing Quiz Now`
                        }
                    },
                }
            },
            vi: {
                translation: {
                    homepage: {
                        title1: "Cách tốt nhất để hỏi",
                        title2: "Bạn không muốn làm một biểu mẫu tẻ nhạt. Và người xem bạn sẽ không trả lời nó. Hãy tạo ra một biểu mẫu thay thế và làm mọi người thấy thú vị",
                        title3: {
                            login: `Hãy bắt đầu thôi. Nó miễn phí`,
                            doquiz: `Làm quiz lun nào`
                        }
                    }
                }
            },
        }
    });

export default i18n;