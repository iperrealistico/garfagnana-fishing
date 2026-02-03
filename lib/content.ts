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
    settings: {
        debug_mode: boolean;
        storage_mode: 'github' | 'blob';
        clean_urls: boolean;
    };
    app_links: {
        android: string;
        ios: string;
    };
    custom_buttons: {
        download_maps: { text: string; url: string; };
        download_rules: { text: string; url: string; };
    };
    zrs_list: {
        id: string;
        name: string;
        description: string;
        map_embed_url: string;
        map_link_url: string;
    }[];
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
        zrs_list: content.zrs_list,
        custom_buttons: content.custom_buttons,
        app_links: content.app_links,
        guides: content.guides,
        restaurants: content.restaurants,
        accommodations: content.accommodations,
        settings: content.settings || { debug_mode: false, storage_mode: 'github', clean_urls: true }, // Defaults safely
    };
}

