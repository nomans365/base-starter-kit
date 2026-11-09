<script setup lang="ts">
import { onBeforeUnmount, shallowRef } from "vue";

const props = withDefaults(
  defineProps<{
    id: string;
    label: string;
    modelValue: string | null;
    disabled?: boolean;
  }>(),
  { disabled: false },
);

const emit = defineEmits<{
  (event: "update:modelValue", value: string | null): void;
}>();

const maxFileSize = 512 * 1024;
const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];
const isReading = ref(false);
const errorMessage = ref("");
const selectedFile = shallowRef<File | null>(null);
const previewObjectUrl = ref<string | null>(null);

function revokePreviewObjectUrl() {
  if (previewObjectUrl.value) {
    URL.revokeObjectURL(previewObjectUrl.value);
    previewObjectUrl.value = null;
  }
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("The selected image could not be previewed."));
        }
      },
      { once: true },
    );
    reader.addEventListener(
      "error",
      () => reject(new Error("The selected image could not be read.")),
      { once: true },
    );
    reader.readAsDataURL(file);
  });
}

async function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  errorMessage.value = "";

  if (!file) return;

  if (!allowedTypes.includes(file.type)) {
    errorMessage.value = "Choose a JPEG, PNG, WebP, GIF, or SVG image.";
    input.value = "";
    return;
  }

  if (file.size > maxFileSize) {
    errorMessage.value = "The image must be 512 KB or smaller.";
    input.value = "";
    return;
  }

  revokePreviewObjectUrl();
  selectedFile.value = file;
  previewObjectUrl.value = URL.createObjectURL(selectedFile.value);
  isReading.value = true;
  try {
    emit("update:modelValue", await readFileAsDataUrl(file));
  } catch (error) {
    selectedFile.value = null;
    revokePreviewObjectUrl();
    errorMessage.value =
      error instanceof Error
        ? error.message
        : "The selected image could not be read.";
  } finally {
    isReading.value = false;
    input.value = "";
  }
}

function removeImage() {
  errorMessage.value = "";
  selectedFile.value = null;
  revokePreviewObjectUrl();
  emit("update:modelValue", null);
}

onBeforeUnmount(revokePreviewObjectUrl);
</script>

<template>
  <div class="space-y-3">
    <UiLabel :for="props.id">{{ props.label }}</UiLabel>

    <div
      class="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center dark:border-gray-800"
    >
      <div
        class="flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-2 dark:border-gray-800 dark:bg-gray-900"
      >
        <img
          v-if="previewObjectUrl || props.modelValue"
          :src="previewObjectUrl || props.modelValue || undefined"
          :alt="`${props.label} preview`"
          class="max-h-full max-w-full object-contain"
        />
        <span v-else class="text-xs text-gray-500 dark:text-gray-400"
          >No image selected</span
        >
      </div>

      <div class="min-w-0 flex-1 space-y-2">
        <UiFileInput
          :id="props.id"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          :disabled="props.disabled || isReading"
          :aria-describedby="errorMessage ? `${props.id}-error` : undefined"
          :aria-invalid="errorMessage ? 'true' : undefined"
          @change="handleFileChange"
        />

        <p
          v-if="errorMessage"
          :id="`${props.id}-error`"
          class="text-sm text-error-600"
          role="alert"
        >
          {{ errorMessage }}
        </p>
        
        <p
          v-else-if="isReading"
          class="text-sm text-gray-500 dark:text-gray-400"
          role="status"
        >
          Reading image...
        </p>
      </div>

      <UiButton
        v-if="props.modelValue"
        type="button"
        variant="outline"
        size="sm"
        :disabled="props.disabled || isReading"
        @click="removeImage"
      >
        Remove
      </UiButton>
      
    </div>
    <p class="text-xs text-gray-500 dark:text-gray-400">
      JPEG, PNG, WebP, GIF, or SVG. Maximum file size: 512 KB.
    </p>
  </div>
</template>
