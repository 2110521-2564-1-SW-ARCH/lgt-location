import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Location } from 'src/locations/location.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  rate: number;

  @ManyToOne((type) => Location, (location) => location.reviews)
  location: Location;

  // @ManyToOne(type => User, user => user.reviews)
  // user: User;
}
