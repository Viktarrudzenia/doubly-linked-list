const Node = require("./node");

class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
    this.nodes = [];
    this.length = 0;
  }

  append(data) {
    if (!this._head) {
      let node = new Node(data);
      this.nodes.push(node);
      this._head = node;
      this._tail = node;

      this.length += 1;
    } else {
      let node = new Node(data, this._head);
      this.nodes.push(node);
      this._tail = node;
      this.nodes[this.length - 1].next = node;

      this.length += 1;
    }
    return this;
  }

  head() {
    return this.length === 0 ? null : this._head.data;
  }

  tail() {
    return this.length === 0 ? null : this._tail.data;
  }

  at(index) {
    return this.nodes[index].data;
  }

  insertAt(index, data) {
    if (index === 0) {
      if (this.length === 0) {
        this.append(data);
        return this;
      }
      let node = new Node(data, null, this.nodes[0]);
      this._head = node;
      this.nodes[0].prev = node;
      return this;
    } else {
      let node = new Node(data, this.nodes[index - 1], this.nodes[index]);
      this.nodes[index - 1].next = node;
      this.nodes[index].prev = node;
      this.nodes.splice(index, 0, node);

      this.length += 1;
      return this;
    }
  }

  isEmpty() {
    return this.nodes.length === 0 ? true : false;
  }

  clear() {
    this._head = null;
    this._tail = null;
    this.length = 0;
    this.nodes = [];
    return this;
  }

  deleteAt(index) {
    if (index > 0 && index < this.length + 1) {
      this.nodes[index - 1].next = this.nodes[index + 1];
      this.nodes[index + 1].prev = this.nodes[index - 1];
      this.nodes.splice(index, 1);

      this.length -= 1;
    } else if (index === 0) {
      if (this.length === 1) {
        this.clear();
        return this;
      }
      this.nodes[1].prev = null;
      this.nodes[1] = this.head;
      this.nodes.shift();

      this.length -= 1;
    } else if (index === this.length - 1) {
      if (this.length === 1) {
        this.clear();
        return this;
      }
      this.nodes[this.length - 1].next = null;
      this.nodes[this.length - 1] = this.tail;
      this.nodes.pop();
    } else {
      throw console.log("Error");
    }
    return this;
  }

  reverse() {
    this._head = this.nodes[this.length - 1];
    this._tail = this.nodes[0];
    this.nodes.forEach(value => {
      [value.prev, value.next] = [value.next, value.prev];
    });
    this.nodes.reverse();
    return this;
  }

  indexOf(data) {
    let arrayWithNodeValues = [];
    this.nodes.forEach(value => {
      arrayWithNodeValues.push(value.data);
    });

    return arrayWithNodeValues.indexOf(data);
  }
}
module.exports = LinkedList;
