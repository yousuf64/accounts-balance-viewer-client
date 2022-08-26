import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {Routes as RouteKeys, UserRole} from "./core/constants";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: RouteKeys.Auth,
    loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule),
  },
  {
    path: RouteKeys.ViewBalance,
    loadChildren: () => import('./modules/view-balance/view-balance.module').then(mod => mod.ViewBalanceModule),
    canActivate: [AuthGuard],
    data: {
      roles: [UserRole.User, UserRole.Admin]
    }
  },
  {
    path: RouteKeys.UploadBalance,
    loadChildren: () => import('./modules/upload-balance/upload-balance.module').then(mod => mod.UploadBalanceModule),
    canActivate: [AuthGuard],
    data: {
      roles: [UserRole.Admin]
    }
  },
  {
    path: '',
    redirectTo: RouteKeys.Auth,
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
