import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";

 /**Classe que é usada na controler home.ts*/
@Injectable()
export class StorageService {

    /**Pega o token*/
    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        }
        else {
                /**Pega o token em formato JSON*/
            return JSON.parse(usr);
        }
    }
    
     /**Insere  token*/
    setLocalUser(token : LocalUser) {
        if (token == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {  /**Insere  token convertendo de string pra JSON*/
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(token));
        }
    }
}