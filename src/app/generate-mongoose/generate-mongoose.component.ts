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

  handleSubmitConfig() {
    const formValue = this.formC.getRawValue();

    let baseUrl = `${formValue.userName}:${formValue.password}`;
    let urlReplaced = formValue.url.replace("<dbuser>:<dbpassword>", baseUrl);

    let data = `module.exports={ baseUrl: "${urlReplaced}" };`;
    const blob = new Blob([data], { type: "application/octet-stream" });

    return (this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(blob)
    ));
  }

  handleSubmitServer() {
    let data =
      "const express = require('express'); const app = express();const cors = require('cors');const mongoose = require('mongoose');";
    data +=
      "const databaseBaseUrl = require('./config/database');mongoose.connect(databaseBaseUrl.baseUrl, {useNewUrlParser: true,useUnifiedTopology: true});";
    data +=
      "app.use(express.json());app.use(cors());app.use(require('./routes'));";
    data += "app.listen(3333, () => { console.log('PORT 3333')});";

    const blob = new Blob([data], { type: "application/octet-stream" });

    return (this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(blob)
    ));
  }
}
