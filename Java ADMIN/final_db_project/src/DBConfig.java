import java.sql.Connection;
import java.sql.DriverManager;

/**
 * FINAL Database 408 EMBER
 * Andre Perkins + Xavi Ablaza
 * Created by ap on 4/24/18.
 */
public class DBConfig { //MYSQL Database CONNECTION

    public static Connection getMySQLConnectiion() { //DBCONFIG CLASS
        Connection theCon = null; //connectiin is null
        try {
            Class.forName("com.mysql.jdbc.Driver"); //DRIVER for jdbc
            String dbName = "ember";
            String dbUserName = "ember_user";
            String dbPassword = "ember_pwd";
            String connectionURL = "jdbc:mysql://xaviablaza.com/" + dbName + "?user=" + dbUserName + "&password=" + dbPassword + "&useUnicode=true&characterEncoding=UTF-8";
            theCon = DriverManager.getConnection(connectionURL, "ember_user", "ember_pwd"); //ENTER CREDENTIALS FOR DATABASE
            System.out.print("\n--------SUCCESSFUL DATABASE CONNECTION--------\n");
        } catch (Exception e) {
            System.out.print("Failed connection" + e.getMessage());
            System.exit(1);
        }
        return theCon;
    }
}
