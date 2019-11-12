import BaseModel from './base-model';

export default class AssetIndexed extends BaseModel {

    assetId?: string = null;
    assetCode?: string = null;
    bathroomsNumberEnd?: number = null;
    bathroomsNumberStart?: number = null;
    builtMetersEnd?: number = null;
    builtMetersStart?: number = null;
    commercialNetworkType?: string = null;
    hasAirConditioneer?: boolean = null;
    hasElevator?: boolean = null;
    hasGarage?: boolean = null;
    hasGarden?: boolean = null;
    hasHeating?: boolean = null;
    hasStorageRoom?: boolean = null;
    hasSwimmingPool?: boolean = null;
    hasTerrace?: boolean = null;
    kitchenEquipment?: boolean = null;
    municipalityCode?: string = null;
    municipalityName?: string = null;
    orientation?: string = null;
    polygon?: any[] = [];
    priceEnd?: number = null;
    priceStart?: number = null;
    promotionCode?: string = null;
    propertyType?: string = null;
    provinceCode?: string = null;
    provinceName?: string = null;
    radius?: number = null;
    roomsNumberEnd?: number = null;
    roomsNumberStart?: number = null;
    subtype?: string = null;
    walletCode?: string = null;
    walletName?: string = null;
    facets?: string[] = [];
    order?: string = null;
    offset?: number = null;
    limit?: number = null;

    constructor(object) {
        super();
        super.initialize(object);
    }
}
