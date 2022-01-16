    // Դ��λ�ã�src/core/observer/index.js

    /**
     * Observer���ͨ���ݹ�ķ�ʽ��һ��������������Զ�ת���ɿɹ۲����
     */
 class Observer {
  constructor (value) {
    this.value = value
    // ��value����һ��__ob__���ԣ�ֵΪ��value��Observerʵ��
    // �൱��Ϊvalue���ϱ�ǣ���ʾ���Ѿ���ת������Ӧʽ�ˣ������ظ�����
//    def(value,'__ob__',this)
    Object.defineProperty(value, '__ob__', {
        value: this,
        writable: true,
        configurable: true
      })
//    value.observer = this;
    if (Array.isArray(value)) {
      // ��valueΪ����ʱ���߼�
      // ...
    } else {
      this.walk(value)
    }
  }

  walk (obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
}
/**
 * ʹһ������ת���ɿɹ۲����
 * @param { Object } obj ����
 * @param { String } key �����key
 * @param { Any } val �����ĳ��key��ֵ
 */
function defineReactive (obj,key,val) {
  // ���ֻ����obj��key����ôval = obj[key]
  if (arguments.length === 2) {
    val = obj[key]
  }
  if(typeof val === 'object'){
      new Observer(val)
  }
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get(){
      console.log(`${key} read0`);
      return val;
    },
    set(newVal){
      if(val === newVal){
          return
      }
      console.log(`${key} write0`);
      val = newVal;
    }
  })
}

let car0 = new Observer({
  'brand':'BMW',
  'price':3000
})