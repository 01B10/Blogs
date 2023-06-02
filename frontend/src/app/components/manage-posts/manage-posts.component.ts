import { Component } from '@angular/core';
import { ExcelServiceService } from 'src/app/services/excelService/excel-service.service';
import { IPosts } from 'src/app/interfaces/Posts';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.scss'],
})
export class ManagePostsComponent {
  title: string = 'Quản lý các bài đăng';
  linkActive: string = '/admin/post-add';
  titleModal: string = 'Thông tin bài post';
  theadTable: string[] = [
    'STT',
    'Tên bài đăng',
    'Tác giả',
    'Danh mục',
    'Trạng thái',
    'Xét duyệt',
    'Lượt thích',
    'Action',
  ];
  routerLink = '/admin/add-post';
  PostsList: IPosts[] = [];
  constructor(
    private postsService: PostsService,
    private excelServices: ExcelServiceService
  ) {
    this.getAllPost();
  }

  getAllPost() {
    this.postsService.getAllPosts().subscribe((postsData) => {
      console.log(postsData.posts.docs);
      this.PostsList = postsData.posts.docs;
    });
  }

  /* handle delete user */
  handleDeletePost(id: string) {
    console.log(id);
    this.postsService.deleteFakePost(id).subscribe(
      () => {
        this.getAllPost();
      },
      (err) => console.log(err.message)
    );
  }
  /* export to excel */
  exportToExcel() {
    this.excelServices.exportToExcel(this.PostsList, 'Posts');
  }
}
