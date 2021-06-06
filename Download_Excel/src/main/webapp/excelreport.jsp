<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@page import="java.text.DecimalFormat"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.List"%> 
<%@page import="org.apache.poi.ss.util.CellRangeAddress"%>
<%@page import="org.apache.poi.hssf.usermodel.HSSFCell"%>
<%@page import="org.apache.poi.hssf.usermodel.HSSFRow"%>
<%@page import="org.apache.poi.hssf.usermodel.HSSFSheet"%>
<%@page import="org.apache.poi.hssf.usermodel.HSSFWorkbook"%>
<%@page import="java.io.*" %>
<%@page import="java.sql.*" %>
<%@page import="org.apache.poi.hssf.usermodel.HSSFFont"%>
<%@page import="org.apache.poi.ss.usermodel.DataFormat"%>
<%@page import="java.text.DateFormat"%>
<%@page import="org.apache.poi.ss.usermodel.CellStyle"%>
<%@page import="java.text.DecimalFormat"%>
<%@ page trimDirectiveWhitespaces="true" %>    

<%!
	String fdate="",tdate="",query="",fd="",td="";
	Connection con = null;
	PreparedStatement stmt = null;
	ResultSet rs = null;
	
    String connectionUrl = "jdbc:sqlserver://GOKULKRISHNAM:1433;databaseName=tagic;user=mgokul;password=Mgokul@07";
%>

<%   
/* String name1=request.getParameter("stvalue");
String name2=request.getParameter("edvalue");
System.out.println("fasdfsadf :"+name1);
System.out.println("xvxcvxcv :"+name2);
session.setAttribute("user",name1); */
%>

<%
	try{
		Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
		con = DriverManager.getConnection(connectionUrl);
		/* fdate = request.getParameter("startingdate");
		tdate = request.getParameter("endingdate"); */
		fd = request.getParameter("stvalue");
		td = request.getParameter("edvalue");
		fdate = fd.split("/")[2]+"/"+fd.split("/")[1]+"/"+fd.split("/")[0];
		tdate = td.split("/")[2]+"/"+td.split("/")[1]+"/"+td.split("/")[0];
		
		HSSFWorkbook wb = new HSSFWorkbook();
		HSSFSheet sheet = wb.createSheet();
		HSSFRow row;
		HSSFCell cell;
		CellStyle style = wb.createCellStyle();
		CellStyle styleHead = wb.createCellStyle();
		DataFormat format = wb.createDataFormat();
		HSSFFont fontHead = wb.createFont();
		HSSFFont font = wb.createFont();
		font.setFontHeightInPoints((short)11);
		font.setFontName("Calibri");
		style.setDataFormat(format.getFormat("@"));
		style.setFont(font);
		sheet.setDefaultColumnStyle(1, style);
		fontHead.setFontHeightInPoints((short)11);
		fontHead.setFontName("Calibri");
		fontHead.setBoldweight(font.BOLDWEIGHT_BOLD);
		styleHead.setDataFormat(format.getFormat("@"));
		styleHead.setFont(fontHead);
		String[] header = {"Date","Day","Project Name","Project Description"};
		
		/* System.out.println("fdate :"+fdate);
		System.out.println("tdate :"+tdate); */
		int i = 0,j=0;
		row = sheet.createRow(0);
		
		for(i=0;i<header.length;i++){
			cell = row.createCell(i);
			cell.setCellValue(header[i]);
			cell.setCellStyle(styleHead);
		}
		
		//System.out.println("fdate :"+fdate);
		//System.out.println("tdate :"+tdate);
		
		query = "select TASK_DATE AS Date,TASK_DAY AS Day,PROJECT_NAME AS [Project Name],PROJECT_DESCRIPTION AS [Project Description] FROM T_ONLINE_PROJECT_DETAILS ";
		query += "WHERE TASK_DATE >= ? AND TASK_DATE <= ?";
		
		//query = "select TASK_DATE AS Date1,TASK_DAY AS Day,PROJECT_NAME AS [Project Name],PROJECT_DESCRIPTION AS [Project Description] FROM T_ONLINE_PROJECT_DETAILS WHERE CONVERT(VARCHAR,TASK_DATE,101) >= '01/11/2020' AND CONVERT(VARCHAR,TASK_DATE,101) <= '30/11/2020'";
		
		/* System.out.println("query :"+query); */
		stmt = con.prepareStatement(query);
		
		stmt.clearParameters();
		stmt.setString(1, fdate);
		stmt.setString(2, tdate);
		//System.out.println("query1 :"+query);
		rs = stmt.executeQuery();
		//System.out.println("query2 :"+query);
		int temp = 1;
		
		//System.out.println("fdate :"+fdate);
		//System.out.println("tdate :"+tdate);
		/* System.out.println("tdate :"+rs.next()); */
		while(rs.next()){
			row = sheet.createRow(temp);
			for(int l = 0;l<header.length;l++){
				cell = row.createCell(l);
				cell.setCellValue(rs.getString(header[l]));
			}
			//System.out.println("dsad :"+rs.getString("Date"));
			temp++;
		}
		
		response.setContentType("APPLICATION/vnd.msexcel");
		response.setHeader("Content-Disposition", "attachment; filename=Report.xls");
		ServletOutputStream out1 = response.getOutputStream();
		wb.write(out1);
		out1.close();
		out.clear();
		out = pageContext.pushBody();
		//System.out.println("fdate :"+fdate);
		//System.out.println("tdate :"+tdate);
		
		//con = DBConnection.dbIntial();
		//ByteArrayOutputStream outByteStream = new ByteArrayOutputStream();
		/*wb.write(outByteStream);
		byte [] outArray = outByteStream.toByteArray();
		response.setContentType("application/ms-excel");
		response.setContentLength(outArray.length); 
		response.setHeader("Expires:", "0"); // eliminates browser caching
		response.setHeader("Content-Disposition", "attachment; filename=Leave Details.xls");
		OutputStream outStream = response.getOutputStream();
		outStream.write(outArray);
		outStream.flush();*/
		
		//out.println("Report downloaded successfully..!!");
	}catch(Exception e){
		System.out.println(e.toString());
	}finally{
		//System.out.println("Gokul Krishna");
		if(con != null){
			con.close();
			rs = null;
			stmt = null;
			//System.out.println("Lavanya");
		}
		//System.out.println("Krishna");
	}
%>