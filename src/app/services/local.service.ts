import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Floor } from '../interfaces/floor';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  floor: Floor[] = [];

  constructor(private http: HttpClient) { }

  //* notes: cannot edit json files through Angular, you need backend in order to reflect change on JSON file. Hence we will change the values read at the component.ts


  getFloorFromJson() {
    return this.http.get<any>('../../assets/localData/floors.json')
      .toPromise()
      .then(res => <Floor[]>res.data)
      .then(data => {
        return data;
      });
  }


}
