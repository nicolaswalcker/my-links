<template>
  <section class="h-screen w-full flex items-center justify-center bg-slate-100">
    <article class="bg-white p-5 rounded-md flex flex-col items-start justify-center gap-4 w-full h-full sm:max-h-[600px] sm:max-w-[450px]">
      <div class="flex flex-col items-start justify-start gap-3">
        <h1 class="font-bold text-4xl text-slate-700">
          Criar nova conta
        </h1>
        <p class="text-slate-500">
          Vamos começar a mostrar seus links para o mundo?
        </p>
      </div>
      <form class="flex flex-col items-start justify-center gap-4 w-full">
        <div class="form-control w-full">
          <label class="label" for="email">Email</label>
          <input id="email" placeholder="johndoe@emil.com" required type="email" class="input input-ghost input-bordered ">
        </div>
        <div class="form-control w-full">
          <label class="label" for="password">Senha</label>
          <input
            id="password"
            v-model="password"
            minlength="8"
            placeholder="Digite sua senha"
            required
            type="password"
            class="input input-ghost input-bordered"
          >
          <small class="pt-1">A senha deve conter no mínimo 8 caracteres</small>
        </div>
        <div class="form-control w-full">
          <label class="label" for="confirm">Confirmar senha</label>
          <input
            id="confirm"
            v-model="confirm"
            placeholder="Digite sua senha novamente"
            required
            type="password"
            class="input input-ghost input-bordered"
          >
          <small v-if="password && !passwordMatch && confirm.length" class="pt-1">As senhas não coincidem</small>
        </div>
        <button :disabled="!passwordMatch" class="btn w-full">
          Criar conta
        </button>
      </form>
      <p class="self-center">
        Já uma conta? <NuxtLink class="link" to="/login">
          Entre aqui!
        </NuxtLink>
      </p>
    </article>
  </section>
</template>

<script lang="ts" setup>
useHead({
  title: 'Criar conta'
})
definePageMeta({
  layout: false
})

const password = ref('')
const confirm = ref('')
const passwordMatch = computed(() => password.value === confirm.value)
</script>

<style>

</style>
