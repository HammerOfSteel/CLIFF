# PDF Files

This directory contains PDF files for the CLIFF prototype.

## Adding PDF Books

1. Place your PDF files in this directory
2. Update `src/data/mockStories.ts` with the PDF path:
   ```typescript
   {
     type: 'pdf',
     pdfPath: '/pdf/your-file.pdf',
     // ... other story properties
   }
   ```

## Example

The "Bloom on the Moon" story uses:
- File: `Bloom_on_the_moon.pdf` (add your own copy here)
- Path in mockStories: `/pdf/Bloom_on_the_moon.pdf`

## Note

PDF files are excluded from git due to GitHub's 100MB file size limit.
Each developer should add their own PDF files locally for testing.
