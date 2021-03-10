import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnInit,
} from "@angular/core";
import { ScrollDispatcher } from "@angular/cdk/scrolling";
import { Store } from "@ngxs/store";
// Service
import { ApiService } from "src/lib/service/api.service";
import { AuthenticationService } from "src/lib/authenication.service";
import { LogInFormComponent } from "src/blocks/log-in-form/log-in-form.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  @ViewChild(LogInFormComponent, { static: true })
  signUpForm: LogInFormComponent;
  constructor(
    protected api: ApiService,
    protected store: Store,
    protected scrollDispatcher: ScrollDispatcher,
    protected componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {}
}
