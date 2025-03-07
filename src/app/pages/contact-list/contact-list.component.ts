import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  imports: [CommonModule]
})
export class ContactListComponent implements OnInit {
  contacts: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.fetchContacts();
  }

  fetchContacts() {
    this.contacts = [
      { fullname: 'Varaza Mishra', address: 'Marve Road, Malad (West)', city: 'Mumbai', state: 'Maharashtra', zip: '400064', phone: '02228017752' },
      { fullname: 'Trishna Bhalla', address: 'Desaichambers, Masjid Bunder (West)', city: 'Mumbai', state: 'Maharashtra', zip: '400003', phone: '02223420607' },
      { fullname: 'Anish Kaskar', address: 'Vashi, Navi Mumbai', city: 'Mumbai', state: 'Maharashtra', zip: '400705', phone: '02227893390' }
    ];
  }

  navigateToAdd() {
    this.router.navigate(['/add-contact']);
  }
}