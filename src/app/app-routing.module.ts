import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [



  {path:"",canActivate:[authGuard],loadComponent:()=>import("./layouts/blank-layout/blank-layout.component").then((m)=>m.BlankLayoutComponent),
  children:[
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:'home',loadComponent:()=>import("./components/home/home.component").then((m)=>m.HomeComponent),title:'home'},
    {path:'cart',loadComponent:()=>import("./components/cart/cart.component").then((m)=>m.CartComponent),title:'cart'},
    {path:'products',loadComponent:()=>import("./components/products/products.component").then((m)=>m.ProductsComponent),title:'products'},
    {path:'productdetails/:id',loadComponent:()=>import("./components/details/details.component").then((m)=>m.DetailsComponent),title:'productdetails'},
    {path:'brands',loadComponent:()=>import("./components/brands/brands.component").then((m)=>m.BrandsComponent),title:'brands'},
    {path:'whislist',loadComponent:()=>import("./components/whislist/whislist.component").then((m)=>m.WhislistComponent),title:'whislist'},
    {path:'forgotpassword',loadComponent:()=>import("./components/forgotpassword/forgotpassword.component").then((m)=>m.ForgotpasswordComponent),title:'Forgot Password'},
    {path:'allorders',loadComponent:()=>import("./components/allorders/allorders.component").then((m)=>m.AllordersComponent),title:'Allorders'},
    {path:'payment/:id',loadComponent:()=>import("./components/payment/payment.component").then((m)=>m.PaymentComponent),title:'payment'},
    {path:'categories',loadComponent:()=>import("./components/catergories/catergories.component").then((m)=>m.CatergoriesComponent),title:'categories'},
  ]
    
  },


  {
    path:"",loadComponent:()=>import("./layouts/auth-layout/auth-layout.component").then((m)=>m.AuthLayoutComponent),children:[
      {path:"",redirectTo:"login",pathMatch:"full"},
      {path:"login",loadComponent:()=>import("./components/login/login.component").then((m)=>m.LoginComponent),title:"Login"},
      {path:"register",loadComponent:()=>import("./components/register/register.component").then((m)=>m.RegisterComponent),title:"Register"},
      {path:'forgot',loadComponent:()=>import("./components/forgotpassword/forgotpassword.component").then((m)=>m.ForgotpasswordComponent),title:'Forgot Password'}
    ]
  },

  
  {
    path:"**",loadComponent:()=>import("./components/notfound/notfound.component").then((m)=>m.NotfoundComponent),title:"NotFound"
  }
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
