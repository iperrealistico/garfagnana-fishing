import { getDictionary } from '@/lib/content';
import MainPage from '@/components/MainPage';

export default function Home() {
    const dict = getDictionary('it');

    return <MainPage dict={dict} lang="it" />;
}
