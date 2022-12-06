//queue class
class Queue {
    constructor() {
        this.queue = [];
    }
    //add element to queue
    enqueue(element) {
        this.queue.push(element);
    }
    //remove element from queue
    dequeue() {
        if (this.isEmpty()) {
            return "Underflow";
        }
        return this.queue.shift();
    }
    //check if queue is empty
    isEmpty() {
        return this.queue.length == 0;
    }
    //print queue
    printQueue() {
        var str = "";
        for (var i = 0; i < this.queue.length; i++) {
            str += this.queue[i] + " ";
        }
        return str;
    }
}