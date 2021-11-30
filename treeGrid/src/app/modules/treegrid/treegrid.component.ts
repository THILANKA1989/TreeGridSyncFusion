import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ColumnChooserService, ContextMenuService, EditService, EditSettingsModel, ExcelExportService, PageService, PageSettingsModel, PdfExportService, ResizeService, SortService, ToolbarService, TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { sampleData } from 'src/app/data/datasource';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { ContextMenuClickEventArgs, ContextMenuItemModel } from '@syncfusion/ej2-grids/src/grid';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-treegrid',
  templateUrl: './treegrid.component.html',
  styleUrls: ['./treegrid.component.css'],
  providers: [PageService, ColumnChooserService, ToolbarService, SortService, ResizeService, EditService, ExcelExportService, PdfExportService, ContextMenuService]
})
export class TreegridComponent implements OnInit {

  public data: Object[] | undefined;
  public pageSettings: PageSettingsModel | undefined;
  public editing: EditSettingsModel | undefined;
  public toolbar: string[] | undefined;
  public editSettings!: Object;
  public contextMenuItems!: Object[];
  public selectionSettings: Object | undefined;
  public editparams: Object | undefined;
  public d1data: Object | undefined;
  public fields1: Object | undefined;
  public d2data: Object | undefined;
  public fields2: Object | undefined;
  public d3data: Object | undefined;
  public fields3: Object | undefined;

  @ViewChild('treegrid')
  public treegrid!: TreeGridComponent;

  @ViewChild('dropdown1')
  public dropdown1!: DropDownListComponent;

  @ViewChild('dropdown2')
  public dropdown2!: DropDownListComponent;

  @ViewChild('dropdown3')
  public dropdown3!: DropDownListComponent;

  @ViewChild('cellsection')
  cellsection!: ElementRef;
  public contextMenuItemsModel: ContextMenuItemModel[] = [
    { text: 'Add Child', target: '.e-content', id: 'add-child' },
    { text: 'Delelte Row', target: '.e-content', id: 'del-row' },
    { text: 'Add Next', target: '.e-content', id: 'add-next' },
    { text: 'Copy Row', target: '.e-content', id: 'copy-row' },
    { text: 'Copy Rows', target: '.e-content', id: 'copy-rows' },
    { text: 'Cut Row', target: '.e-content', id: 'cut-row' },
    { text: 'Cut Rows', target: '.e-content', id: 'cut-rows' },
    { text: 'Paste Next', target: '.e-content', id: 'paste-next' },
    { text: 'Paste Child', target: '.e-content', id: 'paste-child' }
  ];
  constructor() {
  }

  ngOnInit(): void {
    this.data = sampleData;
    this.editparams = { params: { format: 'n' } };
    this.selectionSettings = { type: 'Multiple' };
    this.editing = { allowDeleting: true, allowEditing: true, mode: 'Row' };
    this.toolbar = ['ColumnChooser'];
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: "Row" };
    this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending', 'Edit', 'Delete', 'Save', 'Cancel', 'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage', 'LastPage', 'NextPage'];
    this.fields1 = { text: 'type', value: 'id' };
    this.d1data = [{ id: 'Single', type: 'Single' },
    { id: 'Multiple', type: 'Multiple' }],
      this.fields2 = { text: 'mode', value: 'id' };
    this.d2data = [{ id: 'Row', mode: 'Row' },
    { id: 'Cell', mode: 'Cell' },],
      this.fields3 = { text: 'mode', value: 'id' };
    this.d3data = [{ id: 'Flow', mode: 'Flow' },
    { id: 'Box', mode: 'Box' }]
  }

  change1(e: ChangeEventArgs): void {
    let type: any = <string>e.value;
    let mode: any = <string>this.dropdown2.value;
    this.treegrid.selectionSettings.type = type;
    if (type === 'Multiple' && mode === 'Cell') {
      this.cellsection.nativeElement.style.display = 'table-row';
    } else {
      this.cellsection.nativeElement.style.display = 'none';
    }
  }
  change2(e: ChangeEventArgs): void {
    let mode: any = e.value;
    let type: any = <string>this.dropdown1.value;
    this.treegrid.selectionSettings.mode = mode;
    if (type === 'Multiple' && mode === 'Cell') {
      this.cellsection.nativeElement.style.display = 'table-row';
    } else {
      this.cellsection.nativeElement.style.display = 'none';
    }
  }
  change3(e: ChangeEventArgs): void {
    let cellmode: any = <string>e.value;
    this.treegrid.selectionSettings.cellSelectionMode = cellmode;
  }
  contextMenuClick(args: ContextMenuClickEventArgs): void {
    var idx: any = args.rowInfo?.rowIndex
    if (args.item.id === 'addchild') {        // add child  
      var data = { taskID: 88, priority: "high" };
      this.treegrid.addRecord(data, idx, "Child"); // pass data, index, position  
    }

    else if (args.item.id === 'copy') {
      this.treegrid.selectRow(idx);

      this.treegrid.copy();
    }
  }

//   contextMenuOpen(arg: BeforeOpenCloseEventArgs) : void {
//     let elem: Element = arg.event.target as Element;
//     let uid: string = elem.closest('.e-row').getAttribute('data-uid');
//     if (isNullOrUndefined(getValue('hasChildRecords', this.treeGridObj.grid.getRowObjectFromUID(uid).data))) {
//         arg.cancel = true;
//     } else {
//         let flag: boolean = getValue('expanded', this.treeGridObj.grid.getRowObjectFromUID(uid).data);
//         let val: string = flag ? 'none' : 'block';
//         document.querySelectorAll('li#expandrow')[0].setAttribute('style', 'display: ' + val + ';');
//         val = !flag ? 'none' : 'block';
//         document.querySelectorAll('li#collapserow')[0].setAttribute('style', 'display: ' + val + ';');
//     }
// }
  
}
