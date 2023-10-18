// Function to calculate the minimum cost of connecting ropes
function calculateMinCost(input) {
    // Convert the comma-separated string to an array of integers
    const lengths = input.split(',').map(length => parseInt(length.trim(), 10));

    // Ensure there are at least two ropes to connect
    if (lengths.length < 2) {
        return "Please provide at least two rope lengths.";
    }

    // Create a priority queue (min-heap) to efficiently find and merge the smallest ropes
    const minHeap = new MinHeap();
    lengths.forEach(length => minHeap.insert(length));

    let totalCost = 0;

    // Continue merging until there is only one rope left in the heap
    while (minHeap.size() > 1) {
        const rope1 = minHeap.extractMin();
        const rope2 = minHeap.extractMin();

        const currentCost = rope1 + rope2;
        totalCost += currentCost;

        // Insert the merged rope back into the heap
        minHeap.insert(currentCost);
    }

    return totalCost;
}

// MinHeap class for efficient extraction of minimum element
class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    extractMin() {
        if (this.size() === 0) {
            return null;
        }

        const min = this.heap[0];
        const last = this.heap.pop();

        if (this.size() > 0) {
            this.heap[0] = last;
            this.heapifyDown();
        }

        return min;
    }

    size() {
        return this.heap.length;
    }

    heapifyUp() {
        let currentIndex = this.size() - 1;

        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);

            if (this.heap[currentIndex] < this.heap[parentIndex]) {
                [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    heapifyDown() {
        let currentIndex = 0;

        while (true) {
            const leftChildIndex = 2 * currentIndex + 1;
            const rightChildIndex = 2 * currentIndex + 2;
            let smallestChildIndex = currentIndex;

            if (leftChildIndex < this.size() && this.heap[leftChildIndex] < this.heap[smallestChildIndex]) {
                smallestChildIndex = leftChildIndex;
            }

            if (rightChildIndex < this.size() && this.heap[rightChildIndex] < this.heap[smallestChildIndex]) {
                smallestChildIndex = rightChildIndex;
            }

            if (smallestChildIndex !== currentIndex) {
                [this.heap[currentIndex], this.heap[smallestChildIndex]] = [this.heap[smallestChildIndex], this.heap[currentIndex]];
                currentIndex = smallestChildIndex;
            } else {
                break;
            }
        }
    }
}

// Function to handle the form submission
function handleSubmit() {
    // Get the input value
    const inputElement = document.getElementById('ropesInput');
    const inputValue = inputElement.value;

    // Calculate the minimum cost
    const minCost = calculateMinCost(inputValue);

    // Update the result element
    const resultElement = document.getElementById('result');
    resultElement.innerText = `Minimum Cost: ${minCost}`;
}

// Attach the handleSubmit function to the form submission
document.getElementById('ropesForm').addEventListener('submit', function (event) {
    event.preventDefault();
    handleSubmit();
});
