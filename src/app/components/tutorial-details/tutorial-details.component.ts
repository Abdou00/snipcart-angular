import { Component, OnInit, Input } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.scss']
})
export class TutorialDetailsComponent implements OnInit {
  // Par défaut, aucune propriété de composant ne peut être modifiée par Property Binding. Il faut donc définir les propriétés pouvant servir d' "input" au composant en ajoutant simplement le décorateur @Input().
  @Input() viewMode = false;
  @Input() currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };

  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params['id']);
    }
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id).subscribe({
      // next: function(data) {} Equivalent à
      next: (data) => {
        this.currentTutorial = data;
        console.log(data);
      },
      error: (err) => console.error()
    });
  }

  updateTutorial(): void {
    this.message = '';
    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial).subscribe({
      next: (response) => {
        console.log(response);
        this.message = response.message ? response.message : 'This tutorial was updated successfully!'
      },
      error: (err) => console.error(err)
    });
  }

  updateTutorialPublished(status: boolean): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };

    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, data).subscribe({
      next: (response) => {
        console.log(response);
        this.currentTutorial.published = status;
        this.message = response.message ? response.message : 'The status was updated successfully!'
      },
      error: (err) => console.error(err)
    });
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/tutorials']);
      },
      error: (err) => console.error(err)
    });
  }
}
