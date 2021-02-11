export declare class MyComponent {
    icons_file_names: {
        height: string;
        weight: string;
        temperature: string;
        respiratory_rate: string;
        systole: string;
        diastole: string;
        heart_rate: string;
        body_mass: string;
        body_fat_percentage: string;
        lean_body_mass: string;
        head_circumference: string;
        oxygen_saturation: string;
    };
    timer: number;
    request: any;
    nimbo_api_url: string;
    vital_signs_data: string;
    token_api_nimbo_vital_signs: string;
    vital_signs_person_id: number;
    vital_signs_set_id: number;
    vital_signs_consultation_id: number;
    vital_signs_account_id: number;
    consultaVitalSigns(): Promise<any>;
    updateVitalSignSet(): void;
    componentWillLoad(): void;
    private extraerSignoVital;
    private getIconURL;
    handleChange(event: any): void;
    render(): any;
    renderRow(label: any, element_name: any): any;
}
