<template>
  <section class="flex h-auto min-h-[calc(100vh-88px)] w-full items-start justify-end gap-4 bg-base-200 p-4">
    <div class="relative hidden h-[700px] w-[40%] md:block">
      <div class="h-[700px] w-[calc(40%-16px)] items-center justify-center rounded-lg bg-base-100 p-6 md:fixed">
        <img class="absolute left-1/2 -translate-x-1/2" src="@/assets/images/illustration-phone-mockup.svg">
        <div class="z-10 flex h-full w-full flex-col items-center justify-center gap-8">
          <div class="flex flex-col items-center justify-center gap-2">
            <div class="h-24 w-24 rounded-full bg-base-300" />
            <div class="h-6 w-24 rounded-full bg-base-300" />
            <div class="h-6 w-36 rounded-full bg-base-300" />
            <div class="h-6 w-36 rounded-full bg-base-300" />
          </div>
          <div class="flex w-full flex-col items-center justify-center gap-4">
            <a v-for="item in inputs" :key="item.id" class="z-20 flex h-12 min-w-[230px] cursor-pointer items-center justify-center gap-3 rounded-lg border border-base-content bg-base-100 transition-colors hover:border-primary hover:bg-primary hover:text-base-100" :href="item.link" target="_blank">
              <Icon :name="item.platform.icon" size="24" /> <p class="first-letter:capitalize">
                {{ item.platform.name }}
              </p>
            </a>
            <div v-for="(item, index) in 5 - inputs.length" :key="index" class="h-12 min-w-[230px] rounded-sm bg-base-300" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex h-full min-h-[700px] w-full flex-col items-start justify-start gap-7 rounded-lg bg-base-100 p-6 md:w-[60%]">
      <div class="flex flex-col items-start justify-start gap-3">
        <h1 class="text-4xl font-bold">
          Customize seus links
        </h1>
        <p class="opacity-75">
          Adicione, atualize, remova e mostre para o mundo os seus links!
        </p>
      </div>
      <button :disabled="inputs.length >= 5" class="btn btn-outline btn-block" @click="addInput">
        <Icon name="solar:add-square-bold" size="24" />
        Adicionar novo link
      </button>
      <div v-if="!inputs.length" class="flex w-full flex-col items-center justify-center gap-5">
        <img src="@/assets/images/empty.svg" class="max-w-sm" alt="">
        <p class="max-w-sm text-center">
          Ops... Parece que você não tem nenhum link cadastrado.
          Clique no botão de <Icon name="solar:add-square-bold" size="24" /> para adicionar um novo link.
        </p>
      </div>
      <div v-else class="flex w-full flex-col items-start justify-start gap-4">
        <div v-for="(item, index) in inputs" :key="item.id" class="flex w-full flex-col items-start justify-start rounded-lg bg-base-200 px-3 py-6 ">
          <item-header :number="index + 1" @delete:item="removeInput(item.id)" />
          <main class="flex w-full flex-col items-start justify-start">
            <select-component :selected="item.platform" @update:selected="changePlatform(item.id, $event)" />
            <input-component v-model="item.link" />
          </main>
        </div>
      </div>

      <button v-if="inputs.length" class="btn btn-primary self-end">
        Salvar
      </button>
    </div>
  </section>
</template>

<script lang="ts" setup>
interface Input {
  id: number,
  platform: { name: string, icon: string}
  link: string
}
const inputs = ref<Array<Input>>([])

const addInput = () => {
  inputs.value.push({
    id: Math.floor(Math.random() * 10000),
    platform: {
      name: 'facebook',
      icon: 'cib:facebook-f'
    },
    link: ''
  })
}

const changePlatform = (id:number, value: {
  name: string
  icon: string
}) => {
  inputs.value = inputs.value.map((item) => {
    if (item.id === id) {
      item.platform = value
    }
    return item
  })
}

const removeInput = (id: number) => {
  inputs.value = inputs.value.filter(item => item.id !== id)
}
</script>

<style>

</style>
