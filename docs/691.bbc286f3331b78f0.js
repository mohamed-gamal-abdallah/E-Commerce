"use strict";(self.webpackChunkEcommerce=self.webpackChunkEcommerce||[]).push([[691],{9691:(x,l,r)=>{r.r(l),r.d(l,{DetailsComponent:()=>h});var c=r(6814),a=r(756),t=r(4769),u=r(1120),d=r(0),p=r(6286),m=r(2425);function g(s,_){if(1&s&&t._UZ(0,"img",16),2&s){const e=t.oxw().$implicit;t.Q6J("src",e,t.LSH)}}function D(s,_){1&s&&(t.ynx(0),t.YNc(1,g,1,1,"ng-template",15),t.BQk())}function v(s,_){if(1&s){const e=t.EpF();t.TgZ(0,"section",1)(1,"div",2)(2,"div",3)(3,"owl-carousel-o",4),t.YNc(4,D,2,0,"ng-container",5),t.qZA()(),t.TgZ(5,"div",6)(6,"div")(7,"h2",7),t._uU(8),t.qZA(),t.TgZ(9,"p",8),t._uU(10),t.qZA(),t.TgZ(11,"span"),t._uU(12),t.qZA()(),t.TgZ(13,"div",9)(14,"span",10),t._uU(15),t.ALo(16,"currency"),t.qZA(),t.TgZ(17,"p",11),t._UZ(18,"i",12),t._uU(19),t.qZA()(),t.TgZ(20,"button",13,14),t.NdJ("click",function(){t.CHM(e);const i=t.MAs(21),n=t.oxw();return t.KtG(n.addProduct(n.productDetails._id,i))}),t._uU(22," + Add To Cart "),t.qZA()()()()}if(2&s){const e=t.oxw();t.xp6(3),t.Q6J("options",e.categoryOptions),t.xp6(1),t.Q6J("ngForOf",e.productDetails.images),t.xp6(4),t.Oqu(e.productDetails.title),t.xp6(2),t.Oqu(e.productDetails.description),t.xp6(2),t.Oqu(e.productDetails.category.name),t.xp6(3),t.Oqu(t.xi3(16,7,e.productDetails.price,"EGP")),t.xp6(4),t.hij(" ",e.productDetails.ratingsAverage,"")}}let h=(()=>{class s{constructor(e,o,i,n,f){this._ActivatedRoute=e,this._ProductService=o,this._CartService=i,this.toastr=n,this._Renderer2=f,this.productDetails=null,this.categoryOptions={loop:!0,mouseDrag:!0,touchDrag:!0,pullDrag:!1,autoplay:!0,autoplayTimeout:7e3,autoplaySpeed:1e3,dots:!0,navSpeed:700,navText:["",""],responsive:{0:{items:1},400:{items:1},740:{items:1},940:{items:1}},nav:!1}}ngOnInit(){this._ActivatedRoute.paramMap.subscribe({next:e=>{this.productId=e.get("id"),console.log(this.productId)}}),this._ProductService.getProductDetails(this.productId).subscribe({next:e=>{console.log(e),this.productDetails=e.data}})}addProduct(e,o){this._Renderer2.setAttribute(o,"disabled","true"),this._CartService.addToCart(e).subscribe({next:i=>{console.log(i),console.log(i.message),this.toastr.success(i.message),this._Renderer2.removeAttribute(o,"disabled"),this._CartService.cartNumber.next(i.numOfCartItems)},error:i=>{this._Renderer2.removeAttribute(o,"disabled")}})}static#t=this.\u0275fac=function(o){return new(o||s)(t.Y36(u.gz),t.Y36(d.M),t.Y36(p.N),t.Y36(m._W),t.Y36(t.Qsj))};static#e=this.\u0275cmp=t.Xpm({type:s,selectors:[["app-details"]],standalone:!0,features:[t.jDz],decls:1,vars:1,consts:[["class","py-5",4,"ngIf"],[1,"py-5"],[1,"row","align-items-center"],[1,"col-md-3"],[3,"options"],[4,"ngFor","ngForOf"],[1,"col-md-9"],[1,"h5"],[1,"text-muted","small"],[1,"d-flex","align-items-center","justify-content-between","my-3"],[1,"small"],[1,"mb-0"],[1,"fas","fa-star","rating-color"],[1,"main-btn","w-100",3,"click"],["btnAdd",""],["carouselSlide",""],["height","300",3,"src"]],template:function(o,i){1&o&&t.YNc(0,v,23,10,"section",0),2&o&&t.Q6J("ngIf",null!=i.productDetails)},dependencies:[c.ez,c.sg,c.O5,c.H9,a.bB,a.Fy,a.Mp]})}return s})()}}]);