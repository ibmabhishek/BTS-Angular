import { Component, OnInit } from '@angular/core';
import { BugService } from '../bug.service';
import { Bug } from '../Bug';
import { STATUS } from '../STATUS';

@Component({
  selector: 'app-get-bug',
  templateUrl: './get-bug.component.html',
  styleUrls: ['./get-bug.component.css']
})
export class GetBugComponent implements OnInit {
  bug: Bug = new Bug();
  constructor(private bugService: BugService) { }
  bugList: any;
  // title: string = '';
  // status: string = '';
  // bugResult: Bug[] = [];
  bugArray: Bug[] = [];

  // disable(toggle: number) {
  //   if (toggle != 0) {

  //     (<HTMLInputElement>document.getElementById('bugTitle')).disabled = true;
  //   }
  //   else {

  //     (<HTMLInputElement>document.getElementById('bugStatus')).disabled = true;
  //   }
  // }
  deleteBug(bugId) {
    let ask = confirm("Really want to delete item : " + bugId);
    if (!ask) {
      return;
    }
    this.bugService.deleteBug(bugId).subscribe(response => {
      this.bugList = response;
      console.log(response);
      alert("Bug Deleted!")
      this.getBugs();
    },
      error => {
        console.log(error);
        alert("Error Happened!");

      }
    )
  }
  // getBug() {
  //   let bugStatus = (<HTMLInputElement>document.getElementById('bugStatus')).value;
  //   let bugTitle = (<HTMLInputElement>document.getElementById('bugTitle')).value;
  //   let endpointURL = 'http://localhost:8080/bug/';


  //   if (Object.values(STATUS).includes(bugStatus)) {
  //     this.disable(1);
  //     endpointURL = endpointURL + 'status/' + bugStatus;
  //     this.bugService.getBug(endpointURL).subscribe(response => {
  //       this.bugList = response;
  //       if (response != null) {
  //         console.log(response);
  //         alert('Bug Listed .....')
  //       }
  //       else {
  //         alert("Bug with Status " + bugStatus + " not found !!");
  //       }

  //     },

  //       error => {
  //         console.log(error);
  //         alert("Error happened");

  //       }
  //     )
  //   }
  //   else {
  //     this.disable(0);
  //     endpointURL = endpointURL + 'title/' + bugTitle;
  //     this.bugService.getBug(endpointURL).subscribe(response => {
  //       this.bugList = response;
  //       if (response != null) {
  //         console.log(response);
  //         alert('Bug Listed .....')
  //       }
  //       else {
  //         alert("No Bug with given title exists !");
  //       }

  //     },
  //       error => {
  //         console.log(error);
  //         alert("Error happened !!");

  //       }
  //     )
  //   }



  // }

  getBug() {
    let status = (<HTMLInputElement>document.getElementById('bugStatus')).value;
    let bugTitle = (<HTMLInputElement>document.getElementById('bugTitle')).value;
    if (bugTitle && !status) {
      if (bugTitle.trim()) {
        const promise = this.bugService.getBugByName(bugTitle);
        promise.subscribe(response => {
          this.bugList = response;
          if (this.bugList.length) {
            this.bugArray = this.bugList;
          }
          else {
            alert("Record not found");
            this.bugArray = [];
          }
        },
          error => {
            alert('error happened..')
          });
      }
      else {
        alert("please provide bug name");
        this.bugArray = [];
      }
    }
    else if (status && !bugTitle) {
      const promise = this.bugService.getBugByStatus(status);
      promise.subscribe(response => {
        this.bugList = response;
        if (this.bugList.length) {
          this.bugArray = this.bugList;
        }
        else {
          alert("No Bug with Status : " + status + " found");
          this.bugArray = [];
        }
      },
        error => {
          alert('error happened..')
        })
    }
    else if (bugTitle && status) {
      const promise = this.bugService.getBugByNameAndStatus(bugTitle, status);
      promise.subscribe(response => {
        this.bugList = response;
        if (this.bugList.length) {
          this.bugArray = this.bugList;
        }
        else {
          alert("No Bug with Name : " + bugTitle + " and Status : " + status + " found");
          this.bugArray = [];
        }
      },
        error => {
          alert('error happened..')
        })
    }
    else {
      const observable = this.bugService.getBugs();
      observable.subscribe(response => {
        this.bugList = response;
        if (this.bugList.length) {
          this.bugArray = this.bugList;
        }

      }, error => alert("Error occurred"));
    }
  }

  getBugs() {
    this.bugService.getBugs().subscribe(response => {
      this.bugList = response;
      console.log(response);

    },
      error => {
        console.log(error);
        alert(error.statusText);

      }
    )

  }



  // getBugByNameAndStatus() {
  //   let bugStatus = (<HTMLInputElement>document.getElementById('bugStatus')).value;
  //   let bugTitle = (<HTMLInputElement>document.getElementById('bugTitle')).value;
  //   let endpointURL = 'http://localhost:8080/bug/';
  // }

  ngOnInit(): void {
    this.getBugs();
  }

}
