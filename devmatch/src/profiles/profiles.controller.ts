import { Controller, Get, Param, Post, Body, Put, Delete, HttpCode, HttpStatus, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
import { ProfilesGuard } from './profiles.guard';
import type { UUID } from 'crypto';

@Controller('profiles')
export class ProfilesController {
    // GET /profiles
    constructor(private profilesService: ProfilesService) {} // injects ProfilesService with all the profiles and fucntions to manage profiles

    @Get()
    findAll() {
        return this.profilesService.findAll();
    }

    // GET /profiles/:id
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: UUID) {
        return this.profilesService.findOne(id);
    }

    // POST /profiles
    @Post()
    create(@Body() createProfileDto: CreateProfileDto) {
        return this.profilesService.create(createProfileDto);
    }

    // PUT /profiles/:id
    @Put(':id')
    update(
        @Param('id', ParseUUIDPipe) id: UUID, 
        @Body() updateProfileDto: UpdateProfileDto) {
        return this.profilesService.update(id, updateProfileDto);
    }

    // DELETE /profiles/:id
    @Delete(':id')
    @UseGuards(ProfilesGuard) // requires admin api
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseUUIDPipe) id: UUID) {
        this.profilesService.delete(id);
    }
}
