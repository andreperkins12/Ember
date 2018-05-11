import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * FINAL Database 408 EMBER
 * Andre Perkins + Xavi Ablaza
 * Created by ap on 4/24/18.
 */

public class Prompts {
    private static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    private static int choice;
    private static DBCore core = new DBCore();

    public static void adminPrompt(){
        System.out.print("Welcome to Ember Admin!!! ....\n");
        System.out.print("\n------ Admin Selection --------\n");
        try {
            System.out.print("1. Group By\n2. Generate Report\n");
            choice = Integer.parseInt(br.readLine());
            core.adminChoice(choice);
        }catch (IOException e){e.getMessage();}
    }
}
