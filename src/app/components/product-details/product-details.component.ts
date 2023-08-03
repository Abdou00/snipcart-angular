// import { Component, OnInit } from '@angular/core';
// // import { Product } from '../core/product';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from 'src/app/services/product.service';
// // import { Flavor } from '../core/flavor';
// // import { Size } from '../core/size';
// // import { SelectedProductAttributes } from '../core/selectedProductAttributes';

// @Component({
//   selector: 'app-product-page',
//   templateUrl: './product-page.component.html',
//   styleUrls: ['./product-page.component.scss']
// })
// export class ProductPageComponent implements OnInit {
//   imageUrl: string = '';
//   product: Product | undefined;
//   selectedAttributes: SelectedProductAttributes = {
//     flavor: undefined,
//     size: undefined
//   }

//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService
//   ) { }

//   setImageUrl(flavor: Flavor): void {
//     const flavorImageUrl = this.product?.imageUrls.find(
//       // includes => permet de déterminer si un tableau contient une valeur il renvoi si c'est cas sinon il renvoi false
//       (url) => url.includes(flavor.name)
//     );
//     // condition simplifier ne fonctionne que si vous juste une instruction dans le bloc de code.
//     if(!flavorImageUrl) throw Error(`No flavor ${flavor.name} value`);
//     // Equivalent
//     /**
//      * if(!flavorImageUrl) {
//      *  throw Error(`No flavor ${flavor.name} value`);
//      * }
//      */

//     this.imageUrl = flavorImageUrl;
//   }

//   ngOnInit(): void {
//     this.getProduct();
//     this.setSelectedAttributes(
//       this.product?.flavors[0],
//       this.product?.sizes[0]
//     );

//     if(this.selectedAttributes?.flavor) this.setImageUrl(this.selectedAttributes.flavor);
//   }

//   getProduct(): void {
//     // On injecte l'id dans la route dynamique
//     const id = Number(this.route.snapshot.paramMap.get('id'));
//     // On appelle la méthode getProduct() défini dans notre service
//     this.productService
//       .getProduct(id)
//       // On souscrit à la valeur de l'observable et dès qu'elle est renvoyée, elle est affecter à la propriété product
//       .subscribe((product) => (this.product = product));
//   }

//   // get => permet de lier une proprité d'un objet à une fonction qui sera appelée dès qu'on accède à la propriété en question.
//   get flavorOptions(): string {
//     // map => créé un nouveau tableau avec les résultat de l'appel d'une fonction fournie sur chaque élément du tableeau appelant
//     return (
//       this.product?.flavors.map(
//         (flavor) => flavor.name
//       )
//       // créé et renvoyer une nouvelle chaine de caractère en concaténant tous les éléments d'un tableau (par défaut la concaténation).
//       .join('|') ?? 'yo'
//     );
//   }

//   get sizeOptions(): string {
//     return this.product?.sizes?.join('|') ?? 'yo'
//   }

//   /**
//    * Update selected attribute
//    * @param flavor 
//    * @param size 
//    */
//   updateSelectedProductAttributes(flavor: Flavor | undefined, size: Size | undefined) {
//     this.setSelectedAttributes(
//       flavor ?? {name: 'none', color: '#DDD'},
//       size ?? Size.SMALL
//     );
//     // Permettre de changer l'image en fonction de la saveur choisi
//     if (this.selectedAttributes.flavor) {
//       this.setImageUrl(this.selectedAttributes.flavor);
//     }
//   }

//   /**
//    * Set product attribute
//    * @param flavor 
//    * @param size 
//    */
//   setSelectedAttributes(
//     flavor: Flavor | undefined,
//     size: Size | undefined
//     ) {
//       this.selectedAttributes = {
//         flavor: flavor,
//         size: size
//       }
//     }
// }
import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  // Par défaut, aucune propriété de composant ne peut être modifiée par Property Binding. Il faut donc définir les propriétés pouvant servir d' "input" au composant en ajoutant simplement le décorateur @Input().
  @Input() viewMode = false;
  @Input() currentProduct: Product = {
    name: '',
    imageUrls: '',
    price: '',
    flavors: '',
    sizes: '',
    published: false
  };

  message = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getProduct(this.route.snapshot.params['id']);
    }
  }

  getProduct(id: string): void {
    this.productService.get(id).subscribe({
      // next: function(data) {} Equivalent à
      next: (data) => {
        this.currentProduct = data;
        console.log(data);
      },
      error: (err) => console.error()
    });
  }

  updateProduct(): void {
    this.message = '';
    this.productService.update(this.currentProduct.id, this.currentProduct).subscribe({
      next: (response) => {
        console.log(response);
        this.message = response.message ? response.message : 'This product was updated successfully!'
      },
      error: (err) => console.error(err)
    });
  }

  updateProductPublished(status: boolean): void {
    const data = {
      name: this.currentProduct.name,
      imageUrls: this.currentProduct.imageUrls,
      price: this.currentProduct.price,
      flavors: this.currentProduct.flavors,
      sizes: this.currentProduct.sizes,
      published: status
    };

    this.message = '';

    this.productService.update(this.currentProduct.id, data).subscribe({
      next: (response) => {
        console.log(response);
        this.currentProduct.published = status;
        this.message = response.message ? response.message : 'The status was updated successfully!'
      },
      error: (err) => console.error(err)
    });
  }

  deleteProduct(): void {
    this.productService.delete(this.currentProduct.id).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/products']);
      },
      error: (err) => console.error(err)
    });
  }
}
