import {Component, Input, OnInit} from '@angular/core';
import {Song} from '../song';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-song-create',
  templateUrl: './song-create.component.html',
  styleUrls: ['./song-create.component.css']
})
export class SongCreateComponent implements OnInit {

    @Input() songDetails = { title: '', lyric: ''};
    private songs: Song[];
    constructor(private apiService: ApiService) {}

    ngOnInit() {
        this.getSongs();
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
            }).catch(err => {
            console.log(`Failed to create song (${song.title}). Error: ${err}`);
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
}
