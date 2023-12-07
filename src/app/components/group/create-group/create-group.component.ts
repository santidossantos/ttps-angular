import { Component } from '@angular/core';
import { NavbarComponent } from '../../dashboard/navbar/navbar.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';




@Component({
  selector: 'app-create-group',
  standalone: true,
  imports: [NavbarComponent, MatInputModule, MatCardModule, MatNativeDateModule,
            MatDatepickerModule, MatFormFieldModule, MatIconModule, MatButtonModule,
            MatChipsModule, MatSelectModule],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})
export class CreateGroupComponent {

}
