class ListNode<T> {
    data: T;
    next: ListNode<T> | null = null;
    prev: ListNode<T> | null = null;
  
    constructor(data: T) {
      this.data = data;
    }
  }
  
  class DoublyLinkedList<T> {
    private head: ListNode<T> | null = null;
    private tail: ListNode<T> | null = null;
    private size: number = 0;
  
    isEmpty(): boolean {
      return this.size === 0;
    }
  
    getSize(): number {
      return this.size;
    }
  
    clear(): void {
      this.head = this.tail = null;
      this.size = 0;
    }
  
    insertAtBeginning(data: T): void {
      const newNode = new ListNode(data);
      if (this.isEmpty()) {
        this.head = this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head!.prev = newNode;
        this.head = newNode;
      }
      this.size++;
    }
  
    insertAtEnd(data: T): void {
      const newNode = new ListNode(data);
      if (this.isEmpty()) {
        this.head = this.tail = newNode;
      } else {
        newNode.prev = this.tail;
        this.tail!.next = newNode;
        this.tail = newNode;
      }
      this.size++;
    }
  
    insertAtPosition(data: T, position: number): void {
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
  
      let current = this.head!;
      for (let i = 0; i < position - 1; i++) {
        current = current.next!;
      }
  
      const newNode = new ListNode(data);
      newNode.next = current.next;
      newNode.prev = current;
      current.next!.prev = newNode;
      current.next = newNode;
      this.size++;
    }
  
    removeAtBeginning(): T | null {
      if (this.isEmpty()) return null;
      const removed = this.head!;
      if (this.head === this.tail) {
        this.head = this.tail = null;
      } else {
        this.head = this.head!.next!; // <- garantimos que não é null
        this.head!.prev = null;
      }
      this.size--;
      removed.next = removed.prev = null;
      return removed.data;
    }
  
    removeAtEnd(): T | null {
      if (this.isEmpty()) return null;
      const removed = this.tail!;
      if (this.head === this.tail) {
        this.head = this.tail = null;
      } else {
        this.tail = this.tail!.prev!; // <- garantimos que não é null
        this.tail!.next = null;
      }
      this.size--;
      removed.next = removed.prev = null;
      return removed.data;
    }
  
    removeAtPosition(position: number): T | null {
      if (position < 0 || position >= this.size) {
        throw new RangeError("Posição inválida");
      }
      if (position === 0) return this.removeAtBeginning();
      if (position === this.size - 1) return this.removeAtEnd();
  
      let current = this.head!;
      for (let i = 0; i < position; i++) current = current.next!;
  
      current.prev!.next = current.next;
      current.next!.prev = current.prev;
      this.size--;
      const data = current.data;
      current.next = current.prev = null;
      return data;
    }
  
    toArray(): T[] {
      const arr: T[] = [];
      let cur = this.head;
      while (cur) {
        arr.push(cur.data);
        cur = cur.next;
      }
      return arr;
    }
  
    toArrayReverse(): T[] {
      const arr: T[] = [];
      let cur = this.tail;
      while (cur) {
        arr.push(cur.data);
        cur = cur.prev;
      }
      return arr;
    }
  
    printForward(): void {
      console.log(this.toArray().join(" <-> "));
    }
  
    printBackward(): void {
      console.log(this.toArrayReverse().join(" <-> "));
    }
  }
  
  // ===== TESTE =====
  const lista = new DoublyLinkedList<number>();
  lista.insertAtBeginning(10);
  lista.insertAtEnd(20);
  lista.insertAtPosition(15, 1);
  lista.printForward();    // 10 <-> 15 <-> 20
  lista.printBackward();   // 20 <-> 15 <-> 10
  
  lista.removeAtBeginning();
  lista.printForward();    // 15 <-> 20
  
  lista.removeAtEnd();
  lista.printForward();    // 15
  
  lista.insertAtEnd(25);
  lista.insertAtEnd(30);
  lista.removeAtPosition(1);
  lista.printForward();    // 15 <-> 30
  
  console.log("Tamanho:", lista.getSize()); // 2
  lista.clear();
  console.log("Está vazia?", lista.isEmpty()); // true
  