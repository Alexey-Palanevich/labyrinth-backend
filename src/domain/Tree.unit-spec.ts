import { Tree } from 'domain/Tree';
import assert from 'node:assert';
import { describe, test } from 'node:test';

describe('Tree', () => {
  test('Includes nodes', () => {
    const tree = new Tree();
    tree.push(1);

    assert(tree.nodes);
  });

  test('Save root node', () => {
    const tree = new Tree();

    tree.push(1);

    assert.deepStrictEqual(tree.nodes, { value: 1 });
  });

  test('Save less value on the left', () => {
    const tree = new Tree();

    tree.push(1);
    tree.push(0);

    assert.deepStrictEqual(tree.nodes, { value: 1, left: { value: 0 } });
  });

  test('Save bigger value on the right', () => {
    const tree = new Tree();

    tree.push(1);
    tree.push(2);

    assert.deepStrictEqual(tree.nodes, { value: 1, right: { value: 2 } });
  });

  test('Save 3rd less value in the left node', () => {
    const tree = new Tree();

    tree.push(1);
    tree.push(0);
    tree.push(-1);

    assert.deepStrictEqual(tree.nodes, {
      value: 1,
      left: { value: 0, left: { value: -1 } },
    });
  });

  test('Save 3rd bigger value in the right node', () => {
    const tree = new Tree();

    tree.push(1);
    tree.push(0);
    tree.push(2);

    assert.deepStrictEqual(tree.nodes, {
      value: 1,
      left: { value: 0 },
      right: { value: 2 },
    });
  });

  test('real one', () => {
    const arr = [1, 3, 6, 4, 1, 2];

    const tree = new Tree();

    arr.forEach((el) => tree.push(el));

    assert.deepStrictEqual(tree.nodes, {
      value: 1,
      right: {
        value: 3,
        left: { value: 2 },
        right: { value: 6, left: { value: 4 } },
      },
    });
  });

  test('real two', () => {
    const tree = new Tree();

    [1, 3, 6, 4, 1, 2].forEach((el) => tree.push(el));

    console.log(JSON.stringify(tree.nodes, null, 2));
  });
});
