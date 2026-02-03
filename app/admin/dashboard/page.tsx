'use client';

import { useState, useEffect } from 'react';
import { SiteContent } from '@/lib/content';
import ImageUploader from '@/components/admin/ImageUploader';

interface ListEditorProps {
    items: any[];
    updateItems: (items: any[]) => void;
    template: any;
    folder: string;
}

export default function Dashboard() {
    const [content, setContent] = useState<SiteContent | null>(null);
    const [activeSection, setActiveSection] = useState('translations');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [stats, setStats] = useState<{ size_mb: string } | null>(null);

    useEffect(() => {
        fetchContent();
        fetchStats();
    }, []);

    const fetchContent = async () => {
        const res = await fetch('/api/content');
        const data = await res.json();
        setContent(data);
        setLoading(false);
    };

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/stats');
            const data = await res.json();
            setStats(data);
        } catch (e) { }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content }),
            });
            if (res.ok) alert('Salvato con successo! Il sito si aggiornerà in pochi minuti.');
            else alert('Errore nel salvataggio');
        } catch (e) {
            alert('Errore di connessione');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Caricamento dati...</div>;
    if (!content) return <div style={{ padding: '2rem' }}>Errore nel caricamento</div>;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui' }}>
            {/* Sidebar */}
            <div style={{ width: '250px', background: '#263238', color: 'white', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ marginBottom: '2rem' }}>Admin Pannel</h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <button style={btnStyle(activeSection === 'translations')} onClick={() => setActiveSection('translations')}>Testi e Traduzioni</button>
                    <button style={btnStyle(activeSection === 'guides')} onClick={() => setActiveSection('guides')}>Guide di Pesca</button>
                    <button style={btnStyle(activeSection === 'restaurants')} onClick={() => setActiveSection('restaurants')}>Ristoranti</button>
                    <button style={btnStyle(activeSection === 'accommodations')} onClick={() => setActiveSection('accommodations')}>Alloggi</button>
                    <button style={btnStyle(activeSection === 'videos')} onClick={() => setActiveSection('videos')}>Video</button>
                </nav>

                <div style={{ marginTop: 'auto', fontSize: '0.8rem', opacity: 0.7 }}>
                    <p>Storage GitHub: {stats?.size_mb || '...'} MB</p>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '2rem', background: '#f5f5f5', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
                    <h1>Modifica {activeSection}</h1>
                    <button
                        onClick={handleSave}
                        style={{ background: '#2E7D32', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
                        disabled={saving}
                    >
                        {saving ? 'Salvataggio...' : 'PUBBLICA MODIFICHE'}
                    </button>
                </div>

                <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    {activeSection === 'translations' && (
                        <TranslationEditor content={content} setContent={setContent} />
                    )}
                    {activeSection === 'guides' && (
                        <ListEditor
                            items={content.guides}
                            updateItems={(items) => setContent({ ...content, guides: items })}
                            template={{ name: '', type: 'Mosca', phone: '', email: '', instagram: '', image: '' }}
                            folder="guides"
                        />
                    )}
                    {activeSection === 'restaurants' && (
                        <ListEditor
                            items={content.restaurants}
                            updateItems={(items) => setContent({ ...content, restaurants: items })}
                            template={{ name: '', phone: '', address: '', website: '', image: '' }}
                            folder="restaurants"
                        />
                    )}
                    {activeSection === 'accommodations' && (
                        <ListEditor
                            items={content.accommodations}
                            updateItems={(items) => setContent({ ...content, accommodations: items })}
                            template={{ name: '', phone: '', address: '', website: '', image: '' }}
                            folder="accommodations"
                        />
                    )}
                    {activeSection === 'videos' && (
                        <VideoEditor
                            videos={content.videos}
                            updateVideos={(videos) => setContent({ ...content, videos })}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

function TranslationEditor({ content, setContent }: { content: SiteContent, setContent: any }) {
    const [lang, setLang] = useState('it');
    const keys = Object.keys(content.translations.it);

    const updateVal = (key: string, val: string) => {
        setContent({
            ...content,
            translations: {
                ...content.translations,
                [lang]: {
                    ...content.translations[lang as 'it' | 'en'],
                    [key]: val
                }
            }
        });
    };

    return (
        <div>
            <div style={{ marginBottom: '1rem' }}>
                <button onClick={() => setLang('it')} style={{ marginRight: '1rem', fontWeight: lang === 'it' ? 'bold' : 'normal' }}>Italiano</button>
                <button onClick={() => setLang('en')} style={{ fontWeight: lang === 'en' ? 'bold' : 'normal' }}>Inglese</button>
            </div>
            <div style={{ display: 'grid', gap: '1rem' }}>
                {keys.map(key => (
                    <div key={key} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'center' }}>
                        <label style={{ fontSize: '0.9rem', color: '#666' }}>{key}</label>
                        {content.translations[lang as 'it' | 'en'][key].length > 50 ? (
                            <textarea
                                value={content.translations[lang as 'it' | 'en'][key]}
                                onChange={(e) => updateVal(key, e.target.value)}
                                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px' }}
                            />
                        ) : (
                            <input
                                value={content.translations[lang as 'it' | 'en'][key]}
                                onChange={(e) => updateVal(key, e.target.value)}
                                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function ListEditor({ items, updateItems, template, folder }: ListEditorProps) {
    const addItem = () => {
        updateItems([...items, { ...template }]);
    };

    const removeItem = (idx: number) => {
        if (confirm('Eliminare elemento?')) {
            const newItems = [...items];
            newItems.splice(idx, 1);
            updateItems(newItems);
        }
    };

    const updateItem = (idx: number, field: string, val: string) => {
        const newItems = [...items];
        newItems[idx] = { ...newItems[idx], [field]: val };
        updateItems(newItems);
    };

    return (
        <div>
            {items.map((item: any, idx: number) => (
                <div key={idx} style={{ border: '1px solid #eee', padding: '1rem', marginBottom: '1rem', borderRadius: '8px', background: '#fafafa' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                        {Object.keys(template).map(field => field !== 'image' && (
                            <div key={field}>
                                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem', textTransform: 'capitalize' }}>{field}</label>
                                <input
                                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                    value={item[field]}
                                    onChange={(e) => updateItem(idx, field, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Image</label>
                            <ImageUploader
                                currentImage={item.image}
                                onImageChange={(url) => updateItem(idx, 'image', url)}
                                folder={folder}
                            />
                        </div>
                        <button onClick={() => removeItem(idx)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Elimina</button>
                    </div>
                </div>
            ))}
            <button onClick={addItem} style={{ width: '100%', padding: '1rem', border: '2px dashed #ddd', color: '#666', background: 'none', cursor: 'pointer' }}>+ Aggiungi Elemento</button>
        </div>
    );
}

function VideoEditor({ videos, updateVideos }: { videos: string[], updateVideos: (v: string[]) => void }) {
    return (
        <div>
            {videos.map((url, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                    <input
                        style={{ flex: 1, padding: '0.5rem', border: '1px solid #ddd' }}
                        value={url}
                        onChange={(e) => {
                            const newV = [...videos];
                            newV[idx] = e.target.value;
                            updateVideos(newV);
                        }}
                    />
                    <button onClick={() => {
                        const newV = [...videos];
                        newV.splice(idx, 1);
                        updateVideos(newV);
                    }}>Remove</button>
                </div>
            ))}
            <button onClick={() => updateVideos([...videos, ''])} style={{ marginTop: '1rem' }}>+ Add YouTube URL</button>
        </div>
    );
}

const btnStyle = (active: boolean) => ({
    background: active ? '#37474F' : 'transparent',
    border: 'none',
    color: 'white',
    padding: '1rem',
    textAlign: 'left' as const,
    cursor: 'pointer',
    borderRadius: '4px'
});
