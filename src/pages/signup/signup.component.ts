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

import { SignUpFormComponent } from "src/blocks/sign-up-form/sign-up-form.component";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  @ViewChild(SignUpFormComponent, { static: true })
  signUpForm: SignUpFormComponent;
  constructor(
    protected api: ApiService,
    protected store: Store,
    protected scrollDispatcher: ScrollDispatcher,
    protected componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {}
}
