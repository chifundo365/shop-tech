import multer from "multer";

// Configure multer to store files in memory as buffers
const upload = multer({
  storage: multer.memoryStorage(), // Use memory storage
  limits: { fileSize: 300 * 1024 * 1024 } // 300MB file size limit
});

export default upload;
