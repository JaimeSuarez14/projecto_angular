import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface Actor {
  id: number;
  name: string;
  skill: string;
  studio?: string;
}
@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-form-module-example',
  styleUrl: './form-module-example.css',
  templateUrl: './form-module-example.html',
})
export class FormModuleExample {
  skills = ['Method Acting', 'Singing', 'Dancing', 'Swordfighting'];
  model: Actor = { id: 18, name: 'Tom Cruise', skill: this.skills[3], studio: 'CW Productions' };

  submitted = false;
  onSubmit() {
    this.submitted = true;
  }
  newActor() {
    this.model = { id: 42, name: '', skill: '' };
  }
}
