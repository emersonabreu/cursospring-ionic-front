import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";
import { Cart } from "../models/cart";

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

        /**Aula 137: Pega o carrinho com a sua lista de items**/
    getCart() : Cart {
        let str = localStorage.getItem(STORAGE_KEYS.cart);
        if (str != null) {
            return JSON.parse(str);
        }
        else {
            return null;
        }
    }
    
    /**Aula 137: Seta o item no carrinho**/
    setCart(obj : Cart) {
        if (obj != null) {
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
        } 
        else {
            localStorage.removeItem(STORAGE_KEYS.cart);
        }
    }

}