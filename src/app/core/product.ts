import { Flavor } from "./flavor";
import { Size } from "./size";

/**
 * Une interface TypeScript permet de définir la signature (ou le contrat) d'une classe où même une fonction.
 * Les interfaces TypeScript ne sont utilisées que lors de la transpilation. Elle disparaissent totalement en runtime étant donné qu'elles ne contiennent pas de code.
 */
export interface Product {
    id: number;
    name: string;
    imageUrls: string[];
    price: number;
    flavors: Flavor[];
    sizes: Size[];
}