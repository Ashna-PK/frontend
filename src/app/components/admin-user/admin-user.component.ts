import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent implements OnInit {

  constructor(private userService:UserService){}
  hoveredRow: number | null = null;
  users:any[]=[];
  ngOnInit(): void {
    this.getUsers()
  }

  getUsers()
  {
    this.userService.getUsers().subscribe((res: any) => {
      console.log(res);

      if (res) {
        this.users = res;
      }
    });
  }
  DeleteUser(id:number,name:string) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.getUsers();
        alert(
          `user: '${name}' has been deleted successfully!`
        );
       
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        alert(
          'An error occurred while deleting the user. Please try again.'
        );
      },
    });
  }
}

