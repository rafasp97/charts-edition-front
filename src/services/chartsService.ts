import axios from 'axios';

export default {
    async openCharts(color:string, image:string){
        try{
            const response = await axios.post(`https://charts-edition.onrender.com/main`, 
                { color: color, image: image},
                { responseType: 'blob' }
            );
            const blob = response.data;
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        } catch(error){
            throw new Error(`Erro: ${error}`);
        }
    }
};
