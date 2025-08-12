"use strict";
class ListNode {
    constructor(data) {
        this.next = null;
        this.prev = null;
        this.data = data;
    }
}
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    isEmpty() {
        return this.size === 0;
    }
    getSize() {
        return this.size;
    }
    clear() {
        this.head = this.tail = null;
        this.size = 0;
    }
    insertAtBeginning(data) {
        const newNode = new ListNode(data);
        if (this.isEmpty()) {
            this.head = this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
    }
    insertAtEnd(data) {
        const newNode = new ListNode(data);
        if (this.isEmpty()) {
            this.head = this.tail = newNode;
        }
        else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }
    insertAtPosition(data, position) {
        if (position < 0 || position > this.size) {
            throw new RangeError("Posição inválida");
        }
        if (position === 0) {
            this.insertAtBeginning(data);
            return;
        }
        if (position === this.size) {
            this.insertAtEnd(data);
            return;
        }
        let current = this.head;
        for (let i = 0; i < position - 1; i++) {
            current = current.next;
        }
        const newNode = new ListNode(data);
        newNode.next = current.next;
        newNode.prev = current;
        current.next.prev = newNode;
        current.next = newNode;
        this.size++;
    }
    removeAtBeginning() {
        if (this.isEmpty())
            return null;
        const removed = this.head;
        if (this.head === this.tail) {
            this.head = this.tail = null;
        }
        else {
            this.head = this.head.next; // <- garantimos que não é null
            this.head.prev = null;
        }
        this.size--;
        removed.next = removed.prev = null;
        return removed.data;
    }
    removeAtEnd() {
        if (this.isEmpty())
            return null;
        const removed = this.tail;
        if (this.head === this.tail) {
            this.head = this.tail = null;
        }
        else {
            this.tail = this.tail.prev; // <- garantimos que não é null
            this.tail.next = null;
        }
        this.size--;
        removed.next = removed.prev = null;
        return removed.data;
    }
    removeAtPosition(position) {
        if (position < 0 || position >= this.size) {
            throw new RangeError("Posição inválida");
        }
        if (position === 0)
            return this.removeAtBeginning();
        if (position === this.size - 1)
            return this.removeAtEnd();
        let current = this.head;
        for (let i = 0; i < position; i++)
            current = current.next;
        current.prev.next = current.next;
        current.next.prev = current.prev;
        this.size--;
        const data = current.data;
        current.next = current.prev = null;
        return data;
    }
    toArray() {
        const arr = [];
        let cur = this.head;
        while (cur) {
            arr.push(cur.data);
            cur = cur.next;
        }
        return arr;
    }
    toArrayReverse() {
        const arr = [];
        let cur = this.tail;
        while (cur) {
            arr.push(cur.data);
            cur = cur.prev;
        }
        return arr;
    }
    printForward() {
        console.log(this.toArray().join(" <-> "));
    }
    printBackward() {
        console.log(this.toArrayReverse().join(" <-> "));
    }
}
// ===== TESTE =====
const lista = new DoublyLinkedList();
lista.insertAtBeginning(10);
lista.insertAtEnd(20);
lista.insertAtPosition(15, 1);
lista.printForward(); // 10 <-> 15 <-> 20
lista.printBackward(); // 20 <-> 15 <-> 10
lista.removeAtBeginning();
lista.printForward(); // 15 <-> 20
lista.removeAtEnd();
lista.printForward(); // 15
lista.insertAtEnd(25);
lista.insertAtEnd(30);
lista.removeAtPosition(1);
lista.printForward(); // 15 <-> 30
console.log("Tamanho:", lista.getSize()); // 2
lista.clear();
console.log("Está vazia?", lista.isEmpty()); // true
