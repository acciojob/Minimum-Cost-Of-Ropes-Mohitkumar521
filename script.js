function minCost(arr) {
    let heap = new MinHeap(arr);
    let cost = 0;
    while (heap.size() > 1) {
        let rope1 = heap.extractMin();
        let rope2 = heap.extractMin();
        let newRope = rope1 + rope2;
        cost += newRope;
        heap.insert(newRope);
    }
    return cost;
}

class MinHeap {
    constructor(arr) {
        this.heap = arr;
        this.buildHeap();
    }

    size() {
        return this.heap.length;
    }

    buildHeap() {
        for (let i = Math.floor(this.size() / 2); i >= 0; i--) {
            this.siftDown(i);
        }
    }

    siftDown(i) {
        let leftChildIdx = i * 2 + 1;
        while (leftChildIdx < this.size()) {
            let rightChildIdx = i * 2 + 2 < this.size() ? i * 2 + 2 : -1;
            let idxToSwap;
            if (rightChildIdx !== -1 && this.heap[rightChildIdx] < this.heap[leftChildIdx]) {
                idxToSwap = rightChildIdx;
            } else {
                idxToSwap = leftChildIdx;
            }
            if (this.heap[idxToSwap] < this.heap[i]) {
                this.swap(i, idxToSwap);
                i = idxToSwap;
                leftChildIdx = i * 2 + 1;
            } else {
                return;
            }
        }
    }

    siftUp(i) {
        let parentIdx = Math.floor((i - 1) / 2);
        while (i > 0 && this.heap[i] < this.heap[parentIdx]) {
            this.swap(i, parentIdx);
            i = parentIdx;
            parentIdx = Math.floor((i - 1) / 2);
        }
    }

    peek() {
        return this.heap[0];
    }

    insert(value) {
        this.heap.push(value);
        this.siftUp(this.size() - 1);
    }

    extractMin() {
        this.swap(0, this.size() - 1);
        let minVal = this.heap.pop();
        this.siftDown(0);
        return minVal;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}
