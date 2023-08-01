import { Component, OnInit } from '@angular/core';
import { Product } from '../core/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  // On remplace la valeur des produits par un tableau vide
  products: Product[] = [];

  // Injection du service
  constructor(private productService: ProductService) {}

  /**
   * Récupère la liste des produits
   */
  getProducts(): void {
    this.products = this.productService.getProducts();
  }

  ngOnInit() {
    this.getProducts();
  }
}
