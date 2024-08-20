export function useRules() {
  return {
    required: computed(() => (v) => !!v || 'This field is required').value,
    email: computed(() => (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid')
      .value,
    minLength: computed(
      () => (length) => (v) =>
        !v || v.length >= length || `Minimum length is ${length}`
    ).value,
    maxLength: computed(
      () => (length) => (v) =>
        !v || v.length <= length || `Maximum length is ${length}`
    ).value,
    sameAs: computed(
      () => (target) => (v) => !v || v === target || 'Must be the same'
    ).value,
  }
}
