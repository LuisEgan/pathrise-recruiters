import { google, sheets_v4 } from "googleapis";
import { SPREADSHEET_ID } from "../companies/constants";
import { getOAuthClient } from "./oauth2Client";

interface GetSheets {
  cacheTokenPath?: string;
  credentialsJsonPath?: string;
  sheet: sheets_v4.Params$Resource$Spreadsheets$Values$Get;
}

export const getSheet = async (params: GetSheets) => {
  const { sheet } = params;
  try {
    const auth = await getOAuthClient({ service: "sheets" });
    const sheets = google.sheets({ version: "v4", auth });
    return await sheets.spreadsheets.values.get(sheet);
  } catch (error) {
    console.log("❌ [getSheet] - error: ", error);
    throw new Error(String(error));
  }
};

interface UpdateSheet extends GetSheets {
  sheet: sheets_v4.Params$Resource$Spreadsheets$Values$Update;
  newValue: Array<Array<string>> | string | number;
}
export const updateSheet = async (params: UpdateSheet) => {
  try {
    const { sheet, newValue } = params;
    const auth = await getOAuthClient({ service: "sheets" });

    const sheets = google.sheets({ version: "v4", auth });
    return await sheets.spreadsheets.values.update({
      ...sheet,
      valueInputOption: "RAW",
      requestBody: {
        values: Array.isArray(newValue) ? newValue : [[newValue]],
      },
    });
  } catch (error) {
    console.log("❌ [updateSheet] - error: ");
    throw new Error(String(error));
  }
};

interface SheetRowsToObj {
  sheetRows: Array<string>[];
  transform?: (str: string) => string | string[];
}
export const sheetRowsToObj = <Obj>(params: SheetRowsToObj): Array<Obj> => {
  const { sheetRows, transform } = params;

  if (sheetRows?.length === 0) {
    console.log("No data found.");
    return [];
  }

  const headers: Array<string> = sheetRows[0];
  sheetRows.shift();
  const rows = sheetRows as Array<string>[];

  const objects: Array<Obj> = [];
  rows.forEach((row) => {
    // TODO: type correctly!
    const company = {} as Obj;

    headers.forEach((key, i) => {
      const cellValue = row[i];
      company[key as keyof typeof company] = !!transform
        ? transform(cellValue)
        : (cellValue as any);
    });

    objects.push(company);
  });

  return objects;
};

export const getSheetData = async <Obj>(params: GetSheets & Partial<SheetRowsToObj>) => {
  const {
    sheet: { spreadsheetId, range },
    transform,
  } = params;

  console.log(`⌛ Getting ${range} sheets...`);
  try {
    const sheet = await getSheet({
      sheet: {
        spreadsheetId: SPREADSHEET_ID || spreadsheetId,
        range,
      },
    });
    console.log(`✅ ${range} sheets done: ${sheet?.data?.values?.length}\n`);

    const companiesV1Rows = sheet.data.values || [];
    return sheetRowsToObj<Obj>({ sheetRows: companiesV1Rows, transform });
  } catch (error) {
    throw error;
  }
};
