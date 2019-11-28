import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

import { ApiService } from "../api.service";

//import { DataObject } from "../models/data.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(
    private apiSevice: ApiService,
    private sanitizer: DomSanitizer //private dataObject: DataObject
  ) {}

  arraysType: any = [{ name: "", type: "", required: true }];
  inpFileName: String = "";
  inpName: String = "";
  inpType: String = "";
  checkRequired: boolean = true;
  hasError: Boolean = false;
  fileUrl: any;
  methodsController: Array<String> = ["store", "index", "update", "destroy"];

  ngOnInit() {}
  handleAddInput() {
    return (this.arraysType = [
      ...this.arraysType,
      { name: this.inpName, type: this.inpType, required: this.checkRequired }
    ]);
  }

  handleRemoveInput() {
    return this.arraysType.pop();
  }

  handleSubmitModel() {
    // this.apiSevice
    //   .postData("generate", this.arraysType)
    //   .subscribe(val => console.log(val));

    if (this.inpFileName === "") {
      return (this.hasError = true);
    }

    let data = `const mongoose = require('mongoose'); const ${this.inpFileName}Schema = new mongoose.Schema({`;
    this.arraysType.map(val => {
      data = `${data} ${val.name}:{ type: ${val.type}, required: ${val.required} },`;
    });

    data += `}); module.exports = mongoose.model("${this.inpFileName}", ${this.inpFileName}Schema);`;

    const blob = new Blob([data], { type: "application/octet-stream" });

    return (this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(blob)
    ));
  }

  handleSubmitController() {
    const { inpFileName, methodsController } = this;

    let data = `const ${inpFileName} = require('../models/${inpFileName}'); module.exports = {`;

    //POST
    data += `async ${
      methodsController[0]
    }(req, res){ const ${inpFileName.toLowerCase()} = await ${inpFileName}.create(req.body); return res.json(${inpFileName.toLowerCase()}) },`;

    //GET
    data += `async ${
      methodsController[1]
    }(req, res){ const ${inpFileName.toLowerCase()} = await ${inpFileName}.find(); return res.json(${inpFileName.toLowerCase()})},`;

    //PUT
    data += `async ${
      methodsController[2]
    }(req, res){ const ${inpFileName.toLowerCase()} = await ${inpFileName}.findByIdAndUpdate(req.params.id, req.body, { new: true }); return res.json(${inpFileName.toLowerCase()}) },`;

    //DELETE
    data += `async ${
      methodsController[3]
    }(req, res){ const ${inpFileName.toLowerCase()} = await ${inpFileName}.findByIdAndDelete(req.params.id); return res.json({ ok: true }) }}`;

    const blob = new Blob([data], { type: "application/octet-stream" });

    return (this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(blob)
    ));
  }
}
