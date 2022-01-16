      // ����ÿ���ڵ��ǩ����
     // let attrRE = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;
      function parseTag(tag) {
        let res = {
          type: "tag",
          name: "",
          voidElement: false,
          attrs: {},
          children: [],
        };
        let tagMatch = tag.match(/<\/?([^\s]+?)[/\s>]/);
        if (tagMatch) {
          // ��ǩ����Ϊ����ƥ��ĵ�2��
          res.name = tagMatch[1];
          if (tag.charAt(tag.length - 2) === "/") {
            // �ж�tag�ַ��������ڶ����ǲ��� / ����Ϊ�ձ�ǩ�� ���ӣ�<img/>
            res.voidElement = true;
          }
        }
        // ƥ�����еı�ǩ����
        let classList = tag.match(/\s([^'"/\s><]+?)\s*?=\s*?(".*?"|'.*?')/g);

        if (classList && classList.length) {
          for (let i = 0; i < classList.length; i++) {
            // ȥ�ո�����= �ָ��ַ���  �õ�['��������','����ֵ']
            let c = classList[i].replace(/\s*/g, "").split("=");
            // ѭ����������
            if (c[1]) res.attrs[c[0]] = c[1].substring(1, c[1].length - 1);
          }
        }
        return res;
      }

      function parse(html) {
        let result = [];
        let current;
        let level = -1;
        let arr = [];
        let tagRE = /<[a-zA-Z\-\!\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g;

        html.replace(tagRE, function (tag, index) {
          // �жϵڶ����ַ��ǲ���'/'���ж��Ƿ�open
          let isOpen = tag.charAt(1) !== "/";
          // ��ȡ��ǩĩβ������
          let start = index + tag.length;
          // ��ǩ֮ǰ���ı���Ϣ
          let text = html.slice(start, html.indexOf("<", start));

          let parent;
          if (isOpen) {
            level++;
            // ���ñ�ǩ����
            current = parseTag(tag);
            // �ж��Ƿ�Ϊ�ı���Ϣ���Ǿ�pushһ��text children  ������'  '
            if (!current.voidElement && text.trim()) {
              current.children.push({
                type: "text",
                content: text,
              });
            }
            // ��������Ǹ��û����������µĻ����ڵ�
            if (level === 0) {
              result.push(current);
            }
            // �ж���û���ϲ㣬�о�push��ǰ��ǩ
            parent = arr[level - 1];
            if (parent) {
              parent.children.push(current);
            }
            arr[level] = current;
          }
          // ������ǿ���ǩ�������ǿ�Ԫ�أ�</div><img>
          if (!isOpen || current.voidElement) {
            // level--
            level--;
          }
        });
        return result;
      }
      // test str:
      let html = `
                  <div class = 'divClass' style='backgroud:url(./src/asset/img.jpg)' type='c'>
                    ���ı�
                    <span>�ı�1</span>
                    <p class='names'>
                      �ı�2
                      <div>
                        <span class="span"></span>
                      </div>
                      <img/>
                    </p>
                  </div>
                `;

      let ast = parse(html);
      console.log(ast);
