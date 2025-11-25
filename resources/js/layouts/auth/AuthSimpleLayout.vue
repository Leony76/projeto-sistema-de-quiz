<script setup>
    import { Link } from '@inertiajs/vue3';
    import { CircleHelp } from "lucide-vue-next"
</script>

<template>
    <div
        class="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
    >
        <div class="w-full max-w-sm border-r-4 border-l-4 border-double border-[#262626] p-3 pb-6">
            <div class="flex flex-col gap-8">
                <div class="flex flex-col items-center gap-4">
                    <Link class="flex items-center gap-2 font-medium">
                        <!-- Ícone de Login/Register -->
                        <div class="mb-1 flex flex-col  items-center justify-center rounded-md">
                             <CircleHelp size="100"/>
                             <h1 class="text-xl font-medium">Quiz Online</h1>
                        </div>
                    </Link>
                </div>
                <slot/>
            </div>
        </div>
    </div>
</template>
