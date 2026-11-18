<script setup>
import { computed } from "vue";
import LogoUpload from "./components/LogoUpload.vue";
import SocialLinksEditor from "./components/SocialLinksEditor.vue";

const props = defineProps({
  settings: { type: Object, required: true },
  saving: { type: Boolean, required: true },
  feedback: { type: Object, required: true },
});

const emit = defineEmits(["update:settings", "save"]);

function updateField(field, value) {
  emit("update:settings", { ...props.settings, [field]: value });
}

const socialLinks = computed({
  get: () => props.settings.socialLinks,
  set: (value) => updateField("socialLinks", value),
});
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
        <UiCardTitle>Footer Options</UiCardTitle>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Manage the logos, social links, and copyright text displayed in your
          website footer.
        </p>
      </UiCardHeader>

      <UiCardContent>
        <form class="space-y-5" novalidate @submit.prevent="emit('save')">
          <LogoUpload
            id="footer-website-logo"
            label="Website Logo"
            :model-value="props.settings.websiteLogo"
            :disabled="props.saving"
            @update:model-value="updateField('websiteLogo', $event)"
          />
          <LogoUpload
            id="footer-mobile-logo"
            label="Mobile Logo"
            :model-value="props.settings.mobileLogo"
            :disabled="props.saving"
            @update:model-value="updateField('mobileLogo', $event)"
          />

          <SocialLinksEditor
            v-model="socialLinks"
            :disabled="props.saving"
          />

          <UiField>
            <UiFieldLabel for="copyright-text">Copyright Text</UiFieldLabel>
            <UiTextarea
              id="copyright-text"
              :model-value="props.settings.copyrightText"
              placeholder="Enter your copyright information"
              :disabled="props.saving"
              @update:model-value="updateField('copyrightText', String($event))"
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
              {{ props.saving ? "Saving..." : "Save Footer Settings" }}
            </UiButton>
          </div>
        </form>
      </UiCardContent>
    </UiCard>
  </div>
</template>
