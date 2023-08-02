import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.scss']
})
export class AddTutorialComponent {
  // Info par défaut
  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };

  submitted = false;

  constructor(private tutorialService: TutorialService) { }

  // void => utilisé comme type de retour de fonction, la void spécifie que la fonction ne renvoi pas de valeur
  saveTutorial(): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description
    };

    this.tutorialService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (err) => console.error(err)
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false
    }
  }
}
