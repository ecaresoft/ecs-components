class VaccineApplication {
  constructor(val: any){
    this.id = val.id;
    this.vaccine_id = val.vaccine_id;
    this.vaccine_name = val.vaccine_name;
    this.lote = val.lote;
    this.application_date = val.application_date;
    this.next_dose = val.next_dose;
    this.notes = val.notes;
    this.readonly = val.readonly;
    this.new = val.new;
  }

  id: number;
  vaccine_id: string;
  vaccine_name: string;
  lote: string;
  application_date: string;
  next_dose: string;
  notes: string;
  new: boolean;
  readonly: boolean;
}

class Vaccine {
  id: number;
  name: string;
  fhir_code :string;
}

class Person {
  full_name: string;
  gender: string;
  born_at: string;
  email: string;
  first_name: string;
  last_name: string;
  id: number;
  account_id: number;
}

class Organization {
  id: number;
  name: string;
  owner_id: number;
  logo: string;
  landing_page_info: LandingPageInfo;
}

class LandingPageInfo {
  logo: string;
  header_img: string;
  main_color: string;
  photo: string;
  title: string;
}

export { VaccineApplication, Vaccine, Person, Organization }