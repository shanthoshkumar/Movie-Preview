import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagerService } from '../../_services/index'
declare let $:any;

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
  public movie_rating=[];
  public urls=[];
  public names=[];
  public name_arr=[];
  constructor(private http:HttpClient,private pagerService: PagerService){
    let movie_img_arr=[];
    this.http.get("https://api.themoviedb.org/3/movie/popular?api_key=4b10cf2f8e6ed1fcb506bd3929ecee40").subscribe(res=>{         
      res['results'].forEach(movie =>{
        let data={};
        data['movieimgpath']=movie['backdrop_path'];
        data['moviename']=movie['title'];
        movie_img_arr.push( { "name": movie['backdrop_path'] } )
        if(movie['title'].length>22){
          let mv_name:string=movie['title'];
          this.name_arr.push(mv_name.split(':')[0]);
        }
        else{
          this.name_arr.push(movie['title']);
        }
        if(res['results'].length==movie_img_arr.length){
          this.allItems=movie_img_arr;
        }
      })
    // initialize to page 1
    this.setPage(1);
});


  }
      // array of all items to be paged
      private allItems: any[];
  
      // pager object
      pager: any = {};
  
      // paged items
      pagedItems: any[];
  
      ngOnInit() { }
  
      setPage(page: number) {
          if (page < 1 || page > this.pager.totalPages) {
              return;
          }
  
          // get pager object from service
          this.pager = this.pagerService.getPager(this.allItems.length, page);
  
          // get current page of items
          this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
          this.names = this.name_arr.slice(this.pager.startIndex, this.pager.endIndex + 1);
          // console.log(this.names);
          

          // console.log(this.pagedItems);
          this.change_pageContent(this.pagedItems);
          
      }

      change_pageContent(image_arr){
        this.urls.length=0;
        image_arr.forEach((image_url,index) => {
          this.urls[index]=image_url['name'];          
        });
      }

}
