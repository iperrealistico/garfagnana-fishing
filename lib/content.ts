import siteData from '@/content/site.json';

export type SupportedLanguage = 'it' | 'en';

export const defaultLanguage: SupportedLanguage = 'it';

export interface TranslationDictionary {
    [key: string]: string;
}

export interface SiteContent {
    translations: {
        it: TranslationDictionary;
        en: TranslationDictionary;
    };
    videos: string[];
    zrs_maps: {
        alto_serchio: { iframe_src: string, pdf_map: string, pdf_rules: string };
        isola_santa: { iframe_src: string };
        incubatoio: { iframe_src: string };
    };
    guides: {
        name: string;
        type: string;
        phone: string;
        email: string;
        instagram: string;
        image: string;
    }[];
    restaurants: {
        name: string;
        phone: string;
        address: string;
        website: string;
        image: string;
    }[];
    accommodations: {
        name: string;
        phone: string;
        address: string;
        website: string;
        image: string;
    }[];
    seo: {
        title_template: string;
        default_description: string;
        og_image: string;
        keywords: string;
    };
}


export const content = siteData as SiteContent;

export function getDictionary(lang: SupportedLanguage) {
    return content.translations[lang];
}

export function getGlobalContent() {
    return {
        videos: content.videos,
        zrs_maps: content.zrs_maps,
        guides: content.guides,
        restaurants: content.restaurants,
        accommodations: content.accommodations,
    };
}
