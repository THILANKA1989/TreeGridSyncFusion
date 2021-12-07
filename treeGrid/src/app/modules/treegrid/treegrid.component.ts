import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ColumnChooserService, ContextMenuService, EditService, EditSettingsModel, ExcelExportService, PageService, PageSettingsModel, PdfExportService, ResizeService, SortService, ToolbarItems, ToolbarService, TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { ContextMenuClickEventArgs, ContextMenuItemModel } from '@syncfusion/ej2-grids/src/grid';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { DataService } from '../../../services/data.service';
import { BaseDataItem, BaseItemArray } from '../../models/data.model';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/interval';
import { ObjecMapper } from 'src/app/functions/util.functions';

@Component({
  selector: 'app-treegrid',
  templateUrl: './treegrid.component.html',
  styleUrls: ['./treegrid.component.css'],
  providers: [PageService, ColumnChooserService, ToolbarService, SortService, ResizeService, EditService, ExcelExportService, PdfExportService, ContextMenuService]
})
export class TreegridComponent implements OnInit {

  public data: BaseDataItem[] | undefined;
  public pageSettings: PageSettingsModel | undefined;
  public editing: EditSettingsModel | undefined;
  public toolbar: string[] | undefined;
  public editSettings!: Object;
  public toolbarOptions!: ToolbarItems[];
  public contextMenuItems!: Object[];
  public selectionSettings: Object | undefined;
  public editparams: Object | undefined;

  sampleData: any;
  selectedRows: any[] = [];
  copiedRow: BaseDataItem;
  totalRowCount: number;
  lastIndex: number;
  sub: Subscription;
  pageNumber: number = 1;
  pageCount: number = 0;

  @ViewChild('treegrid')
  public treegrid!: TreeGridComponent;

  @ViewChild('cellsection')
  cellsection!: ElementRef;
  contextMenuItempruralModel: ContextMenuItemModel[] = [];
  contextMenuItemCopyModel: ContextMenuItemModel[] = [];
  contextMenuItemsModel: ContextMenuItemModel[] = [];
  constructor(private dataService: DataService) {
    this.sub = Observable.interval(10000)
      .subscribe((val) => { this.saveToFile(); });
  }

  ngOnInit(): void {

    this.getData();
    this.contextMenuItemsModel = [
      { text: 'Add Child', target: '.e-content', id: 'add-child' },
      { text: 'Delete Row', target: '.e-content', id: 'del-row' },
      { text: 'Add Next', target: '.e-content', id: 'add-next' },
      { text: 'Copy Row', target: '.e-content', id: 'copy-row' },
      { text: 'Cut Row', target: '.e-content', id: 'cut-row' }
    ];

    this.contextMenuItempruralModel = [
      { text: 'Copy Rows', target: '.e-content', id: 'copy-rows' },
      { text: 'Cut Rows', target: '.e-content', id: 'cut-rows' }

    ];

    this.contextMenuItemCopyModel = [
      { text: 'Paste Next', target: '.e-content', id: 'paste-next' },
      { text: 'Paste Child', target: '.e-content', id: 'paste-child' }
    ];
    this.pageSettings = { pageSize: 10, pageSizeMode: 'Root', totalRecordsCount: this.totalRowCount, pageCount: this.pageCount };
    this.editparams = { params: { format: 'n' } };
    this.selectionSettings = { type: 'Multiple' };
    this.editing = { allowDeleting: true, allowEditing: true, mode: 'Row' };
    this.toolbar = ['ColumnChooser'];
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: "Row" };
    this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  }

  contextMenuClick(args: ContextMenuClickEventArgs): void {
    this.copiedRow = args.rowInfo.rowData as BaseDataItem;
    let newRow = new ObjecMapper(this.copiedRow) as BaseDataItem;
    console.log(newRow);
    let initArray : BaseDataItem[] = [];
    switch (args.item.id) {
      case 'copy-row': {
        //statements;
        this.copiedRow = args.rowInfo.rowData as BaseDataItem;
        console.log(newRow);
        this.contextMenuItemsModel.push(
          { text: 'Paste Next', target: '.e-content', id: 'paste-next' },
          { text: 'Paste Child', target: '.e-content', id: 'paste-child' });
        break;
      }
      case 'paste-child': {
        //statements;
        let parentRow = args.rowInfo.rowData as BaseDataItem;
        newRow.id = this.totalRowCount + 1;
        if (!parentRow.children) {
          parentRow.children = [];
        }
        parentRow.children.push(newRow);
        initArray.push(parentRow);
        this.editBaseData(initArray);
        this.treegrid.addRecord(parentRow, parentRow.id-1);
        this.sampleData = this.treegrid.dataSource;
        this.treegrid.refresh();
        break;
      }
      case 'copy-rows': {
        //statements;
        let copRow = args.rowInfo.rowData as BaseDataItem;
        this.copiedRow = new ObjecMapper(copRow) as BaseDataItem;
        console.log(this.copiedRow);
        this.treegrid.contextMenuItems = this.contextMenuItemCopyModel;
        break;
      }
      case 'del-row': {
        //statements;
        let elem: Element = args.event.target as Element;
        let uid: string = elem.closest('.e-row').getAttribute('data-uid');
        //this.treegrid.deleteRow();
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  contextMenuOpen(arg: BeforeOpenCloseEventArgs): void {
    
    var selectedrowindex = this.treegrid.getSelectedRowIndexes();
    var ifMultipleSelected = 1 < selectedrowindex.length;
    
    if (ifMultipleSelected) {
      this.treegrid.contextMenuItems = this.contextMenuItempruralModel;
    }else if(this.copiedRow != null){
      this.treegrid.contextMenuItems = this.contextMenuItemCopyModel;
    }else{
      this.treegrid.contextMenuItems = this.contextMenuItemsModel;
    }
  }

  getData() {
    const searchQuery: any = {
      "pageSize": 10,
      "pageNumber": this.pageNumber
    };
    this.dataService.getAllData(searchQuery).subscribe((response: any) => {
      console.log(response);
      this.data = response.content.data;
      this.totalRowCount = response.totalRowCount;
      this.pageCount = response.pageCount;
    }, error => {
    });
  }

  getRowData(args: any): void {
    console.log(this.treegrid.getRowInfo(args.target));
  }

  saveToFile(): any {
    const baseItemArray = {
      "data": this.data,
      "lastIndex": this.totalRowCount
    } as BaseItemArray;
    console.log(baseItemArray);
    this.dataService.updateJson(baseItemArray).subscribe((response: any) => {
      console.log(response);
    }, error => {
    });
  }

  editBaseData(data:BaseDataItem[]){
    this.data.map(obj => data.find(o => o.id === obj.id) || obj);
  }

}
