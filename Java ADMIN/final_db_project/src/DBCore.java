import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
//ALL IMPORTS
/**
 * FINAL Database 408 EMBER
 * Andre Perkins + Xavi Ablaza
 * Created by ap on 4/24/18.
 */

public class DBCore { //DBCORE CLASS

    private static Connection user_connection; //CONNECTION
    private static DBConfig connection; //DBCONFIG FILE
    private static FileWriter fileW; //FILE WRITER FOR CSV
    private static BufferedReader br = new BufferedReader(new InputStreamReader(System.in)); //FOR USER INPUT
    private static PreparedStatement theState = null; //FOR SQL

    public static void adminChoice(int choice) throws IOException { //ADMIN CHOICE
        //TEST DB CONNECTION//make sure have success connection to MySQL DB
        switch (choice){
            case 1:
                group(); //group by posts with cid
                break;
            case 2:
                System.out.print("Enter Export File Name: ");
                String thePath = br.readLine(); //reading in from user
                generateReport(thePath); //call generate report
                break;
        }
    }
    // --------- GENERATE REPORT -------------- //
    private static void generateReport(String path) throws IOException { //EXPORT DB DATA TO CSV
        int theChoice;
        System.out.print("\n---- Select Report Type -------\n1. UserContacts\n2. UserBlockStackID \n3. UserPosts \n"); //PRINT OUT OPTIONS
        theChoice = Integer.parseInt(br.readLine()); //read in user choice
        switch (theChoice){
            case 1:
                userContact(path); //user contact funtion with user provided path
                break;
            case 2:
                userBlock(path);//user block function with user provided path
                break;
            case 3:
                userPost(path); //user post func with user provided path
                break;
            default:
                break;
        }
    }
    // --------- END GENERATE REPORT -------------- //

    // --------- USER CONTACT TABLE -------------- //
    private static void userContact(String path) throws IOException{
        user_connection = connection.getMySQLConnectiion(); //get connection
        try {
            theState = user_connection.prepareStatement("SELECT * FROM UserContacts"); //SQL STATEMENT TO PULL ALL DATA
            ResultSet pat_result = theState.executeQuery(); //EXECUTE QUERY IN DB
            fileW = new FileWriter(path); //FILE PATH
            fileW.append("id" + "," + "Name" + "," + "Gender" + "," + "Birth" + ","
                    + "Home" + "," + "Title" + ",\n"); //add Headers

            while (pat_result.next()){ //WHILE RESULT HAS DATA
                String id = pat_result.getString("cid");
                String Name = pat_result.getString("Name");
                String gender = pat_result.getString("Gender");
                String birth = pat_result.getString("Birthday");
                String home = pat_result.getString("Hometown");
                String title = pat_result.getString("Title");
                String created_at = pat_result.getString("created_at"); //get necessary attr
                fileW.append(id + "," + Name + "," + gender + "," + birth + ","
                        + home + "," + title +  "," + created_at + ",\n"); //append to file here
            }
            theState.close(); //Close Connection
        }catch (Exception e){ e.getMessage(); } //ERROR CATCH
        fileW.flush();fileW.close();System.out.print("Successful . . . Generated User Contact Report to CSV File");
    }
    // --------- END USER CONTACT TABLE -------------- //


    // --------- USER BLOCK TABLE -------------- //
    private static void userBlock(String path) throws IOException{
        user_connection = connection.getMySQLConnectiion(); //get connection
        try {
            theState = user_connection.prepareStatement("SELECT * FROM UserBlockstackIDs"); //SQL STATEMENT TO PULL ALL DATA
            ResultSet pat_result = theState.executeQuery(); //EXECUTE QUERY IN DB
            fileW = new FileWriter(path); //FILE PATH
            fileW.append("id" + "," + "Blockstack ID" + "," + "cid" + "," + "updated at" + ","
                    + "created_at" + ",\n"); //proper header

            while (pat_result.next()){ //WHILE RESULT HAS DATA
                String id = pat_result.getString("id");
                String Name = pat_result.getString("BlockstackID");
                String gender = pat_result.getString("cid");
                String birth = pat_result.getString("updated_at");
                String home = pat_result.getString("created_at"); //get attrs
                fileW.append(id + "," + Name + "," + gender + "," + birth + ","
                        + home + ",\n"); //append to CSV file
            }
            theState.close(); //Close Connection
        }catch (Exception e){ e.getMessage(); } //ERROR CATCH
        fileW.flush(); fileW.close();System.out.print("Successful . . . Generated User BLOCK Report to CSV File");
    }
    // --------- END USER BLOCK TABLE -------------- //

    // --------- USER Posts TABLE -------------- //
    private static void userPost(String path) throws IOException{
        user_connection = connection.getMySQLConnectiion(); //get connection
        try {
            theState = user_connection.prepareStatement("SELECT * FROM UserPosts"); //SQL STATEMENT TO PULL ALL DATA
            ResultSet pat_result = theState.executeQuery(); //EXECUTE QUERY IN DB
            fileW = new FileWriter(path); //FILE PATH with File Writer
            fileW.append("id" + "," + "cid" + "," + "Content" + "," + "Updated AT" + ","
                    + "Created_AT" + ",\n"); //APLLYING PROPER CSV Header

            while (pat_result.next()){ //WHILE RESULT HAS DATA
                String id = pat_result.getString("id");
                String Name = pat_result.getString("cid");
                String gender = pat_result.getString("Content");
                String birth = pat_result.getString("updated_at");
                String birth2 = pat_result.getString("created_at"); //getting all attrs
                fileW.append(id + "," + Name + "," + gender + "," + birth + ","
                        + birth2 + ",\n"); //APPENDING TO FILE
            }
            theState.close(); //Close Connection
        }catch (Exception e){ e.getMessage(); } //ERROR CATCH
        fileW.flush();
        fileW.close(); //CLOSE FILE
        System.out.print("Successful . . . Generated User POST Report to CSV File");
    }
    // --------- END USER POST TABLE -------------- //

    // --------- GROUP BY -------------- //
    private static void group() throws IOException { //GROUP BY
        user_connection = connection.getMySQLConnectiion(); //get connection
        try {
            theState = user_connection.prepareStatement("SELECT cid,Content FROM UserPosts GROUP BY cid,Content;"); //SQL STATEMENT TO PULL ALL DATA
            ResultSet pat_result = theState.executeQuery(); //EXECUTE QUERY IN DB
            while (pat_result.next()){ //WHILE RESULT HAS DATA
                String Name = pat_result.getString("cid");
                String gender = pat_result.getString("Content");
                System.out.format("USER CID:%s Content: (%s)\n", Name, gender); //PULL ALL CRITERIA AND ATTRIBUTES
            }
           theState.close(); //Close Connection
        }catch (Exception e){ e.getMessage(); }}
    // --------- END GROUP BY -------------- //

}
