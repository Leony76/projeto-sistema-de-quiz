<script setup>
    import AppContent from '@/components/AppContent.vue';
    import AppShell from '@/components/AppShell.vue';
    import AppSidebar from '@/components/AppSidebar.vue';
    import AppSidebarHeader from '@/components/AppSidebarHeader.vue';
</script>

<template>
    <AppShell variant="sidebar">
        <AppSidebar />
        <AppContent variant="sidebar" class="overflow-x-hidden">
            <AppSidebarHeader :breadcrumbs="breadcrumbs" />
            <slot />
        </AppContent>
    </AppShell>
</template>
