<template>
  <section class="min-h-[calc(100vh-88px)] h-auto w-full bg-base-200 flex items-start justify-end p-4 gap-4">
    <div class="hidden md:block w-[40%] h-[700px] relative">
      <div class="md:fixed w-[calc(40%-16px)] h-[700px] items-center justify-center bg-base-100 rounded-lg p-6">
        <img class="absolute left-1/2 -translate-x-1/2" src="@/assets/images/illustration-phone-mockup.svg">
        <div class="w-full h-full flex flex-col justify-center items-center gap-8 z-10">
          <div class="flex flex-col items-center justify-center gap-2">
            <div class="w-24 h-24 bg-base-300 rounded-full" />
            <div class="w-24 h-6 bg-base-300 rounded-full" />
            <div class="w-36 h-6 bg-base-300 rounded-full" />
            <div class="w-36 h-6 bg-base-300 rounded-full" />
          </div>
          <div class="flex items-center flex-col gap-4 justify-center w-full">
            <a v-for="item in inputs" :key="item.id" class="min-w-[230px] h-12 bg-base-100 border border-base-content rounded-lg flex items-center justify-center gap-3 hover:bg-primary hover:border-primary hover:text-base-100 transition-colors cursor-pointer" :href="item.link" target="_blank">
              <Icon :name="`ri:${item.platform}-fill`" size="24" /> <p class="first-letter:capitalize">
                {{ item.platform }}
              </p>
            </a>
            <div v-for="(item, index) in 5 - inputs.length" :key="index" class="min-w-[230px] h-12 bg-base-300 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full min-h-[700px] md:w-[60%] h-full bg-base-100 rounded-lg flex flex-col items-start justify-start p-6 gap-7">
      <div class="flex items-start justify-start flex-col gap-3">
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
      <div v-if="!inputs.length" class="w-full flex items-center justify-center flex-col gap-5">
        <img src="@/assets/images/empty.svg" class="max-w-sm" alt="">
        <p class="max-w-sm text-center">
          Ops... Parece que você não tem nenhum link cadastrado.
          Clique no botão de <Icon name="solar:add-square-bold" size="24" /> para adicionar um novo link.
        </p>
      </div>
      <div v-else class="w-full flex flex-col items-start justify-start gap-4">
        <div v-for="(item, index) in inputs" :key="item.id" class="w-full flex flex-col items-start justify-start bg-base-200 px-3 py-6 rounded-lg ">
          <item-header :number="index + 1" @delete:item="removeInput(item.id)" />
          <main class="w-full flex flex-col items-start justify-start">
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
  platform: string,
  link: string
}
const inputs = ref<Array<Input>>([])

const addInput = () => {
  inputs.value.push({
    id: Math.floor(Math.random() * 10000),
    platform: 'facebook',
    link: ''
  })
}

const changePlatform = (id:number, value: string) => {
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
