export default class Dep {
  constructor () {
    this.subs = []
  }

  addSub (sub) {
    this.subs.push(sub)
  }
  // ɾ��һ������
  removeSub (sub) {
    remove(this.subs, sub)
  }
  // ���һ������
  depend () {
    if (window.target) {
      this.addSub(window.target)
    }
  }
  // ֪ͨ������������
  notify () {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

/**
 * Remove an item from an array
 */
export function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}