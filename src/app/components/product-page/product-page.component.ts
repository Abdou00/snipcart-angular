import { Component, OnInit } from '@angular/core';
// import { Product } from '../core/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
// import { Flavor } from '../core/flavor';
// import { Size } from '../core/size';
// import { SelectedProductAttributes } from '../core/selectedProductAttributes';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  imageUrl: string = '';
  product: Product | undefined;
  selectedAttributes: SelectedProductAttributes = {
    flavor: undefined,
    size: undefined
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  setImageUrl(flavor: Flavor): void {
    const flavorImageUrl = this.product?.imageUrls.find(
      // includes => permet de déterminer si un tableau contient une valeur il renvoi si c'est cas sinon il renvoi false
      (url) => url.includes(flavor.name)
    );
    // condition simplifier ne fonctionne que si vous juste une instruction dans le bloc de code.
    if(!flavorImageUrl) throw Error(`No flavor ${flavor.name} value`);
    // Equivalent
    /**
     * if(!flavorImageUrl) {
     *  throw Error(`No flavor ${flavor.name} value`);
     * }
     */

    this.imageUrl = flavorImageUrl;
  }

  ngOnInit(): void {
    this.getProduct();
    this.setSelectedAttributes(
      this.product?.flavors[0],
      this.product?.sizes[0]
    );

    if(this.selectedAttributes?.flavor) this.setImageUrl(this.selectedAttributes.flavor);
  }

  getProduct(): void {
    // On injecte l'id dans la route dynamique
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // On appelle la méthode getProduct() défini dans notre service
    this.productService
      .getProduct(id)
      // On souscrit à la valeur de l'observable et dès qu'elle est renvoyée, elle est affecter à la propriété product
      .subscribe((product) => (this.product = product));
  }

  // get => permet de lier une proprité d'un objet à une fonction qui sera appelée dès qu'on accède à la propriété en question.
  get flavorOptions(): string {
    // map => créé un nouveau tableau avec les résultat de l'appel d'une fonction fournie sur chaque élément du tableeau appelant
    return (
      this.product?.flavors.map(
        (flavor) => flavor.name
      )
      // créé et renvoyer une nouvelle chaine de caractère en concaténant tous les éléments d'un tableau (par défaut la concaténation).
      .join('|') ?? 'yo'
    );
  }

  get sizeOptions(): string {
    return this.product?.sizes?.join('|') ?? 'yo'
  }

  /**
   * Update selected attribute
   * @param flavor 
   * @param size 
   */
  updateSelectedProductAttributes(flavor: Flavor | undefined, size: Size | undefined) {
    this.setSelectedAttributes(
      flavor ?? {name: 'none', color: '#DDD'},
      size ?? Size.SMALL
    );
    // Permettre de changer l'image en fonction de la saveur choisi
    if (this.selectedAttributes.flavor) {
      this.setImageUrl(this.selectedAttributes.flavor);
    }
  }

  /**
   * Set product attribute
   * @param flavor 
   * @param size 
   */
  setSelectedAttributes(
    flavor: Flavor | undefined,
    size: Size | undefined
    ) {
      this.selectedAttributes = {
        flavor: flavor,
        size: size
      }
    }
}
