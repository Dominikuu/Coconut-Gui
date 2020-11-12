import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { environment } from "src/environments/environment";
import { HomeComponent } from "src/pages/home/home.component";

import { FullWindowPage } from "src/app/outlets/full-window/full-window.component";
import { NotImplPage } from "src/app/outlets/not-impl/not-impl.component";
import { WithHeaderPage } from "src/app/outlets/with-header/with-header.component";

import { AuthGuard } from "src/lib/authenication.guard";

const RedirectChildren: Routes = [];

const SideNavPageChildren: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent,
  },
  {
    path: "",
    pathMatch: "",
    loadChildren: () =>
      import("../pages/full-window.module").then((m) => m.FullWindowModule),
  },
];

if (environment.production) {
  RedirectChildren.push({
    path: "**",
    redirectTo: "",
  });
} else {
  RedirectChildren.push({
    path: "**",
    component: NotImplPage,
  });
}
const WithHeaderChildren: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("../pages/with-header.module").then((m) => m.WithHeaderModule),
  },
];

const FullPageChildren: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("../pages/full-window.module").then((m) => m.FullWindowModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: "",
          component: WithHeaderPage,
          children: WithHeaderChildren,
        },
        {
          path: "",
          component: FullWindowPage,
          children: FullPageChildren,
        },
        {
          path: "",
          component: FullWindowPage,
          children: RedirectChildren,
        },
      ],
      { useHash: true }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
