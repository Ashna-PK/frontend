import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { UserService } from '../../Services/user.service';
import { AuthService } from '../../Services/auth.service';
import { ShopService } from '../../Services/shop.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor (
   private authService : AuthService,
   private userService:UserService,
   private shopService:ShopService
  ) {}
  registerObj: any = {
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
  };
userObj:any={
    name:"",
    email:"",
    address:"",
    phoneNo:"",
  };

  loginObj: any = {
    email: 'seller9@gmail.com',
    password: 'Ashna@123',
  };
  confirmPass="";
  isUser:boolean=false;
  isSeller:boolean=false;
  http = inject(HttpClient);

  router = inject(Router);

  onRegister() {
    console.log(this.registerObj);
    if (this.isUser) {
      this.registerObj.role = 'user';
    }
    if (this.isSeller) {
      this.registerObj.role = 'seller';
    }
    if(this.registerObj.password==this.confirmPass)
    {
      console.log(this.registerObj)
      this.authService.register(this.registerObj)
      .subscribe((res: any) => {
        console.log(res);
        if (res) {
          this.userObj.name=this.registerObj.name;
          this.userObj.email=this.registerObj.email;
          // this.userObj.address="vbbbnnn";
          this.userObj.phoneNo=this.registerObj.phone;
          console.log(this.userObj)

          if (this.registerObj.role == 'user') {
            this.userService.postUser(this.userObj)  //service
              .subscribe((user: any) => {
                console.log(user);
                if (user) {
                  alert('User Successfully registered');

                }
              });
          }
          else if (this.registerObj.role == 'seller') {
            this.shopService.postSeller(this.userObj)  //service
              .subscribe((user: any) => {
                console.log(user);
                if (user) {
                  alert('Seller Successfully registered');
                }
              });
          }
//delay(1000);
         window.location.reload();
        } else {
          alert('Something went wrong');
        }
      });
    }
    else{
    alert("your password and confirm password doesnt match")
    }
  }
  onLogin() {
    localStorage.clear()
    this.authService.login(this.loginObj)
      .subscribe((res: any) => {
        if(res.role=="user")
        {
          this.userService.getUserId(res.email)      //service
        .subscribe((userid:any)=>{ localStorage.setItem("userId",userid)})
        }
        else if(res.role=="seller")
        {
          console.log(res)
          this.shopService.getShopId(res.email)       //service
        .subscribe((sellerid:any)=>{
          console.log(sellerid)
           localStorage.setItem("sellerId",sellerid.shopId)
           localStorage.setItem("shopName",sellerid.shopName)
           console.log(localStorage.getItem('sellerId'))
          })
        }


        localStorage.setItem('email', res.email);
        localStorage.setItem('role', res.role);
        const roleget=localStorage.getItem('role')
        console.log(res);
       
        const shopname=localStorage.getItem('shopName')

        if (res) {
          if (res.role == 'user') {
            this.router.navigateByUrl('home');
          }
          if (res.role == 'admin') {
            this.router.navigateByUrl('admin/seller');
          }
          if (roleget == 'seller'  ) {
      
              this.router.navigate(['seller/home']); 
          }
        }} 
         
      
    );
        } 
      }   
