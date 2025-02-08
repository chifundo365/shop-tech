import { google } from "googleapis";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Stream } from "stream";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const credentialsPath = join(__dirname, "google-drive_api_key.json");
const credentials = JSON.parse(
  fs.readFileSync(credentialsPath)
);

// Define the required scope
const SCOPE = ["https://www.googleapis.com/auth/drive"];

// Variable to hold the Drive instance
let drive;

/**
 * Authorizes the service account and initializes the Google Drive client
 */
async function authorize() {
  try {
    // Initialize the JWT client
    const jwtClient = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      SCOPE
    );

    // Authorize the client
    await jwtClient.authorize();

    // Initialize and return the Drive client
    drive = google.drive({ version: "v3", auth: jwtClient });
    console.log("Google Drive client initialized.");
    return drive;
  } catch (error) {
    console.error("Error during authorization:", error);
    throw error;
  }
}

// Immediately authorize and export the drive instance
const initializeDrive = async () => {
  if (!drive) {
    await authorize();
  }
  return drive;
};

class Drive {
  static async uploadFile(file, folderId) {
    const drive = await initializeDrive();
    let fileStream;

    if (file.buffer) {
      // File is in memory
      const bufferStream = new Stream.PassThrough();
      bufferStream.end(file.buffer);
      fileStream = bufferStream;
      }
    const fileMetaData = {
      name: file.originalname,
      parents: [folderId],
      fields: "id"
    };
    const media = {
      mimeType: file.mimetype,
      body: fileStream
    };

    try {
      const response = await drive.files.create({
        requestBody: fileMetaData,
        media: media
      });

      await Drive.makeAccessible(response.data.id);
      return await Drive.getFile(response.data.id);
    } catch (error) {
      console.error("Error uploading file: ", error);
      throw error;
    }
  }

  static async getFile(fileId) {
    const drive = await initializeDrive();
    try {
      return await drive.files.get({
        fileId,
        fields: "id,  webViewLink, webContentLink, thumbnailLink"
      });
    } catch (error) {
      console.error("Error getting file: ", error);
      throw error;
    }
  }

  static async makeAccessible(fileId) {
    const drive = await initializeDrive();
    try {
      return await drive.permissions.create({
        fileId,
        requestBody: {
          role: "reader",
          type: "anyone"
        }
      });
    } catch (error) {
      console.error("Error making file accessible: ", error);
      throw error;
    }
  }

  static async deleteFile(fileId) {
    const drive = await initializeDrive();
    try {
      await drive.files.delete({ fileId });
    } catch (error) {
      console.error("Error deleting file: ", error);
      throw error;
    }
  }
}

// Drive.uploadFile(
//   "building.jpg",
//   "image/jpeg",
//   "1BYviSoWDR_1czCvWmRzcmwSRgeon-kzp"
// )
//   .then(data => console.log(data.data))
//   .catch(error => console.error(error));

export default Drive;
