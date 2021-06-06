package controller;

import java.io.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

// Referenced classes of package controller:
//            DBConnection

public class AjaxController extends HttpServlet
{

    public AjaxController()
    {
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        response.getWriter().append("Served at: ").append(request.getContextPath());
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        response.setContentType("html/text");
        response.setCharacterEncoding("utf8");
        String projectName = "";
        String desc = "";
        String req = "";
        req = request.getParameter("jsonobj");
        try
        {
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(req);
            JSONObject data = (JSONObject)obj;
            projectName = String.valueOf(data.get("projectName"));
            desc = String.valueOf(data.get("desc"));
        }
        catch(ParseException e1)
        {
            e1.printStackTrace();
        }
        try
        {
            Connection con = DBConnection.dbIntial();
            String query = "";
            query = "INSERT INTO T_ONLINE_PROJECT_DETAILS (TASK_DATE,TASK_DAY,PROJECT_NAME,PROJECT_DESCRIPTION) values (GETDATE(),DATENAME(dw,GETDATE()),?,?)";
            PreparedStatement stmt = con.prepareStatement(query);
            stmt.setString(1, projectName);
            stmt.setString(2, desc);
            int i = stmt.executeUpdate();
            System.out.println((new StringBuilder(String.valueOf(i))).append(" record updated").toString());
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        PrintWriter out = response.getWriter();
        JSONObject jsonObj = (JSONObject)JSONValue.parse(request.getParameter("jsonobj"));
        jsonObj.put("status", "1");
        out.println(jsonObj.toString());
        out.close();
    }

    private static final long serialVersionUID = 1L;
}