import { Artist } from "@/interfaces/Artist";

export default {

  noRepeat(artists:Artist[]){
    const data: { [name: string]: number } = {};

    for (const artist of artists) {
        const name = artist.name;
        const playcount = parseInt(String(artist.playcount));

        if (!data[name]) data[name] = playcount;
        else data[name] += playcount;
        
    }
    return Object.entries(data).map(([name, playcount]) => ({
        name,
        playcount
    }));
  },

  getRank(artists:Artist[]) {
    return artists.sort((a:Artist, b:Artist) => b.playcount - a.playcount).slice(0, 10);
  }


};
