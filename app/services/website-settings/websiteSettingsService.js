import { websiteSettingsMock } from "~/mocks/website-settings/websiteSettingsMock";

const storageKey = "roze-cms-website-settings";

function cloneSettings(settings) {
  return {
    header: { ...settings.header },
    footer: {
      ...settings.footer,
      socialLinks: settings.footer.socialLinks.map((link) => ({ ...link })),
    },
  };
}

function isRecord(value) {
  return typeof value === "object" && value !== null;
}

function isNullableString(value) {
  return value === null || typeof value === "string";
}

function isSocialMediaLink(value) {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    typeof value.platform === "string" &&
    typeof value.url === "string"
  );
}

function isWebsiteSettings(value) {
  if (!isRecord(value) || !isRecord(value.header) || !isRecord(value.footer)) {
    return false;
  }

  return (
    isNullableString(value.header.websiteLogo) &&
    isNullableString(value.header.mobileLogo) &&
    typeof value.header.getAppLink === "string" &&
    isNullableString(value.footer.websiteLogo) &&
    isNullableString(value.footer.mobileLogo) &&
    Array.isArray(value.footer.socialLinks) &&
    value.footer.socialLinks.every(isSocialMediaLink) &&
    typeof value.footer.copyrightText === "string"
  );
}

function readSettings() {
  if (typeof window === "undefined") return cloneSettings(websiteSettingsMock);

  const savedSettings = window.localStorage.getItem(storageKey);
  if (!savedSettings) return cloneSettings(websiteSettingsMock);

  let parsedSettings;
  try {
    parsedSettings = JSON.parse(savedSettings);
  } catch {
    throw new Error(
      "Saved website settings could not be read. Clear the saved mock settings and try again.",
    );
  }

  if (!isWebsiteSettings(parsedSettings)) {
    throw new Error(
      "Saved website settings have an invalid format. Clear the saved mock settings and try again.",
    );
  }

  return cloneSettings(parsedSettings);
}

function saveSettings(settings) {
  if (typeof window === "undefined") {
    throw new Error(
      "Mock website settings can only be updated in the browser.",
    );
  }

  window.localStorage.setItem(storageKey, JSON.stringify(settings));
  return cloneSettings(settings);
}

function simulateRequest() {
  return new Promise((resolve) => setTimeout(resolve, 300));
}

export async function getWebsiteSettings() {
  await simulateRequest();
  return readSettings();
}

export async function updateHeaderSettings(header) {
  await simulateRequest();

  const settings = readSettings();
  const updatedSettings = saveSettings({
    ...settings,
    header: { ...header },
  });

  return updatedSettings.header;
}

export async function updateFooterSettings(footer) {
  await simulateRequest();

  const settings = readSettings();
  const updatedSettings = saveSettings({
    ...settings,
    footer: {
      ...footer,
      socialLinks: footer.socialLinks.map((link) => ({ ...link })),
    },
  });

  return updatedSettings.footer;
}
