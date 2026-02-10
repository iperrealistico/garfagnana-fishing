const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_IMAGE = path.join(__dirname, '../public/logo-garfagnana-fishing.png');
const OUTPUT_DIR = path.join(__dirname, '../public');

const icons = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-96x96.png', size: 96 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
];

async function generateIcons() {
    console.log('Generating icons...');

    if (!fs.existsSync(SOURCE_IMAGE)) {
        console.error(`Source image not found: ${SOURCE_IMAGE}`);
        process.exit(1);
    }

    for (const icon of icons) {
        await sharp(SOURCE_IMAGE)
            .resize(icon.size, icon.size, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .toFile(path.join(OUTPUT_DIR, icon.name));
        console.log(`Generated ${icon.name}`);
    }

    // Generate favicon.ico (32x32) as PNG but named .ico for compatibility
    await sharp(SOURCE_IMAGE)
        .resize(32, 32, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(path.join(OUTPUT_DIR, 'favicon.ico'));

    console.log('All icons generated successfully!');
}

generateIcons().catch(err => {
    console.error('Error generating icons:', err);
    process.exit(1);
});
