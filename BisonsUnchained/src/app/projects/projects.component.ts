import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../account.service';
import {MatTableDataSource} from '@angular/material/table';

declare var getAllProjects: any;
declare var addProject: any;
declare var voteOnProject: any;
declare var getTokencountfromBlockchain: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  Projects = new MatTableDataSource<any>();
  name = new FormControl('', [Validators.required]);
  Message: FormGroup;
  displayedColumns: string[] = ['name', 'Votes', 'AddVote'];
  private privateKey: string;
  private publicKey: string;
  public Tokencount: number;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private fb: FormBuilder, private accountservice: AccountService,
              private changeDetectorRefs: ChangeDetectorRef) {
    this.Message = fb.group({
      name: this.name,
    });
  }


  ngOnInit() {
    // this.Projects.data = getAllProjects();
    getAllProjects().then((result) => {
      this.Projects.data = result;
      // console.log(this.Projects.data);
      this.changeDetectorRefs.detectChanges();
      // console.log('Changed deteced');
    });

    this.privateKey = this.accountservice.getprivateKey();
    this.publicKey = this.accountservice.getPublicKey();


    getTokencountfromBlockchain().then((result) => {
      this.Tokencount = result;
      // console.log(this.Tokencount);
    });


  }


  AddButton() {
    if (this.Message.valid) {
      if (addProject(this.name.value)) {
        alert('You added ' + this.name.value + ' to the community projects');
        this.Message.reset();
        // getAllProjects();
        // getAllProjects().then((result) => {
        //   this.Projects.data = result;
        //   console.log(this.Projects);
        // });

        // getTokencountfromBlockchain().then((result) => {
        //   this.Tokencount = result;
        //   console.log(this.Tokencount);
        // });

      } else {
        alert('Error');
        this.Message.reset();
      }

    } else {
      alert('Add a name');
    }

  }

  TablePlusTapped(name: string) {
    if (voteOnProject(name, 1)) {
      alert('You spent one Token on: ' + name);
      // this.dataSource = getAllProjects();
      // this.accountservice.updatedTokencount();
      // this.Tokencount = this.accountservice.getTokenCount();
    } else {
      alert('Error');
    }
  }
}
