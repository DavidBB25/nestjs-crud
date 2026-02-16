import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { profile } from 'console';

@Injectable()
// injectable class
export class ProfilesService {
    private profiles = [
        {
            id: randomUUID(),
            name: 'Poop',
            description: 'Stinky'
        },
        {
            id: randomUUID(),
            name: 'Rock',
            description: 'Is hard'
        },
        {
            id: randomUUID(),
            name: 'Jello',
            description: 'Boing'
        }
    ];

    findAll() {
        return this.profiles;
    }

    findOne(id: string) {
        const matchingProfile = this.profiles.find((profile) => profile.id === id);

        if(!matchingProfile) {
            throw new NotFoundException(`Profile with ID ${id} not found.`);
        }

        return matchingProfile;
    }

    create(body: CreateProfileDto) {
        const newProfile = {
            id: randomUUID(),
            ...body
        }

        this.profiles.push( newProfile );
        return newProfile;
    }

    update(id: string, body: UpdateProfileDto) {
        const matchingProfile = this.profiles.find((existingProfile) => existingProfile.id === id);

        if (!matchingProfile) {
            throw new NotFoundException(`Profile with ID ${id} not found.`);
        }

        matchingProfile.name = body.name;
        matchingProfile.description = body.description

        return matchingProfile;
    }

    delete(id: string) {
        const matchingIndex = this.profiles.findIndex(profile => profile.id === id);

        if (matchingIndex === -1) {
            throw new NotFoundException(`Profile with ID ${id} not found.`);
        }
        
        this.profiles.splice(matchingIndex, 1);
    }
}
