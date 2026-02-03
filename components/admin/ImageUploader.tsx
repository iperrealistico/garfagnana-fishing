'use client';

import { useState } from 'react';

interface Props {
    currentImage?: string;
    onImageChange: (url: string) => void;
    folder?: string;
    storageMode?: 'github' | 'blob';
}

export default function ImageUploader({ currentImage, onImageChange, folder = 'uploads', storageMode = 'github' }: Props) {
    const [uploading, setUploading] = useState(false);

    const isImage = (url: string) => {
        if (!url) return false;
        return url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) != null;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', folder);
        formData.append('storageMode', storageMode);
        if (currentImage) formData.append('oldPath', currentImage);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Upload failed');
            }

            const data = await res.json();
            onImageChange(data.url);
        } catch (err: any) {
            alert(`Errore caricamento: ${err.message}`);
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!currentImage) return;
        if (!confirm('Sei sicuro di voler rimuovere questo file? Sarà eliminato definitivamente.')) return;

        try {
            // Call API to delete file
            const res = await fetch('/api/upload', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: currentImage })
            });

            if (!res.ok) {
                console.error('Delete failed on server, but clearing local reference');
            }

            onImageChange('');
        } catch (e) {
            console.error('Error deleting file', e);
            onImageChange('');
        }
    };

    return (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {currentImage && (
                <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #cbd5e1', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isImage(currentImage) ? (
                        <img src={currentImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <i className="fas fa-file-alt" style={{ fontSize: '2rem', color: '#64748b' }}></i>
                    )}
                    <a href={currentImage} target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', bottom: 2, right: 2, background: 'white', borderRadius: '50%', padding: '2px 5px', fontSize: '0.7rem', textDecoration: 'none' }}>
                        <i className="fas fa-external-link-alt"></i>
                    </a>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    disabled={uploading}
                    style={{ fontSize: '0.9rem', color: '#475569' }}
                />
                {uploading && <span style={{ fontSize: '0.8rem', color: '#0ea5e9', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <i className="fas fa-spinner fa-spin"></i> Caricamento su {storageMode}...
                </span>}
            </div>

            {currentImage && (
                <button
                    type="button"
                    onClick={handleDelete}
                    style={{
                        color: '#ef4444',
                        border: '1px solid #fecaca',
                        background: '#fef2f2',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }}
                >
                    <i className="fas fa-trash"></i> Rimuovi
                </button>
            )}
        </div>
    );
}

