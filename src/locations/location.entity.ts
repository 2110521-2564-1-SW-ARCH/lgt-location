import { Review } from 'src/reviews/review.entity';
import { Tag } from 'src/tags/tag.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  address: string;

  @Column()
  district: string;

  @Column()
  subDistrict: string;

  @Column()
  postCode: string;

  @Column()
  province: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  imgURL: string;

  @ManyToMany((type) => Tag, (tag) => tag.locations)
  @JoinTable()
  tags: Tag[];

  @OneToMany((type) => Review, (review) => review.location)
  reviews: Review[];

  @Column()
  closestStation: number;
}
