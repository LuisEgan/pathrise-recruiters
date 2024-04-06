import { LOGOS_DIR } from "../constants";
import { downloadFolder } from "../google/drive";
import { parseLogoName } from "../strings";

const COMPANY_LOGOS_DRIVE_FOLDER_ID = "1t6Sfu5XHGCB8nsflw1Pgc_mcoBjtJ2EC";

const getLogos = async () => {
  const outDir = LOGOS_DIR;

  // * Check if the '--only-new' flag is present
  const args = process.argv.slice(2);
  const onlyNew = args.includes("--only-new");

  try {
    console.log("📁  Downloading logos");
    await downloadFolder({
      outDir,
      folderId: COMPANY_LOGOS_DRIVE_FOLDER_ID,
      nameModifier: parseLogoName,
      onlyNew,
    });
  } catch (error) {
    console.log("❌  [Getting logos] error: ", error);
  }
};

(async () => {
  await getLogos();
})();
