<template>
  <div class="generate">
    <img v-if="isLoading" src="../assets/logo.png" alt="Logo" class="logo"/>
    <div v-if="isLoading">
        Carregando...
    </div>
    <div  v-else style="display: flex; flex-direction: column; align-items: center;">
        <div class="style-container" v-if="indice == 0">
            <h2>Resultado dos Charts</h2>
            <p>{{ sevenDaysAgo }} à {{ today }}</p>
        </div>
        <div class="rank-container" v-if="indice === 0">
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
        <div class="style-container" v-if="indice === 1">
            <h2>Configurações</h2>
            <p>Selecione uma cor para o gráfico:</p>
            <chrome-picker :modelValue="color" @update:modelValue="updateColor" class="chrome-picker" />
            <!-- <p>Cor selecionada: {{ color.hex }}</p> -->
            <p>Selecione uma imagem de capa:</p>
            <input type="file" @change="handleFileUpload" accept="image/*" id="fileInput"  style="display: none;"/>
            <CustomButton action="Chique aqui!" @click="openFileDialog" v-if="!imageBase64"></CustomButton>
            <div v-if="imageBase64" class="generated-image">
                <p>Imagem selecionada com sucesso!</p>
                <CustomButton action="Gerar Charts" @click="() => chartsService.openCharts(color.hex, imageBase64, JSON.stringify(rank))"></CustomButton>
            </div>
        </div>
        <div class="arrow-container">
            <img src="../assets/left.png" alt="Logo" class="arrow" @click="changeIndice(0)"/>
            <img src="../assets/right.png" alt="Logo" class="arrow" @click="changeIndice(1)"/>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { defineComponent } from 'vue';
import { Artist } from '@/interfaces/Artist';
import rankService from '@/services/rankService';
import chartsService from '@/services/chartsService';
import CustomButton from '@/components/CustomButton.vue';
import { Chrome } from '@ckpack/vue-color'


export default defineComponent({
  name: 'GenerateCharts',
  components: {CustomButton,  'chrome-picker': Chrome},
  data() {
    return {
        color: { hex: '#000' }
    }
  },
  methods: {
    updateColor(newColor: any) {
        this.color = newColor
    }
  },
  setup() {
    const rank = ref<Artist[]>([]);
    const imageBase64 = ref<string | null>(null)
    const isLoading = ref(true);
    const today = ref('');
    const sevenDaysAgo = ref('');
    const indice = ref(0);

    onMounted(async () => {
        rank.value = [];
        rank.value = await rankService.getDATA();
        isLoading.value = false;
        today.value = formatDate(new Date());
        sevenDaysAgo.value = formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
        indice.value = 0;
    });

    const handleFileUpload = (event: Event): void => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            imageBase64.value = reader.result as string;
            // console.log('código em 64 bits:', imageBase64.value);
        };


        reader.readAsDataURL(file);
    };

    const formatDate = (date: Date): string => {
        const today = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${today}-${month}`;
    };

    const openFileDialog = (): void => {
        const el = document.getElementById('fileInput');
        if (el) (el as HTMLInputElement).click();
    };

    const changeIndice = (value:number): void => {
        if(value === indice.value) return;
        else indice.value = value;
    };

    return {
        rank,
        isLoading,
        imageBase64,
        handleFileUpload,
        today,
        sevenDaysAgo,
        openFileDialog,
        indice,
        changeIndice,
        chartsService
    };
  }
});
</script>


<style>
    .generate{
        width: 100%;
        min-height: 100vh;
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
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 2em 1em;
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
    .style-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;
    }
    .chrome-picker {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border: 1px solid #ccc !important;
        background: #fafafa !important;
    }
    .generated-image{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1em;
    }
    .generated-image>p{
        background-color: #61b33b;
        padding: 0.5em 1em;
        border-radius: 0.5em;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        letter-spacing: 1px;
        font-size: 0.9em;
    }
    .arrow-container{
        display: flex;
        width: 15em;
        flex-direction: row;
        justify-content: space-between;
        padding: 2em 0em 4em 0em;  
        position: absolute;
        bottom: 0;

    }
    .arrow{
        width: 4em;
        height: auto;
        cursor: pointer;
    }
</style>