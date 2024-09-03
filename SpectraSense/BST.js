// AlphaTech - Binary Search Tree (BST) Module
// This module implements a binary search tree to manage feature contributions in predictive analysis.
// Developed by AlphaTech

class TreeNode {
    /**
     * Constructor to initialize a tree node with a feature name, contribution, and optional left and right children.
     * @param {string} featureName - The name of the feature.
     * @param {number} contribution - The contribution value of the feature.
     * @param {TreeNode} [left=null] - The left child node (optional).
     * @param {TreeNode} [right=null] - The right child node (optional).
     */
    constructor(featureName, contribution, left = null, right = null) {
        this.featureName = featureName;
        this.contribution = contribution;
        this.left = left;
        this.right = right;
    }
}

class BST {
    /**
     * Constructor to initialize an empty binary search tree.
     */
    constructor() {
        this.root = null; // The root node of the BST
    }

    /**
     * Inserts a new feature into the BST based on its contribution.
     * @param {string} featureName - The name of the feature to insert.
     * @param {number} contribution - The contribution value of the feature.
     */
    insert(featureName, contribution) {
        const newNode = new TreeNode(featureName, contribution); // Create a new tree node
        if (!this.root) {
            this.root = newNode; // If the tree is empty, set the new node as the root
        } else {
            this.insertNode(this.root, newNode); // Otherwise, insert the node in the correct position
        }
    }

    /**
     * Helper method to recursively insert a new node in the BST.
     * @param {TreeNode} node - The current node in the BST.
     * @param {TreeNode} newNode - The new node to be inserted.
     */
    insertNode(node, newNode) {
        if (newNode.contribution < node.contribution) {
            if (!node.left) {
                node.left = newNode; // Insert to the left if the new node's contribution is smaller
            } else {
                this.insertNode(node.left, newNode); // Recurse to the left child node
            }
        } else {
            if (!node.right) {
                node.right = newNode; // Insert to the right if the new node's contribution is greater or equal
            } else {
                this.insertNode(node.right, newNode); // Recurse to the right child node
            }
        }
    }

    /**
     * Finds the node with the maximum contribution in the BST.
     * @param {TreeNode} [node=this.root] - The current node to start the search from (defaults to root).
     * @returns {TreeNode} - The node with the maximum contribution.
     */
    findMaxContribution(node = this.root) {
        if (node.right) {
            return this.findMaxContribution(node.right); // Recursively find the rightmost node
        }
        return node; // Return the rightmost node, which has the maximum contribution
    }
}

module.exports = BST; // Export the BST class for external use
