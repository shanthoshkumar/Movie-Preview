import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare let require:any;
var CanvasJS=require('../../assets/canvasjs.min.js');

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {
  movie_rating=[];
  constructor(private http:HttpClient){
    this.fetch_rating();
  }

 
  fetch_rating(){
    this.http.get("https://api.themoviedb.org/3/trending/all/day?api_key=4b10cf2f8e6ed1fcb506bd3929ecee40").subscribe(res=>{
      res['results'].forEach(data => {
        let obj={};
        obj['y']=data['vote_average'];
        if('original_name' in data){
          obj['label']=data['original_name'].split(':')[0];
        }
        else{
          obj['label']=data['title'].split(':')[0];  
        }
        this.movie_rating.push(obj);

        if(res['results'].length==this.movie_rating.length)
        {
          this.generate_chart();
        }        
      })      
    })
  }

  generate_chart(){
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'RATINGS FOR TRENDING MOVIES'
      },
       axisY:{
          maximum: 10,
          interval:2
         },
      data: [{
        type: "column",
        dataPoints:this.movie_rating,
      }]
    });
      
    chart.render();
  }

ngOnInit() {}

}
