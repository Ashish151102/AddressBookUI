import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  standalone: true, // ✅ Mark as standalone
  imports: [NgFor, NgIf, FormsModule], // ✅ Import FormsModule
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {
  contact = {
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipcode: ''
  };

  contacts = [  // ✅ Define an array of contacts
    { name: 'John Doe', phone: '123-456-7890', email: 'john@example.com' },
    { name: 'Jane Doe', phone: '987-654-3210', email: 'jane@example.com' }
  ];

  showForm: boolean = true; // ✅ Moved outside `contact` object

  constructor(private contactService: ContactService, private router: Router) {}

  onSubmit() {
    this.contactService.addContact(this.contact).subscribe({
      next: () => {
        alert('Contact Added Successfully!');
        this.router.navigate(['/']); // ✅ Redirect to Home Page
      },
      error: (err) => console.error('Error:', err)
    });
  }
}
