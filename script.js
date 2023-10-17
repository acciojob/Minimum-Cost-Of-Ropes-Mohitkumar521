// Function to calculate the minimum cost of connecting ropes
function minCostOfRopes(ropes) {
  // Convert the input string to an array of integers
  const arr = ropes.split(',').map(Number);

  // Create a priority queue (min heap)
  const priorityQueue = new MinHeap();

  // Insert each rope into the priority queue
  arr.forEach((rope) => {
    priorityQueue.insert(rope);
  });

  // Initialize the total cost
  let totalCost = 0;

  // Connect ropes until there is only one rope left in the priority queue
  while (priorityQueue.size() > 1) {
    // Extract the two smallest ropes
    const rope1 = priorityQueue.extractMin();
    const rope2 = priorityQueue.extractMin();

    // Calculate the cost of connecting the ropes and add it to the total cost
    const cost = rope1 + rope2;
    totalCost += cost;

    // Insert the connected rope back into the priority queue
    priorityQueue.insert(cost);
  }

  // Return the minimum cost
  return totalCost;
}

// MinHeap class for implementing a priority queue
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  extractMin() {
    if (this.size() === 0) {
      return null;
    }

    const minValue = this.heap[0];
    const lastValue = this.heap.pop();

    if (this.size() > 0) {
      this.heap[0] = lastValue;
      this.heapifyDown();
    }

    return minValue;
  }

  heapifyUp() {
    let index = this.size() - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.heap[index] < this.heap[parentIndex]) {
        // Swap the values if the child is smaller than the parent
        [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown() {
    let index = 0;

    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallestChildIndex = index;

      if (leftChildIndex < this.size() && this.heap[leftChildIndex] < this.heap[smallestChildIndex]) {
        smallestChildIndex = leftChildIndex;
      }

      if (rightChildIndex < this.size() && this.heap[rightChildIndex] < this.heap[smallestChildIndex]) {
        smallestChildIndex = rightChildIndex;
      }

      if (smallestChildIndex !== index) {
        // Swap the values if the child is smaller than the parent
        [this.heap[index], this.heap[smallestChildIndex]] = [this.heap[smallestChildIndex], this.heap[index]];
        index = smallestChildIndex;
      } else {
        break;
      }
    }
  }
}

// Get the input element value
const inputElement = document.getElementById('ropesInput');
const ropesInput = inputElement.value;

// Calculate the minimum cost
const result = minCostOfRopes(ropesInput);

// Display the result in the result div
const resultElement = document.getElementById('result');
resultElement.textContent = result;

  
  
  
}  
