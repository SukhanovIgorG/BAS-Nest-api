import { FilesService } from './../files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postRepository: typeof Post,
    private filesService: FilesService
  ) { }

  async create(dto: CreatePostDto, image) {
    const fileName = await this.filesService.createFiles(image);
    const post = await this.postRepository.create({ ...dto, image: fileName });
    return post
  }
}
