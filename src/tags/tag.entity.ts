import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Location } from 'src/locations/location.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Location, (location) => location.tags)
  locations: Location[];
}