<template>
  <button>
    <h1>{{ action }}</h1>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CustomButton',
  props: {
    action: String,
  },
});
</script>

<style scoped>
  button{
    font-family: Poppins;
    width: 25em;
    height: 6em;
    font-size: 0.4em;
    font-weight: 400;
    background-color: #7E3035;
    letter-spacing: 1px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    color: #ffffff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
  }
  button:hover{
    background-color: #612428;
  }
  button:active{
    background-color: #42181b;
  }
</style>
