import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountService} from '../account.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatSelectionList} from '@angular/material';

declare var getTokencountfromBlockchain: any;
declare var addToken: any;

@Component({
  selector: 'app-hunter',
  templateUrl: './hunter.component.html',
  styleUrls: ['./hunter.component.scss']
})
export class HunterComponent implements OnInit {
  private privateKey: string;
  private publicKey: string;
  Tokencount: number;


  @ViewChild('list') list: MatSelectionList;

  Tasks: Array<string> = ['Trail Maintenance', 'Camera Set-Up', 'Sensor Set-Up', 'Track Monitoring'];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private accountService: AccountService,
              private breakpointObserver: BreakpointObserver) {
  }


  ngOnInit() {
    this.privateKey = this.accountService.getprivateKey();
    this.publicKey = this.accountService.getPublicKey();

    getTokencountfromBlockchain().then((result) => {
      this.Tokencount = result;
    });
  }

  Send(length: number) {
    if (addToken(length)) {
      alert('Congratulations, you\'ve earned ' + length + ' VotingToken(s)');
    } else {
      alert('Error');
    }


    this.list.deselectAll();

  }

}
