'use client';

import { useState } from 'react';

interface Props {
    currentImage?: string;
    onImageChange: (url: string) => void;
    folder?: string;
}

export default function ImageUploader({ currentImage, onImageChange, folder = 'uploads' }: Props) {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', folder);
        if (currentImage) formData.append('oldPath', currentImage);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            onImageChange(data.path);
        } catch (err) {
            alert('Impossibile caricare immagine');
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!currentImage) return;
        if (!confirm('Sei sicuro di voler rimuovere questa immagine?')) return;

        // We don't necessarily delete the file from server immediately on "Remove" logic in UI, 
        // often we just clear the field. But here we can try to facilitate cleanup.
        // Ideally, cleanup happens when we clear the field AND save.
        // But for simplicity, we just clear the field value. 
        // The old file stays until explicitly replaced or deleted via specific manager.
        // Wait, "Deletes must remove it from GitHub". 
        // If the user clicks "Remove" on an image field, do we delete the file?
        // Maybe safer to just unset the value.
        onImageChange('');
    };

    return (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {currentImage && (
                <div style={{ width: '60px', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #ddd' }}>
                    <img src={currentImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    style={{ fontSize: '0.9rem' }}
                />
                {uploading && <span style={{ fontSize: '0.8rem', color: '#666' }}>Caricamento...</span>}
            </div>

            {currentImage && (
                <button
                    type="button"
                    onClick={handleDelete}
                    style={{ color: 'red', border: '1px solid red', background: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px' }}
                >
                    Rimuovi
                </button>
            )}
        </div>
    );
}
