import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
 
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 
  products:Product[]=[ ];
  dataLoaded=false;
  filterText="";
  constructor(private productService:ProductService,
    private activateRoute:ActivatedRoute,private toastrService :ToastrService,
    private cartService :CartService){}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getProductByCategory(params["categoryId"])
      }else{
        this.getProducts();
      }
    })
    
  }
  getProducts(){
    console.log("api reguest başladı")
  this.productService.getProducts().subscribe(response=>{
    this.products=response.data
    this.dataLoaded=true;
  });
  console.log("metot bitti");
  }
  getProductByCategory(categoryId:number){
      this.productService.getProductsByCategory(categoryId).subscribe(response=>{
        this.products=response.data
        this.dataLoaded=true;
      })
  }
  addToCart(product:Product){
     if (product.productId===1) {
       this.toastrService.success("Hata","Bu ürün sepete eklenemez")
     }else{
       this.toastrService.success("Sepete eklendi",product.productName)
       this.cartService.addToCart(product);
     }
  }
}
