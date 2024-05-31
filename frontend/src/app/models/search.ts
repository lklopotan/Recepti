export class SearchBody {
    textPretraga?: string;
    ZaOsobaOd: number;
    ZaOsobaDo: number;
    SastojciKategorije: string[];

    vrsta?: string;
    vrijemeOd?: number;
    vrijemeDo?: number;
    ocjenaOd?: number;
    ocjenaDo?: number;
    samoReceptiSaSlikama?: boolean;
}
