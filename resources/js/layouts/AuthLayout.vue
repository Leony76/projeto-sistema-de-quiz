<script setup>
    import AuthSimpleLayout from '@/layouts/auth/AuthSimpleLayout.vue';
</script>

<template>
    <AuthSimpleLayout :title="title">
        <slot />
    </AuthSimpleLayout>
</template>
