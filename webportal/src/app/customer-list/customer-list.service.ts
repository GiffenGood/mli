import { Injectable } from '@angular/core';
import * as fb from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { IPromise } from 'q';
import { ICustomer } from '../../../../common/src/customer';

interface ISearchArgs {
  name: string;
  zip: string;
}

@Injectable()
export class CustomerListService {
  currentSearchArgs: ISearchArgs;
  pageSize = 10;
  currentPage = 0;
  pages: any[];

  constructor(private angularfireStore: AngularFirestore) { }

  doSearch(searchArgs: ISearchArgs): IPromise<fb.firestore.DocumentSnapshot[]> {
    this.currentSearchArgs = searchArgs;
    this.currentPage = 0;
    this.pages = [];
    return this.executeAndReturn(this.buildSearch());
  }

  executeAndReturn(query: fb.firestore.Query): IPromise<fb.firestore.DocumentSnapshot[]> {
    console.log('executing fb query');
    const data: fb.firestore.DocumentSnapshot[] = [];
    return <IPromise<fb.firestore.DocumentSnapshot[]>>query.limit(this.pageSize).get().then((sn) => {
      sn.forEach(doc => {
        data.push(doc);
      });
      this.pages.push(data);
      return data;
    }).catch((e) => {
      console.log(e);
      return null;
    });
  }

  buildSearch() {
    const custRef = this.angularfireStore.firestore.collection('customers');
    let searchRef: fb.firestore.Query;
    if (this.currentSearchArgs.name) {
      searchRef = custRef.where('C_FORMALNAME', '>=', this.currentSearchArgs.name).orderBy('C_FORMALNAME');
    }
    else if (this.currentSearchArgs.zip) {
      searchRef = custRef.where('C_ZIP', '>=', this.currentSearchArgs.zip).orderBy('C_ZIP');
    }
    return searchRef;
  }

  doPage(direction: 'next' | 'prev'): Promise<fb.firestore.DocumentSnapshot[]> {
    if (direction === 'prev') {
      this.currentPage--;
      console.log('prev from cache');
      return new Promise<fb.firestore.DocumentSnapshot[]>((res, rej) => {
        res(this.pages[this.currentPage]);
      });
    }

    // Is in cache
    if (this.currentPage + 1 < this.pages.length) {
      console.log('next from cache');
      this.currentPage += 1;
      return new Promise<fb.firestore.DocumentSnapshot[]>((res, rej) => {
        res(this.pages[this.currentPage]);
      });
    }
    // Not in cache
    let query = this.buildSearch();
    const lastPage = <ICustomer[]>this.pages[this.currentPage];
    query = query.startAfter(lastPage[lastPage.length - 1]).limit(this.pageSize);
    this.currentPage += 1;
    return <Promise<fb.firestore.DocumentSnapshot[]>>this.executeAndReturn(query);
  }

  get disablePrev() {
    return this.currentPage === 0;
  }

  get hasData(): boolean{
    return this.pages && this.pages.length !== 0;
  }

  get currentData():  Promise<fb.firestore.DocumentSnapshot[]>{
    return new Promise<fb.firestore.DocumentSnapshot[]>((res, rej) => {
      res(this.pages[this.currentPage]);
    });
  }

  getNewSearch(): ISearchArgs {
    return {
      name: '',
      zip: ''
    };
  }
}
