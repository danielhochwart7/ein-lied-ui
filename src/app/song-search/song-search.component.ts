import {Component, Input, OnInit} from '@angular/core';
import {Song} from '../song';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.css']
})
export class SongSearchComponent implements OnInit {

    selectedSong: Song = null;

    @Input() songDetails = { title: '', lyric: ''};
    private songs: Song[];
    constructor(private apiService: ApiService) {}

    ngOnInit() {
        this.getSongs();
    }

    flushSongDetails() {
        this.songDetails = { title: '', lyric: ''};
    }

    addSong() {
        const lyric: Array<string> = this.songDetails.lyric.split(', ');

        const song = {
            title: this.songDetails.title,
            lyric
        };

        this.apiService.createSong(song)
            .toPromise()
            .then(() => {
                this.flushSongDetails();
                this.getSongs();
            }).catch(err => {
            console.log(`Failed to create song (${song.title}). Error: ${err}`);
        });
    }

    deleteSong() {
        this.apiService.deleteSong(this.selectedSong.id)
            .toPromise()
            .then(() => {
                this.flushSongDetails();
                this.getSongs();
            });
    }

    getSongs() {
        this.apiService.getSongs()
            .toPromise()
            .then(data => {
                this.songs = data;
                console.log(this.songs)
            });
    }

    onSelect(song: Song) {
        this.selectedSong = song;
    }

    deleteAllSongs() {
        console.log(this.songs);
        for (const item in this.songs) {
            this.apiService.deleteSong(this.songs[item].id).subscribe();
        }
        this.getSongs();
        this.flushSongDetails();
    }

}
