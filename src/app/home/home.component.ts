import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  category: any = [];
  url: any = [];
  url1: any=[];
  dif1 = [];
  dif = ['easy', 'medium', 'hard'];
  generate: boolean = true;
  answers: boolean = true;
  public show:boolean = false;
  public buttonName:any = 'Show Correct Answer';
  index: number;
  serverName;
  correct;
  form;
  user_answer;

  

  constructor(private data: DataService, private fb: FormBuilder) { }
  

  OnCategory() {
    this.category = this.data.Category()
    .subscribe((data) => {
      this.category  = data.trivia_categories as string[];
      
    });

  }
  difficult() {
    this.dif1 = this.dif; 
  
  }

  generateUrl(){
    this.generate = false;
  }
  answer() {
    this.answers = false
  }

  
  Url(id: number, difficult) {
    this.url = this.data.MainUrl(id, difficult)
    .subscribe((data) => {
      this.url  = data as string[];
      for(let i of data.results) {
        console.log(i)
        this.url1.push(i.correct_answer)
      }
      console.log('ALL: ', this.url1);
      console.log('ALL: ', this.url);
      
    });
  }



  OnInput(value) {
    this.serverName = value;
   }

  onChange(name: string, isChecked: boolean) {
    const cartoons = (this.form.controls.name);
    if (isChecked) {
      cartoons.push(new FormControl(name));
    } else {
      const index = cartoons.controls.findIndex(x => x.value === name);
      cartoons.removeAt(index);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: this.fb.array([])
    });
    }

  submit() {
    this.user_answer = this.form.value.name
    console.log('your answer',this.user_answer);

  }

  isCorrect() {
    if(this.form.value.name in this.url1) {
      this.correct = 'Your answer is correct.';
      console.log("correct", this.correct )
    } else {
      console.log('correct answers',this.url1)
    }

     return this.user_answer = this.form.value.name;
  
  };


  toggle() {
    this.show = !this.show;

    if(this.show)  
      this.buttonName = "Hide Correct Answer";
    else
      this.buttonName = "Show Correct Answer";
  }

}
