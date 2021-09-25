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

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  // @Column()
  // img: path s3;

  @ManyToMany((type) => Tag, (tag) => tag.locations)
  @JoinTable()
  tags: Tag[];

  @OneToMany((type) => Review, (review) => review.location, { nullable: true })
  reviews: Review[];

  @Column()
  closestStation: number;
}
