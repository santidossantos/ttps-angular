import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { SidebarComponent } from '../../dashboard/sidebar/sidebar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupService } from '../../../services/group.service';
import { UserService } from '../../../services/user.service';
import { jwtDecode } from 'jwt-decode';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Group } from '../../../models/group';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Expense } from '../../../models/expense';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { dateFormatter } from '../../../utils/dateFormatter';

@Component({
  selector: 'app-detail-group',
  standalone: true,
  imports: [
    SidebarComponent,
    MatInputModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    DatePipe,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    MatTooltipModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './detail-group.component.html',
  styleUrl: './detail-group.component.css',
})
export class DetailGroupComponent implements OnInit {
  displayedColumns: string[] = ['name', 'amount', 'date', 'actions'];
  dataSource = new MatTableDataSource<Expense>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  group: Group | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _groupService: GroupService,
    private _userService: UserService,
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const group_id = params.get('group_id');
          if (group_id) {
            const groupIdAsNumber = +group_id;
            return this._groupService.getById(groupIdAsNumber);
          } else {
            console.log('No se encontró ningún grupo');
            return of(null);
          }
        })
      )
      .subscribe(
        (res: Group | null) => {
          if (res) {
            this.group = res;
            this.dataSource.data = this.group.expenses || [];
          }
        },
        (err) => console.log(err)
      );
  }

  formatDate(date: string): string {
    return dateFormatter(date);
  }
}
