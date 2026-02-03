'use client';

import { useState, useEffect } from 'react';
import { SiteContent } from '@/lib/content';
import ImageUploader from '@/components/admin/ImageUploader';

interface ListEditorProps {
    items: any[];
    updateItems: (items: any[]) => void;
    template: any;
    folder: string;
    storageMode?: 'github' | 'blob';
}

// Friendly Naming Mapping
const friendlyLabels: { [key: string]: string } = {
    // Navigation
    "prenota-nav": "Nav: Prenota",
    "dove-nav": "Nav: Dove Pescare",
    "chi-nav": "Nav: Chi Siamo",
    "video-nav": "Nav: Video",
    "servizi-nav": "Nav: Servizi",
    "come-nav": "Nav: Raggiungici",
    // Hero
    "hero-title": "Titolo Principale",
    "hero-subtitle": "Sottotitolo Hero",
    "cta-dove": "Bottone: Dove Pescare",
    "cta-chi": "Bottone: Chi Siamo",
    "cta-vitto": "Bottone: Vitto/Alloggio",
    "cta-video": "Bottone: Video",
    // Sections
    "app-title": "Titolo App",
    "app-desc": "Descrizione App",
    "dove-title": "Titolo Dove Pescare",
    "dove-desc": "Descrizione Dove Pescare",
    "chi-title": "Titolo Chi Siamo",
    "chi-desc1": "Chi Siamo Par. 1",
    "chi-desc2": "Chi Siamo Par. 2",
    "chi-desc3": "Chi Siamo Par. 3",
    "video-title": "Titolo Video",
    "servizi-title": "Titolo Servizi",
    "servizi-desc": "Descrizione Servizi",
    // Tabs
    "tab-guide": "Tab Guide",
    "tab-mangiare": "Tab Ristoranti",
    "tab-dormire": "Tab Alloggi",
    "tab-altre": "Tab Altro",
    "guide-fly": "Etichetta Mosca",
    "website": "Etichetta Sito Web",
    "facebook-page": "Etichetta Facebook",
    "altre-title": "Titolo Altre Info",
    "altre-desc": "Descrizione Altre Info",
    "come-title": "Titolo Come Raggiungerci",
    "come-desc": "Descrizione Come Raggiungerci",
    "acc-auto": "Etichetta Auto",
    "acc-aereo": "Etichetta Aereo",
    "acc-treno": "Etichetta Treno",
    "acc-auto-content": "Testo Auto",
    "acc-aereo-content": "Testo Aereo",
    "acc-treno-content": "Testo Treno",
};

const categories = {
    navigation: ['prenota-nav', 'dove-nav', 'chi-nav', 'video-nav', 'servizi-nav', 'come-nav', 'cta-dove', 'cta-chi', 'cta-vitto', 'cta-video'],
    content: ['hero-title', 'hero-subtitle', 'app-title', 'app-desc', 'dove-title', 'dove-desc', 'chi-title', 'chi-desc1', 'chi-desc2', 'chi-desc3'],
    services: ['servizi-title', 'servizi-desc', 'tab-guide', 'tab-mangiare', 'tab-dormire', 'tab-altre', 'guide-fly', 'website', 'facebook-page', 'altre-title', 'altre-desc'],
    logistics: ['come-title', 'come-desc', 'acc-auto', 'acc-aereo', 'acc-treno', 'acc-auto-content', 'acc-aereo-content', 'acc-treno-content'],
};

