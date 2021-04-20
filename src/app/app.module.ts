import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CreateBugComponent } from './create-bug/create-bug.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UpdateBugComponent } from './update-bug/update-bug.component';
import { GetBugComponent } from './get-bug/get-bug.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
const appRoutes: Routes = [
  { path: '', component: HomeComponent }, //default, Home page
  { path: 'createBug', component: CreateBugComponent },
  { path: 'getBug', component: GetBugComponent },
  { path: 'updateBug', component: UpdateBugComponent },
  { path: 'contactUs', component: ContactUsComponent },

];
@NgModule({
  declarations: [
    AppComponent,
    CreateBugComponent,
    HeaderComponent,
    FooterComponent,
    UpdateBugComponent,
    GetBugComponent,
    HomeComponent,
    ContactUsComponent

  ],
  imports: [RouterModule.forRoot(
    appRoutes,
    { enableTracing: true } // <-- debugging purposes only
  ),
    BrowserModule, HttpClientModule, FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
