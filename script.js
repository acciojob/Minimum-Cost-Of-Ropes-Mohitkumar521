// Get the input element
const inputElement = document.querySelector('input[type="text"]');

// Get the result div
const resultDiv = document.getElementById('result');

// Add a listener for the form submission
inputElement.addEventListener('change', calculateMinCost);

function calculateMinCost() {
    // Get the input values and convert them to an array of integers
    const inputValues = inputElement.value.split(',').map(value => parseInt(value.trim(), 10));

    // Call the function to calculate the minimum cost
    const minCost = connectRopes(inputValues);

    // Display the result in the result div
    resultDiv.textContent = `Minimum Cost: ${minCost}`;
}

// Function to calculate the minimum cost of connecting ropes
function connectRopes(ropes) {
    // Ensure there are at least two ropes
    if (ropes.length < 2) {
        return 0;
    }

    // Create a min heap to efficiently find and merge the smallest ropes
    const minHeap = new MinHeap(ropes);

    let totalCost = 0;

    // Continue until there is only one rope left in the heap
    while (minHeap.size() > 1) {
        // Extract the two smallest ropes from the heap
        const rope1 = minHeap.extractMin();
        const rope2 = minHeap.extractMin();

        // Calculate the cost of connecting the two ropes
        const cost = rope1 + rope2;

        // Add the cost to the total cost
        totalCost += cost;

        // Insert the newly created rope back into the heap
        minHeap.insert(cost);
    }

    return totalCost;
}

// Min Heap implementation for efficient rope merging
class MinHeap {
    constructor(array = []) {
        this.heap = [];
        if (array.length > 0) {
            array.forEach(item => this.insert(item));
        }
    }

    size() {
        return this.heap.length;
    }

    // Insert a new element into the heap
    insert(value) {
        this.heap.push(value);
        this.bubbleUp();
    }

    // Extract the minimum element from the heap
    extractMin() {
        if (this.size() === 0) {
            return null;
        }

        const min = this.heap[0];
        const last = this.heap.pop();

        if (this.size() > 0) {
            this.heap[0] = last;
            this.heapify();
        }

        return min;
    }

    // Move the last element up to its correct position
    bubbleUp() {
        let currentIdx = this.size() - 1;

        while (currentIdx > 0) {
            const parentIdx = Math.floor((currentIdx - 1) / 2);
            if (this.heap[currentIdx] < this.heap[parentIdx]) {
                this.swap(currentIdx, parentIdx);
                currentIdx = parentIdx;
            } else {
                break;
            }
        }
    }

    // Move the first element down to its correct position
    heapify() {
        let currentIdx = 0;

        while (true) {
            const leftChildIdx = 2 * currentIdx + 1;
            const rightChildIdx = 2 * currentIdx + 2;

            let smallestIdx = currentIdx;

            if (leftChildIdx < this.size() && this.heap[leftChildIdx] < this.heap[smallestIdx]) {
                smallestIdx = leftChildIdx;
            }

            if (rightChildIdx < this.size() && this.heap[rightChildIdx] < this.heap[smallestIdx]) {
                smallestIdx = rightChildIdx;
            }

            if (smallestIdx !== currentIdx) {
                this.swap(currentIdx, smallestIdx);
                currentIdx = smallestIdx;
            } else {
                break;
            }
        }
    }

    // Swap two elements in the heap
    swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
}
 
