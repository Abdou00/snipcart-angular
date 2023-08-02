import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { TutorialListComponent } from './components/tutorial-list/tutorial-list.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';

const routes: Routes = [
  // {path: "product/:id", component: ProductPageComponent},
  // {path: "**", component: HomepageComponent},
  {path: "", redirectTo: 'tutorials', pathMatch: 'full'}, // pathMatch mis à valeur 'full permet de déterminer que ce cas doit être exécuté que si le path(chemein) est complètement vide(soit '/' ou '')
  {path: "tutorials", component: TutorialListComponent},
  {path: "tutorials/:id", component: TutorialDetailsComponent},
  {path: "add", component: AddTutorialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
