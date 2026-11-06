<script setup lang="ts">
import {
  validateSignIn,
  type SignInFormData,
} from "~/components/full-width-pages/auth/sign-in/schema";

const showPassword = ref(false);

const { values, errorOf, touch, handleSubmit, isSubmitting } =
  useFormValidation<SignInFormData>(
    { email: "", password: "", keepLoggedIn: false },
    validateSignIn,
  );

const onSubmit = handleSubmit(async () => {
  // handle submit action
});
</script>

<template>
  <form class="space-y-5" novalidate @submit="onSubmit">
    <UiField :data-invalid="Boolean(errorOf('email'))">
      <UiFieldLabel class="mb-1.5 block">
        Email <span class="text-red-500">*</span>
      </UiFieldLabel>
      <UiInput
        v-model="values.email"
        type="email"
        placeholder="info@gmail.com"
        :aria-invalid="errorOf('email') ? 'true' : undefined"
        @blur="touch('email')"
      />
      <UiFieldError :errors="[{ message: errorOf('email') }]" />
    </UiField>

    <UiField :data-invalid="Boolean(errorOf('password'))">
      <UiFieldLabel class="mb-1.5 block">
        Password <span class="text-red-500">*</span>
      </UiFieldLabel>
      <UiInputGroup>
        <UiInputGroupInput
          v-model="values.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Enter your password"
          :aria-invalid="errorOf('password') ? 'true' : undefined"
          @blur="touch('password')"
        />
        <UiInputGroupAddon align="inline-end">
          <UiInputGroupButton
            size="icon-xs"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            class="text-gray-500 dark:text-gray-400"
            @click="showPassword = !showPassword"
          >
            <IconsLayoutEyeIcon v-if="showPassword" class="fill-current" />
            <IconsLayoutEyeCloseIcon v-else class="fill-current" />
          </UiInputGroupButton>
        </UiInputGroupAddon>
      </UiInputGroup>
      <UiFieldError :errors="[{ message: errorOf('password') }]" />
    </UiField>

    <div class="flex items-center justify-between">
      <UiField orientation="horizontal" class="w-auto items-center gap-3">
        <UiCheckbox
          id="keep-logged-in"
          :model-value="values.keepLoggedIn"
          @update:model-value="values.keepLoggedIn = Boolean($event)"
        />
        <UiFieldLabel
          for="keep-logged-in"
          class="text-theme-sm block cursor-pointer font-normal text-gray-700 dark:text-gray-400"
        >
          Keep me logged in
        </UiFieldLabel>
      </UiField>
    </div>

    <div>
      <UiButton class="w-full" size="lg" type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? "Signing In..." : "Sign In" }}
      </UiButton>
    </div>
  </form>
</template>
