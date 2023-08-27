<template>
  <section class="h-screen w-full flex items-center justify-center bg-slate-100">
    <article class="bg-white p-5 rounded-md flex flex-col items-start justify-center gap-4 w-full h-full sm:max-h-[500px] sm:max-w-[450px]">
      <div class="flex flex-col items-start justify-start gap-3">
        <h1 class="font-bold text-4xl text-slate-700">
          Entrar
        </h1>
        <p class="text-slate-500">
          Que legal te ver novamente!
        </p>
      </div>
      <form class="flex flex-col items-start justify-center gap-4 w-full">
        <div class="form-control w-full">
          <label class="label" for="email">Email</label>
          <input id="email" placeholder="johndoe@emil.com" required type="email" class="input input-ghost input-bordered ">
        </div>
        <div class="form-control w-full">
          <label class="label" for="password">Senha</label>
          <input id="password" placeholder="Digite sua senha" required type="password" class="input input-ghost input-bordered ">
        </div>
        <div class="w-full flex items-center justify-between flex-wrap gap-3">
          <div class="flex gap-2">
            <input id="remember" name="remember" type="checkbox" class="checkbox">
            <label for="remember">Lembrar de mim</label>
          </div>
          <a href="#" class="text-slate-500 hover:underline">Esqueci minha senha</a>
        </div>
        <button class="btn w-full">
          Entrar
        </button>
      </form>
      <p class="self-center">
        Não tem uma conta? <NuxtLink class="link" to="/register">
          Criar uma!
        </NuxtLink>
      </p>
    </article>
  </section>
</template>

<script lang="ts" setup>
useHead({
  title: 'Entrar'
})
definePageMeta({
  layout: false
})
</script>

<style>

</style>