export default function Dashboard() {
    const [content, setContent] = useState<SiteContent | null>(null);
    const [activeSection, setActiveSection] = useState('content');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [stats, setStats] = useState<{ size_mb: string, blob_size_mb?: string, gh_size_mb?: string } | null>(null);

    useEffect(() => {
        fetchContent();
        fetchStats();
    }, []);

    const fetchContent = async () => {
        const res = await fetch('/api/content');
        const data = await res.json();

        // Defaults if missing
        if (!data.seo) data.seo = { title_template: "", default_description: "", og_image: "", keywords: "" };
        if (!data.settings) data.settings = { debug_mode: false, storage_mode: 'github', clean_urls: true };
        if (!data.zrs_list) data.zrs_list = [];
        if (!data.custom_buttons) data.custom_buttons = { download_maps: { text: "Scarica mappe", url: "" }, download_rules: { text: "Scarica regolamento", url: "" } };
        if (!data.app_links) data.app_links = { android: "", ios: "" };

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

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8fafc' }}>
            <div style={{ fontSize: '1.5rem', color: '#64748b' }}><i className="fas fa-spinner fa-spin"></i> Caricamento...</div>
        </div>
    );
    if (!content) return <div>Errore nel caricamento</div>;

    const navItems = [
        { id: 'content', label: 'Contenuti Generali', icon: 'fa-file-alt' },
        { id: 'navigation', label: 'Menu & Navigazione', icon: 'fa-compass' },
        { id: 'services', label: 'Servizi & Info', icon: 'fa-info-circle' },
        { id: 'logistics', label: 'Logistica', icon: 'fa-map-signs' },
        { id: 'zrs', label: 'Zone ZRS', icon: 'fa-water' },
        { id: 'guides', label: 'Guide di Pesca', icon: 'fa-user-friends' },
        { id: 'restaurants', label: 'Ristoranti', icon: 'fa-utensils' },
        { id: 'accommodations', label: 'Alloggi', icon: 'fa-bed' },
        { id: 'videos', label: 'Video Gallery', icon: 'fa-video' },
        { id: 'settings', label: 'Impostazioni Avanzate', icon: 'fa-cogs' },
    ];

    const storageMode = content.settings.storage_mode;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            {/* Sidebar */}
            <div style={{ width: '280px', background: '#1e293b', color: '#f1f5f9', display: 'flex', flexDirection: 'column', borderRight: '1px solid #334155' }}>
                <div style={{ padding: '2rem', borderBottom: '1px solid #334155', background: '#0f172a' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, color: '#f1f5f9' }}>
                        <i className="fas fa-fish" style={{ marginRight: '10px', color: '#4ade80' }}></i>
                        Admin Panel
                    </h2>
                </div>

                <nav style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1, overflowY: 'auto' }}>
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            style={btnStyle(activeSection === item.id)}
                            onClick={() => setActiveSection(item.id)}
                        >
                            <i className={`fas ${item.icon}`} style={{ width: '24px', textAlign: 'center' }}></i>
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div style={{ padding: '1.5rem', borderTop: '1px solid #334155', background: '#0f172a', fontSize: '0.85rem', color: '#94a3b8' }}>
                    <p style={{ marginBottom: '0.5rem' }}><i className="fab fa-github"></i> GitHub: {stats?.gh_size_mb || stats?.size_mb || '...'} MB</p>
                    <p><i className="fas fa-cloud"></i> Blob: {stats?.blob_size_mb || '0'} MB</p>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, background: '#f1f5f9', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <div style={{ background: 'white', padding: '1.5rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <h1 style={{ fontSize: '1.5rem', color: '#1e293b', margin: 0, fontWeight: 600 }}>
                        {navItems.find(i => i.id === activeSection)?.label}
                    </h1>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        style={{
                            background: saving ? '#94a3b8' : '#166534',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '6px',
                            cursor: saving ? 'not-allowed' : 'pointer',
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'all 0.2s'
                        }}
                    >
                        <i className={`fas ${saving ? 'fa-spinner fa-spin' : 'fa-save'}`}></i>
                        {saving ? 'Salvataggio...' : 'PUBBLICA MODIFICHE'}
                    </button>
                </div>

                <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                    {/* Render content based on section */}
                    {(activeSection === 'content' || activeSection === 'navigation' || activeSection === 'services' || activeSection === 'logistics') && (
                        <TranslationEditor
                            content={content}
                            setContent={setContent}
                            keys={categories[activeSection as keyof typeof categories] || []}
                        />
                    )}

                    {activeSection === 'zrs' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ background: '#ecfdf5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #6ee7b7' }}>
                                <h3 style={{ margin: '0 0 1rem 0', color: '#065f46' }}>Gestione Download Mappe e Regolamenti</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    <div>
                                        <label style={labelStyle}>Mappe Download Label</label>
                                        <input
                                            value={content.custom_buttons.download_maps.text}
                                            onChange={e => setContent({ ...content, custom_buttons: { ...content.custom_buttons, download_maps: { ...content.custom_buttons.download_maps, text: e.target.value } } })}
                                            style={inputStyle}
                                        />
                                        <label style={labelStyle}>Mappe PDF URL</label>
                                        <input
                                            value={content.custom_buttons.download_maps.url}
                                            onChange={e => setContent({ ...content, custom_buttons: { ...content.custom_buttons, download_maps: { ...content.custom_buttons.download_maps, url: e.target.value } } })}
                                            style={{ ...inputStyle, marginBottom: '0.5rem' }}
                                        />
                                        <ImageUploader
                                            currentImage={content.custom_buttons.download_maps.url}
                                            onImageChange={url => setContent({ ...content, custom_buttons: { ...content.custom_buttons, download_maps: { ...content.custom_buttons.download_maps, url } } })}
                                            folder="docs"
                                            storageMode={storageMode}
                                        />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Regolamento Download Label</label>
                                        <input
                                            value={content.custom_buttons.download_rules.text}
                                            onChange={e => setContent({ ...content, custom_buttons: { ...content.custom_buttons, download_rules: { ...content.custom_buttons.download_rules, text: e.target.value } } })}
                                            style={inputStyle}
                                        />
                                        <label style={labelStyle}>Regolamento PDF URL</label>
                                        <input
                                            value={content.custom_buttons.download_rules.url}
                                            onChange={e => setContent({ ...content, custom_buttons: { ...content.custom_buttons, download_rules: { ...content.custom_buttons.download_rules, url: e.target.value } } })}
                                            style={{ ...inputStyle, marginBottom: '0.5rem' }}
                                        />
                                        <ImageUploader
                                            currentImage={content.custom_buttons.download_rules.url}
                                            onImageChange={url => setContent({ ...content, custom_buttons: { ...content.custom_buttons, download_rules: { ...content.custom_buttons.download_rules, url } } })}
                                            folder="docs"
                                            storageMode={storageMode}
                                        />
                                    </div>
                                </div>
                            </div>

                            <ListEditor
                                items={content.zrs_list}
                                updateItems={(items) => setContent({ ...content, zrs_list: items })}
                                template={{ id: 'new-zrs', name: 'Nuova ZRS', description: '', map_embed_url: '', map_link_url: '' }}
                                folder="zrs"
                                storageMode={storageMode}
                            />
                        </div>
                    )}

                    {activeSection === 'guides' && (
                        <ListEditor
                            items={content.guides}
                            updateItems={(items) => setContent({ ...content, guides: items })}
                            template={{ name: '', type: 'Mosca', phone: '', email: '', instagram: '', image: '' }}
                            folder="guides"
                            storageMode={storageMode}
                        />
                    )}
                    {activeSection === 'restaurants' && (
                        <ListEditor
                            items={content.restaurants}
                            updateItems={(items) => setContent({ ...content, restaurants: items })}
                            template={{ name: '', phone: '', address: '', website: '', image: '' }}
                            folder="restaurants"
                            storageMode={storageMode}
                        />
                    )}
                    {activeSection === 'accommodations' && (
                        <ListEditor
                            items={content.accommodations}
                            updateItems={(items) => setContent({ ...content, accommodations: items })}
                            template={{ name: '', phone: '', address: '', website: '', image: '' }}
                            folder="accommodations"
                            storageMode={storageMode}
                        />
                    )}
                    {activeSection === 'videos' && (
                        <VideoEditor
                            videos={content.videos}
                            updateVideos={(videos) => setContent({ ...content, videos })}
                        />
                    )}
                    {activeSection === 'settings' && (
                        <AdvancedSettingsEditor
                            content={content}
                            setContent={setContent}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

function TranslationEditor({ content, setContent, keys }: { content: SiteContent, setContent: any, keys: string[] }) {
    const [lang, setLang] = useState('it');

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
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ marginBottom: '2rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', display: 'flex', gap: '1rem' }}>
                <button
                    onClick={() => setLang('it')}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        border: lang === 'it' ? '2px solid #2E7D32' : '1px solid #e2e8f0',
                        background: lang === 'it' ? '#f0fdf4' : 'white',
                        fontWeight: lang === 'it' ? 600 : 400,
                        cursor: 'pointer',
                        color: lang === 'it' ? '#14532d' : '#475569'
                    }}
                >
                    <i className="fas fa-flag" style={{ marginRight: '8px', color: '#166534' }}></i>
                    Italiano
                </button>
                <button
                    onClick={() => setLang('en')}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        border: lang === 'en' ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        background: lang === 'en' ? '#eff6ff' : 'white',
                        fontWeight: lang === 'en' ? 600 : 400,
                        cursor: 'pointer',
                        color: lang === 'en' ? '#1e3a8a' : '#475569'
                    }}
                >
                    <i className="fas fa-globe" style={{ marginRight: '8px', color: '#1e40af' }}></i>
                    Inglese
                </button>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {keys.map(key => (
                    <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>
                            {friendlyLabels[key] || key}
                        </label>
                        {content.translations[lang as 'it' | 'en'][key]?.length > 60 ? (
                            <textarea
                                value={content.translations[lang as 'it' | 'en'][key] || ''}
                                onChange={(e) => updateVal(key, e.target.value)}
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: '6px',
                                    border: '1px solid #cbd5e1',
                                    minHeight: '120px',
                                    width: '100%',
                                    fontFamily: 'inherit',
                                    fontSize: '0.95rem'
                                }}
                            />
                        ) : (
                            <input
                                value={content.translations[lang as 'it' | 'en'][key] || ''}
                                onChange={(e) => updateVal(key, e.target.value)}
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: '6px',
                                    border: '1px solid #cbd5e1',
                                    width: '100%',
                                    fontSize: '0.95rem'
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function ListEditor({ items, updateItems, template, folder, storageMode }: ListEditorProps) {
    const addItem = () => {
        updateItems([...items, { ...template }]);
    };

    const removeItem = (idx: number) => {
        if (confirm('Sei sicuro di voler eliminare questo elemento?')) {
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {items.map((item: any, idx: number) => (
                <div key={idx} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#334155' }}>#{idx + 1} {item.name || item.id}</h3>
                        <button onClick={() => removeItem(idx)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>
                            <i className="fas fa-trash-alt"></i> Elimina
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        {Object.keys(template).map(field => field !== 'image' && (
                            <div key={field}>
                                <label style={labelStyle}>{field.replace('_', ' ')}</label>
                                {field === 'description' || field.includes('embed') ? (
                                    <textarea
                                        style={{ ...inputStyle, minHeight: '80px' }}
                                        value={item[field]}
                                        onChange={(e) => updateItem(idx, field, e.target.value)}
                                    />
                                ) : (
                                    <input
                                        style={inputStyle}
                                        value={item[field]}
                                        onChange={(e) => updateItem(idx, field, e.target.value)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {template.hasOwnProperty('image') && (
                        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                            <label style={{ ...labelStyle, marginBottom: '0.5rem' }}>Immagine</label>
                            <ImageUploader
                                currentImage={item.image}
                                onImageChange={(url) => updateItem(idx, 'image', url)}
                                folder={folder}
                                storageMode={storageMode}
                            />
                        </div>
                    )}
                </div>
            ))}
            <button
                onClick={addItem}
                style={{
                    width: '100%', padding: '1.5rem', border: '2px dashed #94a3b8',
                    color: '#64748b', background: '#f8fafc', cursor: 'pointer',
                    borderRadius: '12px', fontSize: '1rem', fontWeight: 600,
                    transition: 'all 0.2s'
                }}
            >
                <i className="fas fa-plus-circle" style={{ marginRight: '10px' }}></i>
                Aggiungi Nuovo Elemento
            </button>
        </div>
    );
}

function VideoEditor({ videos, updateVideos }: { videos: string[], updateVideos: (v: string[]) => void }) {
    return (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#334155' }}>Gestione Video YouTube</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {videos.map((url, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 'bold', color: '#64748b' }}>
                            {idx + 1}
                        </div>
                        <input
                            style={{ flex: 1, padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                            value={url}
                            placeholder="https://www.youtube.com/watch?v=..."
                            onChange={(e) => {
                                const newV = [...videos];
                                newV[idx] = e.target.value;
                                updateVideos(newV);
                            }}
                        />
                        <button
                            onClick={() => {
                                const newV = [...videos];
                                newV.splice(idx, 1);
                                updateVideos(newV);
                            }}
                            style={{
                                padding: '0.75rem',
                                background: '#fee2e2',
                                color: '#ef4444',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer'
                            }}
                        >
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                ))}
            </div>
            <button
                onClick={() => updateVideos([...videos, ''])}
                style={{
                    marginTop: '1.5rem',
                    padding: '0.75rem 1.5rem',
                    background: '#e0f2fe',
                    color: '#0284c7',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 600,
                    cursor: 'pointer'
                }}
            >
                <i className="fas fa-plus"></i> Aggiungi Video URL
            </button>
        </div>
    );
}

function AdvancedSettingsEditor({ content, setContent }: { content: SiteContent, setContent: any }) {
    const { seo, settings, app_links } = content;

    const updateSeo = (field: string, val: string) => {
        setContent({ ...content, seo: { ...seo, [field]: val } });
    };

    const updateSettings = (field: string, val: any) => {
        setContent({ ...content, settings: { ...settings, [field]: val } });
    };

    const updateAppLink = (field: string, val: string) => {
        setContent({ ...content, app_links: { ...app_links, [field]: val } });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* General Settings */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                    <i className="fas fa-cogs" style={{ marginRight: '10px', color: '#475569' }}></i>
                    Configurazione Sistema
                </h3>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                        <input
                            type="checkbox"
                            id="debug"
                            checked={settings.debug_mode}
                            onChange={e => updateSettings('debug_mode', e.target.checked)}
                            style={{ width: '20px', height: '20px' }}
                        />
                        <div>
                            <label htmlFor="debug" style={{ fontWeight: 600, display: 'block' }}>Debug Mode</label>
                            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Abilita log dettagliati per lo sviluppo.</span>
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Modalità di Archiviazione (Storage)</label>
                        <select
                            value={settings.storage_mode}
                            onChange={e => updateSettings('storage_mode', e.target.value)}
                            style={inputStyle}
                        >
                            <option value="github">GitHub (Repository)</option>
                            <option value="blob">Vercel Blob (Cloud)</option>
                        </select>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>
                            GitHub salva i file nel repo (gratis, versionato). Blob salva su Vercel Cloud (veloce, ma ha limiti di banda).
                        </p>
                    </div>
                </div>
            </div>

            {/* App Links */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                    <i className="fas fa-mobile-alt" style={{ marginRight: '10px', color: '#3b82f6' }}></i>
                    Link App Mobile
                </h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Google Play Store URL</label>
                        <input style={inputStyle} value={app_links.android} onChange={e => updateAppLink('android', e.target.value)} />
                    </div>
                    <div>
                        <label style={labelStyle}>Apple App Store URL</label>
                        <input style={inputStyle} value={app_links.ios} onChange={e => updateAppLink('ios', e.target.value)} />
                    </div>
                </div>
            </div>

            {/* SEO Settings */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                    <i className="fas fa-search" style={{ marginRight: '10px', color: '#f59e0b' }}></i>
                    Ottimizzazione SEO
                </h3>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={labelStyle}>Title Template</label>
                        <input style={inputStyle} value={seo.title_template} onChange={e => updateSeo('title_template', e.target.value)} />
                    </div>
                    <div>
                        <label style={labelStyle}>Meta Description Default</label>
                        <textarea style={inputStyle} value={seo.default_description} onChange={e => updateSeo('default_description', e.target.value)} />
                    </div>
                    <div>
                        <label style={labelStyle}>OG Image</label>
                        <ImageUploader
                            currentImage={seo.og_image}
                            onImageChange={(url) => updateSeo('og_image', url)}
                            folder="hero"
                            storageMode={settings.storage_mode}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Parole Chiave</label>
                        <input style={inputStyle} value={seo.keywords} onChange={e => updateSeo('keywords', e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const btnStyle = (active: boolean) => ({
    background: active ? '#334155' : 'transparent',
    border: 'none',
    color: active ? '#fff' : '#cbd5e1',
    padding: '0.75rem 1rem',
    textAlign: 'left' as const,
    cursor: 'pointer',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '0.95rem',
    fontWeight: active ? 600 : 400,
    transition: 'all 0.2s'
});

const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'capitalize' as const, color: '#64748b' };
const inputStyle = { width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' };
