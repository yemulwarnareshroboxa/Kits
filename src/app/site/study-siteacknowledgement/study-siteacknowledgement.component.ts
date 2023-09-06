

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { CrosService } from 'src/app/cro/cros.service';

import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

 

@Component({

  selector: 'app-study-siteacknowledgement',

  templateUrl: './study-siteacknowledgement.component.html',

  styleUrls: ['./study-siteacknowledgement.component.css']

})

export class StudySiteacknowledgementComponent implements OnInit {

  getCurrentYear(): number {

    return new Date().getFullYear();

  }

 

  statusData = ['Pending', 'Collected']

  protocolIdDetails: any;

  screenDetails: Array<any> = [];

  sMatDetails: Array<any> = [];

  visitDetails: Array<any> = [];

  vMatDetails: Array<any> = [];

  scount: any;

  vcount: any;

  displayValues: boolean = false;

 

  tets: Array<any> = [];

 

  tabs: any[] = [];

 

  count = 2;

  allTabsData: any[] = [];

  index: any;

  indexvalue: any;

  vmdetails: any[] = [];

  uuid: any;

  skDetails: any[] = [];

  vkDetails: any;

  value: any;

  sponsers: Array<any> = [];

  email: string | null;

  ID: any;

  date: string;

  id: any;

  screeningFullData: any;

  screeningVariant: any;

 

 

 

  constructor(private protocolService: ProtocolService, private activatedRoute: ActivatedRoute, private router: Router,

    private messageService: MessageService, private croService: CrosService, private formBuilder: FormBuilder) {

 

    this.email = sessionStorage.getItem('email')

    console.log(this.email);

 

    const currentDate = new Date();

    const year = currentDate.getFullYear();

    const month = currentDate.getMonth() + 1; // Note: Month starts from 0, so add 1 to get the actual month

    const day = currentDate.getDate();

 

    this.date = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

 

 

  };

  protocols: Array<any> = [];

  crosList: Array<any> = [];

  protocolList: Array<any> = [];

  labTestsList: Array<any> = [];

  sites: Array<any> = [];

  uniqueCombinedArray: Array<any> = [];

  files1: any;

  file2: any;

  public base64textString: string = '';

  public bas2: string = '';

  // preprationData = ['Not Verified', 'Verified']

 

  preprationData = [{ name: 'Not Received', value: 'Not Received' },

  { name: 'Received', value: 'Received' },

  ]

 

  kitIdv: any = ''

  /* nmModel Variables */

  selected_protocol_id: any;

  // selected_sponsor_id: any;

  // selected_cro_id: any;

  selected_sites_num: any;

  selected_patients_num: any;

  selected_site_id: any;

  selected_patient_name: any;

  selected_patient_visits: any;

  selected_skit_count: any;

  selected_vkit_count: any;

  selected_vkit_variant: any;

  screening: boolean = true;

  visit: boolean = false;

  sitesForm: any;

  ScreenKitForm: any;

  VisitKitForm: any;

  customerFormGroup: any;

  listItems: string[] = [];

  protoId: any

  protoName: any

  labMatTestsList: Array<any> = [];

  labMatList: any;

  materials: any;

  selectedValuev: any;

  selectedOption: any;

 

  public preparationForm: FormGroup = new FormGroup({

    protocolId: new FormControl("", [Validators.required]),

    protocol_name: new FormControl("", [Validators.required]),

  });

  ngOnInit() {

    this.activatedRoute.params.subscribe((data: any) => {

      this.id = data.id;

      this.getprotocolDetails(this.id)

 

    });

    // this.sponsersData()

    this.croService.getSites().subscribe((sites) => {

 

      this.sponsersData(sites);

 

    });

 

    this.croService.getSiteById(sessionStorage.getItem('siteId')).subscribe((data: any) => {

      console.log(data);

      this.ID = data.site_data_code

      console.log(this.ID);

 

 

    });

 

 

 

    this.protocolService.getPreparation().subscribe((protocols) => {

      console.log(protocols);

 

      this.ProtoData(protocols);

    });

 

 

 

    this.ScreenKitForm = this.formBuilder.group({

 

      screenKitList: this.formBuilder.array([])

    });

 

 

 

  }

 

