
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  cycles = [
    { code: 'D', nom: 'DUT' },
    { code: 'L', nom: 'LICENSE' },
    { code: 'M', nom: 'MASTER' },
  ];

}
