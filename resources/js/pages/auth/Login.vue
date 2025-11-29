<script setup>
    import InputError from '@/components/InputError.vue';
    import TextLink from '@/components/TextLink.vue';
    import { Button } from '@/components/ui/button';
    import { Checkbox } from '@/components/ui/checkbox';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Spinner } from '@/components/ui/spinner';
    import AuthLayout from '@/layouts/AuthLayout.vue';
    import { register } from '@/routes';
    import { store } from '@/routes/login';
    import { request } from '@/routes/password';
    import { Form, Head } from '@inertiajs/vue3';
    import ElegantTitle from '@/components/ElegantTitle.vue';
</script>

<template>
    <AuthLayout
        title="Quiz Online"
        description="Quiz que é online"
    >   
        <Head title="Entrar"/>

        <div v-if="status" class="mb-4 text-center text-sm font-medium text-green-600">{{ status }}</div>
        <ElegantTitle title="Login"/>
        <Form
            v-bind="store.form()"
            :reset-on-success="['password']"
            v-slot="{ errors, processing }"
            class="flex flex-col gap-6"
        >
            <div class="grid gap-6">
                <div class="grid gap-2">
                    <Label for="email">E-mail</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        required
                        autofocus
                        :tabindex="1"
                        autocomplete="email"
                        placeholder="email@exemplo.com"
                    />
                    <InputError :message="errors.email" />
                </div>
                <div class="grid gap-2">
                    <div class="flex items-center justify-between">
                        <Label for="password">Senha</Label>
                        <TextLink
                            v-if="canResetPassword"
                            :href="request()"
                            class="text-sm"
                            :tabindex="5"
                        >
                            Esqueceu a senha?
                        </TextLink>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        required
                        :tabindex="2"
                        autocomplete="current-password"
                        placeholder="Senha"
                    />
                    <InputError :message="errors.password" />
                </div>

                <div class="flex items-center justify-between">
                    <Label for="remember" class="flex items-center space-x-3">
                        <Checkbox id="remember" name="remember" :tabindex="3" />
                        <span>Lembre-me</span>
                    </Label>
                </div>

                <Button
                    type="submit"
                    class="mt-2 p-5 w-full font-bold text-lg rounded-4xl cursor-pointer"
                    :tabindex="4"
                    :disabled="processing"
                    data-test="login-button"
                >
                    <Spinner v-if="processing" />
                    <span v-if="processing">Entrando...</span>
                    <span v-else>Entrar</span>
                </Button>
            </div>

            <div
                class="text-center text-sm text-muted-foreground"    
            >
                Não tem uma conta?
                <TextLink :href="register()" :tabindex="5">Cadastre-se!</TextLink>
            </div>
            
        </Form>
    </AuthLayout>
</template>
