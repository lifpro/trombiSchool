import { Injectable } from '@angular/core';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cycle } from '../model/cycle';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  dbName = 'trombischool.db';
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  cycles = new BehaviorSubject([]);

  constructor(private plt: Platform,
    private sqlitePorter: SQLitePorter, private sqlite: SQLite,
    private tc: ToastController,
    private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: this.dbName,
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.seedDatabase();
      }).catch((error: Error) => {
        console.log('Error on open or create database: ', error);
        return Promise.reject(error.message || error);
      });
    });
  }
  seedDatabase() {
    this.http.get('assets/dump.sql', { responseType: 'text' })
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(_ => {
            this.dbReady.next(true);
          })
          .catch(e => { });
      });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }


  getCycles(): Observable<Cycle[]> {
    return this.cycles.asObservable();
  }
  loadCycles() {
    let list: Cycle[] = [];
    this.database.executeSql('SELECT * FROM cycle order by nom', []).then(data => {
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          list.push(this.dataToCycle(data, i));
        }
      }
      this.cycles.next(list);
    })
      .catch(e => { });;
  }
  getCycle(id): Promise<Cycle> {
    return this.database.executeSql('SELECT * FROM cycle WHERE code = ?', [id]).then(data => {
      return this.dataToCycle(data, 0);
    });
  }

  addCycle(item: Cycle) {
    let data = [item.code, item.nom];
    return this.database.executeSql('INSERT INTO cycle (code,nom) VALUES (?,?)', data).then(data => {
      this.loadCycles();
    }).catch(e => { });
  }

  updateCycle(item: Cycle) {
    let data = [item.nom];
    return this.database.executeSql(`UPDATE cycle SET nom = ? WHERE code = ${item.code}`, data).then(data => {
      this.loadCycles();
    });
  }
  deleteCycle(code: any) {
    return this.database.executeSql('DELETE FROM cycle WHERE code = ?', [code]).then(_ => {
      this.loadCycles();
    });
  }

  dataToCycle(data, i) {
    return {
      code: data.rows.item(i).id,
      nom: data.rows.item(i).nom,
    };
  }

}
