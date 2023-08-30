<template>
  <section class="flex h-screen w-full items-center justify-center bg-base-200">
    <article class="prose flex h-full w-full flex-col items-start justify-center gap-4 rounded-md bg-base-100 p-5 sm:max-h-[500px] sm:max-w-[450px]">
      <div class="flex flex-col items-start justify-start gap-3">
        <h1 class="text-4xl font-bold">
          Entrar
        </h1>
        <p class="opacity-75">
          Que legal te ver novamente!
        </p>
      </div>
      <form class="flex w-full flex-col items-start justify-center gap-4">
        <div class="form-control w-full">
          <label class="label" for="email">Email</label>
          <input id="email" placeholder="johndoe@emil.com" required type="email" class="input input-bordered input-ghost ">
        </div>
        <div class="form-control w-full">
          <label class="label" for="password">Senha</label>
          <input id="password" placeholder="Digite sua senha" required type="password" class="input input-bordered input-ghost ">
        </div>
        <div class="flex w-full flex-wrap items-center justify-between gap-3">
          <div class="flex gap-2">
            <input id="remember" name="remember" type="checkbox" class="checkbox">
            <label for="remember">Lembrar de mim</label>
          </div>
          <a href="#" class="link">Esqueci minha senha</a>
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
