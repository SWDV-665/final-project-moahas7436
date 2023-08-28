import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MealService } from '../services/meal-service'; 

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage {
  public mealId!: string;
  public mealData!: string;
  public photo: any;
  public mealDescription!: string;
  public day: string;

  constructor(
    private mealService: MealService,
    private camera: Camera,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    this.day = this.activatedRoute.snapshot.paramMap.get('day')!;
    this.loadMeal();
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  async loadMeal() {
    try {
      const meal: any = await this.http.get(`http://localhost:3000/meals/${this.day}`).toPromise();
      if (meal) {
        this.mealDescription = meal.mealDescription;
        this.photo = meal.photo;
      }
    } catch (error) {
      console.log('Error loading meal:', error);
    }
  }
  updateMeal() {
    this.mealService.updateMeal(this.mealId, this.mealData).subscribe((updatedMeal: any) => {
      this.mealData = updatedMeal;
      // Maybe display a toast or alert to confirm the update
    }, (error: any) => {
      console.error('Error updating meal:', error);
    });
  }
  async saveMeal() {
    const mealData = {
      day: this.day,
      mealDescription: this.mealDescription,
      photo: this.photo
    };
    try {
      await this.http.post('http://localhost:3000/meals', mealData).toPromise();
      alert('Meal plan saved!');
    } catch (error) {
      console.log('Error saving meal:', error);
    }
  }
}
