<script setup>
    import { SidebarProvider } from '@/components/ui/sidebar';
    import { usePage } from '@inertiajs/vue3';

    const isOpen = usePage().props.sidebarOpen;
    </script>
<template>
    <div v-if="variant === 'header'" class="flex min-h-screen w-full flex-col">
        <slot />
    </div>
    <SidebarProvider v-else :default-open="isOpen">
        <slot />
    </SidebarProvider>
</template>
