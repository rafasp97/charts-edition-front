<template>
  <div class="generate">
    <div v-if="isLoading">
        Carregando Charts...
    </div>

    <div v-else class="rank-container">
        <div class="crown-container">
            <img src="../assets/crown.png" alt="Logo" class="crown"/>
            <img src="../assets/crown.png" alt="Logo" class="crown"/>
            <img src="../assets/crown.png" alt="Logo" class="crown"/>
        </div>
        <table class="rank">
            <tbody  v-for="(artist, index) in rank" :key="artist.id" >          
                <tr>
                <td class="other">{{index + 1}}</td>
                <td class="name">{{artist.name}}</td>
                <td class="other">{{artist.playcount}}</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { defineComponent } from 'vue';
import { Artist } from '@/interfaces/Artist';
import rankService from '@/services/rankService';

export default defineComponent({
  name: 'GenerateCharts',
  setup() {
    const rank = ref<Artist[]>([]);
    const isLoading = ref(true);

    onMounted(async () => {
        rank.value = [];
        rank.value = await rankService.getDATA();
        isLoading.value = false;
    });

    return {
        rank,
        isLoading
    };
  }
});
</script>


<style>
    .generate{
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        gap: 4em;
        align-items: center;
        justify-content: center;
    }
    .crown{
        width: 1.5em;
        height: auto;
    }
    .rank-container{
        border: solid rgba(77, 209, 16, 0.466) 1px;
        display: flex;
        flex-direction: row;
        padding: 1em;
        gap: 1em;
    }
    .crown-container{
        display: flex;
        flex-direction: column;
        gap: 1em;
        margin-top: 0.6em;
    }
    .rank{
        width: 15em;
    }
    .space{
        padding-left: 2.5em;
    }
    table {
        background-color: rgba(255, 255, 255, 0.329);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border-collapse: separate;   
        border-spacing: 0.4em 0.4em;
    }
    th, td {
        border: 2px solid #ddd;
        padding: 6px;
        text-align: center;
        font-size: 0.7em;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    th {
        background-color: #f2f2f2;
    }
</style>