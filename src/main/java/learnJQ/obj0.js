  //Դ��5597��-5586��
  //��
  //��:$('.inner').append('<tr><td>Test</td></tr>')
  //nodelist��$('.inner')
  //args��<tr><td>Test</td></tr>
  function domManip( nodelist, args, callback ) {
    console.log(nodelist,args,'ignored5798')
    //������Ƴ��µ����鸱��
    //Դ����:args = concat.apply( [], args )������û����arguments�����Ǵ��ξ͸���
    let argsArr = []
    argsArr.push(args)
    console.log(argsArr,'args31')
    //l ���ȣ���������Ϊ.inner��li������,2
    let fragment,
      first,
      node,
      i = 0,
      //l ���ȣ���������Ϊ.inner��li������,2
      l = nodelist.length,
      iNoClone = l - 1
    //l=2
    console.log(l,'lll45')
    if ( l ) {
      console.log(argsArr,nodelist[0].ownerDocument,nodelist,'firstChild40')
      //argsArr:<tr><td>test1</td></tr>
      //nodelist[0].ownerDocument:Ŀ��ڵ��������ĵ�
      fragment = buildFragment(argsArr,nodelist[0].ownerDocument,false,nodelist );
      first=fragment.firstChild
      console.log(fragment.childNodes,'firstChild42')
      //��<tr><td>test1</td></tr>
      if (first) {
        //=====����nodelist�ĳ���ѭ������========
        for ( ; i < l; i++ ) {
          console.log(node,fragment.childNodes,'childNodes49')
          node = fragment;
          if ( i !== iNoClone ) {
            /*createDocumentFragment������Ԫ����һ���Եģ����֮��Ͳ����ٲ����ˣ�
            ������Ҫ��¡iNoClone�Ķ���ڵ�*/
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

   //Դ��2843��-2847��
    //�ж�����������nodename�Ƿ����
    function nodeName( selector, name ) {
      return selector.nodeName && selector.nodeName.toLowerCase() === name.toLowerCase();
    }
  //Դ��5724��-5733��
  //�����жϣ���ѡ������table�����Ҳ����Ԫ����trʱ������ҵ�table�µ�tbody��������tbody
  //this, node
  function manipulationTarget( selector, node ) {
    console.log(node.childNodes,node.firstChild,'node73')
    // �����table���������tr
    if ( nodeName( selector, "table" ) &&
      nodeName( node.nodeType !== 11 ? node : node.firstChild, "tr" ) ) {
      return jQuery( selector ).children( "tbody" )[ 0 ] || selector
    }
    return selector
  }

    let ajQuery={}
    jQuery.each({
        //��:'<p>Test</p>'
        //Դ��6011��-6019��
        // �ڱ�ѡԪ�صĽ�β����ָ������
        /*append���ڲ���ԭ������ͨ������һ���ĵ���Ƭ���������Ľڵ�ŵ��ĵ���Ƭ�У�ͨ���ĵ���Ƭ��¡����ҳ����ȥ��Ŀ����Ч�ʸ���*/
        append: function(nodelist, arguments) {
          //node����domManip����õ����ĵ���ƬdocumentFragment���������Ҫ�����DOM�ڵ�
          let callbackOne=function( node ) {
            console.log(node,'node149')
            //thisָ�ľ���$("xxx")
            //1:Ԫ�ؽڵ�,11:DocumentFragment,9:document
            if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
              //table����tr�Ķ����ж�
              //targetĬ�������selector����document.querySelectorAll(".inner")
              let target = manipulationTarget( this, node )
              console.log(target,node.childNodes,'node147')
              //append�ı��ʼ�ʹ��ԭ��appendChild�����ڱ�ѡԪ���ڲ��Ľ�β����ָ������
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
        //Դ��4857��-4945��
        /*�����ĵ���Ƭ��ԭ����һ������£�������DOM������µ�Ԫ�ػ��߽ڵ㣬DOM�����̸��¡�
        �����DOM���100���ڵ㣬��ô�͵ø���100�Σ��ǳ��˷��������Դ��
        ����취���ǣ����ǿ��Դ���һ���ĵ���Ƭ��documentFragment����
        documentFragment������һ��С��DOM����������ʹ��innerHTML����innerHTML�ϲ������ڵ㣬�ٶ�Ҫ����DOM��2-10������
        ���磺�Ƚ�����ӵ�100���ڵ���ӵ��ĵ���Ƭ��innerHTML�ϣ��ٽ��ĵ���Ƭ��ӵ�DOM�ϡ�*/
        //args, collection[ 0 ].ownerDocument, false, collection
        function buildFragment( arr, context, truefalse, selection ) {
          let elem,tmp, nodes = [], i = 0, l = arr.length,wrap,tag,j
          // createdocumentfragment()����������һ����Ľڵ���󣬽ڵ��������������Ժͷ�����
          //�൱��document.createDocumentFragment()
          let fragment = context.createDocumentFragment()
          //l=1
          console.log(l,'l87')
          //==============
          for ( ; i < l; i++ ) {
            //'<tr><td></td></tr>'
            elem = arr[ i ];
            console.log(i,elem,'elem90')
            if ( elem || elem === 0 ) {
              /*����div��Ϊ�˴���innerHTML��ȱ�ݣ�IE����Կ�ͷ����������Ԫ�أ���
                �����е�Ԫ�ض���divԪ�ظ���������������script��style�����������Ԫ��*/
              tmp=fragment.appendChild( context.createElement( "div" ) )
              //����ƥ��div��֧�ֵı�ǩ���� tr��td��
              /*��֧��innerHTML���Ե�Ԫ�أ�ͨ�����򵥶�ȡ������*/
              tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();

              /*���þ�������wrapMap�ò�֧��innerHTML��Ԫ��ͨ����װwrap��֧��innerHTML*/
              //ie���ַ�������trimLeft�������������û����봦��
              //�ܶ��ǩ���ܵ�����ΪDIV����Ԫ��
              /*td,th,tr,tfoot,tbody�ȵ�,��Ҫ��ͷβ*/
              wrap = wrapMap[ tag ] || wrapMap._default // tr: [ 2, "<table><tbody>", "</tbody></table>" ]
              console.log(wrap,'wrap152')
              //�������õ�element��ӽ�innerHTML��
              //jQuery.htmlPrefilter:��ǩת��Ϊ�պϱ�ǩ����<table> --> <table></table>
              /*div��֧��tr��td������Ҫ���ͷβ��ǩ����<div><table><tbody>xxxx</tbody></table>*/
              tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];
              // ��Ϊwarp����װ������Ҫ�ҵ���ȷ��Ԫ�ظ���
              j = wrap[ 0 ]; //2
              while ( j-- ) {
                tmp = tmp.lastChild;
              }
              //temp:<tbody></tbody>
              //tmp.childNodes:tr
              //nodes:[]
              //jQuery.merge:����������ϲ�����һ��������
              jQuery.merge( nodes, tmp.childNodes );
            }
          }
          //================
          // Remove wrapper from fragment
          fragment.textContent = "";
          //��Ҫ��i����Ϊ0
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