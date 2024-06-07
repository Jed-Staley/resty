class Node {
  constructor(value, pointer) {
    this.data = value;
    this.pointer = pointer;
  }
}

export class Stack {
  constructor() {
    this.top = null;
  }

  push(value) {
    this.top = new Node(value, this.top);
  }

  pop() {
    if (this.top === null) {
      return undefined;
    }
    const top = this.top;
    this.top = this.top.pointer;
    return top;
  }

  peek() {
    return (this.top !== null) ? this.top.data : undefined;
  }

  isEmpty() {
    return (this.top === null);
  }
}