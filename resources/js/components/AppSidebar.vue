<script setup>
    import NavFooter from '@/components/NavFooter.vue';
    import NavMain from '@/components/NavMain.vue';
    import NavUser from '@/components/NavUser.vue';
    import {
        Sidebar,
        SidebarContent,
        SidebarFooter,
        SidebarHeader,
        SidebarMenu,
        SidebarMenuButton,
        SidebarMenuItem,
    } from '@/components/ui/sidebar';
    import { dashboard } from '@/routes';
    import { quiz } from '@/routes';
    import { topscore } from '@/routes';
    import { Link } from '@inertiajs/vue3';
    import { LayoutGrid, Medal, FileQuestion} from 'lucide-vue-next';

    import AppLogo from './AppLogo.vue';

    const mainNavItems = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Quiz',
            href: quiz(),
            icon: FileQuestion,
        },
        {
            title: 'Melhores Pontuações',
            href: topscore(),
            icon: Medal,
        },
    ];

    const footerNavItems = [

    ];
</script>

<template>
    <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link :href="dashboard()">
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="mainNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <NavFooter :items="footerNavItems" />
            <NavUser />
        </SidebarFooter>
        <slot />
    </Sidebar>
</template>
