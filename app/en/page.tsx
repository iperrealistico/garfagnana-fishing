import { getDictionary } from '@/lib/content';
import MainPage from '@/components/MainPage';

export default function EnglishHome() {
    const dict = getDictionary('en');

    return <MainPage dict={dict} lang="en" />;
}
