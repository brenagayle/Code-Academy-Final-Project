import { Injectable } from '@angular/core';
import { allFiles } from '../models/file.model'
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class UploaderService {



  constructor(public db: AngularFirestore) { }

  youtubeParser(url){
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

  createFile(value, files){
    console.log(files);
    // Parses embed value, if it parses properly includes it in document
    if (this.youtubeParser(value.embed) !== false){
      value.embed = `https://www.youtube.com/embed/${this.youtubeParser(value.embed)}`;
      return this.db.collection('files').add({
        title: value.title,
        description: value.description,
        embed: value.embed,
        files: files
      });
    } else {
      return this.db.collection('files').add({
        title: value.title,
        description: value.description,
        files: files
      });
    }
  }


}
