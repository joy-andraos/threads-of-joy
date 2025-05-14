import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  thumbnail: {
    width: 400,
    quality: 80,
    suffix: '-thumb'
  },
  medium: {
    width: 800,
    quality: 80,
    suffix: '-medium'
  },
  large: {
    width: 1600,
    quality: 80,
    suffix: '-large'
  }
};

// Create optimized versions of an image
async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath);
  const nameWithoutExt = path.parse(filename).name;
  const ext = path.parse(filename).ext;

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // Generate WebP versions
    for (const [size, settings] of Object.entries(config)) {
      const outputPath = path.join(
        outputDir,
        `${nameWithoutExt}${settings.suffix}.webp`
      );

      await sharp(inputPath)
        .resize(settings.width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: settings.quality })
        .toFile(outputPath);

      console.log(`Created ${size} WebP: ${outputPath}`);
    }

    // Generate JPEG fallback versions
    for (const [size, settings] of Object.entries(config)) {
      const outputPath = path.join(
        outputDir,
        `${nameWithoutExt}${settings.suffix}${ext}`
      );

      await sharp(inputPath)
        .resize(settings.width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: settings.quality })
        .toFile(outputPath);

      console.log(`Created ${size} JPEG: ${outputPath}`);
    }
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

// Process all images in a directory
async function processDirectory(inputDir, outputDir) {
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const stat = fs.statSync(inputPath);

    if (stat.isDirectory()) {
      // Create corresponding output directory
      const newOutputDir = path.join(outputDir, file);
      await processDirectory(inputPath, newOutputDir);
    } else if (/\.(jpe?g|png)$/i.test(file)) {
      // Process image files
      const yearDir = path.basename(path.dirname(inputPath));
      const yearOutputDir = path.join(outputDir, yearDir);
      await optimizeImage(inputPath, yearOutputDir);
    }
  }
}

// Main execution
const inputDir = path.join(__dirname, '../public/photos');
const outputDir = path.join(__dirname, '../public/photos-optimized');

processDirectory(inputDir, outputDir)
  .then(() => console.log('Image optimization complete!'))
  .catch(error => console.error('Error:', error)); 