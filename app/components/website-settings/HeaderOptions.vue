<script setup>
import LogoUpload from "./components/LogoUpload.vue";

const props = defineProps({
  settings: { type: Object, required: true },
  saving: { type: Boolean, required: true },
  feedback: { type: Object, required: true },
});

const emit = defineEmits(["update:settings", "save"]);

function updateField(field, value) {
  emit("update:settings", { ...props.settings, [field]: value });
}
</script>

<template>
  <div
    :class="
      cn(
        'dark:border-gray-800 dark:bg-white/3'
      )
    "
    >
    <UiCard>
      <UiCardHeader>
        <UiCardTitle>Header Options</UiCardTitle>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Manage the logos and application link displayed in your website header.
        </p>
      </UiCardHeader>

      <UiCardContent>
        <form class="space-y-5" novalidate @submit.prevent="emit('save')">
          <LogoUpload
            id="header-website-logo"
            label="Website Logo"
            :model-value="props.settings.websiteLogo"
            :disabled="props.saving"
            @update:model-value="updateField('websiteLogo', $event)"
          />
          <LogoUpload
            id="header-mobile-logo"
            label="Mobile Logo"
            :model-value="props.settings.mobileLogo"
            :disabled="props.saving"
            @update:model-value="updateField('mobileLogo', $event)"
          />

          <UiField>
            <UiFieldLabel for="get-app-link">Get App Link</UiFieldLabel>
            <UiInput
              id="get-app-link"
              type="url"
              placeholder="https://example.com/app"
              :model-value="props.settings.getAppLink"
              :disabled="props.saving"
              @update:model-value="updateField('getAppLink', String($event))"
            />
          </UiField>

          <div v-if="props.feedback" aria-live="polite">
            <UiAlert :variant="props.feedback.variant">
              <UiAlertDescription>{{
                props.feedback.message
              }}</UiAlertDescription>
            </UiAlert>
          </div>

          <div class="flex justify-end">
            <UiButton type="submit" :disabled="props.saving">
              {{ props.saving ? "Saving..." : "Save Header Settings" }}
            </UiButton>
          </div>
        </form>
      </UiCardContent>
    </UiCard>
  </div>
</template>
