import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlexModalService } from '../shared-components/flex-modal/flex-modal.service';
import { Http } from '@angular/http';

interface IOrder {
  pid: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
}
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  orders: Array<IOrder> = [];
  nameInput = '';
  constructor(
    private router: Router,
    private flexModal: FlexModalService,
    private http: Http
  ) {

  }

  async ngOnInit() {

  }

  // prepare result, splice last name, first name

  // Calculate total and perform input validation
  calculate() {
    console.log('nameInput', this.nameInput);
    if (this.nameInput === '') {
      alert('Name must not be empty!');
    } else if (this.nameInput.indexOf(',') === -1) {
      alert('Must have a comma!');
    }
    {
    } else {
      //do calculation
      let subTotal, total, taxAmt;
      total = this.orders.reduce((acc, it, i, arr) => {
        acc += it.price * it.quantity;
        return acc;

      }, 0);

      console.log('total--->', total);
    }
  }
  // display the order form with orders from orders.json

  // Clear the orders form
  clear() {
    this.orders = [];
  }
  // Add items 'Hot Dog', 'Hamberger' and 'Pizza' to list when corresponding button is clicked

  addItem(item: string) {
    switch (item) {
      case 'Hot Dog':
        this.orders.unshift({
          'pid': '1',
          'image': 'assets/sm_hotdog.jpeg',
          'description': 'Hot Dog',
          'price': 5.00,
          'quantity': null
        });
        break;

      case 'Hamberger':
        this.orders.unshift({
          'pid': '2',
          'image': 'assets/sm_hamberger.jpeg',
          'description': 'Hamberger',
          'price': 6.00,
          'quantity': null
        });

        break;

      case 'Pizza':
        this.orders.unshift({
          'pid': '3',
          'image': 'assets/sm_pizza.jpeg',
          'description': 'Pizza',
          'price': 12.00,
          'quantity': null
        });

        break;

    }

  }
  // delete line item (order) when delete button is click
  delete(index: number) {
    console.log('index', index);
    this.orders.splice(index, 1);
  }
  // read in the orders.json file and populate the list table with the initial orders (3)
  async readFile() {
    const rows = await this.http.get('assets/orders.json').toPromise();
    console.log('rows', rows.json());
    this.orders = rows.json();
    return rows.json();
  }
}
