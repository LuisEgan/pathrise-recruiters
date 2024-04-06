import * as fs from "fs";
import { google } from "googleapis";
import { getOAuthClient } from "./oauth2Client";

let downloadedCount = 0;
let totalFilesCount = 0;

const updateDownloadedCount = () => {
  downloadedCount++;
  process.stdout.clearLine(-1); // Clear the current line
  process.stdout.cursorTo(0); // Move the cursor to the beginning of the line
  process.stdout.write(`Downloaded ${downloadedCount} / ${totalFilesCount} logos`);
};

interface DownloadFolder {
  outDir: string;
  folderId: string;
  nameModifier?: (name: string) => string;
  pageToken?: string;
  onlyNew?: boolean;
}
export const downloadFolder = async (params: DownloadFolder) => {
  const { outDir, folderId, nameModifier, pageToken, onlyNew } = params;
  try {
    if (!folderId) throw new Error("Folder ID is required");
    console.log(`⏬  Downloading folder ${folderId} into ${outDir}`);

    if (onlyNew) {
      console.log("⚠️  onlyNew flag is set. Checking for new files only!");
    }

    const auth = await getOAuthClient({ service: "drive" });
    const drive = google.drive({ version: "v3", auth });
    const res = await drive.files.list({
      q: `'${folderId}' in parents`,
      fields: "files(id, name, mimeType), nextPageToken",
      pageSize: 1000,
      pageToken,
    });
    if (!res.data.files) throw new Error("No files found in the folder");

    const nextPageToken = res.data.nextPageToken;
    let files = res.data.files;
    totalFilesCount = files?.length || 0;
    console.log(`🔢  Found ${totalFilesCount} files`);

    let filesInDir: Array<string> = [];
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    } else {
      // * Get all files names in outDir
      filesInDir = fs.readdirSync(outDir);

      if (onlyNew) {
        files = files?.filter((file) => {
          const { name } = file;
          const fileId = file.id || "";
          const fileName = nameModifier ? nameModifier(name ?? `no-name-${fileId}`) : file.name;
          return !!fileName && !filesInDir.includes(fileName);
        });
        console.log(`🔢  Found ${files.length} new files`);

        if (files.length === 0) {
          console.log(
            "⚠️  All files are already downloaded and onlyNew flag is set. Nothing to do ¯\\_(ツ)_/¯"
          );
          return;
        }
      }
    }

    if (files) {
      for (const file of files) {
        const { name } = file;
        const fileId = file.id || "";
        const fileName = nameModifier ? nameModifier(name ?? `no-name-${fileId}`) : file.name;
        const mimeType = file.mimeType;

        // * Skip if file already exists and onlyNew flag is set
        if (!fileName || (onlyNew && filesInDir.includes(fileName))) {
          continue;
        }

        if (mimeType === "application/vnd.google-apps.folder") {
          const newDestinationDir = `${outDir}/${fileName}`;
          fs.mkdirSync(newDestinationDir, { recursive: true });
          await downloadFolder({ outDir: newDestinationDir, folderId: fileId, nameModifier });
        } else {
          const destPath = `${outDir}/${fileName}`;
          const destStream = fs.createWriteStream(destPath);
          const response = await drive.files.get(
            { fileId, alt: "media" },
            { responseType: "stream" }
          );

          response.data
            .on("end", () => {
              updateDownloadedCount();
            })
            .on("error", (err) => {
              throw new Error(`Error downloading file: ${err}`);
            })
            .pipe(destStream);
        }
      }
    }

    // * If there are more files to download, recursively call the function
    if (nextPageToken) {
      await downloadFolder({ outDir, folderId, nameModifier, pageToken: nextPageToken });
    }

    if (downloadedCount !== files.length) {
      updateDownloadedCount();
    }

    process.stdout.write("\n");
    console.log(`✅  Done downloading folder ${folderId}`);

    if (onlyNew) {
      console.log("📃  Downloaded files:");
      console.log(files.map((file) => file.name).join("\n"));
      process.stdout.write("\n");
    }
  } catch (error) {
    console.log("❌ [downloadFolder] - error: ", error);
    throw new Error(String(error));
  }
};
