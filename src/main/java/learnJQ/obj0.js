  //源码5597行-5586行
  //、
  //例:$('.inner').append('<tr><td>Test</td></tr>')
  //nodelist即$('.inner')
  //args即<tr><td>Test</td></tr>
  function domManip( nodelist, args, callback ) {
    console.log(nodelist,args,'ignored5798')
    //数组深复制成新的数组副本
    //源码是:args = concat.apply( [], args )，这里没有用arguments，而是传参就改了
    let argsArr = []
    argsArr.push(args)
    console.log(argsArr,'args31')
    //l 长度，比如类名为.inner的li有两组,2
    let fragment,
      first,
      node,
      i = 0,
      //l 长度，比如类名为.inner的li有两组,2
      l = nodelist.length,
      iNoClone = l - 1
    //l=2
    console.log(l,'lll45')
    if ( l ) {
      console.log(argsArr,nodelist[0].ownerDocument,nodelist,'firstChild40')
      //argsArr:<tr><td>test1</td></tr>
      //nodelist[0].ownerDocument:目标节点所属的文档
      fragment = buildFragment(argsArr,nodelist[0].ownerDocument,false,nodelist );
      first=fragment.firstChild
      console.log(fragment.childNodes,'firstChild42')
      //即<tr><td>test1</td></tr>
      if (first) {
        //=====根据nodelist的长度循环操作========
        for ( ; i < l; i++ ) {
          console.log(node,fragment.childNodes,'childNodes49')
          node = fragment;
          if ( i !== iNoClone ) {
            /*createDocumentFragment创建的元素是一次性的，添加之后就不能再操作了，
            所以需要克隆iNoClone的多个节点*/
            node = jQuery.clone( node, true, true );
          }
          console.log(nodelist[i], node.childNodes,'node50')
          //call(this,param)
          callback.call( nodelist[i], node);
        }
        //====================
      }
    }
    console.log(nodelist,'nodelist58')
    return nodelist
  }

   //源码2843行-2847行
    //判断两个参数的nodename是否相等
    function nodeName( selector, name ) {
      return selector.nodeName && selector.nodeName.toLowerCase() === name.toLowerCase();
    }
  //源码5724行-5733行
  //额外判断，当选择器是table，并且插入的元素是tr时，会查找到table下的tbody，并返回tbody
  //this, node
  function manipulationTarget( selector, node ) {
    console.log(node.childNodes,node.firstChild,'node73')
    // 如果是table里面插入行tr
    if ( nodeName( selector, "table" ) &&
      nodeName( node.nodeType !== 11 ? node : node.firstChild, "tr" ) ) {
      return jQuery( selector ).children( "tbody" )[ 0 ] || selector
    }
    return selector
  }

    let ajQuery={}
    jQuery.each({
        //例:'<p>Test</p>'
        //源码6011行-6019行
        // 在被选元素的结尾插入指定内容
        /*append的内部的原理，就是通过创建一个文档碎片，把新增的节点放到文档碎片中，通过文档碎片克隆到到页面上去，目的是效率更高*/
        append: function(nodelist, arguments) {
          //node是由domManip处理得到的文档碎片documentFragment，里面包含要插入的DOM节点
          let callbackOne=function( node ) {
            console.log(node,'node149')
            //this指的就是$("xxx")
            //1:元素节点,11:DocumentFragment,9:document
            if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
              //table插入tr的额外判断
              //target默认情况是selector，即document.querySelectorAll(".inner")
              let target = manipulationTarget( this, node )
              console.log(target,node.childNodes,'node147')
              //append的本质即使用原生appendChild方法在被选元素内部的结尾插入指定内容
              target.appendChild( node );
            }
          }

          console.log(nodelist,arguments,'this120')
          return domManip( nodelist, arguments, callbackOne );
        },

      },

      function(key, value) {
        ajQuery[key] = function(nodelist, arguments) {
          console.log(nodelist,'nodelist128')
            return  value(nodelist, arguments);
          }
        }
      )
        //源码4857行-4945行
        /*创建文档碎片，原因是一般情况下，我们向DOM中添加新的元素或者节点，DOM会立刻更新。
        如果向DOM添加100个节点，那么就得更新100次，非常浪费浏览器资源。
        解决办法就是：我们可以创建一个文档碎片（documentFragment），
        documentFragment类似于一个小的DOM，在它上面使用innerHTML并在innerHTML上插入多个节点，速度要快于DOM（2-10倍），
        比如：先将新添加的100个节点添加到文档碎片的innerHTML上，再将文档碎片添加到DOM上。*/
        //args, collection[ 0 ].ownerDocument, false, collection
        function buildFragment( arr, context, truefalse, selection ) {
          let elem,tmp, nodes = [], i = 0, l = arr.length,wrap,tag,j
          // createdocumentfragment()方法创建了一虚拟的节点对象，节点对象包含所有属性和方法。
          //相当于document.createDocumentFragment()
          let fragment = context.createDocumentFragment()
          //l=1
          console.log(l,'l87')
          //==============
          for ( ; i < l; i++ ) {
            //'<tr><td></td></tr>'
            elem = arr[ i ];
            console.log(i,elem,'elem90')
            if ( elem || elem === 0 ) {
              /*创建div是为了处理innerHTML的缺陷（IE会忽略开头的无作用域元素），
                让所有的元素都被div元素给包含起来，包括script，style等无作用域的元素*/
              tmp=fragment.appendChild( context.createElement( "div" ) )
              //就是匹配div不支持的标签，如 tr、td等
              /*不支持innerHTML属性的元素，通过正则单独取出处理*/
              tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();

              /*作用就是利用wrapMap让不支持innerHTML的元素通过包装wrap来支持innerHTML*/
              //ie对字符串进行trimLeft操作，其余是用户输入处理
              //很多标签不能单独作为DIV的子元素
              /*td,th,tr,tfoot,tbody等等,需要加头尾*/
              wrap = wrapMap[ tag ] || wrapMap._default // tr: [ 2, "<table><tbody>", "</tbody></table>" ]
              console.log(wrap,'wrap152')
              //将修正好的element添加进innerHTML中
              //jQuery.htmlPrefilter:标签转换为闭合标签，如<table> --> <table></table>
              /*div不支持tr、td所以需要添加头尾标签，如<div><table><tbody>xxxx</tbody></table>*/
              tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];
              // 因为warp被包装过，需要找到正确的元素父级
              j = wrap[ 0 ]; //2
              while ( j-- ) {
                tmp = tmp.lastChild;
              }
              //temp:<tbody></tbody>
              //tmp.childNodes:tr
              //nodes:[]
              //jQuery.merge:将两个数组合并到第一个数组中
              jQuery.merge( nodes, tmp.childNodes );
            }
          }
          //================
          // Remove wrapper from fragment
          fragment.textContent = "";
          //需要将i重置为0
          i=0
          while ( ( elem = nodes[ i++ ] ) ) {
            fragment.appendChild( elem )
          }

          console.log(fragment.childNodes,'fragment105')
          return fragment;
        }
          let rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i )
            let wrapMap = {
              // Support: IE <=9 only
              option: [ 1, "<select multiple='multiple'>", "</select>" ],
              // XHTML parsers do not magically insert elements in the
              // same way that tag soup parsers do. So we cannot shorten
              // this by omitting <tbody> or other required elements.
              thead: [ 1, "<table>", "</table>" ],
              col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
              tr: [ 2, "<table><tbody>", "</tbody></table>" ],
              td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
              _default: [ 0, "", "" ]
            };

            // Support: IE <=9 only
            wrapMap.optgroup = wrapMap.option;
            wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
            wrapMap.th = wrapMap.td;

                htmlPrefilter: function( html ) {
                  return html.replace( rxhtmlTag, "<$1></$2>" );
                }