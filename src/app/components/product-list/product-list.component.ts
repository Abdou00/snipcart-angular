// import { Component, OnInit } from '@angular/core';
// // import { Product } from '../core/product';
// import { ProductService } from 'src/app/services/product.service';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.scss']
// })
// export class ProductsComponent implements OnInit {
//   // On remplace la valeur des produits par un tableau vide
//   products: Product[] = [];

//   // Injection du service
//   constructor(private productService: ProductService) {}

//   /**
//    * Récupère la liste des produits
//    */
//   getProducts(): void {
//     this.products = this.productService.getProducts();
//   }

//   ngOnInit() {
//     this.getProducts();
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products?: Product[];
  currentProduct: Product = {};
  currentIndex = -1;
  name = '';
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        console.log(data);
      },
      error: (err) => console.error(err)
    });
  }

  refreshList(): void {
    this.getProducts();
    this.currentProduct = {};
    this.currentIndex = -1;
  }

  setActiveProduct(product: Product, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  removeAllProducts(): void {
    this.productService.deleteAll().subscribe({
      next: (response) => {
        console.log(response);
        this.refreshList();
      },
      error: (err) => console.error(err)
    });
  }

  searchTitle(): void {
    this.currentProduct = {};
    this.currentIndex = -1;

    this.productService.findByTitle(this.name).subscribe({
      next: (data) => {
        console.log(data);
        this.products = data;
      },
      error: (err) => console.error(err)
    });
  }
}