  getprotocolDetails(id: any) {

    this.scount = ''

    this.protocolService.getProtocolId(id).subscribe((protocols) => {

      this.uuid = id;

      this.protocolService.getPreparationById(id).subscribe((protocolsData) => {

 

        this.skDetails = protocolsData.data.screening_kit_details

        this.vkDetails = protocolsData.data.visit_kit_details

 

        this.displayValues = true;

        this.protocolIdDetails = protocols.protocol

        this.protoName = this.protocolIdDetails.protocol_name

        this.preparationForm.controls['protocol_name'].disable()

        this.preparationForm.controls['protocol_name'].setValue(this.protoName)

        // this.screenDetails = protocols.screening_kit_details[0].lab_test_ids

        // this.sMatDetails = protocols.screening_kit_details[0].meterial_details

        // this.visitDetails = protocols.visit_kit_details[0].lab_test_ids

        // this.vMatDetails = protocols.visit_kit_details[0].meterial_details

        // this.scount = protocols.screening_kit_details[0].screening_kit_count

        // this.vcount = protocols.visit_kit_details[0].visit_kit_count

        if (protocols.visit_kit_details[0].meterial_details.length > 0) {

          this.screeningFullData = protocols.visit_kit_details[0].meterial_details[0]

          this.screenDetails = this.screeningFullData.selectedLabTests

          this.sMatDetails = this.screeningFullData.visits;

          this.vMatDetails = protocols.visit_kit_details[0].meterial_details.slice(1);

          this.screeningVariant = protocols.visit_kit_details[0].meterial_details[0].kit_variant

        } else {

        }

 

        this.vcount = protocols.visit_kit_details[0].visit_kit_count

        // this.scount = protocols.visit_kit_details[0].visit_kit_count

        this.scount = protocols.screening_kit_details[0].screening_kit_count

 

        this.tets = []

 

        this.vMatDetails.forEach((tabs: any) => {

          tabs.visitKitFormGroup = this.formBuilder.group({

 

            visitKitList: this.formBuilder.array([]),

          });

          const visitKitListArray = tabs.visitKitFormGroup.get('visitKitList') as FormArray;

          for (let i = 1; i <= this.vcount; i++) {

            visitKitListArray.push(this.createVisitKitGroup());

            console.log(tabs.visitKitFormGroup[i]);

          }

          tabs.visitsList = visitKitListArray

          for (let i = 0; i < this.vMatDetails.length; i++) {

            const tabs = this.vMatDetails[i];

            tabs.visitKitFormGroup = this.formBuilder.group({

              visitKitList: this.formBuilder.array([]),

            });

            const visitKitListArray = tabs.visitKitFormGroup.get('visitKitList') as FormArray;

 

            for (let j = 0; j < this.vcount; j++) {

              visitKitListArray.push(this.createVisitKitGroup());

              const collectionControl = visitKitListArray.at(j).get('siteStatus');

              if (collectionControl) {

                const vkDetailForRowAndTab = this.vkDetails[i][j];

                collectionControl.patchValue(vkDetailForRowAndTab.siteStatus);

 

              }

              const collectionDateControl = visitKitListArray.at(j).get('recievedDate');

              if (collectionDateControl) {

                const vkDetailForRowAndTab = this.vkDetails[i][j];

                collectionDateControl.patchValue(vkDetailForRowAndTab.recievedDate);

 

              }

              const remarks = visitKitListArray.at(j).get('siteRemarks');

              if (remarks) {

                const vkDetailForRowAndTab = this.vkDetails[i][j];

                remarks.patchValue(vkDetailForRowAndTab.siteRemarks);

 

              }

 

 

              }

 

              tabs.visitsList = visitKitListArray;

              this.tets.push(tabs.selectedLabTests);

            }

 

            this.tets.push(tabs.selectedLabTests)

          });

 

        for (let i = 1; i <= this.scount; i++) {

          this.adjustScreenKitRows(this.scount, this.skDetails);

        }

 

      });

 

    });

 

 

  }

 

 

 

  getformGroup(i: any) {

    return this.vMatDetails.at(i).visitKitFormGroup as FormGroup

  }

  createVisitKitGroup() {

    return this.formBuilder.group({

      siteRemarks: [''],

      recievedDate: [''],

      siteStatus: ['']

    });

 

  }

 

 

 

