import { Body, Controller, Delete, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { CreateLocationDTO } from './dto/createLocation.dto';

interface LocationsService {
  GetAllLocations(): Promise<{ data: Location[] }>;
  GetLocation(params: {}): Promise<{ data: Location }>;
  AddLocation(location: CreateLocationDTO): Promise<Location>;
  DeleteLocation(params: {}): Promise<{ data: Location[] }>;
  SearchLocation(keyword: string): Promise<{ data: Location[] }>;
}

@Controller('locations')
export class LocationsController {

  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
    @Inject('LOCATION_PACKAGE') private client: ClientGrpc,
  ) {}

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
        'location.name like :keyword OR location.description like :keyword OR location.type like :keyword OR location.address like :keyword OR location.district like :keyword OR location.subDistrict like :keyword OR location.postCode like :keyword OR location.province like :keyword ',
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
