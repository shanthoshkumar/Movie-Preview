import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare let $:any;

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {

    public popular_movielist =[];
    triggerCarouselInterval;

    
  constructor(private http:HttpClient){
  this.fetch_movielist();
  }

  fetch_movielist(){
    this.http.get("https://api.themoviedb.org/3/movie/popular?api_key=4b10cf2f8e6ed1fcb506bd3929ecee40").subscribe(res=>{         
      res['results'].forEach(movie =>{
        let data={};
        data['movieimgpath']=movie['backdrop_path'];
        data['moviename']=movie['title'];
        // console.log(data);
        this.popular_movielist.push(data);

      })
  })
  }



triggerforclosedcarousel(){
    // console.log('cals');
      $('#target_3.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: false
            },
            900: {
                items: 3,
                nav: false
            },
            1000: {
                items: 4,
                nav: true,
                loop: false,
                margin: 20
            }
        }
    })
}

  ngOnInit() {
    let meta = this;
    document.getElementById('target_3').style.display='none';
    setTimeout(()=>{
        document.getElementById('progress_3').style.display='none';
        document.getElementById('target_3').style.display='block';
        $('#target_3').addClass("owl-carousel owl-theme owl-loaded owl-drag") 
        meta.triggerforclosedcarousel(); 
    },3000)

   
  }

  ngOnDestroy(){
    let meta = this;
    clearInterval(meta.triggerCarouselInterval);
  }
}
