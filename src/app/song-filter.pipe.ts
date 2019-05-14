import { Pipe, PipeTransform } from '@angular/core';
import {Song} from './song';

@Pipe({
    name: 'songFilter'
})
export class SongFilterPipe implements PipeTransform {

    transform(items: Song[], searchText: string): Song[] {

        if (!items) {
            return [];
        }
        if (!searchText) {
            return [];
        }

        searchText = searchText.toLocaleLowerCase();

        console.log(searchText);
        const songs: Array<Song> = items.filter(song => {

            if (song.title.toLocaleLowerCase().includes(searchText)) {
                return song;
            }

            for (const l in song.lyric) {
                const line = song.lyric[l].toLocaleLowerCase();
                if (line.includes(searchText)) {
                    return song;
                }
            }
        });

        return songs;
    }

}
