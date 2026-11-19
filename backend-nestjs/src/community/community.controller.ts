import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('api/community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get()
  async getPosts(
    @Query('category') category: string,
    @Query('upazila') upazila: string,
    @Query('bloodGroup') bloodGroup: string,
  ) {
    return this.communityService.findAll(category, upazila, bloodGroup);
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.communityService.create(createPostDto);
  }
}

