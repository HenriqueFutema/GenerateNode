import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

import { ApiService } from "../api.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private apiSevice: ApiService, private sanitizer: DomSanitizer) {}

  arraysType: any = [{ name: "id", type: "Number" }];
  inpFileName: String;
  inpName: String = "";
  inpType: String = "";
  fileUrl: any;

  ngOnInit() {}

  handleAddInput() {
    this.arraysType = [
      ...this.arraysType,
      { name: this.inpName, type: this.inpType }
    ];
  }

  handleSubmit() {
    // this.apiSevice
    //   .postData("generate", this.arraysType)
    //   .subscribe(val => console.log(val));

    let data = `const mongoose = require('mongoose'); const ${this.inpFileName}Schema = new mongoose.Schema({`;
    this.arraysType.map(val => {
      data = `${data} ${val.name}:{ type: ${val.type} },`;
    });

    data += `}); module.exports = mongoose.model(${this.inpFileName});`;

    const blob = new Blob([data], { type: "application/octet-stream" });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(blob)
    );
  }
}
