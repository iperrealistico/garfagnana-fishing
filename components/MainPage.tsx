import { TranslationDictionary } from '@/lib/content';
import Header from './Header';
import Hero from './Hero';
import PrenotaSection from './PrenotaSection';
import DovePescareSection from './DovePescareSection';
import ChiSiamoSection from './ChiSiamoSection';
import VideoSection from './VideoSection';
import ServiziSection from './ServiziSection';
import ComeRaggiungerciSection from './ComeRaggiungerciSection';
import LanguageSwitcher from './LanguageSwitcher';

export default function MainPage({ dict, lang }: { dict: TranslationDictionary, lang: 'it' | 'en' }) {
    return (
        <>
            <Header dict={dict} lang={lang} />
            <Hero dict={dict} lang={lang} />
            <main>
                <PrenotaSection dict={dict} />
                <DovePescareSection dict={dict} />
                <ChiSiamoSection dict={dict} />
                <VideoSection dict={dict} />
                <ServiziSection dict={dict} />
                <ComeRaggiungerciSection dict={dict} />
            </main>
            <LanguageSwitcher currentLang={lang} />
        </>
    );
}
