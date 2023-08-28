import { Component } from '@angular/core';
import { ShoppingService } from '../services/shopping-service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage {

  public ingredients: any[] = [];
  public newIngredient: string = '';

  constructor(private shoppingService: ShoppingService) {
    this.fetchIngredients();
  }

  fetchIngredients() {
    this.shoppingService.getShoppingItems().subscribe(items => {
      this.ingredients = items;
    }, (error: any) => {
      console.error('Error fetching ingredients:', error);
    });
  }

  addIngredient() {
    if (this.newIngredient.trim() !== '') {
      const ingredientData = { name: this.newIngredient, quantity: 1 }; // Assuming a quantity of 1 for simplicity
      this.shoppingService.addShoppingItem(ingredientData).subscribe(response => {
        this.fetchIngredients(); // Refresh the list from the backend after adding
        this.newIngredient = ''; // Clear the input field
      }, (error: any) => {
        console.error('Error adding ingredient:', error);
      });
    }
  }

  // You'll also need a removeIngredient function that communicates with the backend to delete the ingredient.
  // The current method just modifies the local array and doesn't persist the deletion.
  removeIngredient(ingredient: { name: string }) {
    // TODO: Call the backend API to remove the ingredient. After success, refresh the list.
    const index = this.ingredients.indexOf(ingredient);
    if (index > -1) {
      this.ingredients.splice(index, 1);
    }
  }
}
