// import { Component, Input, OnInit } from '@angular/core';
// // import { Product } from '../core/product';

// @Component({
//   selector: 'app-product',
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.scss']
// })
// export class ProductComponent implements OnInit {
//   @Input() product: Product | undefined;
//   imageUrl :string = "";
  
//   ngOnInit() {
//    this.imageUrl = this.product?.imageUrls[0] ?? '';
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  // Info par défaut
  product: Product = {
    name: '',
    imageUrls: '',
    price: '',
    flavors: '',
    sizes: '',
    published: false
  };

  submitted = false;

  constructor(private productService: ProductService) { }

  // void => utilisé comme type de retour de fonction, la void spécifie que la fonction ne renvoi pas de valeur
  saveProduct(): void {
    const data = {
      name: this.product.name,
      imageUrls: this.product.imageUrls,
      price: this.product.price,
      flavors: this.product.flavors,
      sizes: this.product.sizes,
    };

    this.productService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (err) => console.error(err)
    });
  }

  newProduct(): void {
    this.submitted = false;
    this.product = {
      name: '',
      imageUrls: '',
      price: '',
      flavors: '',
      sizes: '',
      published: false
    }
  }
}
