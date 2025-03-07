import { Input, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  @Input() contact: any = {}; // Allow parent component to pass data
  contactId: string = ''; // Ensure it's always a string

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit() {
    // Get contact ID from URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contactId = id;
      this.loadContact(id);
    } else {
      console.error('Error: Contact ID is missing in the URL');
    }
  }

  loadContact(id: string) {
    this.contactService.getContactById(id).subscribe({
      next: (data) => (this.contact = data),
      error: (err) => console.error('Error fetching contact:', err)
    });
  }

  onCancel() {
    this.router.navigate(['/contact-list']);
  }

  onSubmit(contactForm: any) {
    if (contactForm.invalid) {
      console.error('Form is invalid');
      return;
    }
  
    if (!this.contact.id) {
      console.error('Error: Contact ID is invalid');
      return;
    }
  
    this.contactService.updateContact(this.contact.id, this.contact).subscribe({
      next: () => this.router.navigate(['/contact-list']),
      error: (err) => console.error('Error updating contact:', err)
    });
  }
}