import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DialogBoxService {
  
  constructor() { }
  
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
          'Your '+ msg +' data is safe :)',
          'error'
          )
          return false;
          
        }
      })
    }
    
    confirmation(msg:any)
    {
      return Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to '+msg,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          return true;
          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your Request to '+' ' + msg +' ' +' is cancelled',
            'error'
            )
            return false;
          }
        })
      }
      
      success(title:any,msg:any){
        Swal.fire({
          position: 'top-right',
          type: 'success',
          title: title+ "  "+msg,
          showConfirmButton: false,
          timer: 2000
        })
      }
      
      error(msg:any){
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: msg,
          // footer: '<a href>Why do I have this issue?</a>'
        })
      }
      confirmationimage(msg:any)
      {
        return Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to '+msg,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Delete!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {
            return true;
            // For more information about handling dismissals please visit
            // https://sweetalert2.github.io/#handling-dismissals
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Your data is Safe.',
              'error'
              )
              return false;
            }
          })
        }
        
        
        // error(msg:any)
        // {
        //   Swal({
        //     type: 'error',
        //     title: 'Oops...',
        //     text: msg,
        //     // footer: '<a href>Why do I have this issue?</a>'
        //   })
        // }
      }
      