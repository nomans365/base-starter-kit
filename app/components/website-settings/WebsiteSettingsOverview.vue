<script setup lang="ts">
import HeaderOptions from "~/components/website-settings/HeaderOptions.vue";
import FooterOptions from "~/components/website-settings/FooterOptions.vue";
import {
  getWebsiteSettings,
  updateFooterSettings,
  updateHeaderSettings,
} from "~/services/website-settings/websiteSettingsService";
import type {
  FooterSettings,
  HeaderSettings,
  SettingsFeedback,
  WebsiteSettings,
} from "~/types/websiteSettings";

const {
  data: settings,
  pending,
  error: loadError,
  refresh,
} = await useAsyncData<WebsiteSettings>(
  "website-settings",
  getWebsiteSettings,
  { server: false },
);

const isSavingHeader = ref(false);
const isSavingFooter = ref(false);
const headerFeedback = ref<SettingsFeedback | null>(null);
const footerFeedback = ref<SettingsFeedback | null>(null);

function updateHeader(value: HeaderSettings) {
  if (settings.value) {
    settings.value = { ...settings.value, header: value };
  }
  headerFeedback.value = null;
}

function updateFooter(value: FooterSettings) {
  if (settings.value) {
    settings.value = { ...settings.value, footer: value };
  }
  footerFeedback.value = null;
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validateHeader(header: HeaderSettings): string | null {
  const appLink = header.getAppLink.trim();
  if (appLink && !isHttpUrl(appLink)) {
    return "Enter a valid HTTP or HTTPS URL for the Get App Link.";
  }

  return null;
}

function validateFooter(footer: FooterSettings): string | null {
  for (const [index, link] of footer.socialLinks.entries()) {
    if (!link.platform.trim()) {
      return `Enter a platform name for social link ${index + 1}.`;
    }
    if (!isHttpUrl(link.url.trim())) {
      return `Enter a valid HTTP or HTTPS URL for ${link.platform.trim()}.`;
    }
  }

  return null;
}

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

async function saveHeader() {
  if (!settings.value) return;

  const validationError = validateHeader(settings.value.header);
  if (validationError) {
    headerFeedback.value = { variant: "warning", message: validationError };
    return;
  }

  isSavingHeader.value = true;
  headerFeedback.value = null;
  try {
    settings.value = {
      ...settings.value,
      header: await updateHeaderSettings(settings.value.header),
    };
    headerFeedback.value = {
      variant: "success",
      message: "Header settings saved successfully.",
    };
  } catch (error) {
    headerFeedback.value = {
      variant: "destructive",
      message: errorMessage(error, "Unable to save header settings."),
    };
  } finally {
    isSavingHeader.value = false;
  }
}

async function saveFooter() {
  if (!settings.value) return;

  const validationError = validateFooter(settings.value.footer);
  if (validationError) {
    footerFeedback.value = { variant: "warning", message: validationError };
    return;
  }

  isSavingFooter.value = true;
  footerFeedback.value = null;
  try {
    settings.value = {
      ...settings.value,
      footer: await updateFooterSettings(settings.value.footer),
    };
    footerFeedback.value = {
      variant: "success",
      message: "Footer settings saved successfully.",
    };
  } catch (error) {
    footerFeedback.value = {
      variant: "destructive",
      message: errorMessage(error, "Unable to save footer settings."),
    };
  } finally {
    isSavingFooter.value = false;
  }
}
</script>

<template>
  <main class="space-y-6">
    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
        Website Settings
      </h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Configure your website header and footer.
      </p>
    </div>

    <p
      v-if="pending"
      class="text-sm text-gray-500 dark:text-gray-400"
      role="status"
    >
      Loading website settings...
    </p>

    <div v-else-if="loadError" class="space-y-3">
      <UiAlert variant="destructive">
        <UiAlertDescription>
          {{ errorMessage(loadError, "Unable to load website settings.") }}
        </UiAlertDescription>
      </UiAlert>
      <UiButton type="button" variant="outline" @click="refresh()">
        Try again
      </UiButton>
    </div>

    <div v-else-if="settings" class="grid gap-6 xl:grid-cols-2">
      <HeaderOptions
        :settings="settings.header"
        :saving="isSavingHeader"
        :feedback="headerFeedback"
        @update:settings="updateHeader"
        @save="saveHeader"
      />
      <FooterOptions
        :settings="settings.footer"
        :saving="isSavingFooter"
        :feedback="footerFeedback"
        @update:settings="updateFooter"
        @save="saveFooter"
      />
    </div>
  </main>
</template>
