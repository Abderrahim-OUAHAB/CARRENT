import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardCustomerComponent } from './modules/customer/dashboard-customer/dashboard-customer.component';
import { DashboardAdminComponent } from './modules/admin/dashboard-admin/dashboard-admin.component';
import { PostCarComponent } from './modules/admin/post-car/post-car.component';
import { UpdateCarComponent } from './modules/admin/update-car/update-car.component';
import { BookCarComponent } from './modules/customer/book-car/book-car.component';
import { MyBookingsComponent } from './modules/customer/my-bookings/my-bookings.component';
import { BookingsComponent } from './modules/admin/bookings/bookings.component';
import { SearchCarComponent } from './modules/admin/search-car/search-car.component';
import { SearchCarCustomerComponent } from './modules/customer/search-car-customer/search-car-customer.component';
import { AgencyListComponent } from './modules/agence/agency-list/agency-list.component';
import { AgencyAddComponent } from './modules/agence/agency-add/agency-add.component';
import { AgencyUpdateComponent } from './modules/agence/agency-update/agency-update.component';
import { EditProfileComponent } from './modules/customer/edit-profile/edit-profile.component';


export const routes: Routes = [
    {path:"edit-profile",component:EditProfileComponent},
    {path:"update_agence/:id",component:AgencyUpdateComponent},
    {path:"add_agence",component:AgencyAddComponent},
    {path:"agences",component:AgencyListComponent},
    {path:"search-car",component:SearchCarCustomerComponent},
    {path:"search",component:SearchCarComponent},
    {path:"bookings",component:BookingsComponent},
    {path:"my_bookings",component:MyBookingsComponent},
    {path:"book/:id",component:BookCarComponent},
    {path:"car/:id",component:UpdateCarComponent},
    {path:"car",component:PostCarComponent},
    {path:"customer/dashboard", component:DashboardCustomerComponent},
    {path:"admin/dashboard", component:DashboardAdminComponent},
    {path:"register", component:SignupComponent},
    {path:"login", component:LoginComponent},
    {path:"**", component:LoginComponent}
    

];
