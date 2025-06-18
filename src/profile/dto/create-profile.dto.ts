import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsDate()
  @IsNotEmpty()
  dateNaissance: Date;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsString()
  @IsNotEmpty()
  langue: string;
}
