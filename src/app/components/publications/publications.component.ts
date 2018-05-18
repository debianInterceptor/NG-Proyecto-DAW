//Importe basico para crear un componente
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Publication } from '../../models/publication';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service'
import * as $ from 'jquery'; // Importar jquery

@Component({
    selector: 'publications',
    templateUrl: './publications.component.html',
    providers: [UserService,PublicationService]
})

export class PublicationsComponent implements OnInit{
    public identity;
    public token;
    public title: string;
    public url: string;
    public status: string;
    public page;
    public total;
    public pages;
    public itemsPerPage;
    public publications: Publication[];

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService : UserService,
        private _publicationService : PublicationService
    ){
        this.title= 'Publications';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.page=1
    }

    ngOnInit(){
        console.log('Componente de Publications cargado');
        this.getPublications(this.page);
    }

    getPublications(page, adding =false){
        this._publicationService.getPublications(this.token, page).subscribe(
            response =>{
                if(response.publications){
                    this.total = response.total_items;
                    this.pages = response.pages;
                    this.itemsPerPage = response.items_per_page;
                    if(!adding){
                        this.publications = response.publications;
                    }else{
                        var arrayA= this.publications;
                        var arrayB = response.publications;
                        this.publications = arrayA.concat(arrayB);

                        $("html, body").animate({scrollTop: $('body').prop("scrollHeight")},500);
                    }

                    if(page > this.pages){
                        //this._router.navigate(['/home']);
                    }
                }else{
                    this.status = 'error';
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }

    public noMore = false;
    viewMore(){
        //Si se llega al total de publicaciones, no hay mas que ver
        if(this.publications.length == this.total){
            this.noMore = true;
        }else{
            this.page +=1;
            this.getPublications(this.page, true);
        }
    }


}