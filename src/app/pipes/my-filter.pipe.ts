import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter',
    pure: false
})

export class MyFilterPipe implements PipeTransform {
    transform(items: any[], filter: any): any {
        
        if (!items || !filter.search) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out

     
        if(filter.src === 'territoryState') {
            return items.filter(item => item.state_name.indexOf(filter.search.toUpperCase()) !== -1);
        }

        if (filter.src === 'territoryPincode') {

            return items.filter(item => ((item.pincode).toString()).toUpperCase().indexOf(filter.search.toUpperCase()) !== -1);
        }

        if (filter.src === 'territoryDistrict') {

            return items.filter(item => (item.district_name).toUpperCase().indexOf(filter.search.toUpperCase()) !== -1);
        }

        if(filter.src == 'selectedPincodes') {

            return items.filter(item => (item.state_name).toUpperCase().indexOf(filter.search.toUpperCase()) !== -1 || (item.district_name).toUpperCase().indexOf(filter.search.toUpperCase()) !== -1 || ((item.pincode).toString()).toUpperCase().indexOf(filter.search.toUpperCase()) !== -1);

        }
    }
}