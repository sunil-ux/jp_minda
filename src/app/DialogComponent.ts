import { OnInit, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({ providedIn: 'root' })


export class DialogComponent implements OnInit {
  
  constructor() { }
  
  ngOnInit() {
  } 
  
  confirmation(msg:any){
    return Swal.fire({
    title: 'Are you sure?',
    text: 'Payment is verified '+msg,
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Verify it!',
    cancelButtonText: 'No, Do not Verify it'
    }).then((result) => {
    if (result.value) {
    return true;
    // For more information about handling dismissals please visit
    // https://sweetalert2.github.io/#handling-dismissals
    } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
    'verification Cancelled',
    'Your '+ msg +' Payment is not verified. :)',
    'error'
    )
    return false;
    }
    })
    }


  delete(msg:any){
    return Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this '+msg,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        return true;
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your '+ msg +' is safe &#x263A;',
          'error'
          )
          return false;
          
        }
      })
    }
    
    success(title:any,msg:any){
      Swal.fire(
        title+'!',
        msg+'.',
        'success'
        )
      }
      
      error(msg:any){
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: msg,
          // footer: '<a href>Why do I have this issue?</a>'
        })
      }
      
    }