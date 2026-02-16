import { IsString, Length, IsNotEmpty } from "class-validator"; // validation pipes

export class CreateProfileDto {
    @IsString()
    @Length(3, 15)
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}