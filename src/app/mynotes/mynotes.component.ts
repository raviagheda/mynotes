import { Component, OnInit, ReflectiveKey } from '@angular/core';

@Component({
  selector: 'app-mynotes',
  templateUrl: './mynotes.component.html',
  styleUrls: ['./mynotes.component.css']
})
export class MynotesComponent implements OnInit {

  constructor() { }
  noteData;
  currentNote;
  newTaskMode:boolean = false;
  newNote;
  colorIndex = 0;

  ngOnInit(): void {
    if(!this.noteData){
      this.initNoteData(); 
    }
    else
      this.currentNote = this.noteData.data[0];
  }

  initNoteData(){
    // var name = prompt("Enter name", "");
    // localStorage.clear();
    
    if(localStorage.length > 0)
    {
      this.noteData = JSON.parse(localStorage.getItem('noteData'));
      if(this.noteData.data.length == 0){
        this.openNewNote();
      }
      else{
        this.currentNote = this.noteData.data[0];
        this.currentNote.index = 0;
      }
    }
    else{
      this.noteData = {
        name: prompt("Enter your name",""),
        data: []
      };
      this.openNewNote();
    }
  }

  openNewNote(){
    this.currentNote = '';
    this.newTaskMode = true;
    this.colorIndex = 0;

    this.newNote = {
      id: Date.now(),
      time: new Date(),
      title: '',
      description: '',
      colorIndex: 0,
    }
  }

  insertNote(){
    this.newNote.colorIndex = this.colorIndex;
    this.noteData.data.push(this.newNote);
    localStorage.setItem('noteData',JSON.stringify(this.noteData));

    this.currentNote = this.noteData.data[this.noteData.data.length - 1];
    this.currentNote.index = this.noteData.data.length - 1;
    this.newTaskMode = false;
  }


  removeNote(){
    if(this.currentNote.index != 0){
      this.currentNote = this.noteData.data[this.currentNote.index-1];
      this.noteData.data.splice(this.currentNote.index,1);
    }
    else{
      this.noteData.data = [];
      this.openNewNote();
    }
    localStorage.setItem('noteData',JSON.stringify(this.noteData));
  }

  getStringTime(time){
    time = new Date(time);
    return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ' , ' + time.getDay() + '/' + time.getMonth() + '/' + time.getFullYear();
    // return time.getTime();
  }
  

}
