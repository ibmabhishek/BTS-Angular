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
  bugStatusList: any;
  searchElement: any;
  responseList: Boolean;
  title = '';
  click: number = -1;
  deleteBug(bugId) {
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
  getBug() {
    let bugStatus = (<HTMLInputElement>document.getElementById('bugStatus')).value;
    let bugTitle = (<HTMLInputElement>document.getElementById('bugTitle')).value;
    let endpointURL = 'http://localhost:8080/bug/';


    if (Object.values(STATUS).includes(bugStatus)) {
      endpointURL = endpointURL + 'status/' + bugStatus;
      this.bugService.getBug(endpointURL).subscribe(response => {
        this.bugList = response;
        if (response != null) {
          console.log(response);
          alert('Bug Listed .....')
        }
        else {
          alert("Bug with Status " + bugStatus + " not found !!");
        }

      },

        error => {
          console.log(error);
          alert("Error happened");

        }
      )
    }
    else {
      endpointURL = endpointURL + 'title/' + bugTitle;
      this.bugService.getBug(endpointURL).subscribe(response => {
        this.bugList = [response];
        if (response != null) {
          console.log(response);
          alert('Bug Listed .....')
        }
        else {
          alert("No Bug with given title exists !");
        }

      },
        error => {
          console.log(error);
          alert("Error happened !!");

        }
      )
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
  disable(toggle: number) {
    if (toggle == 0) {

      (<HTMLInputElement>document.getElementById('bugStatus')).disabled = true;
    }
    else {

      (<HTMLInputElement>document.getElementById('bugTitle')).disabled = true;
    }
  }


  // getBugByNameAndStatus() {
  //   let bugStatus = (<HTMLInputElement>document.getElementById('bugStatus')).value;
  //   let bugTitle = (<HTMLInputElement>document.getElementById('bugTitle')).value;
  //   let endpointURL = 'http://localhost:8080/bug/';
  // }

  ngOnInit(): void {

  }

}
