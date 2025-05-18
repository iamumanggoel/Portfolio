import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  user = signal<User | null>({
    name: 'Umang Goel',
    email: 'umang2508@gmail.com',
    profilePicture: '/images/profile_pic.jpeg',
    role: 'admin',
    jobTitle: 'Full Stack Developer',
    company: 'Chandigarh Group Of Colleges',
    location: 'Jhanjeri, India',
    github: 'umanggoel',
    linkedin: 'umanggoel',
    twitter: 'umanggoel',
  });

  login(user: User): void {
    this.user.set(user);
  }

  logout(): void {
    this.user.set(null);
  }

  isLoggedIn(): boolean {
    return !!this.user();
  }
}
