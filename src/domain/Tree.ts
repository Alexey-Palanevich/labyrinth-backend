type MyNode = {
  value: number;
  left?: MyNode;
  right?: MyNode;
};

export class Tree {
  private root: MyNode | undefined;

  get nodes() {
    return this.root;
  }

  public push(num: number) {
    if (!this.root) {
      this.root = Tree.createNode(num);
      return;
    }
    if (this.root.value === num) {
      return;
    }

    const parentNode = this.findParent(this.root, num);

    parentNode[parentNode.value > num ? 'left' : 'right'] =
      Tree.createNode(num);
  }

  public includes(num: number) {
    if (!this.root) {
      return false;
    }
    if (this.root.value === num) {
      return true;
    }

    const parentNode = this.findParent(this.root, num);

    return parentNode.left?.value === num || parentNode.right?.value === num;
  }

  private findParent(node: MyNode, num: number): MyNode {
    if (node.value === num) {
      throw new Error('You are inside current node');
    }

    if (node.value > num && node.left) {
      return this.findParent(node.left, num);
    }

    if (node.value < num && node.right) {
      return this.findParent(node.right, num);
    }

    return node;
  }

  static createNode(num: number) {
    return { value: num };
  }
}
