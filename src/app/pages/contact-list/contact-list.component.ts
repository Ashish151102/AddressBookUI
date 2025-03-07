import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { EditContactComponent } from '../edit-contact/edit-contact.component';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, EditContactComponent, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: any[] = [];
  editingContact: any | null = null;

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getContacts().subscribe({
      next: (data) => {
        console.log('Contacts fetched:', data);
        this.contacts = data;
      },
      error: (err) => console.error('Error fetching contacts:', err)
    });
  }

  editContact(contact: any) {
    this.router.navigate(['/edit-contact', contact.id], { state: { contact } }); // ✅ Pass contact data
  }
  

  saveEditedContact(updatedContact: any) {
    if (!updatedContact?.id) return;

    this.contactService.updateContact(updatedContact.id, updatedContact).subscribe({
      next: () => {
        this.contacts = this.contacts.map(c =>
          c.id === updatedContact.id ? updatedContact : c
        );
        this.editingContact = null; 
      },
      error: (err) => console.error('Error updating contact:', err)
    });
  }

  deleteContact(contactId: string) {
    console.log("Delete button clicked. Received ID:", contactId);
  
    if (!contactId) {
      console.error("Invalid contact ID:", contactId);
      return;
    }
  
    if (confirm("Are you sure you want to delete this contact?")) {
      this.contactService.deleteContact(contactId).subscribe({
        next: () => {
          console.log("Contact deleted successfully:", contactId);
          this.contacts = this.contacts.filter(contact => contact.id !== contactId);
          alert("Contact deleted successfully");
        },
        error: (err) => console.error("Error deleting contact:", err)
      });
    }
  }
  
  

  cancelEdit() {
    this.editingContact = null;
  }
}