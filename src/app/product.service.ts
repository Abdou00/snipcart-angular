import { Injectable } from '@angular/core';
import { Product } from './core/product';
import { PRODUCTS } from './mock-products';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Un service est une classe TS composée d'attributs et de méthodes, dont l'instanciation est gérée par Angular.
 * Un service est, sauf cas spécifique, un singleton (design pattern) : une seule instance de l’objet est utilisée à travers toute l’application.
 * Une fois instancié, il est injectable dans n'importe lequel de vos composants ou dans un autre service.
 * Ils permettent de :
 *  réutiliser du code entre différents composants
 *  faciliter l'échange des données
 *  centraliser les appels de service
 *  séparer les responsabilités visuelles(component) et fonctionnelles/techniques(service)
 * Pour faire simple, la responsabilité des @Component se limite à afficher et formater la donnée, toute autre opération doit être déléguée à un service.
 */
export class ProductService {

  constructor() { }

  /**
   * Renvoi les données fictives
   * @returns Product[]
   */
  getProducts(): Product[] {
    return PRODUCTS;
  }

  getProduct(id: number): Observable<Product | undefined> {
    // find => renvoie la valeur du premier élément trouvé dans le tableau qui respect la condition donnée par la fonction de test passée en argument
    const product = PRODUCTS.find(product => product.id === id);
    // of => émet une quantité variable de valeurs dans une séquence, puis émet une notification complète. https://www.learnrxjs.io/learn-rxjs/operators/creation/of
    return of(product);
  }
}
