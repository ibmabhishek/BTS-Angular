import { Component, OnInit } from '@angular/core';
import { BugService } from '../bug.service';
import { Bug } from '../Bug';


@Component({
  selector: 'app-create-bug',
  templateUrl: './create-bug.component.html',
  styleUrls: ['./create-bug.component.css']
})
export class CreateBugComponent implements OnInit {
  title: String = 'BugForm';
  bug: Bug = new Bug();
  todayDate: Date = new Date();


  constructor(private bugService: BugService) { }
  etaCheck() {
    if (this.bug.etaDate <= this.todayDate.toDateString()) {
      alert('ETA Should not be past date');

    }
  }
  saveBug() {
    if (!this.bug.title.trim()) {
      alert("Please provide bug name");
    }
    else if (this.bug.title.length > 200) {
      alert("Bug name cannot be more than 200 character");
    }
    else if (!this.bug.projectId.trim()) {
      alert("Please provide project id");
    }
    else if (this.bug.projectId.length > 50) {
      alert("project id cannot be more than 50 character");
    }
    else if (!this.bug.product.trim()) {
      alert("Please provide product name");
    }
    else if (this.bug.product.length > 50) {
      alert("product name cannot be more than 50 character");
    }
    else if (!this.bug.module.trim()) {
      alert("Please provide module name");
    }
    else if (this.bug.module.length > 50) {
      alert("module name cannot be more than 50 character");
    }
    else if (!this.bug.buildVersion.trim()) {
      alert("Please provide build version");
    }
    else if (this.bug.buildVersion.length > 50) {
      alert("build version cannot be more than 50 character");
    }
    else if (!this.bug.description.trim()) {
      alert("Please provide description");
    }

    let createBug = (<HTMLInputElement>document.getElementById('createBug'))
    if (!createBug.checkValidity()) {
      alert('form is invalid');
      return;
    }
    const promise = this.bugService.saveBug(this.bug);
    promise.subscribe(response => {
      console.log(response);
      alert("Bug saved...");
    },
      error => {
        this.etaCheck();
        console.log(error);
        alert('AN error occured, please retry.');

      }
    )


  }
  ngOnInit(): void {

  }

}
