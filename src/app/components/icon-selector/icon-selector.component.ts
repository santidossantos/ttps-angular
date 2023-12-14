import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';

interface Icon{
  value: string;
  name: String;
}

@Component({
  selector: 'app-icon-selector',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, 
            FormsModule, MatIconModule],
  templateUrl: './icon-selector.component.html',
  styleUrl: './icon-selector.component.css'
})
export class IconSelectorComponent {
  icons: Icon[] = [
    {value: 'card_giftcard', name: "Regalo"},
    {value: 'card_travel', name: "Viaje"},
    {value: 'credit_card', name: "Tarjeta"},
    {value: 'flight_takeoff', name: "Viaje"},
    {value: 'shopping_cart', name: "Compras"},
    {value: 'sentiment_satisfied_alt', name: "Felicidad"},
    {value: 'laptop', name: "Tecnologia"},
    {value: 'fastfood', name: "Comida"},
    {value: 'local_dining', name:"Comida"},
    {value: 'local_play', name: "Ocio"},
    {value: 'local_taxi', name: "Transporte"},
    {value: 'restaurant', name: "Comida"},
  ];
}
