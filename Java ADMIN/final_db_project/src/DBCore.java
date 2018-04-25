import java.sql.Connection;

/**
 * FINAL Database 408 EMBER
 * Andre Perkins + Xavi Ablaza
 * Created by ap on 4/24/18.
 */
public class DBCore {

    private static Connection user_connection; //USER CONNECTION TO MYSQL
    private static DBConfig connection; //DBCONFIG FILE

    public static void adminChoice(int choice){
        //TEST DB CONNECTION
        user_connection = connection.getMySQLConnectiion(); //make sure have success connection to MySQL DB
        switch (choice){
            case 1:
                group();
                break;
            case 2:
                subQ();
                break;
            case 3:
                generateReport();
                break;
            case 4:
                dashboard();
                break;
            default:
                break;
        }
    }

    private static void dashboard(){ //SEE ALL RECORDS not REPORT
    }
    private static void generateReport(){ //EXPORT DB DATA TO CSV
    }
    private static void subQ(){ //SUBS
    }
    private static void group(){
    }

}
