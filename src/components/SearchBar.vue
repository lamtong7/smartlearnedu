<template>
  <label class="search-box">
    <span>⌕</span>
    <input
      :value="modelValue"
      type="search"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search courses, topics or skills...'
  }
});

defineEmits(['update:modelValue']);
</script>
