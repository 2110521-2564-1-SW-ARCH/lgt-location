import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';

interface LocationsService {
  GetAllLocations(): Promise<{ data: Location[] }>;
  GetLocation(params: {}): Promise<{ data: Location }>;
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

  @Get()
  async findAllLocations() {
    return this.locationsService.GetAllLocations();
  }

  @Get(':id')
  async findLocation(@Param('id') id: string) {
    return this.locationsService.GetLocation({ id: +id });
  }

  @GrpcMethod('LocationsService')
  async GetAllLocations() {
    const data = await this.locationsRepository.find();
    return { data };
  }

  @GrpcMethod('LocationsService')
  async GetLocation({ id }) {
    return await this.locationsRepository.findOne(id);
  }
}
