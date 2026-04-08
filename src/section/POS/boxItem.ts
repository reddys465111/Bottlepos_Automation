import { Locator } from "@playwright/test";
import { BaseObject } from "../../base/baseObject";
import { Button } from "../../objects/button";

export type ItemName = 
    'KINGFISHER STRONG 136ML' | 
    'KINGFISHER STRONG759ML' | 
    'PEPSI 851ML'|
    'OLIVA CONNECTICUT RESERVE CHURCHILL CIG'|
    'TUBORG STRONG QQQQ'|
    'KINGFISHER STRONG 925ML'|
    'CROWN ROYAL 350ML'|
    '180 ULTI MARGARITA WATERMELON'|
    'Lotto Payout'|
    'KINGFISHER 651 ML' |
    '14 HANDS RIESLING 750ML 1234' |
    'COUPON $5 OFF' |
    'HAYWARDS 5000 BEER CAN 650ML' |
    'COUPON 5% OFF' |
    'BEER 1'
    
export type Categories = 
    'Shortcut Keys' |
    'All Categories' |
    '15marchcategory' 

export class BoxItem extends BaseObject{

    Categories : Button;
    constructor(locator: Locator){
        super(locator);

        this.Categories = new Button(this._locator.locator('[title="Categories"]'));
    }



}