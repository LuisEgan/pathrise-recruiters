import { authenticate } from "@google-cloud/local-auth";
import { promises as fsPromises } from "fs";
import { Auth, google } from "googleapis";
import path from "path";

type Service = "sheets" | "drive";
type Scopes = {
  [key in Service]: string[];
};
type TokenPaths = {
  [key in Service]: string;
};

const SHEETS_TOKEN_PATH = path.join(process.cwd(), "/keys/Sheets-Credentials-Token.json");
const DRIVE_TOKEN_PATH = path.join(process.cwd(), "/keys/Drive-Credentials-Token.json");

const SCOPES: Scopes = {
  drive: ["https://www.googleapis.com/auth/drive"],
  sheets: ["https://www.googleapis.com/auth/spreadsheets"],
};
const TOKEN_PATH: TokenPaths = {
  drive: DRIVE_TOKEN_PATH,
  sheets: SHEETS_TOKEN_PATH,
};
const CREDENTIALS_PATH = path.join(process.cwd(), "/keys/OAuth-Desktop-Credentials.json");

interface LoadSavedCredentialsIfExist {
  service: Service;
  cacheTokenPath?: string;
}
const loadSavedCredentialsIfExist = async (
  params: LoadSavedCredentialsIfExist
): Promise<Auth.OAuth2Client | null> => {
  const { service } = params;
  try {
    const content = await fsPromises.readFile(params?.cacheTokenPath || TOKEN_PATH[service]);
    const credentials = JSON.parse(content.toString());
    return createOAuth2Client(credentials);
  } catch (err) {
    return null;
  }
};

interface SaveCredentials {
  service: Service;
  client: Auth.OAuth2Client;
}
const saveCredentials = async (params: SaveCredentials): Promise<void> => {
  const { service, client } = params;
  const content = await fsPromises.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content.toString());
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
    redirect_uris: key.redirect_uris,
  });
  await fsPromises.writeFile(TOKEN_PATH[service], payload);
};

interface Credentials {
  client_secret: string;
  client_id: string;
  redirect_uris: string[];
  refresh_token: string;
}
const createOAuth2Client = async (credentials: Credentials) => {
  const { client_secret, client_id, redirect_uris, refresh_token } = credentials;
  const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  oauth2Client.setCredentials({
    refresh_token,
  });
  return oauth2Client;
};

interface Authorize extends LoadSavedCredentialsIfExist {
  service: Service;
  credentialsJsonPath?: string;
}
export const getOAuthClient = async (params: Authorize): Promise<Auth.OAuth2Client> => {
  const { service } = params;
  try {
    let client = await loadSavedCredentialsIfExist(params);
    if (client) {
      return client;
    }

    client = await authenticate({
      scopes: SCOPES[service],
      keyfilePath: params?.credentialsJsonPath || CREDENTIALS_PATH,
    });
    if (client.credentials) {
      await saveCredentials({ client, service });
    }
    return client;
  } catch (error) {
    console.log("❌ [getOAuthClient] - error: ", error);
    throw new Error(String(error));
  }
};
