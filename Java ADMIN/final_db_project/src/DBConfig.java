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
            String connectionURL = "jdbc:mysql://localhost:3306/ember?useSSL=true"; //CONNECTION URL
            theCon = DriverManager.getConnection(connectionURL, "ember_user", "ember_pwd"); //ENTER CREDENTIALS FOR DATABASE
            System.out.print("\n--------SUCCESSFUL DATABASE CONNECTION--------\n");
        } catch (Exception e) {
            System.out.print("Failed connection");
            System.exit(1);
        }
        return theCon;
    }
}
