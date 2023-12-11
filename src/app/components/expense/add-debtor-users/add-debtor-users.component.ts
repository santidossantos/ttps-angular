import { Component, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-debtor-users',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatChipsModule, MatSelectModule,
            ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './add-debtor-users.component.html',
  styleUrl: './add-debtor-users.component.css'
})
export class AddDebtorUsersComponent implements OnInit{
  form: FormGroup;
  expenseId: number = 0;

  constructor(private fb: FormBuilder, private route: ActivatedRoute){
    this.form = this.fb.group({
      amoutPayed: ['', Validators.required],
      isPayed: ['', Validators.required],
      user: ['', Validators.required]
    });
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.expenseId = params['id'];
    });
  }

  getGroup(){
  
  }

  addDebtorUser(){

  }
}
