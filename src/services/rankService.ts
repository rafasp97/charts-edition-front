import axios from 'axios';
import { Artist } from '@/interfaces/Artist';
import utils from '@/utils/utils';

const users: string[] = [
    'iraaaph', 
    'guswlima', 
    'piscixxx', 
    'erikbzra', 
    'candygor', 
    'llucasmoreno5', 
    'brunocosta061', 
    'akumakoji', 
    'becamusics',
    'Edu_XS',
    'felipetas',
    'vitoriaforttes',
    'fontes_vinicius',
    'iigorsolv'
];

const artists: Artist[] = [];

export default {

    async getDATA(){
      for(const user of users){
        const data = await this.infoLastFM(user);

        for(const artist of  data.topartists.artist){
          artists.push({
            name: artist.name,
            playcount: artist.playcount
          });
        }
      }
      
      const noRepeat = utils.noRepeat(artists);

      const rank = utils.getRank(noRepeat);

      return rank;
    },

    async infoLastFM(user:string){
        try{
            const response = await axios.post(`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${user}&api_key=7d6a2403de46005e4c8b90419196d615&period=7day&format=json`);
            return response.data;
        } catch(error){
            throw new Error(`Erro: ${error}`);
        }
    }
};
