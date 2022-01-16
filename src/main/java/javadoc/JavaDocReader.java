package javadoc;
import com.sun.javadoc.ClassDoc;
import com.sun.javadoc.FieldDoc;
import com.sun.javadoc.MethodDoc;
import com.sun.javadoc.RootDoc;

public class JavaDocReader {
    private static RootDoc root;
    // һ����Doclet,�յ� RootDoc���󱣴�����������ʹ��
    // �μ��ο�����6
    public static  class Doclet {

        public Doclet() {
        }
        public static boolean start(RootDoc root) {
            JavaDocReader.root = root;
            return true;
        }
    }
    // ��ʾDocRoot�еĻ�����Ϣ
    public static void show(){
        ClassDoc[] classes = root.classes();
        for (int i = 0; i < classes.length; ++i) {
            System.out.println(classes[i]);
            System.out.println(classes[i].commentText());
            for(MethodDoc method:classes[i].methods()){
                System.out.printf("\t%s\n", method.commentText());
            }
            for(FieldDoc field:classes[i].fields()){
                System.out.printf("\t%s\n", field.getRawCommentText());
            }
        }
    }
    public static RootDoc getRoot() {
        return root;
    }
    public JavaDocReader() {

    }
    public static void main(final String ... args) throws Exception{
        // ����com.sun.tools.javadoc.Mainִ��javadoc,�μ� �ο�����3
        // javadoc�ĵ��ò������μ� �ο�����1
        // -doclet ָ���Լ���docLet����
        // -classpath ����ָ�� Դ���ļ����������classλ�ã����ṩҲ����ִ�У����޷���ȡ��������ע����Ϣ(����annotation)
        // -encoding ָ��Դ���ļ��ı����ʽ
        com.sun.tools.javadoc.Main.execute(new String[] {"-doclet",
                        Doclet.class.getName(),
                        "-docletpath",
                        Doclet.class.getResource("/").getPath(),
                        "-encoding","utf-8",
                "-classpath",
                "C:\\js\\plane\\target\\classes",
                "C:\\js\\plane\\src\\main\\java\\javadoc\\TestComment.java"});
        show();
    }
}
