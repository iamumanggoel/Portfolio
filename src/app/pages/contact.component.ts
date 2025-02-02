import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <div class="contact-container">
      <h1>Contact Me</h1>
      <form (submit)="submitForm()">
        <label for="name">Name:</label>
        <input type="text" id="name" required />
        
        <label for="email">Email:</label>
        <input type="email" id="email" required />
        
        <label for="message">Message:</label>
        <textarea id="message" required></textarea>
        
        <button type="submit">Send</button>
      </form>
    </div>
  `,
  styles: [`
    .contact-container {
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    form {
      display: flex;
      flex-direction: column;
    }
    label {
      margin-top: 10px;
    }
    input, textarea {
      padding: 10px;
      margin-top: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      margin-top: 10px;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export default class ContactComponent {
  submitForm() {
    // Handle form submission logic here
    alert('Form submitted!');
  }
}