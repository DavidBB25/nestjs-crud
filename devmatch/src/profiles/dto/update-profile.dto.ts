import { IsNotEmpty, IsString, Length } from "class-validator"; // validation pipes

export class UpdateProfileDto {
    @IsString()
    @Length(3, 15)
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}