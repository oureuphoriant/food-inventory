'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FoodItem } from "@/interfaces/data";

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
  // const [foodItems, setFoodItems] = useState(sortFoodItems(initialFoodItems));
  
  const [foodItems, setFoodItems] = useState<Array<FoodItem>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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

  useEffect(() => {
    // Function to fetch data from your API
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setFoodItems(sortFoodItems(initialFoodItems));
      } catch (error) {
        console.error('Failed to fetch: ', error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // The empty array means this effect runs once after the initial render

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className={styles.main}>
      <table  className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th>Item</th>
            <th>Description</th>
            <th>
              <button onClick={() => addItem(sampleNewItem)}>
              <FontAwesomeIcon icon={faPlus} />
               {/* use the + symbol icon */}
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
                <FontAwesomeIcon icon={faTrashAlt} />
                {/* use the trash bin icon */}
                </button>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </main>
  );
}
