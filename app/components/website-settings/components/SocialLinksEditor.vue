<script setup lang="ts">
import GlobeIcon from "~/components/icons/layout/GlobeIcon.vue";
import type { SocialMediaLink } from "~/types/websiteSettings";

const model = defineModel<SocialMediaLink[]>({ required: true });
const props = withDefaults(defineProps<{ disabled?: boolean }>(), {
  disabled: false,
});

let nextId = 0;

function updateLink(
  index: number,
  field: "platform" | "url",
  value: string | number,
) {
  model.value = model.value.map((link, linkIndex) =>
      linkIndex === index ? { ...link, [field]: String(value) } : link,
  );
}

function addLink() {
  model.value = [
    ...model.value,
    {
      id: `social-link-${Date.now()}-${nextId++}`,
      platform: "",
      url: "",
    },
  ];
}

function removeLink(index: number) {
  model.value = model.value.filter((_, linkIndex) => linkIndex !== index);
}
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h3
          class="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-white/90"
        >
          <GlobeIcon
            class="size-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
          />
          Social Media Links
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add a platform name and its public URL.
        </p>
      </div>
      <UiButton
        type="button"
        variant="outline"
        size="sm"
        :disabled="props.disabled"
        @click.prevent="addLink"
      >
        Add social link
      </UiButton>
    </div>

    <div
      v-for="(link, index) in model"
      :key="link.id"
      class="grid gap-4 rounded-xl border border-gray-200 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] sm:items-end dark:border-gray-800"
    >
      <UiField>
        <UiFieldLabel :for="`social-platform-${link.id}`"
          >Platform</UiFieldLabel
        >
        <UiInput
          :id="`social-platform-${link.id}`"
          :model-value="link.platform"
          placeholder="e.g. Instagram"
          :disabled="props.disabled"
          @update:model-value="updateLink(index, 'platform', $event)"
        />
      </UiField>

      <UiField>
        <UiFieldLabel :for="`social-url-${link.id}`">URL</UiFieldLabel>
        <UiInput
          :id="`social-url-${link.id}`"
          type="url"
          :model-value="link.url"
          placeholder="https://"
          :disabled="props.disabled"
          @update:model-value="updateLink(index, 'url', $event)"
        />
      </UiField>

      <UiButton
        type="button"
        variant="outline"
        size="sm"
        :disabled="props.disabled"
        @click="removeLink(index)"
      >
        Remove
      </UiButton>
    </div>

    <p
      v-if="!model.length"
      class="text-sm text-gray-500 dark:text-gray-400"
    >
      No social links added.
    </p>
  </section>
</template>
