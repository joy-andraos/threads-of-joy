import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration for different sections
const configs = {
  photos: {
    thumbnail: { width: 400, quality: 80, suffix: '-thumb' },
    medium: { width: 800, quality: 80, suffix: '-medium' },
    large: { width: 1600, quality: 80, suffix: '-large' }
  },
  blogs: {
    thumbnail: { width: 400, quality: 80, suffix: '-thumb' },
    medium: { width: 800, quality: 80, suffix: '-medium' }
  },
  projects: {
    thumbnail: { width: 400, quality: 80, suffix: '-thumb' },
    medium: { width: 800, quality: 80, suffix: '-medium' }
  },
  about: {
    thumbnail: { width: 400, quality: 80, suffix: '-thumb' },
    medium: { width: 800, quality: 80, suffix: '-medium' }
  }
};

// Create optimized versions of an image
async function optimizeImage(inputPath, outputDir, config) {
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
async function processDirectory(inputDir, outputDir, config) {
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const stat = fs.statSync(inputPath);

    if (stat.isDirectory()) {
      // Create corresponding output directory
      const newOutputDir = path.join(outputDir, file);
      await processDirectory(inputPath, newOutputDir, config);
    } else if (/\.(jpe?g|png)$/i.test(file)) {
      // Process image files
      const yearDir = path.basename(path.dirname(inputPath));
      const yearOutputDir = path.join(outputDir, yearDir);
      await optimizeImage(inputPath, yearOutputDir, config);
    }
  }
}

// Process all sections
async function processAllSections() {
  const sections = [
    {
      name: 'photos',
      inputDir: path.join(__dirname, '../public/photos'),
      outputDir: path.join(__dirname, '../public/photos-optimized')
    },
    {
      name: 'blogs',
      inputDir: path.join(__dirname, '../public/blogs'),
      outputDir: path.join(__dirname, '../public/blogs-optimized')
    },
    {
      name: 'projects',
      inputDir: path.join(__dirname, '../public/projects'),
      outputDir: path.join(__dirname, '../public/projects-optimized')
    },
    {
      name: 'about',
      inputDir: path.join(__dirname, '../public/about'),
      outputDir: path.join(__dirname, '../public/about-optimized')
    }
  ];

  for (const section of sections) {
    console.log(`\nProcessing ${section.name}...`);
    if (fs.existsSync(section.inputDir)) {
      await processDirectory(section.inputDir, section.outputDir, configs[section.name]);
    } else {
      console.log(`Directory ${section.inputDir} does not exist, skipping...`);
    }
  }
}

// Main execution
processAllSections()
  .then(() => console.log('\nImage optimization complete!'))
  .catch(error => console.error('Error:', error)); 