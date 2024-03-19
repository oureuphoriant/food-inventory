'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

interface FoodItem {
  item: string;
  desc: string;
  expDate: Date;
}

// Sample data for illustration
const initialFoodItems: Array<FoodItem> = [
  { item: 'Apple', desc: 'Green Apple', expDate: new Date('2024-03-20') },
  { item: 'Banana', desc: 'Yellow Banana', expDate: new Date('2024-03-18') },
  { item: 'Carrot', desc: 'Fresh Carrot', expDate: new Date('2024-03-22') },
];

const sampleNewItem: FoodItem = {
  item: 'bread', desc: 'Killer Dave\'s', expDate: new Date('2024-03-21')
}

export default function Home() {

  // Using useState for dynamic data
  const [foodItems, setFoodItems] = useState(sortFoodItems(initialFoodItems));

  // Function to delete an item based on index
  function deleteItem(index: number) {
    setFoodItems(currentItems => currentItems.filter((_, i) => i !== index));
  }

  // Function to add an item
  function addItem(newItem: FoodItem) {
    setFoodItems(currentItems => {
      // Create a new array with all current items plus the new item
      const updatedItems = [...currentItems, newItem];
      // Return the sorted array of updated items
      return sortFoodItems(updatedItems);
    });
  }

  function sortFoodItems(foodItems: Array<FoodItem>) {
    // Create a new array from the input and sort it
    return [...foodItems].sort((a, b) => a.expDate.getTime() - b.expDate.getTime());
  }
  

  return (
    <main className={styles.main}>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Description</th>
            <th>
              <button onClick={() => addItem(sampleNewItem)}>
                New
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((foodItem, index) => (
            <tr key={index}>
              <td>{foodItem.item}</td>
              <td>{foodItem.desc}</td>
              <td>
                <button onClick={() => deleteItem(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </main>
  );
}
