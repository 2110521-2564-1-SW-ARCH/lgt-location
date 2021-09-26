export interface CreateLocationDTO {
  name: string;
  description: string;
  type: string;
  address: string;
  district: string;
  subDistrict: string;
  postCode: string;
  province: string;
  latitude: string;
  longitude: string;
  imgURL: string;
  closestStation: number;
}