  adjustScreenKitRows(count: number, skDetails: any) {

    const screenKitList = this.ScreenKitForm.get('screenKitList') as FormArray;

    const currentRowCount = screenKitList.length;

 

    if (count < currentRowCount) {

      // Remove excess rows

      for (let i = currentRowCount - 1; i >= count; i--) {

        screenKitList.removeAt(i);

      }

    } else if (count > currentRowCount) {

      // Add new rows

      for (let i = currentRowCount; i < count; i++) {

        this.onScreenKitAdd(i);

        if (i < skDetails.length) {

 

 

        this.ScreenKitForm.get('screenKitList').controls[i].get('siteStatus').patchValue(this.preprationData[0].value);

 

        if (i < skDetails.length) {

          this.ScreenKitForm.get('screenKitList').controls[i].get('siteStatus').patchValue(skDetails[i].siteStatus);

 

          this.ScreenKitForm.get('screenKitList').controls[i].get('siteRemarks').patchValue(skDetails[i].siteRemarks);

     

          if (skDetails[i].siteStatus === undefined || skDetails[i].siteStatus === null || skDetails[i].siteStatus === '') {

 

            this.ScreenKitForm.get('siteStatus').controls[i].get('siteStatus').patchValue(this.preprationData[0].value);

          }

          else {

            this.ScreenKitForm.get('screenKitList').controls[i].get('siteStatus').patchValue(skDetails[i].siteStatus);

 

          }

          this.ScreenKitForm.get('screenKitList').controls[i].get('recievedDate').patchValue(skDetails[i].recievedDate);

 

        }

 

      }

    }

    }

 

 

  }

 

 

  addScreenKit(record: any) {

    this.ScreenKitForm.get('screenKitList').push(this.addScreenKitData(record));

    console.log(this.ScreenKitForm.controls);

  }

 

 

  onScreenKitAdd(rec: any) {

 

    const control1 = this.ScreenKitForm.get('screenKitList') as FormArray;

    control1.push(this.addScreenKitData(rec));

 

  }

 

  addScreenKitData(record: string) {

    return this.formBuilder.group({

      siteStatus: [''],

      siteRemarks: [''],

      recievedDate: [''],

    });

  }

 

  ProtoData(Protocols: any) {

    Protocols.data.forEach((protocol: any) => {

      this.protocols.push(protocol);

 

    });

  }

  sponsersData(sponsers: any) {

    sponsers.forEach((sponser: any) => {

      this.sponsers.push(sponser);

      this.sponsers.forEach((res: any) => {

        if (sponser.email == this.email) {

          console.log(sponser.email, this.email)

          this.ID = sponser.site_data_code

        }

      });

    });

 

  }

 

  SubmitData() {

    console.log(this.skDetails);

 

    this.vmdetails = []

    for (let i = 0; i < this.vMatDetails.length; i++) {

      this.vmdetails.push(this.vMatDetails[i].visitsList.value)

 

    }

 

 

    for (let i = 0; i < this.vkDetails.length; i++) {

 

 

      this.vkDetails[i].forEach((protocol: any, index: any) => {

        for (let j = 0; j < this.vMatDetails.length; j++) {

   

          protocol.siteStatus = this.vMatDetails[i].visitsList.value[index].siteStatus

          protocol.recievedDate = this.vMatDetails[i].visitsList.value[index].recievedDate

          protocol.siteRemarks = this.vMatDetails[i].visitsList.value[index].siteRemarks

 

        }

 

      })

 

    }

 

    this.skDetails.forEach((protocol: any, index: any) => {

     

      protocol.siteStatus = this.ScreenKitForm.value.screenKitList[index].siteStatus

      protocol.recievedDate = this.ScreenKitForm.value.screenKitList[index].recievedDate

      protocol.siteRemarks = this.ScreenKitForm.value.screenKitList[index].siteRemarks

    })

 

 

 

 

 

 

    const data = {

      "protocol_id": this.uuid,

      "screening_kit_details": this.skDetails,

      "visit_kit_details": this.vkDetails

 

 

    }

 

 

 

    this.protocolService.updatePreparationById(data).subscribe(

      (data: any) => {

        setTimeout(() => {

          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Acknowledgement By Site Updated successfully' });

        }, 1000);

        this.router.navigate(['/home/site/viewCRAAcknowledgement'])

 

 

 

      },

      (err: any) => {

 

        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.errorr.message });

 

      }

    );

  }

 

 

 

 

}

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 