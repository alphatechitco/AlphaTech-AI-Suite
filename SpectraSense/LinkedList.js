// AlphaTech - LinkedList Module
// This module implements a linked list to manage features and their coefficients for predictive analysis.
// Developed by AlphaTech Solutions

class ListNode {
    /**
     * Constructor to initialize a node in the linked list.
     * @param {string} featureName - The name of the feature.
     * @param {number} coefficient - The coefficient of the feature.
     * @param {number} feature - The value of the feature.
     * @param {ListNode} [next=null] - The next node in the list (optional).
     */
    constructor(featureName, coefficient, feature, next = null) {
        this.featureName = featureName; // The name of the feature
        this.coefficient = coefficient; // The coefficient associated with the feature
        this.feature = feature; // The value of the feature
        this.next = next; // Pointer to the next node in the list
    }
}

class LinkedList {
    /**
     * Constructor to initialize an empty linked list.
     */
    constructor() {
        this.head = null; // The head (first node) of the linked list
    }

    /**
     * Inserts a new node at the beginning of the linked list.
     * @param {string} featureName - The name of the feature to insert.
     * @param {number} coefficient - The coefficient of the feature to insert.
     * @param {number} feature - The value of the feature to insert.
     */
    insert(featureName, coefficient, feature) {
        const newNode = new ListNode(featureName, coefficient, feature); // Create a new list node
        newNode.next = this.head; // Set the new node's next pointer to the current head
        this.head = newNode; // Update the head to point to the new node
    }

    /**
     * Traverses the linked list and logs each node's data.
     */
    traverse() {
        let current = this.head; // Start at the head of the linked list
        while (current) {
            // Log the details of the current node
            console.log(`Feature: ${current.featureName}, Coefficient: ${current.coefficient}, Feature Value: ${current.feature}`);
            current = current.next; // Move to the next node
        }
    }
}

module.exports = LinkedList; // Export the LinkedList class for external use
