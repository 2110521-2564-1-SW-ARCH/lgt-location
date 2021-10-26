import { Body, Controller, Delete, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { CreateLocationDTO } from './dto/createLocation.dto';

interface LocationsService {
  GetAllLocations(): Promise<{ data: Location[] }>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  GetLocation(params: {}): Promise<{ data: Location }>;
  AddLocation(location: CreateLocationDTO): Promise<Location>;
  DeleteLocation(params: {}): Promise<{ data: Location[] }>;
  SearchLocation(keyword: string): Promise<{ data: Location[] }>;
}

@Controller('locations')
export class LocationsController {
  private locationsService: LocationsService;

  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
    @Inject('LOCATION_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.locationsService =
      this.client.getService<LocationsService>('LocationsService');
  }

  @GrpcMethod('LocationsService')
  async GetAllLocations() {
    const data = await this.locationsRepository.find();
    return { data };
  }

  @GrpcMethod('LocationsService')
  async SearchLocation({ keyword }) {
    const data = await this.locationsRepository
      .createQueryBuilder('location')
      .where(
        'location.name ILIKE :keyword OR \
        location.description ILIKE :keyword OR \
        location.type ILIKE :keyword OR \
        location.address ILIKE :keyword OR \
        location.district ILIKE :keyword OR \
        location.subDistrict ILIKE :keyword OR \
        location.postCode ILIKE :keyword OR \
        location.province ILIKE :keyword ',
        { keyword: `%${keyword}%` },
      )
      .getMany();
    return { data };
  }

  @GrpcMethod('LocationsService')
  async GetLocation({ id }) {
    return await this.locationsRepository.findOne(id);
  }

  @GrpcMethod('LocationsService')
  async AddLocation(location: CreateLocationDTO) {
    const newLocation = await this.locationsRepository.create(location);
    await this.locationsRepository.save(newLocation);
    return newLocation;
  }

  @GrpcMethod('LocationsService')
  async DeleteLocation({ id }) {
    await this.locationsRepository.delete(id);
    const data = await this.locationsRepository.find();
    return { data };
  }
}
