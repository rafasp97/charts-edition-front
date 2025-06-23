<template>
  <div class="home">
    <img src="../assets/logo.png" alt="Logo" class="logo"/>
    <CustomButton action="Iniciar" @click="() => this.$router.push({name: 'GenerateCharts'})"></CustomButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomButton from '@/components/CustomButton.vue';

export default defineComponent({
  name: 'HomeView',
  components: {CustomButton}
});
</script>
<style>
  .home{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 4em;
    align-items: center;
    justify-content: center;
  }
  .logo{
    width: 15em;
    height: auto;
  }
</style>