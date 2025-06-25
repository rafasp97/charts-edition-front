import { Artist } from '@/interfaces/Artist';
import axios from 'axios';

export default {
    async openCharts(color:string, image:string, rank:Artist[]){
        try{
            const response = await axios.post(`https://charts-edition.onrender.com/main`, 
                { color, image, rank},
                { responseType: 'blob' }
            );
            const blob = response.data;
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'charts.png';
            document.body.appendChild(link); // ⬅️ necessário no mobile
            link.click();
            document.body.removeChild(link); // limpa após o clique
            URL.revokeObjectURL(url); // libera memória
        } catch(error){
            throw new Error(`Erro: ${error}`);
        }
    }
};
