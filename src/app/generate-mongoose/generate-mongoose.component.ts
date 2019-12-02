import { Component, OnInit } from "@angular/core";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-generate-mongoose",
  templateUrl: "./generate-mongoose.component.html",
  styleUrls: ["./generate-mongoose.component.css"]
})
export class GenerateMongooseComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {}

  formC: FormGroup;
  fileUrl: any;

  ngOnInit() {
    this.formC = this.formBuilder.group({
      url: ["", Validators.required],
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  handleSubmit() {
    const formValue = this.formC.getRawValue();

    let baseUrl = `${formValue.userName}:${formValue.password}`;
    let urlReplaced = formValue.url.replace("<dbuser>:<dbpassword>", baseUrl);

    let data = `module.exports={ baseUrl: "${urlReplaced}" };`;
    const blob = new Blob([data], { type: "application/octet-stream" });

    return (this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(blob)
    ));
  }
}
