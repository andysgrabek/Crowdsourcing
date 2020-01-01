import {Component, OnInit, ViewChild} from '@angular/core';
import {ResearchConfig} from '../dto/ResearchConfig';
import {Router} from '@angular/router';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog, MatSnackBar, MatTable} from '@angular/material';
import {ResearchConfigService} from '../service/research-config.service';
import {TranslationBundle, TranslationService} from '../service/translation.service';
import {ShareResearchDialogComponent} from '../share-research-dialog/share-research-dialog.component';
import {UserService} from '../service/user.service';
import {ConsentEditDialogComponent} from "../consent-edit-dialog/consent-edit-dialog.component";

@Component({
  selector: 'app-research-config-list',
  templateUrl: './research-config-list.component.html',
  styleUrls: ['./research-config-list.component.css', '../app.component.css']
})
export class ResearchConfigListComponent implements OnInit {

  @ViewChild('researchTable', undefined) researchTable: MatTable<any>;
  public model: [string, ResearchConfig][];
  public displayedColumns: string[] = ['count', 'id', 'isLive', 'action'];
  rb: TranslationBundle;

  constructor(private dialog: MatDialog,
              private snackBack: MatSnackBar,
              private router: Router,
              public researchConfigService: ResearchConfigService,
              private tr: TranslationService,
              private userService: UserService) {
    this.rb = tr.getComponentBundle('ResearchConfigListComponent');
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.researchConfigService.getAll().subscribe(res => {
      this.model = new Array(...res.entries());
    });
  }

  async onEdit(id: string) {
    await this.router.navigateByUrl('research-config/' + id);
  }

  async onDelete(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {autoFocus: false});
    dialogRef.componentInstance.text = this.rb.get('delete-confirmation');
    dialogRef.componentInstance.onConfirm = () => {
      dialogRef.close();
      this.researchConfigService.deleteResearch(id);
    };
  }

  async onAddNew() {
    const newResearch = new ResearchConfig();
    try {
      await this.researchConfigService.createResearch(newResearch);
      this.loadData();
    } finally {

    }
  }

  async onShare(id: string) {
    const dialogRef = this.dialog.open(ShareResearchDialogComponent, {autoFocus: false});
    dialogRef.componentInstance.researchId = id;
    dialogRef.componentInstance.userId = this.userService.getCurrentUser().uid;
  }
}
