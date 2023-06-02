import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ICategory } from 'src/app/interfaces/Category';
import { IHashTags } from 'src/app/interfaces/Tags';
import { IPosts } from 'src/app/interfaces/Posts';
import { IUser } from 'src/app/interfaces/User';
import { PostsService } from 'src/app/services/posts/posts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout-manager',
  templateUrl: './layout-manager.component.html',
  styleUrls: ['./layout-manager.component.scss'],
})
export class LayoutManagerComponent {
  @Input() title: string = '';
  @Input() linkActive: string = '';
  @Input() titleModal: string = '';
  @Input() theadTable: string[] = [];
  @Input() dataTbody: IUser[] = [];
  @Input() categories: ICategory[] = [];
  @Input() hashTags: IHashTags[] = [];
  @Input() posts: IPosts[] = [];
  @Input() handleAddNewUser: any;
  @Input() userForm: any;
  @Output() exportToExcel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<any>();
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  postInfo!: IPosts;
  constructor(private postsService: PostsService) {}

  /* handle edit */
  handleEdit(items: any) {
    this.edit.emit(items);
  }
  /* handle delete */
  handleDelete(id: string) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        ).then(() => {
          this.delete.emit(id);
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }
  /* handle add new user */
  handleAdd(info: any) {
    this.handleAddNewUser.emit(info);
  }
  /* handle export excel */
  handleExportToExcel() {
    this.exportToExcel.emit();
  }

  /* get post by id */
  getPostById(id: string): void {
    if (!id) return;
    this.postsService.getPostById(id).subscribe((post) => {
      this.postInfo = post.post;
    });
  }
  handleFomatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng trong JavaScript tính từ 0 - 11, nên cần cộng 1
    const year = date.getFullYear();
    // Định dạng lại chuỗi ngày, tháng, năm
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
}
